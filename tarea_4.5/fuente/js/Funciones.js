/**
 * Funcion para pedir texto al usuario, ya que se va a usar un menú e indicarle instrucciones al usuario de lo que tiene que escribir.
La funcion principal es ahorrar líneas de código y no escribir todo de nuevo, y corregir que no sea entrada null o espacio vacio. 
Nueva modificacion, ahora en vez de imprimir el error por console.log ahora lanza un error personalizado
 *
 * @param {string} texto texto que se le pide al usuario
 * @returns {string} devuelve la cadena de texto que ha introducido el usuario
 */
function pedir_string(texto) {
     let  salir = false;
    do {
        try {
           let cadena = prompt(`Dime qué ${texto} :`);
        if (cadena === null || cadena.trim() === '') {
            throw new errorPersonalizado('Error: Has dejado la cadena vacía');
        } else {
            salir = true;
            return cadena;
        } 
        } catch (errorPersonalizado) {
            console.log(errorPersonalizado.message);            
        }       

    } while (!salir);

}


/**
 * Funcion para pedir números al usuario, principalmente usado para controlar los errores del menú en el switch.
En este metodo se pide número hasta que te de el correcto evitando tanto cadenas de texto como números negativos

Actualizado: Añadimos error personalizado al igual que el anterior
 *
 * @returns {number} devuelve el número que ha introducido el usuario
 */
function pedir_numero() {
    let salir = false;
    let numero;
    do {
        try {
            numero = parseInt(prompt('Escribe un número que no sea menor a 0:'));
            if (isNaN(numero) || numero<0) {
                throw new errorPersonalizado("Error:Has introducido un numero negativo o no valido");                
            } else {
                salir = true;
            }
        } catch (errorPersonalizado) {
            console.log(errorPersonalizado.message);
        }
    } while (!salir);
    return numero;
}

export default { pedir_string, pedir_numero };