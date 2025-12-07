# Comercio Tech

Un e-commerce simple enfocado en productos tecnológicos, con un frontend moderno y un backend seguro con autenticación JWT.

## 📋 Descripción

**Comercio Tech** es una aplicación web que permite:
- **Frontend**: Navegar por productos, visualizar detalles y acceder a documentación.
- **Backend**: Gestionar productos (crear, leer, eliminar) con autenticación basada en JWT.

## 📱 Frontend

### Vistas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/productos` | Catálogo de productos |
| `/productos/:id` | Detalle de producto específico |
| `/docs` | Documentación |

### Funcionalidades

- **Listado de productos**: Obtiene todos los productos desde la API.
- **Detalle de producto**: Muestra información completa del producto seleccionado.
- **Validación 404**: Si el recurso a buscar no existe, redirige automáticamente a la página de error.

## 🔌 Backend

### API Endpoints

#### **Productos (GET - Sin autenticación)**

```
GET /api/products
```
Devuelve la lista completa de productos.

```
GET /api/products/:id
```
Devuelve un producto específico.

#### **Autenticación (POST)**

```
POST /auth/login

Body: { email: string, password: string }
```
Devuelve un token JWT si las credenciales son válidas.

#### **Productos (POST - Requiere autenticación)**

```
POST /api/products/create

Headers: Authorization: Bearer <token>
Body: { nombre, descripcion, precio, stock, imagen, categorias }
```
Crea un nuevo producto. Requiere token JWT válido.

#### **Productos (DELETE - Requiere autenticación)**

```
DELETE /api/products/:id

Headers: Authorization: Bearer <token>
```
Elimina un producto. Requiere token JWT válido.

### Autenticación

Se utiliza **JWT (JSON Web Token)** para proteger las rutas de creación y eliminación de productos.

1. Realiza un `POST` a `/auth/login` con credenciales válidas específicas.
2. Recibirás un token en la respuesta.
3. Incluye el token en el header `Authorization: Bearer <token>` para acceder a rutas protegidas.

## 🛠️ Tecnologías

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js
- Firebase (Base de datos)
- JWT (Autenticación)
- CORS (Seguridad)

## 📦 Dependencias principales

```json
{
  "express": "^5.2.1",
  "firebase": "^12.6.0",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Proyecto realizado por Leonel Bautista para el **Proyecto Integrador Final - Talento Tech 2025**