import Asignatura from "./Asignaturas.js";
import Estudiante from './Estudiantes.js';

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
    agregar_alumno_listado(alumno) {
        if (this.#listado_x.some(a => a.id === alumno.id)) {
            console.log("El alumno ya está en el listado");
        } else {
            this.#listado_x.push(alumno);
            console.log('Alumno agregado: ' + alumno.nombre);

            //Se deja comentado ya que no se ha explicado el método, pero en resumen muestra el listado de alumnos.
            // this.mostrar_listado_alumnos();
        }
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
    eliminar_alumno_listado(id, lista_matricula) {
        let indice_para_borrar = -1;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i].id === id) {
                indice_para_borrar = i;
            }
        }

        if (indice_para_borrar === -1) {
            console.log('No existe el alumno en el listado');
        } else {
            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Alumno borrado con éxito');

            for (let i = lista_matricula.#listado_x.length - 1; i >= 0; i--) {
                if (lista_matricula.#listado_x[i][0].id === id) {
                    lista_matricula.#listado_x.splice(i, 1);
                }
            }
        }
    }




     /**
      * Metodo para añadir asignaturas al listado, es una copia de agregar_alumno_listado, pero cambiando
        lo que se busca 
      *@param {object} asignatura objeto de tipo Asignatura      *
      */
     
    agregar_asignatura_listado(asignatura) {
        if (this.#listado_x.some(a => a.nombre === asignatura.nombre)) {
            console.log("La asignatura ya está en el listado");
        } else {
            this.#listado_x.push(asignatura);
            console.log('Asignatura agregada: ' + asignatura.nombre);
            this.mostrar_listado_asignaturas();
        }
    }

     /**
      * Metodo para borrar asignaturas de un listado, es igual que el de eliminar alumnos del listado
      *@param {string} asignatura nombre de la asignatura a eliminar
      * @param {object} lista_matriculas objeto listado de matriculaciones
      */     
    eliminar_asignatura_listado(asignatura, lista_matriculas) {
        let indice_para_borrar = -1;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i].nombre === asignatura) {
                indice_para_borrar = i;
            }
        }

        if (indice_para_borrar === -1) {
            console.log('No existe esa asignatura en el listado');
        } else {
            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Asignatura con éxito');

            for (let i = lista_matriculas.#listado_x.length - 1; i >= 0; i--) {
                if (lista_matriculas.#listado_x[i][1].nombre === asignatura) {
                    lista_matriculas.#listado_x.splice(i, 1);
                }
            }
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
        let contador = 0;
        let buscar = new RegExp(busqueda, 'i');
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            console.log('El listado de asignaturas está vacío o no has escrito bien la cadena');
        } else {
            this.#listado_x.forEach(a => {
                if (buscar.test(a.nombre)) {
                    console.log('Asignatura encontrada: ' + a.nombre);
                    contador++;
                }
            });
            if (contador === 0) {
                console.log('No existe esa asignatura en el listado');
            }
        }
    }

    
    /**
     * Metodo exacatamente igual que el anterior, pero buscandolo para alumnos
     *
     * @param {string} busqueda cadena a buscar 
     */
    buscar_alumnos(busqueda) {
        let contador = 0;
        let buscar = new RegExp(busqueda, 'i');
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            console.log('El listado de alumnos está vacío o no has escrito bien la cadena');
        } else {
            this.#listado_x.forEach(a => {
                if (buscar.test(a.nombre)) {
                    console.log('Alumno encontrado: ' + a.nombre);
                    contador++;
                }
            });
            if (contador === 0) {
                console.log('No existe ese alumno en el listado');
            }
        }
    }


    
    /** Metodo para ver el listado completo de alumnos.
    Con un condicional se comprueba si el listado está vacío indicando que lo está y
    sino se hace un foreach con los nombres de los alumnos. */
    mostrar_listado_alumnos() {
        if (this.#listado_x.length === 0) {
            console.log("El listado está vacío");
        } else {
            console.log('Listado de estudiantes : ');
            this.#listado_x.forEach(alumno => console.log(alumno.nombre + '  id:' + alumno.id));
        }
    }

    
    /** Metodo para ver el listado de asignaturas, que es exactamente igual al anterior */
    mostrar_listado_asignaturas() {
        if (this.#listado_x.length === 0) {
            console.log("El listado está vacío");
        } else {
            console.log('Listado de asignaturas : ');
            this.#listado_x.forEach(asignatura => console.log(asignatura.nombre));
        }
    }

    
    /** Metodo para ver las matriculaciones.
    Es parecido a los anteriores, pero se recorre la lista con un bucle for para ir indicandole en cada
    posicion lo que busca */
    mostrar_matriculaciones() {

        if (this.#listado_x.length == 0) {
            console.log('Listado de matriculaciones vacio');

        } else {
            console.log('Listado de matriculaciones: ')
            for (let i = 0; i < this.#listado_x.length; i++) {
                console.log(`||Alumno : ${this.#listado_x[i][0].nombre} || Asignatura : ${this.#listado_x[i][1].nombre} || Fecha_matricula : ${this.#listado_x[i][2]}`);

            }
        }

    };

    
    /** Metodo para ver las desmatriculaciones. Es igual al anterior, pero solo busca en la lista de desmatriculaciones. */
    mostrar_desmatriculaciones() {
        if (this.#listado_x.length == 0) {
            console.log('Listado de desmatriculaciones vacio');

        } else {
            console.log('Listado de desmatriculaciones: ')
            for (let i = 0; i < this.#listado_x.length; i++) {
                console.log(`||Alumno : ${this.#listado_x[i][0].nombre} || Asignatura : ${this.#listado_x[i][1].nombre} || Fecha_matricula : ${this.#listado_x[i][2]} || Fecha_desmatricula : ${this.#listado_x[i][3]}`);

            }
        }
    };


    
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
    matricular_alumno_asignatura(id, asignatura_nombre, listado_alumnos, listado_asignaturas) {
        let indice_alumno = null;
        let indice_asignatura = null;
        //Se pone un contador para ver si está ya matriculado, ya que con indice es menos práctico.
        let contador_matricula = 0;
        let fecha_matriculacion = new Date();
        let fecha_ES = fecha_matriculacion.toLocaleDateString('es-ES');
        for (let i = 0; i < listado_alumnos.#listado_x.length; i++) {
            if (listado_alumnos.#listado_x[i].id === id) {
                indice_alumno = i;

                //Estas linea están a modo test para comprobar si habia fallos en su implementación
                //console.log('Exito para lista alumno');
            }
            //console.log('No está el alumno aquí');

        }

        for (let i = 0; i < listado_asignaturas.#listado_x.length; i++) {
            if (listado_asignaturas.#listado_x[i].nombre === asignatura_nombre) {
                indice_asignatura = i;
                //console.log('exito para lista asignatura');
            }
            //console.log('No está la asignatura aquí');

        }

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                contador_matricula++;
                //console.log('Esta en matricula ya');

            }
        }

        if (indice_alumno === null || indice_asignatura === null || contador_matricula !== 0) {
            console.log('Hay algun alumno o asignatura fuera de los listados o bien la matricula ya está hecha para ese alumno y asignatura');

        } else {
            this.#listado_x.push([listado_alumnos.#listado_x[indice_alumno], listado_asignaturas.#listado_x[indice_asignatura], fecha_ES, [...listado_asignaturas.#listado_x[indice_asignatura].calificaciones]]);
            //this.mostrar_matriculaciones();
        }


        //Codigo original para hacerlo por objeto.
        // if (!listado_asignaturas.listado_x.some(a => a._nombre === asignatura._nombre) ||
        //     !listado_alumnos.listado_x.some(a => a.id === alumno.id)) {
        //     console.log("La asignatura o alumno no está en el listado");
        // } else {
        //     this.listado_x.push([alumno, asignatura, fecha_ES]);
        //     console.log('Matriculado con éxito');
        //     this.mostrar_matriculaciones();
        // }
    }

    
    /**
     * Test para comprobar dónde están los fallos en las matriculaciones si los hubiera.
    /* Consiste en un if anidado que fuerza a la salida cada vez que hay algo mal para que se vea
    todo de manera más clara a la hora de cambiar algo.
     *
     * @param {string} id id del alumno a matricular
     * @param {string} asignatura_nombre nombre de la asignatura a matricular
     * @param {object} listado_alumnos objeto listado de alumnos
     * @param {object} listado_asignaturas objeto listado de asignaturas
     */
    test_matricula(id, asignatura_nombre, listado_alumnos, listado_asignaturas) {
        let indice_id = null;
        let indice_asignatura = null;
        let contador_matricula = 0;


        if (id == null || asignatura_nombre == null || listado_alumnos == null || listado_asignaturas == null) {
            console.log('Alguno de los parámetros es nulo');
        } else {

            for (let i = 0; i < listado_alumnos.#listado_x.length; i++) {
                if (listado_alumnos.#listado_x[i].id === id) {
                    console.log('Se ha encontrado el índice del alumno');
                    indice_id = i;
                    break;
                }
                console.log('No está el id');
            }

            if (indice_id === null || listado_alumnos.#listado_x.length === 0) {
                console.log('No está el índice del alumno o has introducido un listado erróneo');
            } else {

                for (let i = 0; i < listado_asignaturas.#listado_x.length; i++) {
                    if (listado_asignaturas.#listado_x[i].nombre === asignatura_nombre) {
                        console.log('Se ha encontrado el índice de la asignatura');
                        indice_asignatura = i;
                        break;
                    }
                }

                if (indice_asignatura === null || listado_asignaturas.#listado_x.length === 0) {
                    console.log('No está la asignatura o bien el listado está vacío');
                } else {

                    for (let i = 0; i < this.#listado_x.length; i++) {
                        if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                            contador_matricula++;
                        }
                    }

                    if (contador_matricula !== 0) {
                        console.log('Ya está el alumno matriculado para esa asignatura');
                    } else {

                        const fecha_ES = new Date().toLocaleDateString('es-ES');
                        
                            this.#listado_x.push([
                                listado_alumnos.#listado_x[indice_id],
                                listado_asignaturas.#listado_x[indice_asignatura],
                                fecha_ES,
                                [...listado_asignaturas.#listado_x[indice_asignatura].calificaciones]
                            ]);               

                        

                        let comprobar_matricula = null;

                        for (let i = 0; i < this.#listado_x.length; i++) {
                            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                                comprobar_matricula = i;
                            }

                            if (comprobar_matricula === null) {
                                console.log('Error al introducir el alumno en el array');
                            } else {
                                console.log('Exito al introducir el alumno al array');
                                this.mostrar_matriculaciones();
                            }

                        }
                    }
                }
            }
        }
    }

    
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
            console.log('No existe el alumno en la asignatura');
        } else {

            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Alumno desmatriculado con éxito');
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
        let contador = 0;
        let indice_para_calificaciones = null;
        let notas_a_introducir;
        let salir_principal = false;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                indice_para_calificaciones = i;
                do {
                    try {
                        notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
                        if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
                            console.log('Introduce un número válido de notas.');
                        }

                        for (let i = 0; i < notas_a_introducir; i++) {
                            let salir_individual = false;

                            do {
                                try {
                                    let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
                                    if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
                                        console.log('La nota debe estar entre 0 y 10.');
                                    } else {
                                        this.#listado_x[indice_para_calificaciones][3].push(nota_individual);
                                        contador++;
                                        salir_individual = true;
                                    }
                                } catch (error) {
                                    console.log('Formato de nota no válido. Intenta de nuevo.');
                                }
                            } while (!salir_individual);
                            if (contador == notas_a_introducir) {
                                salir_principal = true;
                            }

                        }


                    } catch (error) {
                        console.log('Error al introducir las calificaciones. Intenta de nuevo.');
                    }
                } while (!salir_principal);
            }
        }

        if (indice_para_calificaciones == null) {
            console.log('no existe esa asignatura o alumno en el listado de matriculaciones');
        }
    }

    
    /**
     * Test para ver si se están añadiendo notas correctamente.
    /*El test comparte la funcionalidad de agregar notas pero con la diferencia que se van guardando en un array a parte
    finalmente se comprueba si las notas coinciden con array pop en un bucle inverso (ya que pop extra la última)
    Si las notas x coindicen en posicion en los array se sabe que se ha hecho bien
     *
     * @param {*} id id del alumno a testear
     * @param {*} asignatura nombre de la asignatura a testear
     */
    test_meter_notas(id, asignatura) {
        console.log('Prueba de funcionalidad para meter notas');
        let array_notas_nuevas = [];
        let contador = 0;
        let indice_para_calificaciones = null;
        let notas_a_introducir;
        let salir_principal = false;

        if (id === null || asignatura === null) {
            console.log('Uno de tus parámetros es nulo');
        } else {
            console.log('Espacio para introducir notas, como el código general');
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                    indice_para_calificaciones = i;
                }
            }

            if (indice_para_calificaciones === null) {
                console.log('No está el alumno o la asignatura en el listado');
            } else {
                console.log('Comprobación de introducción de notas');
                do {
                    try {
                        notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
                        if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
                            console.log('Introduce un número válido de notas.');
                        } else {
                            for (let i = 0; i < notas_a_introducir; i++) {
                                let salir_individual = false;
                                do {
                                    try {
                                        let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
                                        if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
                                            console.log('La nota debe estar entre 0 y 10.');
                                        } else {
                                            array_notas_nuevas.push(nota_individual);
                                            this.#listado_x[indice_para_calificaciones][3].push(nota_individual);
                                            contador++;
                                            salir_individual = true;
                                        }
                                    } catch (error) {
                                        console.log('Formato de nota no válido. Intenta de nuevo.');
                                    }
                                } while (!salir_individual);
                            }
                            if (contador == notas_a_introducir) {
                                salir_principal = true;
                            }
                        }
                    } catch (error) {
                        console.log('Error al introducir las calificaciones. Intenta de nuevo.');
                    }
                } while (!salir_principal);
            }

            // Comprobación de notas
            console.log('Espacio para comprobar notas');
            console.log('Notas almacenadas en el listado:', this.#listado_x[indice_para_calificaciones][3]);
            console.log('Notas introducidas:', array_notas_nuevas);

            //Se comprueban las notas comprobando reduciendo -1 ya que parte de 0
            for (let index = array_notas_nuevas.length - 1; index >= 0; index--) {
                if (this.#listado_x[indice_para_calificaciones][3].pop() === array_notas_nuevas.pop()) {
                    console.log('Nota correcta en la posición ' + index);
                } else {
                    console.log('Nota incorrecta en la posición ' + index);
                }
            }
        }
    }




      /**
       * Metodo para filtrar las asignaturas por alumno.
    Con el id del alumno se pasa por un bucle y para cada posicion en la que esté el alumno
    se imprime el nombre de la asignatura
       *
       * @param {string} id id del alumno a filtrar 
       */
      
    listado_asignatura_por_alumno(id) {
        console.log('Listado de asignaturas por alumno: ');
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                console.log(this.#listado_x[i][1].nombre);
            }
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


        if (id.trim() === '' || asignatura.trim() === '') {
            console.log('Parámetros vacíos');
            return null;
        } else {

            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                    indice_asignatura = i;
                    //aunque no se recomiende break, por dejarlo de otra manera hecha´.
                    break;
                }
            }

            if (indice_asignatura === -1) {
                console.log('No existe ese id de alumno o la asignatura');
                return null;
            } else {
                // Aquí se va sumando según indice
                for (let i = 0; i < this.#listado_x[indice_asignatura][3].length; i++) {
                    suma += this.#listado_x[indice_asignatura][3][i];
                }

                // Aquí se ve el promedio
                media = Math.round(suma / this.#listado_x[indice_asignatura][3].length);

                // Estos mensajes comentados sirven para adornar la salida, pero no termina de funcionar para la media general.
                // const mensaje = `Promedio de notas para ${id} en la asignatura ${asignatura}: ${media}`;
                // console.log(mensaje);
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


        if (id.trim === '' || id === null) {

        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {

                if (this.#listado_x[i][0].id === id) {

                    let promedio_asignatura = this.promedio_notas_indidivuales_asignatura(
                        this.#listado_x[i][0].id,
                        this.#listado_x[i][1].nombre
                    );

                    if (promedio_asignatura !== null) {
                        suma_promedios += promedio_asignatura;
                        contador_asignaturas++;
                    }
                }
            }

            if (contador_asignaturas === 0) {
                console.log("No se encontraron asignaturas para este alumno.");
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

        if (asignatura === null || asignatura.trim() === '') {
            console.log('asignatura vacia');
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
                console.log("No se encontraron calificaciones para la asignatura:", asignatura);
            } else {
                let promedio = Math.round(suma_calificaciones / total_calificaciones);

                console.log(`Promedio de la asignatura general ${asignatura}: ` + promedio);
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
            console.log('No hay alumnos en el listado');

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

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                if (!alumno_repetido) {
                    alumno_repetido = true;
                    nombre_alumno = this.#listado_x[i][0].nombre;
                    console.log('Alumno  : ' + nombre_alumno + ' || Promedio general: ' + this.promedio_notas_alumno(this.#listado_x[i][0].id));
                }

                //Esto se puede declarar al principio, pero por hacerlo distinto.
                let combinacion = [this.#listado_x[i][0].id, this.#listado_x[i][1].nombre];

                // Imprimir solo si la combinación no está en el array.
                if (!combinaciones_repetidas.some(a => a[0] === combinacion[0] && a[1] === combinacion[1])) {
                    console.log('|| Asignatura: ' + this.#listado_x[i][1].nombre +
                        ' || Calificaciones : ' + this.#listado_x[i][3] +
                        ' || Promedio : ' + this.promedio_notas_indidivuales_asignatura(this.#listado_x[i][0].id, this.#listado_x[i][1].nombre) +
                        ' || Fecha  matriculacion : ' + this.#listado_x[i][2]);
                    combinaciones_repetidas.push(combinacion);
                }
            }
        }

        if (!alumno_repetido) {
            console.log('Error, no se ha encontrado el alumno.');
        }
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
}

export default Listados;