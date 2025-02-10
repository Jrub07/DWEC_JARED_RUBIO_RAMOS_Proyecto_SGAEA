class Asignaturas {
    #nombre;
    #calificaciones = [];

    /**
     * Clase asignatura, en ella se pone el nombre de la asignatura y unas calificaciones generales para esta, posteriormente se podrán
     * añadir notas individuales sin afectar a la general, pero si son añadidas aquí si el objeto es compartido afecta a varios alumnos,útil 
     * si ha habido cualquier nota conjunta
     *
     * @constructor
     * @param {string} nombre nombre de la asignatura
     * @param {array} calificaciones calificaciones generales por asignatura
     */
    constructor(nombre, calificaciones) {
        this.#nombre = nombre;
        this.#calificaciones = calificaciones;
    }

    /**
     * Set para el nombre de la asignatura
     *
     * @type {string}
     */
    set nombre(nombre) {
        this.#nombre = nombre;
    }

    /**
     * Set para las calificaciones de la asignatura
     *
     * @type {array}
     */
    set calificaciones(calificaciones) {
        this.#calificaciones = calificaciones;
    }

    /**
     * Metodo igual para el nombre de los alumnos pero ahora para comprobar la cadena de texto
     *
     * @param {string} cadena cadena a validar
     * @returns {string} cadena correcta
     */
    validar_cadena_asignatura(cadena) {
        let comprobarCadena = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/;
        let salir = false;
        do {
            if (comprobarCadena.test(cadena)) {
                super.nombre = cadena;
                salir = true;
            } else {
                console.log("Error en asignatura. Solo se permiten letras y espacios.");
                cadena = prompt("Escriba el nombre bien. Solo puede contener letras y espacios");
            }
        } while (!salir);
        return cadena;
    }

    // Metodos getter

    /** get para el nombre de la asignatura
     * @returns {string} El nombre de la asignatura
     */
    get nombre() {
        return this.#nombre;
    }

    /** Get para las calificaciones de la asignatura
     * @returns {array} Las calificaciones de la asignatura
     */
    get calificaciones() {
        return this.#calificaciones;
    }
}

export default Asignaturas;