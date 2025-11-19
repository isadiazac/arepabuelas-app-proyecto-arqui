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

El proyecto cuenta con una suite sólida de **10 pruebas unitarias, 10 de integración**, que cubren:

* Seguridad
* Autenticación
* Roles
* CRUD principales
* Lógica de negocio
* Modelos
* Sanitización
* Pagos (mocked)

Esto garantiza un backend robusto, probado y mantenible.

