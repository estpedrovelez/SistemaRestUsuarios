# Sistema REST de Gestión de Usuarios

API RESTful desarrollada en Node.js, Express y PostgreSQL, siguiendo los
principios de Desarrollo de Software por Componentes: cada capa (Modelo,
Repository, Service, Controller, Routes) tiene una responsabilidad única
y se ensambla por inyección de dependencias.

## Descripción

Sistema de gestión de usuarios que expone un servicio REST completo
(GET, POST, PUT, DELETE) sobre una tabla `usuarios` en PostgreSQL, y una
aplicación cliente de consola que consume esa API mediante una clase
`ApiClient` reutilizable.

## Objetivo

Aplicar Programación Orientada a Objetos, arquitectura por componentes,
consultas SQL parametrizadas y consumo de servicios REST, desplegando
el resultado en un entorno de producción real (Railway).

## Tecnologías

- Node.js
- Express
- PostgreSQL (`pg`)
- dotenv
- Git / GitHub
- Railway
- Postman

## Arquitectura

```text
Cliente (consola)
      │  HTTP: GET, POST, PUT, DELETE
      ▼
Routes (usuarioRoutes.js)
      │
      ▼
Controller (UsuarioController)
      │  adapta req/res
      ▼
Service (UsuarioService)
      │  valida y aplica reglas de negocio
      ▼
Repository (UsuarioRepository)
      │  SQL parametrizado
      ▼
PostgreSQL
```

| Componente | Archivo | Responsabilidad |
|---|---|---|
| Usuario | `src/models/Usuario.js` | Modelo de dominio; valida sus propios datos |
| Database | `src/config/database.js` | Pool de conexión a PostgreSQL vía variables de entorno |
| UsuarioRepository | `src/repositories/UsuarioRepository.js` | CRUD contra PostgreSQL con SQL parametrizado |
| UsuarioService | `src/services/UsuarioService.js` | Lógica de negocio y validaciones |
| UsuarioController | `src/controllers/UsuarioController.js` | Adapta HTTP hacia el Service |
| usuarioRoutes | `src/routes/usuarioRoutes.js` | Declara el contrato REST |
| app.js | `src/app.js` | Ensambla todos los componentes por inyección de dependencias |
| ApiClient | `client/ApiClient.js` | Encapsula el consumo HTTP de la API |
| cliente.js | `client/cliente.js` | Menú de consola interactivo |

## Requisitos previos

- Node.js ≥ 18
- PostgreSQL (local, para desarrollo)
- Cuenta de GitHub
- Cuenta de Railway
- Postman (opcional, para pruebas manuales)

## Instalación local

```bash
git clone https://github.com/estpedrovelez/SistemaRestUsuarios.git
cd SistemaRestUsuarios
npm install
```

## Configuración de PostgreSQL (local)

```sql
CREATE DATABASE sistema_usuarios;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (nombre, edad, tipo) VALUES ('Luis Diaz', 27, 'Delantero');
```

## Variables de entorno

Copia `.env.example` a `.env` y completa con tus datos reales:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
DB_NAME=sistema_usuarios
DB_PORT=5432
PORT=3000
```

## Ejecución local

```bash
npm start
```

Servidor disponible en `http://localhost:3000`.

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/usuarios` | Lista todos los usuarios |
| GET | `/usuarios/:id` | Obtiene un usuario por id |
| POST | `/usuarios` | Crea un usuario |
| PUT | `/usuarios/:id` | Actualiza un usuario |
| DELETE | `/usuarios/:id` | Elimina un usuario |

### Ejemplo GET

```http
GET /usuarios/1
```
Respuesta (200):
```json
{ "id": 1, "nombre": "Luis Diaz", "edad": 27, "tipo": "Delantero" }
```

### Ejemplo POST

```http
POST /usuarios
Content-Type: application/json

{ "nombre": "Ana López", "edad": 25, "tipo": "Usuario" }
```
Respuesta (201):
```json
{ "mensaje": "Usuario creado correctamente.", "usuario": { "id": 4, "nombre": "Ana López", "edad": 25, "tipo": "Usuario" } }
```

### Ejemplo PUT

```http
PUT /usuarios/4
Content-Type: application/json

{ "edad": 26 }
```
Respuesta (200):
```json
{ "mensaje": "Usuario actualizado correctamente.", "usuario": { "id": 4, "nombre": "Ana López", "edad": 26, "tipo": "Usuario" } }
```

### Ejemplo DELETE

```http
DELETE /usuarios/4
```
Respuesta (200):
```json
{ "mensaje": "Usuario eliminado correctamente." }
```

## Códigos HTTP

| Código | Significado | Uso |
|---|---|---|
| 200 | OK | Consulta, actualización o eliminación exitosa |
| 201 | Created | Registro creado |
| 400 | Bad Request | Datos inválidos o id mal formado |
| 404 | Not Found | Usuario o endpoint inexistente |
| 500 | Internal Server Error | Error interno (ej. fallo de conexión a BD) |

## Aplicación cliente

```bash
node client/cliente.js
```

Para apuntar a producción (Railway) en vez de local:

```powershell
$env:API_URL="https://sistemarestusuarios-production-ca57.up.railway.app"; node client/cliente.js
```

## Pruebas con Postman

Se probaron manualmente los 9 casos: GET (200/404), POST (201/400),
PUT (200/404) y DELETE (200/404), tanto en local como contra la URL
pública de Railway.

## Repositorio y despliegue

- GitHub: https://github.com/estpedrovelez/SistemaRestUsuarios
- Railway (producción): https://sistemarestusuarios-production-ca57.up.railway.app

## Conclusiones

El proyecto demuestra la aplicación práctica del Desarrollo de Software
por Componentes: cada capa puede entenderse, probarse y reemplazarse de
forma independiente, y el mismo código corre sin modificaciones tanto en
un entorno local como en un entorno de producción real, gracias al uso
consistente de variables de entorno.