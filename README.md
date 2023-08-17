# API-Task-Manager

Este es el backend de la aplicación gestor de tareas desarrollado con Node.js, Express, JWT, CORS y MongoDB para proporcionar servicios API para la gestión de usuarios y autenticación.

## Tecnologías 🛠
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cors](https://img.shields.io/badge/Cors-2.8.5?style=for-the-badge&logo=cors&logoColor=white)](https://expressjs.com/en/resources/middleware/cors.html)
[Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
[Cookie-parser](https://www.npmjs.com/package/cookie-parser)
[Zod](https://www.npmjs.com/package/zod)


## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el backend en tu entorno local.

### Clonación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Carlos-Bolano/API-Task-Manager.git
```
2. Navega al directorio del backend

```bash
cd API-Task-Manager
```
3. Instala las dependencias utilizando npm

```bash
npm install
```
4. Crea un archivo .env en la raíz del proyecto y configura las siguientes variables
```js
PORT=3000
MONGODB_URI=URL_de_conexión_de_MongoDB
JWT_SECRET=Tu_Clave_Secreta
```
5. Para iniciar el servidor, ejecuta el siguiente comando
```bash
npm start
```
