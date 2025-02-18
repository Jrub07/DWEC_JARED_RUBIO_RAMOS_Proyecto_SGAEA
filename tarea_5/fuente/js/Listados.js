import BD from './BD.js';
import Asignatura from "./Asignaturas.js";
import Estudiante from './Estudiantes.js';
import Funciones from './Funciones.js';

class Listados {
    #listado_x;
    
    /**
     * Clase listado general usada para todos los listados del programa, se llama a su atributolistado_x 
ya que x representa todo lo que puede guardar, desde alumnos, hasta notas a manera de array
     *
     * @constructor
     * @param {array} [listado_x=[]] listado de alumnos, asignaturas, matriculaciones o desmatriculaciones
     */
    constructor(listado_x = []) {
        this.#listado_x = listado_x;
    }

    
    /**
     * Set del listado de alumnos, asignaturas, matriculaciones o desmatriculaciones
     *
     * @type {array}
     */
    set listado_x(listado_x){
        this.#listado_x=listado_x;
    }

    
    /** Get del listado de alumnos, asignaturas, matriculaciones o desmatriculaciones
     * @returns {array} El listado de alumnos, asignaturas, matriculaciones o desmatricaliones
     */
    get listado_x() {
        return this.#listado_x;
    }


    
    /**
     * Metodo para agregar alumnos a una lista de alumnos
    El metodo controla un parametro tipo objeto, y funciona a modo de condicional: Si el listado contiene la id
    del alumno introducido no dejará añadir el alumno y lo mostrará por consola, si no lo tiene se añadirá al listado,
    para finalmente mostrar el listado y se vea que se ha añadido correctamente (esto último se puede obviar, pero se deja 
    como test para comprobar que se ha añadido)
     *
     * @param {object} alumno objeto de tipo Estudiante
     */
    eliminar_alumno_listado(id) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_alumnos = BD.recoger_datos("listado_alumnos");
        const listado_matriculas = BD.recoger_datos("listado_matriculas");
        
        let indice_para_borrar = -1;
    
        // Buscar el índice del alumno a eliminar
        for (let i = 0; i < listado_alumnos.length; i++) {
            if (listado_alumnos[i].id === id) {
                indice_para_borrar = i;
                break;
            }
        }
    
        if (indice_para_borrar === -1) {
            mostrar_Resultados.innerHTML = `
                <p>No existe el alumno en el listado</p>
                <button id="volver">Volver</button>
            `;
        } else {
            // Eliminar al alumno del listado (solo el elemento en el índice encontrado)
            listado_alumnos.splice(indice_para_borrar, 1);
            mostrar_Resultados.innerHTML = `
                <p>Alumno borrado con éxito</p>
                <button id="volver">Volver</button>
            `;
    
            // Eliminar matriculaciones correspondientes al alumno
            for (let i = listado_matriculas.length - 1; i >= 0; i--) {
                if (listado_matriculas[i].estudiante.id === id) {
                    listado_matriculas.splice(i, 1);
                }
            }
    
            // Actualizar base de datos
            BD.guardar_datos("listado_alumnos", listado_alumnos);
            BD.guardar_datos("listado_matriculas", listado_matriculas);
        }
    
