node_modules
```bash
npm install
```

🚀 API REST EN NODE.JS
📝 DESCRIPCIÓN
API REST PARA GESTIÓN DE PRODUCTOS DESARROLLADA CON NODE.JS Y EXPRESS.

🛠️ INSTALACIÓN
1. CLONAR EL REPOSITORIO
Bash

git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DE_TU_CARPETA_DE_PROYECTO>
2. INSTALAR DEPENDENCIAS
Bash

npm install
3. CONFIGURAR VARIABLES DE ENTORNO
COPIAR EL ARCHIVO DE EJEMPLO Y COMPLETAR LOS DATOS REQUERIDOS:

Bash

cp .env-example .env
LUEGO EDITAR EL ARCHIVO .ENV CON LOS VALORES CORRESPONDIENTES PARA TU ENTORNO (EJEMPLO: CLAVE SECRETA DE JWT, RUTAS A CREDENCIALES DE FIREBASE, PUERTO).

4. EJECUTAR EN MODO DESARROLLO
Bash

npm run dev
📚 DOCUMENTACIÓN DE LA API
1. OBTENER TODOS LOS PRODUCTOS
MÉTODO: GET

ENDPOINT: /api/products

DESCRIPCIÓN: DEVUELVE LA LISTA DE TODOS LOS PRODUCTOS.

RESPUESTA EJEMPLO:

JSON

[
  { "id": "1", "nombre": "REMERAS", "precio": 150,"categoria":"REMERAS" },
  { "id": "2", "nombre": "CAMPERA", "precio": 15000,"categoria":"ABRIGO" },
  { "id": "3", "nombre": "JOGGIN", "precio": 5000,"categoria":"PANTALONES" }
]
2. BUSCAR PRODUCTOS POR NOMBRE
MÉTODO: GET

ENDPOINT: /api/products/search?nombre=remera

DESCRIPCIÓN: DEVUELVE LOS PRODUCTOS CUYO NOMBRE CONTIENE LA PALABRA INDICADA.

PARÁMETROS:

name (QUERY, REQUERIDO): TEXTO A BUSCAR EN EL NOMBRE DEL PRODUCTO.

EJEMPLO DE USO: /api/products/search?name=remeras

RESPUESTA EJEMPLO:

JSON

[{ "id": "1", "nombre": "REMERAS", "precio": 150,"categoria":"REMERAS" }]
3. OBTENER PRODUCTO POR ID
MÉTODO: GET

ENDPOINT: /api/products/:id

DESCRIPCIÓN: DEVUELVE UN PRODUCTO ESPECÍFICO POR SU ID.

PARÁMETROS:

id (PATH, REQUERIDO): ID DEL PRODUCTO.

EJEMPLO DE USO: /api/products/2

RESPUESTA EJEMPLO:

JSON

{ "id": "2", "nombre": "CAMPERA", "precio": 15000,"categoria":"ABRIGO" }

BUSCAR UN PRODUCTO:

ENDPOINT: /api/products/search?nombre=nombreProducto

BUSCA UN PRODUCTO POR NOMBRE 

EJEMPLO DE USO:

NDPOINT: /api/products/search?nombre=calzas

[
    {
        "id": "8Ku0UvsAJ00BezMPf1wb",
        "cantidad": 1000,
        "categoria": "pantalones",
        "nombre": "calzas",
        "precio": 12960
    }
]

4. CREAR UN PRODUCTO
MÉTODO: POST

ENDPOINT: /api/products

DESCRIPCIÓN: CREA UN NUEVO PRODUCTO.

BODY (JSON):

JSON

{
  "nombre": "NUEVO PRODUCTO",
  "precio": 999,
  "categoria":"CAT"
}
RESPUESTA EJEMPLO:

JSON

{
  "nombre": "ZAPATILLAS DE TRECKING",
  "precio": 100000,
  "categoria":"CALZADO DEPORTIVO"
}
5. INICIAR SESIÓN (LOGIN)
MÉTODO: POST

ENDPOINT: /api/auth/login (ASUMIENDO EL MONTAJE EN /api/auth)

DESCRIPCION: SE LOGUEA CON EL MAIL Y PASSWORD DEL USUARIO POR DEFAULT DECLARADO EN EL AUTH.CONTROLLER.JS.

BODY (JSON):

JSON

{
  "email":"email@correo.com",
  "password":"XXXXXXXX"
}
RESPUESTA (JSON):

JSON

