# **Estrategia de Pruebas del Backend (Arepabuelas App)**
### Isabel Díaz Acosta, Pablo Boada, Ana Maria Cordero

Este repositorio cuenta con una estrategia completa de pruebas implementada para el backend del proyecto **Arepabuelas App**.
Se desarrollaron **pruebas automatizadas**, entre **unitarias** e **integración**, usando Jest + Supertest, mock de base de datos, y aislamiento total de dependencias externas.

---

# **Tecnologías utilizadas**

| Tecnología            | Uso                                                    |
| --------------------- | ------------------------------------------------------ |
| **Jest**              | Framework de testing                                   |
| **Supertest**         | Pruebas de integración para endpoints Express          |
| **babel-jest**        | Permite usar ES Modules con Jest                       |
| **Mocks de Jest**     | Simulación de PostgreSQL, bcrypt, multer y auditLogger |
| **Node.js + Express** | Backend probado                                        |

---

# **Arquitectura de pruebas**

La estructura utilizada fue:

```
backend/
 ├── src/
 ├── tests/
 │     ├── unit/
 │     ├── integration/
 │     └── setupTests.js   ← mocks globales
 ├── jest.config.js
 └── package.json
```
## Diagrama de flujo de las pruebas realizadas
```
                    ┌────────────────────┐
                    │    INICIO TESTS    │
                    └─────────┬──────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Cargar setupTests.js    │
                 │ - Mock multer           │
                 │ - Definir JWT_SECRET    │
                 └───────────┬─────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │  Mockear Base de Datos  │
                 │  pool.query = jest.fn() │
                 └───────────┬─────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Cargar la App    │
                    │ (createTestApp)  │
                    └───────┬──────────┘
                            │
                            ▼
        ┌───────────────────────────────────────────┐
        │       EJECUTAR TESTS UNITARIOS             │
        │  - Middlewares                             │
        │  - Sanitización                             │
        │  - Modelos (db mock)                       │
        └───────────────┬───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────────┐
        │        EJECUTAR TESTS DE INTEGRACIÓN       │
        │  - Simular peticiones HTTP con Supertest   │
        │  - Validar rutas + controladores           │
        │  - BD mockeada responde                    │
        └───────────────┬───────────────────────────┘
                        │
                        ▼
                 ┌────────────────────────┐
                 │   Validar resultados   │
                 │  (status, body, flujo) │
                 └───────────┬────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   TODOS PASAN    │
                    └──────────────────┘
```

---
### setupTests.js

Mockea dependencias globales:

* PostgreSQL (pool.query)
* bcrypt
* auditLogger
* multer (uploadUserPhoto)
* dotenv

Esto asegura que **ninguna prueba dependa de infraestructura real** como BD o archivos.

---

# **Cómo ejecutar las pruebas**

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar todas las pruebas:

```bash
npm test
```

3. Ejecución en modo detallado:

```bash
cross-env NODE_ENV=test jest --runInBand
```

---

# **Pruebas y cobertura**

Se desarrollaron **20 pruebas**, divididas de la siguiente manera:

---

## 1. **Autenticación (AUTH)**

| Archivo                  | Tipo        | Descripción                           |
| ------------------------ | ----------- | ------------------------------------- |
| `login.test.js`          | Integración | Login exitoso con mock de DB y bcrypt |
| `registerFail.test.js`   | Integración | Registro fallido con datos inválidos  |
| `authMiddleware.test.js` | Unitaria    | Token válido permite acceso           |
| `verifyToken.test.js`    | Unitaria    | Token faltante o inválido → error     |

---

## 2. **Usuarios (USERS)**

| Archivo                | Tipo        | Descripción                       |
| ---------------------- | ----------- | --------------------------------- |
| `pendingUsers.test.js` | Integración | Admin obtiene usuarios pendientes |
| `approveUser.test.js`  | Integración | Admin aprueba usuarios            |
| `createUser.test.js`   | Unitaria    | Inserción de usuario              |
| `findByEmail.test.js`  | Unitaria    | Búsqueda de usuario por email     |

---

## 3. **Productos (PRODUCTS)**

| Archivo                | Tipo        | Descripción             |
| ---------------------- | ----------- | ----------------------- |
| `productsList.test.js` | Integración | Listar productos        |
| `productById.test.js`  | Integración | Obtener producto por ID |
| `productModel.test.js` | Unitaria    | Query de producto       |

---

## 4. **Órdenes (ORDERS)**

| Archivo               | Tipo        | Descripción                |
| --------------------- | ----------- | -------------------------- |
| `orderCreate.test.js` | Integración | Crear orden correctamente  |
| `payOrder.test.js`    | Integración | Simulación de pago exitoso |

---

