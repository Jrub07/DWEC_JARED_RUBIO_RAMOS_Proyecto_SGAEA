# Proyecto Marvel con Tailwind CSS

Este proyecto muestra personajes del universo de los cómics de Marvel utilizando Tailwind CSS para el diseño y la responsividad.

## Requisitos y funcionalidad

Para ejecutar Tailwind CSS es necesario tener Node.js instalado. Si no se requieren configuraciones avanzadas, se puede inicializar el proyecto con el siguiente comando:

```sh
npm init -y
```

Una vez instalado, en la documentación oficial del framework se va indicando paso a paso como ir instalándolo, para ello el primer paso será instalarlo mediante el siguiente comando:

```sh
npm install tailwindcss@3.4.17
```

Una vez instalado, se debe iniciar tailwind con el siguiente comando:

```sh
npx tailwindcss -i ./fuente/styles/input.css -o ./fuente/styles/salida.css --watch
```
Este comando se puede cancelar en cualquier momento usando `control+c`.

Hecho eso, se pueden consultar diferentes adaptaciones de empresas para poder ejecutar el código Tailwind con más facilidad. En este caso se ha decidido implementar Tailwind UI (https://tailwindui.com/components), que facilita que los diseños tengan responsividad más fácil de manejar. Se puede instalar por npm pero también se puede adjuntar como enlace dentro de cada archivo a implementar, como por ejemplo con la siguiente línea:

```html
<link href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css" rel="stylesheet" />
```

Una vez adjuntado el enlace, se ha acudido a Marvel ya que cuenta con opciones para poder diseñar. En este caso se mostrarán personajes del universo de los cómics.

Para acudir a Marvel se cuenta con el siguiente enlace: https://developer.marvel.com/

Para poder usarlo, es necesario instalar un plugin de Crypto-js para poder hacer la autenticación correcta, ya que necesitamos de claves públicas y privadas, para ello en la consola instalaremos el siguiente comando:

```sh
npm install crypto-js
```

Una vez instalado se debe ir tanto a los archivos HTML e indicarle que se esté implementando correctamente con la siguiente línea:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

Para poder ejecutar la API de Marvel el primer paso es crear un script JS que permita conectarse a esta. Para ello se usa un promise cuyo interior tiene tanto las claves públicas como privadas que son necesarias para su conexión junto con el tiempo y el enlace a la API de Marvel para que devuelva los resultados empezando desde 0. Si ha funcionado bien, empezará a devolver personajes, sino dará error.

A continuación se hace un array ya que se encontró que la API podía devolver 4 veces seguidas el mismo personaje o dar personajes sin imagen, por lo que se tuvo que hacer una función que incluyera a los personajes y que los mezclase, para irlos mostrando en pantalla por tiempo, usando Tailwind para hacer una carta con bordes circulares.

Una vez hecho, dentro del index se incluye el archivo script de JS, y se incluyen las plantillas de Tailwind UI adaptadas para el contenido, se cambian los div a section para seguir buenas prácticas.

Una vez asegurado que funciona bien, se hace una copia y se pega en otro archivo HTML con el nombre de `jquery.html`, omitiendo la parte del script, que se usa de base para "traducir" las funciones al lenguaje de jQuery. Para que funcione hay que adjuntar la siguiente sentencia dentro del HTML para que este funcione:

```html
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
```
Una vez añadido se debe añadir con un script el código de jQuery, y una vez añadido se puede repetir el paso anterior para pasar el código Tailwind a CSS por si se quiere añadir algo extra, aunque como es el mismo no será necesario.

## Configuración de Tailwind CSS

El archivo `tailwind.config.js` se ha configurado para incluir el contenido de los archivos HTML y JS dentro de la carpeta `fuente`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './fuente/html/**/*.html',
    './fuente/js/**/*.js',
    './fuente/index.html',
    './fuente/html/jquery.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Scripts de NPM

En el archivo `package.json` se han añadido los siguientes scripts:

```json
{
  "name": "tarea_6",
  "version": "1.0.0",
  "description": "Este proyecto muestra personajes del universo de los cómics de Marvel utilizando Tailwind CSS y DaisyUI para el diseño y la responsividad.",
  "main": "index.js",
  "scripts": {
    "build:css": "npx tailwindcss -i ./fuente/styles/input.css -o ./fuente/styles/salida.css --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "tailwindcss": "^3.4.17"
  }
}
```




