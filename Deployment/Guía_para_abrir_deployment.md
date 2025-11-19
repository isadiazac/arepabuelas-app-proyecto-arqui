# Guía para abrir el despliegue
---
## Paso 0: Requisitos (Hacer esto solo una vez)
---
• Instala Docker Desktop:
• Ve a la página oficial de Docker: https://www.docker.com/products/docker-desktop/
• Descárgalo e instálalo como cualquier otro programa.
• Asegúrate de que Docker esté corriendo:
• Después de instalarlo, abre el programa Docker Desktop.
---
## Paso 1: Descarga y Descomprime los Archivos
• Usa el archivo llamado arepabuelas-deploy.zip.
• Guárdalo en un lugar fácil de encontrar, como tu Escritorio.
• Haz clic derecho sobre el archivo y selecciona "Extraer todo..." o "Descomprimir 
aquí". Esto creará una carpeta llamada arepabuelas-deploy.
---
## Paso 2: Abre la Terminal
---
## Paso 3: Ve a la Carpeta Correcta en la Terminal
• Ahora tienes que decirle a la terminal que vaya a la carpeta que acabas de 
descomprimir. Escribe el comando cd seguido de la ruta a tu carpeta.
---
## Paso 4: ¡Ejecuta el Comando!
Asegúrate de que Docker Desktop esté corriendo.
En la terminal, escribe este único comando y presiona Enter:
docker-compose up -d
¿Qué pasará? 
• Verás que la terminal empieza a descargar varias cosas.
• Ten paciencia, la primera vez puede tardar unos minutos. Cuando termine, te 
devolverá el control de la terminal.
---
## Paso 5: ¡Listo! Abre la Aplicación
¡Felicidades! La aplicación ya está corriendo en tu computadora.
Abre tu navegador de internet (Chrome, Firefox, etc.) y ve a esta dirección:
http://localhost:3000
Deberías ver la página de inicio de sesión de "Arepabuelas".
El usuario admin por defecto es:
Usuario: admin@arepabuelas.com
Contraseña: admin123
Nota: Los pagos se simulan de la siguiente manera:
Los pagos con tarjetas que comienzan con 4242 se aprueban
Los pagos con tarjetas que comienzan en 5100 no tienen saldo insuficiente
Los pagos con el resto de tarjetas se rechazan
Para detener la aplicación:
Si en algún momento quieres detener todo, vuelve a abrir la terminal en la misma carpeta y 
escribe docker-compose down
