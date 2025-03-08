$(() => {
  var offset = 0;
  var limit = 100;
  var cargando = false;

  function obtener_personajes(offset) {
      var deferred = $.Deferred();
      var clave_publica = 'ae345734f6b6d95b1051200b15c6fc5e';
      var clave_privada = '8084e32acf3a80061a58b8cb59b0ffd9493a5151';
      var tiempo = $.now();
      var hash = CryptoJS.MD5(tiempo + clave_privada + clave_publica).toString();
      var url = "https://gateway.marvel.com/v1/public/characters?ts=" + tiempo +
                "&apikey=" + clave_publica +
                "&hash=" + hash +
                "&offset=" + offset;

      $.ajax({
          url: url,
          method: 'GET',
          success: function(data) {
              deferred.resolve(data.data.results);
          },
          error: function() {
              deferred.reject('Error en la solicitud a la API de Marvel');
          }
      });

      return deferred.promise();
  }

  function cargar_personajes() {
      if (cargando) { return; }
      cargando = true;

      obtener_personajes(offset)
          .done(function(personajes) {
              var contenedor_marvel = $('#marvel-container');

              $.each(personajes, function(index, personaje) {
                  var url_imagen = personaje.thumbnail.path + "/portrait_xlarge." + personaje.thumbnail.extension;
                  var sin_imagen = personaje.thumbnail.path.indexOf("image_not_available") > -1;
                  var sin_descripcion = !personaje.description || $.trim(personaje.description) === "";

                  if (sin_imagen || sin_descripcion) {
                      return true;
                  }

                  var carta_personaje = $(`
                      <section class="cartas bg-red-500 shadow-md rounded-xl p-4 flex flex-col items-center text-center w-full sm:w-11/12 md:w-48 lg:w-56 xl:w-64 2xl:w-72 mx-auto m-2 xl:text-xl 2xl:text-2xl hover:scale-105 transition-transform">
                          <img src="${url_imagen}" alt="${personaje.name}" class="w-24 h-24 object-cover mb-2 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40 rounded-lg">
                          <article class="text-justify text-white">
                              <h3 class="text-lg font-bold mb-1 xl:text-2xl 2xl:text-3xl">${personaje.name}</h3>
                              <p class="text-sm xl:text-lg 2xl:text-xl">${personaje.description}</p>
                          </article>
                      </section>
                  `);

                  contenedor_marvel.append(carta_personaje);
              });

              offset += limit;
              cargando = false;
          })
          .fail(function(error) {
              console.error("Error:", error);
              cargando = false;
          });
  }

  cargar_personajes();

  $(window).on('scroll', function() {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
          cargar_personajes();
      }
  });
});
