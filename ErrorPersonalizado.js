class errorPersonalizado extends Error{

    /**
     * Error personalizado que hereda de la clase general error para imprimir mensajes personalizados.
     *
     * @constructor
     * @param {string} mensaje mensaje de error personalizado
     */
    constructor(mensaje){
       super(mensaje);
    }
   }

   export default errorPersonalizado;