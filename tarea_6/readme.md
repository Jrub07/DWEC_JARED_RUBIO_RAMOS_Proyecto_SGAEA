# Proyecto Marvel con Tailwind CSS y DaisyUI

Este proyecto muestra personajes del universo de los cómics de Marvel utilizando Tailwind CSS y DaisyUI para el diseño y la responsividad.

## Requisitos y funcionalidad

Para ejecutar Tailwind CSS es necesario tener Node.js instalado. Si no se requieren configuraciones avanzadas, se puede inicializar el proyecto con el siguiente comando:

```sh
npm init -y
```

Una vez instalado, en la documentación oficial del framework se va indicando paso a paso como ir instalandolo, para ello el primer paso será instalarlo mediante el siguiente comando:

```sh
npm install tailwindcss @tailwindcss/cli
```

Una vez instalado la versión de cliente solo es necesario indicarle al html una direccion de un css de salida y un css de entrada (a este se debe incluir @import "tailwindcss";), para ello en la carpeta de estilos se puede crear estos archivos de entrada y salida, indicandole al html que genere los estilos automaticamente con el siguiente comando una vez dentro del html que requiera de compilación:

```sh
npx @tailwindcss/cli -i ruta relativa entrada -o ruta relativa salida --watch

```
Este comando se puede cancelar en cualquier momento usando control+c

Hecho eso, se pueden consultar diferentes adaptaciones de empresas para poder ejecturar el codigo tailwind con más afcilidad, por ejemplo en este caso se ha decidio implementar Daisy UI (https://daisyui.com/), que facilita que los diseños tengan responsividad más facil de manejar. Se puede instalar por npm pero tambien se puede adjuntar como enlace dentro de cada archivo a implementar, como por ejemplo con la siguiente linea:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css" rel="stylesheet" type="text/css" />
```

Otra implementación de empresa a utilizar será Talwind UI (https://tailwindui.com/components), esta la usaremos para el posicionamiento de las cartas, porque que el diseño de las cartas se hace personalizado ya que hay diferentes formatos de imagen, para implementar TailwindUI, como en el ejemplo anterior con el siguiente enlace:

```html
<link href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css" rel="stylesheet" />
```

Una vez adjuntados ambos enlaces, se ha acudido a Marvel ya que cuenta con opciones para poder diseñar. En este caso
se mostrarán personajes del universo de los cómics.

Para acudir a Marvel se cuenta con el siguiente enlace: https://developer.marvel.com/

Para poder usarlo, es necesario instalar un plugin de Crypto-js para poder hacer la autentificación correcta, ya que necesitamos de claves públicas y privadas, para ello en la consola instalaremos el siguiente comando:

```sh
npm install crypto-js
```

Una vez instalador se debe ir tanto al los archivos html e indicarle que se esté implementando correctamente con la siguente linea:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

Para poder ejectuar la API de Marvel el primer paso es crear un script JS
que permita conectarse a esta. Para ello se usa un promise cuyo interior tiene tanto las claves públicas como privadas que son necesarias para su conexion junto con el tiempo y el enlace a la API de Marvel para que devuelva los resultados empezando desde 0, si ha funcionado bien, empezará a devolver personajes, sino dará error.

A continuación se hace un array ya que se encontró que la API podía devolver 4 veces seguidas el mismo personaje o dar personajes sin imagen, por lo que se tuvo que hacer una función que incluyera a los personajes y que los mezclase, para irlos mostrando en pantalla por tiempo, usando tailwind para hacer una carta con bordes circulares.

Una vez hecho, dentro del index se incluye el archivo script de JS, y se incluyen las plantillas de Daisy y Taiwind UI adaptadas para el contenido, se cambian los div a section para seguir buenas practicas.


Una vez asegurado que funciona bien, se hace una copia y se pega en otro archivo html con el nombre de jquery, omitiendo la parte del script, que se usa de base para "traducir" las funciones al lenguaje de jquery, que para que funcione hay que adjuntar la siguiente sentencia dentro del html para que este funcione:

```html
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
```
Una vez añadido se debe añadir con un script el código de JQuery, y una vez añadido se puede repetir el paso anterior para pasar el codigo talwind a Css por si se quiere añadir algo extra, aunque como es el mismo no será necesario.




