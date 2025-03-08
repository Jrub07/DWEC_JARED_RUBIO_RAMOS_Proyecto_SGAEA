
let desplazamiento = 0;
const limite = 100; 
let cargando = false; 


function obtener_personajes(desplazamiento = 0) {
  return new Promise((resolver, rechazar) => {
    const clave_publica = 'ae345734f6b6d95b1051200b15c6fc5e';
    const clave_privada = '8084e32acf3a80061a58b8cb59b0ffd9493a5151';
    const tiempo = new Date().getTime();
    const hash = CryptoJS.MD5(tiempo + clave_privada + clave_publica).toString();

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${tiempo}&apikey=${clave_publica}&hash=${hash}&offset=${desplazamiento}`;

    fetch(url)
      .then(respuesta => {
        if (!respuesta.ok) {
          rechazar('Error en la solicitud a la API de Marvel');
        }
        return respuesta.json();
      })
      .then(datos => resolver(datos.data.results))
      .catch(error => rechazar(error));
  });
}

function mezclar_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



function cargar_personajes() {
  if (cargando) return; 
  cargando = true;

  obtener_personajes(desplazamiento)
    .then(personajes => {
      const contenedor_marvel = document.getElementById('marvel-container');

      const personajes_mezclados = mezclar_array(personajes);

      personajes_mezclados.forEach(personaje => {
        const url_imagen = `${personaje.thumbnail.path}/portrait_xlarge.${personaje.thumbnail.extension}`;
        const sin_imagen = personaje.thumbnail.path.includes("image_not_available");
        const sin_descripcion = !personaje.description || personaje.description.trim() === "";

        if (sin_imagen || sin_descripcion) return;

        const carta_personaje = document.createElement('section');
        carta_personaje.classList.add('cartas', 'bg-red-500', 'shadow-md', 'rounded-lg', 'p-4', 'flex', 'flex-col', 'items-center', 'text-center', 'w-full', 'sm:w-11/12', 'md:w-48', 'lg:w-56', 'xl:w-64', '2xl:w-72', 'mx-auto', 'm-2', 'xl:text-xl', '2xl:text-2xl');
        carta_personaje.innerHTML = `
          <img src="${url_imagen}" alt="${personaje.name}" class="w-24 h-24 object-cover mb-2 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40">
          <article class="text-justify text-white">
            <h3 class="text-lg font-bold mb-1 xl:text-2xl 2xl:text-3xl">${personaje.name}</h3>
            <p class="text-sm xl:text-lg 2xl:text-xl">${personaje.description}</p>
          </article>
        `;

        contenedor_marvel.appendChild(carta_personaje);
      });

      desplazamiento += limite;
      cargando = false; 
    })
    .catch(error => {
      console.error('Error:', error);
      cargando = false; 
    });
}

cargar_personajes();

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) { 
    //He añadido aqui el scroll, que se me habia pasado.
    cargar_personajes();
  }
});