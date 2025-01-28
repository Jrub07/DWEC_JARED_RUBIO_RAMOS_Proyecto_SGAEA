import Usuarios from './Usuarios.js';

class Estudiante extends Usuarios {
    #direccion;

    
    /**
     * Clase  Estudiante que hereda de Usuarios
     *
     * @constructor
     * @param {string} id id del estudiante
     * @param {string} nombre nombre del estudiante
     * @param {string} direccion direccion del estudiante
     * @extends Usuarios clase de donde se hereda
     */
    constructor(id, nombre, direccion) {
        super(id, nombre);
        this.#direccion = direccion;
    }

     /**
      * Metodo override para comprobar las cadenas de texto para el nombre. 
    Se crea una expresion regular para comprobar el nombre para que solo tenga espacios y letras
    Si está bien se deja el nombre como está, pero si no lo está se le pide al usuario una cadena correcta
    hasta que la escriba bien

      *@param {string} cadena La cadena a comprobar
      * @returns {string} La cadena correcta
      */
     
    validar_cadenas(cadena) {
        super.validar_cadenas();
        let comprobarCadena = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/;
        let salir = false;
        do {
            if (comprobarCadena.test(cadena)) {
                super.nombre = cadena;
                salir = true;
            } else {
                console.log("Nombre invalido. Solo se permiten letras y espacios.");
                cadena = prompt("Escriba el nombre bien. Solo puede contener letras y espacios");
            }
        } while (!salir);
        return cadena;
    }

    //setters y getters por si fuera necesario.

    
    /**
     * Set para el parametro id
     *
     * @type {string}
     */
    set id(id){
        return super.id;
    }

    
    /**
     * Set para el parametro nombre
     *
     * @type {string}
     */
    set nombre(nombre) {
        return super.nombre;
    }

    
    /**
     * Set para el parametro direccion
     *
     * @type {string}
     */
    set direccion(direccion){
        this.#direccion=direccion;
    }

    
    /** Get para el parametro id 
     * @returns {string} El identificador del estudiante
    */
    get id() {
        return super.id;
    }

    
    /** Get para el parametro nombre
     * @returns {string} El nombre del estudiante
     */
    get nombre() {
        return super.nombre;
    }

    
    /** Get para el parametro direccion
     * @returns {string} La dirección del estudiante
     */
    get direccion() {
        return this.#direccion;
    }
}

export default Estudiante;