# API de Usuarios y Transacciones

Este proyecto es una API simple para gestionar usuarios y transacciones. A continuación, se detallan los endpoints disponibles y cómo utilizarlos.

## Requisitos

- Node.js
- npm o yarn
- PostgreSQL

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/alex-ramos-232609241/project-javalabs-users-transactions.git
   cd project-javalabs-users-transactions
   ```

2. Instala las dependencias:
   ```bash
   cd frontend
   npm install
   
   cd backend
   npm install
   ```

3. Configura la base de datos:
   - Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias (por ejemplo, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

4. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints

### Guardar un Usuario

**POST** `{{url_base}}/users`

Guarda un nuevo usuario en la base de datos.

**Cuerpo de la solicitud:**
```json
{
  "name": "For Due Don",
  "email": "agui@fort.com"
}
```

**Ejemplo de solicitud:**
```bash
curl -X POST http://localhost:5000/users -H "Content-Type: application/json" -d '{"name": "For Due Don", "email": "agui@fort.com"}'
```

### Listar Usuarios

**GET** `{{url_base}}/users`

Obtiene una lista de todos los usuarios registrados.

**Ejemplo de solicitud:**
```bash
curl -X GET http://localhost:5000/users -H "Content-Type: application/json"
```

### Guardar una Transacción

**POST** `{{url_base}}/transactions`

Guarda una nueva transacción asociada a un usuario.

**Cuerpo de la solicitud:**
```json
{
  "user_id": 2,
  "amount": 500.50,
  "type": "deposit"
}
```

**Ejemplo de solicitud:**
```bash
curl -X POST http://localhost:5000/transactions -H "Content-Type: application/json" -d '{"user_id": 2, "amount": 500.50, "type": "deposit"}'
```

### Listar Transacciones de un Usuario

**GET** `{{url_base}}/transactions/:user_id`

Obtiene una lista de todas las transacciones asociadas a un usuario específico.

**Ejemplo de solicitud:**
```bash
curl -X GET http://localhost:5000/transactions/2 -H "Content-Type: application/json"
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
```