        // Agregar el listener para el botón "Volver"
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();  // Función que muestra el menú, que deberías definir
        });
    }
    
    

    
    /**
     * Método para eliminar alumnos.
    Se pide el id del alumno por teclado y con un bucle for se recorre las posiciones buscando el id dentro del listado.
    Si se encuentra el id se incrementa un contador en 1 y se guarda el índice para borarrlo posteriormente.
    Si el contador es igual a 0 se indica al usuario que no existe el usuario en el listado y se acaba el programa, pero si existe
    se elimina del listado con un splice indicandole el indice para borrar
    
    Además de eso, cuando se elimina el listado de uno de los listados base (listado asignaturas o listado alumnos) se borra en listado matriculas
    ya que no tiene mucho sentido dejarlo sin actualizar. Esto se hace con un bucle for inverso que corte las posiciones
    donde se encuentre el id del alumno, y que puede haber varios alumnos, además se hace inverso ya que se va recortando la longitud del array por
    cada splice y es mas facil de manejar así
     *
     * @param {string} id id del alumno a eliminar
     * @param {object} lista_matricula objeto listado de matriculaciones
     */
    eliminar_alumno_listado(id) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_alumnos = BD.recoger_datos("listado_alumnos");
        const listado_matriculas = BD.recoger_datos("listado_matriculas");
    
        let indice_para_borrar = -1;
    
        // Buscar el índice del alumno a eliminar
        for (let i = 0; i < listado_alumnos.length; i++) {
            if (listado_alumnos[i].id === id) {
                indice_para_borrar = i;
                break;
            }
        }
    
        if (indice_para_borrar === -1) {
            mostrar_Resultados.innerHTML = "<p>No existe el alumno en el listado</p>";
        } else {
            // Eliminar al alumno del listado (solo el elemento en el índice encontrado)
            listado_alumnos.splice(indice_para_borrar, 1);
            mostrar_Resultados.innerHTML = "<p>Alumno borrado con éxito</p>";
    
            // Eliminar matriculaciones correspondientes al alumno
            for (let i = listado_matriculas.length - 1; i >= 0; i--) {
                if (listado_matriculas[i].estudiante.id === id) {
                    listado_matriculas.splice(i, 1); // Eliminar matricula del alumno
                }
            }
    
            // Ahora actualizamos la base de datos eliminando solo el alumno y sus matriculaciones
            BD.guardar_datos("listado_alumnos", listado_alumnos);
            BD.guardar_datos("listado_matriculas", listado_matriculas);
        }
    }
    
    
    




     /**
      * Metodo para añadir asignaturas al listado, es una copia de agregar_alumno_listado, pero cambiando
        lo que se busca 
      *@param {object} asignatura objeto de tipo Asignatura      *
      */
     
      agregar_alumno_listado(alumno) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        
        if (this.#listado_x.some(a => a.id === alumno.id)) {
            mostrar_Resultados.innerHTML = `
                <p>El alumno ya está en el listado</p>
                <button id="volver">Volver</button>`
            ;
        } else {
            this.#listado_x.push(alumno);
            BD.guardar_datos("listado_alumnos", this.#listado_x.map(est => ({
                id: est.id,
                nombre: est.nombre
            })));
    
            mostrar_Resultados.innerHTML = `
                <p>Alumno agregado: ${alumno.nombre}</p>
                <button id="volver">Volver</button>`
            ;
        }
    
        // Agregar el listener después de insertar el botón en el DOM
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }

     /**
      * Metodo para borrar asignaturas de un listado, es igual que el de eliminar alumnos del listado
      *@param {string} asignatura nombre de la asignatura a eliminar
      * @param {object} lista_matriculas objeto listado de matriculaciones
      */     
      eliminar_alumno_listado(id) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
    
        // Recoger los datos desde el localStorage usando la función de BD
        let listado_alumnos = BD.recoger_datos("listado_alumnos");
        let listado_matriculas = BD.recoger_datos("listado_matriculas");
    
        if (!listado_alumnos || !listado_matriculas) {
            mostrar_Resultados.innerHTML = "<p>No hay datos disponibles</p>";
            return;
        }
    
        let indice_para_borrar = -1;
    
        // Buscar el índice del alumno a eliminar en el listado de alumnos
        for (let i = 0; i < listado_alumnos.length; i++) {
            if (listado_alumnos[i].id === id) {
                indice_para_borrar = i;
                break;
            }
        }
    
        if (indice_para_borrar === -1) {
            mostrar_Resultados.innerHTML = "<p>No existe el alumno en el listado</p>";
        } else {
            // Eliminar al alumno del listado
            listado_alumnos.splice(indice_para_borrar, 1); // Eliminamos el alumno de la lista
    
            // Eliminar matriculaciones correspondientes al alumno
            for (let i = listado_matriculas.length - 1; i >= 0; i--) {
                if (listado_matriculas[i].estudiante.id === id) { // Comprobar si el ID coincide con el estudiante
                    listado_matriculas.splice(i, 1); // Eliminar matricula del alumno
                }
            }
    
            // Guardar los datos actualizados sin perder las propiedades privadas
            BD.guardar_datos("listado_alumnos", listado_alumnos); // Guardamos los datos completos sin perder las propiedades
            BD.guardar_datos("listado_matriculas", listado_matriculas);
    
            // Mostrar mensaje de éxito y el botón "Volver"
            mostrar_Resultados.innerHTML = "<p>Alumno borrado con éxito</p>";
            mostrar_Resultados.innerHTML += `
                <button id="volver">Volver</button>
            `;
    
            // Agregar el listener después de insertar el botón en el DOM
            document.getElementById("volver").addEventListener("click", () => {
                mostrar_menu(); // Esta función muestra el menú de opciones
            });
        }
    }
    

    /**
     * Metodo para buscar un patron de texto que coincida parcialmente.
    Se crea un parametro de busqueda que es un texto, y se pasa como parametro de una expresion regular
    ignorando que sea mayúsucla o minúscula. Con un condicional se busca con un condicional que el listado no esté vacio y
    que con la funcion trim que no se introduzca un espacio vacío. Si no pasa la condicion muestra un error y sino busca
    en un for each dentro del listado si está con la funcion test de la expresión regular, si es así se incrementa el contador.
    Si este contador sigue en 0, indicará al usuario que no hay nada en la cadena
     *
     * @param {string} busqueda nombre de la asignatura a buscar
     */
    buscar_asignatura(busqueda) {
        const contenedor = document.getElementById("mostrar_resultados");
    
        // Recupera el listado actualizado de alumnos desde la BD
        this.#listado_x = BD.recoger_datos("listado_asignaturas");
    
        // Crea un contenedor para los resultados si no existe
        let resultados = document.getElementById("resultados_busqueda");
        if (!resultados) {
            resultados = document.createElement("div");
            resultados.id = "resultados_busqueda";
            contenedor.appendChild(resultados);
        }
    
        // Verifica que el listado y la búsqueda sean válidos
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            resultados.innerHTML = "<p>Error: Listado vacío o búsqueda inválida</p>";
            return;
        }
    
        // Crea la expresión regular para una búsqueda sin distinción de mayúsculas/minúsculas
        const patron = new RegExp(busqueda, 'i');
        resultados.innerHTML = "";  // Limpia resultados previos
        let contador = 0;
    
        // Recorre el listado y muestra los alumnos que coincidan
        this.#listado_x.forEach(asignatura => {
            if (patron.test(asignatura.nombre)) {
                resultados.innerHTML += `<p>${asignatura.nombre}</p>`;
                contador++;
            }
        });
    
        if (contador === 0) {
            resultados.innerHTML = "<p>No se encontraron asignaturas</p>";
        }
    }
    

    
    /**
     * Metodo exacatamente igual que el anterior, pero buscandolo para alumnos
     *
     * @param {string} busqueda cadena a buscar 
     */
    buscar_alumno(busqueda) {
        const contenedor = document.getElementById("mostrar_resultados");
    
        // Recupera el listado actualizado de alumnos desde la BD
        this.#listado_x = BD.recoger_datos("listado_alumnos");
    
        // Crea un contenedor para los resultados si no existe
        let resultados = document.getElementById("resultados_busqueda");
        if (!resultados) {
            resultados = document.createElement("div");
            resultados.id = "resultados_busqueda";
            contenedor.appendChild(resultados);
        }
    
        // Verifica que el listado y la búsqueda sean válidos
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            resultados.innerHTML = "<p>Error: Listado vacío o búsqueda inválida</p>";
            return;
        }
    
        // Crea la expresión regular para una búsqueda sin distinción de mayúsculas/minúsculas
        const patron = new RegExp(busqueda, 'i');
        resultados.innerHTML = "";  // Limpia resultados previos
        let contador = 0;
    
        // Recorre el listado y muestra los alumnos que coincidan
        this.#listado_x.forEach(alumno => {
            if (patron.test(alumno.nombre)) {
                resultados.innerHTML += `<p>${alumno.nombre}</p>`;
                contador++;
            }
        });
    
        if (contador === 0) {
            resultados.innerHTML = "<p>No se encontraron alumnos</p>";
        }
    }
    
    
    /** Metodo para ver el listado completo de alumnos.
    Con un condicional se comprueba si el listado está vacío indicando que lo está y
    sino se hace un foreach con los nombres de los alumnos. */
    mostrar_listado_alumnos() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");        
        let datos = BD.recoger_datos("listado_alumnos");
        this.#listado_x = datos;
        
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>El listado está vacío</p>";
        } else {
            let listado = "<p>Listado de estudiantes:</p> <ul>";
            this.#listado_x.forEach(alumno => {
                listado += `<li>${alumno.nombre} - ID: ${alumno.id}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }


    
    /** Metodo para ver el listado de asignaturas, que es exactamente igual al anterior */
    mostrar_listado_asignaturas() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_asignaturas");
        if (this.#listado_x.length === 0) {
            document.getElementById("mostrar_resultados").innerHTML = "<p>El listado está vacío</p>";
            
        } else {
            let listado = "<p>Listado de asignaturas:</p> <ul>";
            this.#listado_x.forEach(asignatura => { listado += `<li>${asignatura.nombre}</li>`; });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    
    /** Metodo para ver las matriculaciones.
    Es parecido a los anteriores, pero se recorre la lista con un bucle for para ir indicandole en cada
    posicion lo que busca */
    mostrar_matriculaciones() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_matriculas");
        this.#listado_x = datos;
    
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>Listado de matriculaciones vacío</p>";
        } else {
            let listado = "<p>Listado de matriculaciones: </p> <ul>";
            this.#listado_x.forEach(matricula => {
                listado += `<li>- ID: ${matricula.estudiante.id} -Alumno: ${matricula.estudiante.nombre} - Asignatura: ${matricula.asignatura.nombre} - Fecha matriculación: ${matricula.fecha}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    
    /** Metodo para ver las desmatriculaciones. Es igual al anterior, pero solo busca en la lista de desmatriculaciones. */
    mostrar_desmatriculaciones() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_desmatriculaciones");
        this.#listado_x = datos;
    
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>Listado de desmatriculaciones vacío</p>";
        } else {
            let listado = "<p>Listado de desmatriculaciones: </p> <ul>";
            this.#listado_x.forEach(desmatriculacion => {
                listado += `<li>Alumno: ${desmatriculacion.estudiante.nombre} - Asignatura: ${desmatriculacion.asignatura.nombre} - Fecha matriculación: ${desmatriculacion.fecha_inicio} - Fecha desmatriculación: ${desmatriculacion.fecha_fin}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }


    
    /**
     * Metodo para matricular a un alumno a un listado de matriculaciones.
    
    El método usa la id del alumno, el nombre a la asignarura, y los listados de alumnos y asignaturas para comprobar
    que tanto la id como el alumno estén previamente en los listados.
    
    Para comprobar esto se hace 3 condicionales para buscarlos dentro de un bucle for en sus listados correspodientes
    , si están se añade un valor a un indice o se incrementa un contador. Si los 2 indices no se modifican en los condicionales y
    el contador no se mantiene como se indica se le indica al usuario y se acaba el metodo. Si se han encontrado en un listado de matriculaciones se añaden ambos
     objetos junto con la fecha de matriculacion en formato europeo dia-mes-año y una copia por referencia de las calificaciones
     *
     * @param {string} id id del alumno a matricular 
     * @param {string} asignatura_nombre  nombre de la asignatura a matricular
     * @param {object} listado_alumnos  nombre del listado de alumnos para comprobar
     * @param {object} listado_asignaturas nombre del listado de asignaturas para comprobar
     */
     matricular_alumno_asignatura(id, asignatura_nombre) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_alumnos = BD.recoger_datos("listado_alumnos") || [];
        const listado_asignaturas = BD.recoger_datos("listado_asignaturas") || [];
        let listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
    
        let alumno = listado_alumnos.find(al => al.id === id);
        let asignatura = listado_asignaturas.find(asig => asig.nombre === asignatura_nombre);
    
        let fecha_matriculacion = new Date().toLocaleDateString('es-ES');
    
        // Verificar si el alumno ya está matriculado en la asignatura
        let ya_matriculado = listado_matriculas.some(matricula => 
            matricula.estudiante.id === id && matricula.asignatura.nombre === asignatura_nombre
        );
    
        if (!alumno || !asignatura || ya_matriculado) {
            mostrar_Resultados.innerHTML = `
                <p>Error: El alumno o la asignatura no existen, o la matrícula ya está registrada.</p>
                <button id="volver">Volver</button>
            `;
        } else {
            // Agregar la nueva matrícula
            listado_matriculas.push({
                estudiante: { id: alumno.id, nombre: alumno.nombre },
                asignatura: { nombre: asignatura.nombre, calificaciones: asignatura.calificaciones },
                fecha: fecha_matriculacion,
                calificaciones: [...asignatura.calificaciones]
            });
    
            // Guardar en la base de datos
            BD.guardar_datos("listado_matriculas", listado_matriculas);
    
            mostrar_Resultados.innerHTML = `
                <p>Alumno ${alumno.nombre} matriculado en ${asignatura.nombre} con éxito.</p>
                <button id="volver">Volver</button>
            `;
        }
    
        // Agregar el evento al botón "Volver"
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }
    
    

    
    /**
     * Test para comprobar dónde están los fallos en las matriculaciones si los hubiera.
    /* Consiste en un if anidado que fuerza a la salida cada vez que hay algo mal para que se vea
    todo de manera más clara a la hora de cambiar algo
    
    ACTUALIZACION 2025, No se cambia a estructuras integradas en navegador ya que el codigo funciona bien de por sí.
     *
    //  * @param {string} id id del alumno a matricular
    //  * @param {string} asignatura_nombre nombre de la asignatura a matricular
    //  * @param {object} listado_alumnos objeto listado de alumnos
    //  * @param {object} listado_asignaturas objeto listado de asignaturas
     */
    // test_matricula(id, asignatura_nombre, listado_alumnos, listado_asignaturas) {
    //     let indice_id = null;
    //     let indice_asignatura = null;
    //     let contador_matricula = 0;


    //     if (id == null || asignatura_nombre == null || listado_alumnos == null || listado_asignaturas == null) {
    //         let mensaje='<p>Alguno de los parámetros es nulo</p>';
    //         document.getElementById("mostrar_resultados").innerHTML = mensaje;
           
    //     } else {

    //         for (let i = 0; i < listado_alumnos.#listado_x.length; i++) {
    //             if (listado_alumnos.#listado_x[i].id === id) {
    //                 let mensaje='<p>Se ha encontrado el índice del alumno</p>';
    //                 document.getElementById("mostrar_resultados").innerHTML = mensaje;                   
    //                 indice_id = i;
    //                 break;
    //             }
    //             console.log('No está el id');
    //         }

    //         if (indice_id === null || listado_alumnos.#listado_x.length === 0) {
    //             console.log('No está el índice del alumno o has introducido un listado erróneo');
    //         } else {

    //             for (let i = 0; i < listado_asignaturas.#listado_x.length; i++) {
    //                 if (listado_asignaturas.#listado_x[i].nombre === asignatura_nombre) {
    //                     console.log('Se ha encontrado el índice de la asignatura');
    //                     indice_asignatura = i;
    //                     break;
    //                 }
    //             }

    //             if (indice_asignatura === null || listado_asignaturas.#listado_x.length === 0) {
    //                 console.log('No está la asignatura o bien el listado está vacío');
    //             } else {

    //                 for (let i = 0; i < this.#listado_x.length; i++) {
    //                     if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
    //                         contador_matricula++;
    //                     }
    //                 }

    //                 if (contador_matricula !== 0) {
    //                     console.log('Ya está el alumno matriculado para esa asignatura');
    //                 } else {

    //                     const fecha_ES = new Date().toLocaleDateString('es-ES');
                        
    //                         this.#listado_x.push([
    //                             listado_alumnos.#listado_x[indice_id],
    //                             listado_asignaturas.#listado_x[indice_asignatura],
    //                             fecha_ES,
    //                             [...listado_asignaturas.#listado_x[indice_asignatura].calificaciones]
    //                         ]);               

                        

    //                     let comprobar_matricula = null;

    //                     for (let i = 0; i < this.#listado_x.length; i++) {
    //                         if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
    //                             comprobar_matricula = i;
    //                         }

    //                         if (comprobar_matricula === null) {
    //                             console.log('Error al introducir el alumno en el array');
    //                         } else {
    //                             console.log('Exito al introducir el alumno al array');
    //                             this.mostrar_matriculaciones();
    //                         }

    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    
    /**
     * Metodo para desmatricular a un alumno del listado.
    Es un metodo parecido a otros anteriores para borrar elementos de listados, con la diferencia que ahora
    cuando se borra se añade a un listado de dematriculaciones en el que se añade tambien la fecha de desmatriculaciones
     *
     * @param {string} id id del alumno a desmatricular
     * @param {string} nombre_asignatura nombre de la asignatura a desmatricular 
     * @param {object} listado_desmatriculaciones objeto listado de desmatriculaciones
     */
    desmatricular_alumno_asignatura(id, nombre_asignatura, listado_desmatriculaciones) {
        let mensaje="";
        let fecha_desmatriculacion = new Date();
        let fecha_ES = fecha_desmatriculacion.toLocaleDateString('es-ES');
        let indice_para_borrar = -1;
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === nombre_asignatura) {
                listado_desmatriculaciones.#listado_x.push([this.#listado_x[i][0], this.#listado_x[i][1], this.#listado_x[i][2], fecha_ES]);
                indice_para_borrar = i;
            }
        }
        if (indice_para_borrar === -1) {
            mensaje='<p>No existe el alumno en la asignatura</p>';
            document.getElementById("mostrar_resultados").innerHTML = mensaje;
            
        } else {
            
            this.#listado_x.splice(indice_para_borrar, 1);
            mensaje='<p>Alumno desmatriculado con éxito</p>';
            document.getElementById("mostrar_resultados").innerHTML = mensaje;            
            //this.mostrar_matriculaciones();
        }
    }

      /**
       * Metodo para agregar notas individuales a los alumnos matriculados.
    Se pide al usuario el id del alumno y el nombre de la asignatura. Con un bucle for
    se busca en el listado esos parametros y se guarda en un indice. Si este indice no se encuentra y se mantiene
    como null dentro de todo el bucle for se indica al usuario y se acaba. Si lo encuentra se hacen 2 bucles, uno para pedir
    cuantas notas se van a introducir y otra para notas individuales. Si fallan cualquiera de los 2 se vuelve a pedir el número hasta
    que se meta correctamente. Las notas se controla que estén entre 0 y 10, si está todo correcto se da cada salida individiual y luego
    la salida general del bucle añadiendose al listado de matriculaciones en las notas individuales si el contador es igual al numero
    de calificaciones a introducir
       *@param {string} id id del alumno al que añadir notas
       @param {string} asignatura nombre de la asignatura a la que añadir notas        
       */
      
       agregar_notas_matricula(id, asignatura) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
    
        let indice_para_calificaciones = null;
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            if (listado_matriculas[i].estudiante.id === id && listado_matriculas[i].asignatura.nombre === asignatura) {
                indice_para_calificaciones = i;
                break;
            }
        }
    
        if (indice_para_calificaciones === null) {
            mostrar_Resultados.innerHTML = `
                <p>No existe esa asignatura o alumno en el listado de matriculaciones</p>
                <button id="volver">Volver</button>
            `;
    
            document.getElementById("volver").addEventListener("click", () => {
                mostrar_menu();
            });
    
            return;
        }
    
        // Usar la función pedir_numero para mostrar el formulario
        Funciones.pedir_numero('la nota');
    
        setTimeout(() => {
            document.getElementById("formulario_numero").addEventListener("submit", (event) => {
                event.preventDefault();
                let nota = parseInt(document.getElementById("numero").value);
    
                listado_matriculas[indice_para_calificaciones].calificaciones.push(nota);
    
                // Guardar cambios en la base de datos
                BD.guardar_datos("listado_matriculas", listado_matriculas);
    
                mostrar_Resultados.innerHTML += `
                    <p>Nota agregada con éxito.</p>
                    <button id="volver">Volver</button>
                `;
    
                document.getElementById("volver").addEventListener("click", () => {
                    mostrar_menu();
                });
            });
        }, 0);
    }
    

    
    /**
     * Test para ver si se están añadiendo notas correctamente.
    /*El test comparte la funcionalidad de agregar notas pero con la diferencia que se van guardando en un array a parte
    finalmente se comprueba si las notas coinciden con array pop en un bucle inverso (ya que pop extra la última)
    Si las notas x coindicen en posicion en los array se sabe que se ha hecho bien
     *
    //  * @param {*} id id del alumno a testear
    //  * @param {*} asignatura nombre de la asignatura a testear
    //  */
    // test_meter_notas(id, asignatura) {
    //     console.log('Prueba de funcionalidad para meter notas');
    //     let array_notas_nuevas = [];
    //     let contador = 0;
    //     let indice_para_calificaciones = null;
    //     let notas_a_introducir;
    //     let salir_principal = false;

    //     if (id === null || asignatura === null) {
    //         console.log('Uno de tus parámetros es nulo');
    //     } else {
    //         console.log('Espacio para introducir notas, como el código general');
    //         for (let i = 0; i < this.#listado_x.length; i++) {
    //             if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
    //                 indice_para_calificaciones = i;
    //             }
    //         }

    //         if (indice_para_calificaciones === null) {
    //             console.log('No está el alumno o la asignatura en el listado');
    //         } else {
    //             console.log('Comprobación de introducción de notas');
    //             do {
    //                 try {
    //                     notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
    //                     if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
    //                         console.log('Introduce un número válido de notas.');
    //                     } else {
    //                         for (let i = 0; i < notas_a_introducir; i++) {
    //                             let salir_individual = false;
    //                             do {
    //                                 try {
    //                                     let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
    //                                     if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
    //                                         console.log('La nota debe estar entre 0 y 10.');
    //                                     } else {
    //                                         array_notas_nuevas.push(nota_individual);
    //                                         this.#listado_x[indice_para_calificaciones][3].push(nota_individual);
    //                                         contador++;
    //                                         salir_individual = true;
    //                                     }
    //                                 } catch (error) {
    //                                     console.log('Formato de nota no válido. Intenta de nuevo.');
    //                                 }
    //                             } while (!salir_individual);
    //                         }
    //                         if (contador == notas_a_introducir) {
    //                             salir_principal = true;
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log('Error al introducir las calificaciones. Intenta de nuevo.');
    //                 }
    //             } while (!salir_principal);
    //         }

    //         // Comprobación de notas
    //         console.log('Espacio para comprobar notas');
    //         console.log('Notas almacenadas en el listado:', this.#listado_x[indice_para_calificaciones][3]);
    //         console.log('Notas introducidas:', array_notas_nuevas);

    //         //Se comprueban las notas comprobando reduciendo -1 ya que parte de 0
    //         for (let index = array_notas_nuevas.length - 1; index >= 0; index--) {
    //             if (this.#listado_x[indice_para_calificaciones][3].pop() === array_notas_nuevas.pop()) {
    //                 console.log('Nota correcta en la posición ' + index);
    //             } else {
    //                 console.log('Nota incorrecta en la posición ' + index);
    //             }
    //         }
    //     }
    // }




      /**
       * Metodo para filtrar las asignaturas por alumno.
    Con el id del alumno se pasa por un bucle y para cada posicion en la que esté el alumno
    se imprime el nombre de la asignatura
       *
       * @param {string} id id del alumno a filtrar 
       */
      
    listado_asignatura_por_alumno(id) {
        let listado = '<li>Listado de asignaturas por alumno:</li> <ul>';
        
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                listado += `<li>${this.#listado_x[i][1].nombre}</li>`;
                
            }
            listado += "</ul>";
        }

    }

     /**
      * Metodo para calcular el promedio de asignaturas inviduales.
    Se comprueba primero que los parametros estén dentro del listado con bucles for y se asignan valores
    a los indices. Si algo de los indices es null se acaba el metodo y se le indica al usuario que no están en el listado
    el alumno o asignatura.
    Si se encuentran se recorre con un bucle cada nota y se va sumando en un contador y luego se divide entre la longitud del array
      *
      * @param {string} id id del alumno a calcular
      * @param {string} asignatura nombre de la asignatura a calcular
      * @returns {number} devuelve el promedio de las notas de la asignatura 
      */     
    promedio_notas_indidivuales_asignatura(id, asignatura) {
        let indice_asignatura = -1;
        let suma = 0;
        let media;
        let mensaje = '';

        if (id.trim() === '' || asignatura.trim() === '') {
            mensaje = '<p>Parámetros vacíos</p>';
            document.getElementById("mostrar_resultados").innerHTML = mensaje;
            return null;
        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                    indice_asignatura = i;
                    break;
                }
            }

            if (indice_asignatura === -1) {
                mensaje = '<p>No existe ese id de alumno o la asignatura</p>';
                document.getElementById("mostrar_resultados").innerHTML = mensaje;
                return null;
            } else {
                for (let i = 0; i < this.#listado_x[indice_asignatura][3].length; i++) {
                    suma += this.#listado_x[indice_asignatura][3][i];
                }

                media = Math.round(suma / this.#listado_x[indice_asignatura][3].length);
                return media;
            }
        }
    }




     /**
      * Metodo para calcular el promedio general de un alumno en todas las asignaturas.
    Es parecido al anterior en estructura, pero con la diferencia que se van acumulando en el contador
    el promedio volviendo a la funcion anterior para luego dividirlo entre el numero hecho con un contador de asignaturas
      *
      * @param {string} id id del alumno a calcular
      * @returns {number} devuelve el promedio general del alumno
      */
     
    promedio_notas_alumno(id) {
        let suma_promedios = 0;
        let media_promedios = 0;
        let contador_asignaturas = 0;
        let mensaje = '';

        if (id.trim() === '' || id === null) {
            return null;
        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id) {
                    let promedio_asignatura = this.promedio_notas_indidivuales_asignatura(this.#listado_x[i][0].id, this.#listado_x[i][1].nombre);

                    if (promedio_asignatura !== null) {
                        suma_promedios += promedio_asignatura;
                        contador_asignaturas++;
                    }
                }
            }

            if (contador_asignaturas === 0) {
                mensaje = '<p>No se encontraron asignaturas para este alumno.</p>';
                document.getElementById("mostrar_resultados").innerHTML = mensaje;
                return null;
            } else {
                media_promedios = suma_promedios / contador_asignaturas;
                return media_promedios;
            }
        }
    }


     /**
      * Metodo para calcular el promedio por asignatura.
    Parecido a los anteriores en estructura pero se hace un doble bucle para una vez encontrado
    el indice de la asignatura se vayan guardando las calificaciones individuales de cada alumno.
      *@param {string} asignatura nombre de la asignatura a calcular
      * 
      */
     
    promedio_notas_asignatura(asignatura) {
        let suma_calificaciones = 0;
        let total_calificaciones = 0;
        let mensaje='';

        if (asignatura === null || asignatura.trim() === '') {
            mensaje='<p>Asignatura vacía</p>';
            document.getElementById("mostrar_resultados").innerHTML = mensaje;
            
        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][1].nombre === asignatura) {
                    for (let j = 0; j < this.#listado_x[i][3].length; j++) {
                        suma_calificaciones += this.#listado_x[i][3][j];
                        total_calificaciones++;
                    }
                }
            }

            if (total_calificaciones === 0) {
                mensaje='<p>No se encontraron calificaciones para la asignatura</p>';
                document.getElementById("mostrar_resultados").innerHTML = mensaje;
                
            } else {
                let promedio = Math.round(suma_calificaciones / total_calificaciones);
                mensaje=`<p>Promedio de la asignatura general ${asignatura}: ${promedio}</p>`;
                document.getElementById("mostrar_resultados").innerHTML = mensaje;
            }

        }


    }

    
    /**
     * Metodo para calcular la media de todos los alumnos.
    Parecido a los anteriores, pero con un array para guardar las id de cada alumno, ya que hay riesgo de que se repita el alumno
     *
     * @returns {number} devuelve la media general de todos los alumnos
     */
    promedio_todos_estudiantes() {
        let contador_alumnos = 0;
        let sumar_promedios = 0;
        let contador_ids = [];
        let mensaje='';

        for (let i = 0; i < this.#listado_x.length; i++) {
            let id = this.#listado_x[i][0].id;
            let promedio_alumno = this.promedio_notas_alumno(id);
            //linea test para ver si se estaba repitiendo el alumno
            // console.log(`Promedio de alumno: ${this.listado_x[i][0].nombre}` + promedio_alumno);            

            if (promedio_alumno !== null && !contador_ids.includes(id)) {
                sumar_promedios += promedio_alumno;
                contador_ids.push(this.#listado_x[i][0].id);
                contador_alumnos++;
            }
        }

        if (contador_alumnos === 0) {
            mensaje='<p>No hay alumnos en el listado</p>';
            document.getElementById("mostrar_resultados").innerHTML = mensaje;
            

        }
        let media_alumnos_general = Math.round(sumar_promedios / contador_alumnos);
        return media_alumnos_general;
    }

    
    /**
     * Metodo para mostrar todos los datos individuales del alumno en el listado.
     Cuenta con un array que va guardando las combinaciones entre asignatura e id para que no se repita
     El metodo parte de un booleano en false y entra a un bucle que va buscando los datos que interesa en el listado, ya que el alumno
     no se ha repetido se entra al bucle y marca la primera linea que indica su nombre y promedio general. Esto ya no se repetira más ya que ahora
     el valor es true. 
     
     Posteriormete se crea una combinacion de atributos y con some se comprueba está dentro del array de combinaciones, si no lo está lo incorpora
     e imprime todo lo necesario para las asignturas que sean necesarias
     *
     * @param {string} id id del alumno a reportar
     */
    reporte_alumno_individual(id) {
        let combinaciones_repetidas = [];
        let alumno_repetido = false;
        let nombre_alumno = '';
        let mensaje = '';

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                if (!alumno_repetido) {
                    alumno_repetido = true;
                    nombre_alumno = this.#listado_x[i][0].nombre;
                    mensaje += `<p>Alumno: ${nombre_alumno} || Promedio general: ${this.promedio_notas_alumno(this.#listado_x[i][0].id)}</p>`;
                }

                let combinacion = [this.#listado_x[i][0].id, this.#listado_x[i][1].nombre];

                if (!combinaciones_repetidas.some(a => a[0] === combinacion[0] && a[1] === combinacion[1])) {
                    mensaje += `<p>||Asignatura: ${this.#listado_x[i][1].nombre} || Calificaciones : ${this.#listado_x[i][3]} || Promedio : ${this.promedio_notas_indidivuales_asignatura(this.#listado_x[i][0].id, this.#listado_x[i][1].nombre)} || Fecha matriculacion : ${this.#listado_x[i][2]}</p>`;
                    combinaciones_repetidas.push(combinacion);
                }
            }
        }

        if (!alumno_repetido) {
            mensaje = '<p>No se ha encontrado el alumno</p>';
        }

        document.getElementById("mostrar_resultados").innerHTML = mensaje;
    }

     /**
      * Metodo para reporte general de alumnos, para que no haya problemas con el anterior, ya que se llama para cada id,
    se crea un array con los id repetidos, ya que sino le puede pasar el mismo id y que se imprima x veces
      *
      *  
      */
     
    mostrar_reporte_total() {
        console.log('reporte total');

        let ids_repetido = [];

        for (let i = 0; i < this.#listado_x.length; i++) {
            let id = this.#listado_x[i][0].id;
            if (!ids_repetido.includes(id)) {
                this.reporte_alumno_individual(id);
                ids_repetido.push(id);
            }
        }
    }


    agregar_asignatura_listado(asignatura) {
    const mostrar_Resultados = document.getElementById("mostrar_resultados");

    if (this.#listado_x.some(a => a.nombre === asignatura.nombre)) {
        mostrar_Resultados.innerHTML = `
            <p>La asignatura ya está en el listado</p>
            <button id="volver">Volver</button>
        `;
    } else {
        this.#listado_x.push(asignatura);
        BD.guardar_datos("listado_asignaturas", this.#listado_x.map(asig => ({
            nombre: asig.nombre,
            calificaciones: asig.calificaciones
        })));

        mostrar_Resultados.innerHTML = `
            <p>Asignatura agregada: ${asignatura.nombre}</p>
            <button id="volver">Volver</button>
        `;
    }

    // Agregar el listener después de insertar el botón en el DOM
    document.getElementById("volver").addEventListener("click", () => {
        mostrar_menu();
    });
}

}


export default Listados;