
// PARA PROBAR EL CODIGO USAR LA ID 123456 y COMO ASIGNATURA LENGUA



class Direccion {  
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;
    
    /**
     * Clase base para construir una dirección que irá posteriormente en un objeto de tipo Estudiante
     *
     * @constructor
     * @param {string} calle La calle de la direccion
     * @param {string} numero El número de la dirección
     * @param {string} piso   El piso de la dirección
     * @param {string} codigoPostal El codigo postal de la dirección
     * @param {string} provincia  El nombre de la provicia
     * @param {string} localidad  El nombre de la localidad
     */
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = codigoPostal;
        this.#provincia = provincia;
        this.#localidad = localidad;
    }

    // Métodos get por si fueran necesarios en un futuro

    
    /**
     * Set del parametro calle
     *
     * @type {string}
     */
    set calle(calle){
        this.#calle=calle;
    }

    
    /**
     * Set del parametro numero
     *
     * @type {string}
     */
    set numero(numero){
        this.#numero=numero;
    }

    
    /**
     * Set para el parametro piso
     *
     * @type {string}
     */
    set piso(piso){
        this.#piso=piso;
    }

    
    /**
     * Set para el parametro codigoPostal
     *
     * @type {string}
     */
    set codigoPostal(codigo_postal){
        this.#codigoPostal=codigoPostal;
    }

    
    /**
     * Set para el parametro provincia
     *
     * @type {string}
     */
    set provincia(provincia){
        this.#provincia=provincia;
    }

    
    /**
     * Set para el parametro localidad
     *
     * @type {string}
     */
    set localidad(localidad){
        this.#localidad=localidad;
    }

    /*Metodos get */
    
    /** Get del parametro calle
     * 
     * @returns {string} La calle de la dirección
     */
    get calle() {
        return this.#calle;
    }

    
    /** Get del parametro numero
     * 
     * @returns {string} El número de la dirección
     */
    get numero() {
        return this.#numero;
    }

    
    /** Get para el parametro piso 
     * 
     * @returns {string} El piso de la dirección
    */
    get piso() {
        return this.#piso;
    }

    
    /** Get para el parametro codigoPostal 
     * 
     * @returns {string} El codigo postal de la dirección
    */
    get codigoPostal() {
        return this.#codigoPostal;
    }

    
    /** Get para el parametro provincia 
     * 
     * @returns {string} El nombre de la provincia
    */
    get provincia() {
        return this.#provincia;
    }

    
    /** Get para el parametro localidad
     * 
     * @returns {string} El nombre de la localidad
     */
    get localidad() {
        return this.#localidad;
    }
}

export default Direccion;