{
  "token": "UN_TOKEN_JWT_MUY_LARGO_GENERADO_POR_EL_SERVIDOR",
  "message": "Inicio de sesión exitoso."
}
USO DEL TOKEN EN POSTMAN:

HEADER: Authorization

VALOR: Bearer <EL_TOKEN_GENERADO> (REEMPLAZA <EL_TOKEN_GENERADO> CON EL TOKEN REAL).

EJEMPLO: Bearer XxXXxxxxXxxx.yyyyYyyyYyyy.zzZZzzzzZZzz

6. ACTUALIZAR UN PRODUCTO
MÉTODO: PUT

ENDPOINT: /api/products/:id

DESCRIPCIÓN: ACTUALIZA COMPLETAMENTE UN PRODUCTO EXISTENTE.

PARÁMETROS:

id (PATH, REQUERIDO): ID DEL PRODUCTO A ACTUALIZAR.

BODY (JSON):

JSON

{
  "nombre": "ZAPATILLAS DE TRECKING",
  "precio": 999,
  "categoria":"CALZADO DEPORTIVO"
}
RESPUESTA EJEMPLO:

JSON

{
  "nombre": "CALZADO DE TRECKING",
  "precio": 120000,
  "categoria":"CALZADO DEPORTIVO"
}
7. CASO DE DESCUENTO POR CATEGORÍA
DESCRIPCIÓN: EXISTE EN EL SERVICIO UNA LÓGICA DE DESCUENTO POR CATEGORÍA IMPLEMENTADA.

PASO 1: VER LOS PRECIOS DE LOS PRODUCTOS A CUYA CATEGORÍA SE LE QUIERE REALIZAR EL DESCUENTO.

MÉTODO: GET

ENDPOINT: /api/products/

PASO 2: APLICAR EL DESCUENTO.

MÉTODO: PUT

ENDPOINT: /api/products/discount

BODY (JSON):

JSON

{
  "categoria": "NOMBRE CATEGORIA",
  "discount": 0.10
}
categoria: NOMBRE EXACTO DE LA CATEGORÍA (EJ. "PANTALONES", "CALZADO DEPORTIVO").

discount: PORCENTAJE DE DESCUENTO EN FORMATO DECIMAL (EJ. 0.10 PARA 10%, 0.20 PARA 20%).

HEADERS PARA POSTMAN:

KEY: Content-Type

VALUE: application/json

RESPUESTA EJEMPLO:

JSON

{
  "message": "DESCUENTO APLICADO A \"PANTALONES\".",
  "updatedProducts": {
      "updatedCount": 3,
      "message": "DESCUENTO APLICADO A 3 PRODUCTOS EN LA CATEGORÍA 'PANTALONES'."
  }
}
PASO 3: VERIFICAR LOS PRECIOS DESPUÉS DEL DESCUENTO.

MÉTODO: GET

ENDPOINT: /api/products/

8. ELIMINAR UN PRODUCTO
MÉTODO: DELETE

ENDPOINT: /api/products/:id

DESCRIPCIÓN: ELIMINA UN PRODUCTO POR SU ID.

PARÁMETROS:

id (PATH, REQUERIDO): ID DEL PRODUCTO A ELIMINAR.

RESPUESTA: 204 NO CONTENT

🔒 MANEJO DEL PARÁMETRO DE AUTORIZACIÓN (JWT)
SE REQUIERE ESTA AUTORIZACIÓN PARA LAS SIGUIENTES ACCIONES:

EN ESTOS CASOS, RECORDAR AGREGAR EL TOKEN GENERADO EN EL LOGIN EN EL INPUT TOKEN DE AUTHORIZATION (TIPO BEARER TOKEN EN POSTMAN).

LAS RUTAS EN PRODUCTS.ROUTER.JS QUE REQUIEREN AUTORIZACIÓN SON:

router.post('/', auth, postProduct);

router.put('/discount', auth, applyDiscountToCategoryController);

router.put('/:id', auth, putProduct);

router.delete('/:id', auth, delProduct);

NO SE REQUIERE AUTORIZACIÓN PARA LAS ACCIONES GET.

📊 CÓDIGOS DE ESTADO HTTP
200 - OK: OPERACIÓN EXITOSA.

201 - CREATED: RECURSO CREADO EXITOSAMENTE.

204 - NO CONTENT: RECURSO ELIMINADO EXITOSAMENTE.

400 - BAD REQUEST: DATOS DE ENTRADA INVÁLIDOS.

404 - NOT FOUND: RECURSO NO ENCONTRADO.

