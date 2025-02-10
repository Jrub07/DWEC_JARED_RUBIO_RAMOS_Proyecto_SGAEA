
import Direccion from './Direccion.js';


class Usuarios {
    #id;
    #nombre;
    
    /**
     * Clase Usuarios, que se usará para crear los objetos de tipo Estudiante
     *
     * @constructor
     * @param {string} id El identificador del usuario
     * @param {string} nombre El nombre del usuario
     */
    constructor(id, nombre) {
        this.#id = id;
        this.#nombre = nombre;
    }

    //setters y getters por si fueran necesarios

    
    /**
     * Set para el parametro id
     *
     * @type {string}
     */
    set id(id){
        this.#id=id;
    }

    
    /**
     * Set para el parametro nombre
     *
     * @type {string}
     */
    set nombre(nombre) {
         this.#nombre = nombre;
    }

    
    /** Get para el parametro id 
     * 
     * @returns {string} El identificador del usuario
    */
    get id() {
        return this.#id;
    }

    
    /** get para el parametro nombre
     * 
     * @returns {string} El nombre del usuario
     */
    get nombre() {
        return this.#nombre;
    }

    
    /**
     * Metodo para hacer override posteriormente en la clase Estudiante
     *
     * @param {string} cadena cadena a validar 
     */
    validar_cadenas(cadena) {
        console.log('Validando cadena...');
    }
}

export default Usuarios;