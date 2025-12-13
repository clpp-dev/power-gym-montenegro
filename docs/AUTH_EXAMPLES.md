# Ejemplos de Autenticación - Power Gym Montenegro API

## 🔐 Login de Administrador

### Con cURL
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Con PowerShell
```powershell
$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

$response
```

### Respuesta esperada
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "_id": "675bb7f4c9f2a1234567890a",
    "username": "admin",
    "nombre": "Admin",
    "email": "admin@powergym.com",
    "rol": "admin",
    "activo": true
  }
}
```

---

## 🔧 Casos de Uso

### 1. Login Simple
```javascript
// JavaScript/Node.js
const login = async () => {
  const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log('Login exitoso!');
    console.log('Usuario:', data.data.nombre);
    console.log('Rol:', data.data.rol);
    // Aquí puedes guardar los datos del usuario en localStorage, context, etc.
  } else {
    console.error('Error:', data.message);
  }
};
```

### 2. Login con email
```bash
# También puedes usar el email en lugar del username
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@powergym.com",
    "password": "admin123"
  }'
```

---

## ⚠️ Errores Comunes

### Credenciales inválidas (401)
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

### Faltan campos (400)
```json
{
  "success": false,
  "message": "Por favor proporcione username y password"
}
```

### Usuario inactivo (401)
```json
{
  "success": false,
  "message": "Usuario inactivo. Contacte al administrador."
}
```

---

## 🔒 Seguridad

**IMPORTANTE:** La autenticación actual es básica y solo para desarrollo. 

Para producción se recomienda:
- ✅ Implementar JWT (JSON Web Tokens)
- ✅ Hash de contraseñas con bcrypt
- ✅ Refresh tokens
- ✅ Rate limiting
- ✅ HTTPS
- ✅ Validación de tokens en rutas protegidas

---

## 📝 Próximos Pasos Recomendados

1. **Agregar JWT**
   ```bash
   npm install jsonwebtoken
   ```

2. **Agregar bcrypt para hash de contraseñas**
   ```bash
   npm install bcrypt
   ```

3. **Middleware de autenticación**
   - Proteger rutas que requieren autenticación
   - Verificar roles (admin, superadmin)

4. **Ejemplo de uso con JWT:**
   ```javascript
   // En el login, generar token
   const token = jwt.sign(
     { id: admin._id, username: admin.username, rol: admin.rol },
     process.env.JWT_SECRET,
     { expiresIn: '24h' }
   );
   ```

---

## 🔑 Credenciales de Prueba

**Usuario Admin por defecto:**
- Username: `admin`
- Email: `admin@powergym.com`
- Password: `admin123`
- Rol: `admin`

---

## 💡 Tips

1. La contraseña **NUNCA** se retorna en las respuestas del servidor
2. Puedes usar username o email para hacer login
3. El campo `activo` determina si el usuario puede hacer login
4. Todos los endpoints de admin retornan los datos sin la contraseña

---

## 🧪 Probar en Postman o Thunder Client

1. **Crear nueva petición POST**
   - URL: `http://localhost:5000/api/login`
   - Method: `POST`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. **Ver respuesta**
   - Si es exitoso, recibirás los datos del usuario
   - Guarda el `_id` para otras peticiones

3. **Consultar usuario por ID**
   - URL: `http://localhost:5000/api/admin/{_id}`
   - Method: `GET`