401 - UNAUTHORIZED: NO AUTORIZADO (REQUIERE AUTENTICACIÓN).

500 - INTERNAL SERVER ERROR: ERROR DEL SERVIDOR.

📁 ESTRUCTURA DEL PROYECTO
LA ORGANIZACIÓN DEL PROYECTO SIGUE UNA ARQUITECTURA MODULAR, SEPARANDO LAS RESPONSABILIDADES DE CADA COMPONENTE PARA UNA MEJOR MANTENIBILIDAD Y ESCALABILIDAD.

* **`node_modules/`**: Contiene todas las dependencias del proyecto instaladas.
* **`src/`**: Directorio principal con el código fuente de la aplicación.
    * **`controllers/`**: Manejan las solicitudes HTTP entrantes.
        * `auth.controller.js`: Lógica de autenticación.
        * `products.controllers.js`: Lógica para operaciones de productos.
    * **`middlewares/`**: Funciones intermedias que procesan solicitudes.
        * `auth.middleware.js`: Middleware para verificar tokens JWT.
    * **`models/`**: Contienen la lógica para interactuar con la base de datos (Firestore).
        * `data.js`: Inicialización de la conexión a Firebase.
        * `products.json`: (Archivo de datos de ejemplo o referencia pasada).
        * `products.model.js`: Lógica para operaciones CRUD en Firestore.
    * **`routes/`**: Definen los endpoints de la API.
        * `auth.router.js`: Rutas de autenticación.
        * `products.router.js`: Rutas para recursos de productos.
    * **`services/`**: Contienen la lógica de negocio.
        * `products.service.js`: Lógica de negocio para productos (ej., descuentos).
* **`.env`**: Archivo para variables de entorno sensibles (¡IGNORAR EN GIT!).
* **`.env-example`**: Plantilla de las variables de entorno necesarias.
* **`.gitignore`**: Especifica archivos y directorios a ignorar por Git.
* **`index.js`**: Punto de entrada de la aplicación, configura Express y rutas.
* **`package-lock.json`**: Bloquea las versiones exactas de las dependencias.
* **`package.json`**: Metadatos del proyecto, scripts y dependencias.
* **`README.md`**: Este archivo de documentación.
* **`vercel.json`**: Configuración para despliegues en Vercel (si aplica).

💡 TECNOLOGÍAS UTILIZADAS
NODE.JS: EL ENTORNO DE EJECUCIÓN DE JAVASCRIPT EN EL LADO DEL SERVIDOR, QUE PERMITE A LA API FUNCIONAR.

EXPRESS.JS: FRAMEWORK PARA NODE.JS, UTILIZADO PARA CONSTRUIR Y GESTIONAR LAS RUTAS Y LA LÓGICA DE LA API RESTFUL.

FIREBASE FIRESTORE: UNA BASE DE DATOS NOSQL BASADA EN LA NUBE, ESCALABLE Y FLEXIBLE, UTILIZADA PARA ALMACENAR Y GESTIONAR LOS DATOS DE LOS PRODUCTOS.

FIREBASE ADMIN SDK (O @FIREBASE/APP Y @FIREBASE/FIRESTORE): LAS LIBRERÍAS QUE PERMITEN INTERACTUAR CON LOS SERVICIOS DE FIREBASE, COMO FIRESTORE, DESDE EL ENTORNO NODE.JS.

JSON WEB TOKENS (JWT): UN ESTÁNDAR PARA CREAR TOKENS DE ACCESO QUE PERMITEN VERIFICAR LA AUTENTICIDAD DE LOS USUARIOS Y PROTEGER RUTAS EN LA API.

DOTENV: UNA LIBRERÍA PARA CARGAR VARIABLES DE ENTORNO DESDE UN ARCHIVO .ENV, MANTENIENDO LA CONFIGURACIÓN SENSIBLE SEPARADA DEL CÓDIGO.

CORS: UN MIDDLEWARE DE EXPRESS QUE HABILITA LA POLÍTICA DE INTERCAMBIO DE RECURSOS DE ORIGEN CRUZADO (CORS), ESENCIAL PARA PERMITIR QUE LA API SEA CONSUMIDA POR APLICACIONES WEB ALOJADAS EN DOMINIOS DIFERENTES.

NPM: EL GESTOR DE PAQUETES DE NODE.JS, UTILIZADO PARA INSTALAR, ADMINISTRAR Y EJECUTAR LAS DEPENDENCIAS Y SCRIPTS DEL PROYECTO.