## 5. **Comentarios (COMMENTS)**

| Archivo                 | Tipo        | Descripción            |
| ----------------------- | ----------- | ---------------------- |
| `commentCreate.test.js` | Integración | Crear comentario       |
| `commentModel.test.js`  | Unitaria    | Modelo crea comentario |

---

## 6. **Middlewares de seguridad**

| Archivo            | Tipo     | Descripción                               |
| ------------------ | -------- | ----------------------------------------- |
| `isAdmin.test.js`  | Unitaria | Restringe acceso a usuarios sin rol admin |
| `sanitize.test.js` | Unitaria | Sanitización anti XSS                     |

---

## 7. **Modelos**

| Archivo                | Tipo     | Descripción     |
| ---------------------- | -------- | --------------- |
| `createUser.test.js`   | Unitaria | Crear usuario   |
| `findByEmail.test.js`  | Unitaria | Buscar usuario  |
| `productModel.test.js` | Unitaria | Producto por ID |
| `commentModel.test.js` | Unitaria | Comentario      |

*(algunos ya listados arriba)*

---
# **EXPLICACIÓN CORTA DE CADA TEST**
---

## **PRUEBAS UNITARIAS (10 tests)**

### **1. verifyToken – rechazo sin token**

Valida que el middleware responda 401 si no recibe encabezado Authorization.

### **2. validateRegister – email inválido**

Si el usuario intenta registrarse con un email incorrecto → retorna 400.

### **3. authMiddleware – token válido**

Decodifica un token JWT y mete el usuario en `req.user`.

### **4. isAdmin – bloquea usuario normal**

Middleware comprueba si `req.user.is_admin !== true`; si lo es → 403.

### **5. productModel – obtener producto por ID**

Mockea la BD y asegura que `getProductById(id)` devuelve un objeto válido.

### **6. auditLogger – escribe logs correctamente**

Mockea fs y valida que el logger escribe en archivo sin fallar.

### **7. sanitize – filtra contenido malicioso**

Limpia scripts o tags dañinas en la entrada del usuario.

### **8. commentModel – crear comentario**

Mockea la BD y asegura que se inserta un comentario correctamente.

### **9. findByEmail – usuario existente**

Devuelve un usuario simulado desde la BD (pool.query mock).

### **10. createUser – creación exitosa**

Simula inserción y asegura que un usuario nuevo se guarda correctamente.

---

## **PRUEBAS DE INTEGRACIÓN (10 tests)**

Estas pruebas validan RUTAS completas usando Supertest.

---

### **11. registerFail – email inválido / falta info**

Envía un POST /api/auth/register con datos inválidos y recibe 400.

### **12. productsList – listar productos**

GET /api/products devuelve una lista correcta desde la BD mock.

### **13. productById – obtener producto específico**

GET /api/products/:id devuelve el producto esperado.

### **14. pendingUsers – listar usuarios pendientes (admin)**

PATCH /api/users/pending devuelve la lista (BD mock).

### **15. payOrder – proceso de pago simulado**

POST /api/orders/pay retorna “orden pagada” usando BD mock.

### **16. orderCreate – crear orden**

POST /api/orders crea una orden con items y responde 201.

### **17. commentCreate – crear comentario**

POST /api/comments/:productId almacena el comentario.

### **18. getUserOrders – historial del usuario**

GET /api/orders devuelve las órdenes del usuario autenticado.

### **19. approveUser – aprobar usuario**

PATCH /api/users/:id/approve actualiza el estado del usuario.

### **20. login – login exitoso**

POST /api/auth/login devuelve 200 + token válido
(usando hashing real SHA256 + SAL mockeado).

---

# **Estrategia utilizada**

1. **Unitarias → Nivel modelo y middlewares**
   Se mockea la base de datos para validar la lógica interna sin tocar infraestructura real.

2. **Integración → Endpoints completos**
   Se usa `Supertest` para levantar una instancia de Express aislada y simular peticiones reales.

3. **Mocks globales en setupTests**

   * PostgreSQL mockeado evita errores SCRAM
   * bcrypt mockeado acelera pruebas
   * multer mockeado evita escribir archivos
   * auditLogger neutralizado para evitar escritura en disco

4. **Aislamiento completo**
   Ninguna prueba requiere:

   * PostgreSQL real
   * Stripe real
   * Archivos reales
   * Multer real
   * .env real

---

# **Conclusión**

El proyecto cuenta con una suite sólida de **10 pruebas unitarias y 10 de integración, además de las E2E y de seguridad**, que cubren:

* Seguridad
* Autenticación
* Roles
* CRUD principales
* Lógica de negocio
* Modelos
* Sanitización
* Pagos (mocked)

Esto garantiza un backend robusto, probado y mantenible.



