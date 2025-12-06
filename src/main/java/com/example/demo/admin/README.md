Documentación de la API:

GET /api/admins
Devuelve todos los admins

GET /api/admins/id
Devuelve el admin de id tal

POST /api/admins
crea un admin
Cuerpo del post:
Long id;
String nombre;
String apellidos;
String email;
String password;

DELETE /api/admins/id 
borra el admin de id tal

GET /api/admins/esAdministrador?id=int
Mira si la id tal pertenece a un admin

POST /api/admins/iniciarSesion
