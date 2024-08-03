## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Indicaciones Adicionales
#### Poblar la base de datos con Authores y Editoriales
Esto lo que hara sera crear datos ficticios de Autores y Editoriales, creara 3 registros para cada entidad.
```bash
$ npm run migration:run
```

#### Variables de entorno
Usamos algunas variables de entorno, como por ej: el puerto en el que la app corre y algunas otras para conectarnos a la base de datos. En el archivo env.example, encontraran valores por defecto para poder ejecutar el proyecto localmente, es necesario crear un archivo .env y copiar todo el contenido del archivo .env.example. Ademas este archivo '.env.exmple' sirve de ejemplo para crear el archivo .env en nuestro servidor de produccion.

#### Debug
Tambien se agrego un debugger basico, para poder tener esta funcionalidad al momento del desarrollo. Tanto para la ejecucion de la api como para el momento en el que estamos desarrollando tests, este ultimo con la posibilidad de --watch, es decir cada vez que estamos debuggeando y guardamos cambios en un test, automaticamente correra todos los tests nuevamente.
```
    Pormel API
    Run all tests in debug with coverage
```

#### Docker
El proyecto esta enteramente dockerizado, con su Dockerfile y docker-compose.yml, para poder correrlo localmente basta con ejecutar:
```bash
$ docker-compose up
```

#### Postman
Se deja en la raiz del proyecto el archivo 'pormel.postman_collection.json' para pueda ser importado en postman y hacer todas las pruebas necesarias.

## License
Nest is [MIT licensed](LICENSE).
