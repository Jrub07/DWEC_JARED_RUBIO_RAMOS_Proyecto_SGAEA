/**
 * Funcion para pedir texto al usuario, ya que se va a usar un menú e indicarle instrucciones al usuario de lo que tiene que escribir.
La funcion principal es ahorrar líneas de código y no escribir todo de nuevo, y corregir que no sea entrada null o espacio vacio. 
Nueva modificacion, ahora en vez de imprimir el error por console.log ahora lanza un error personalizado
 *
 * @param {string} texto texto que se le pide al usuario
 * @returns {string} devuelve la cadena de texto que ha introducido el usuario
 */
function pedir_string(texto) {
    const mostrar_Resultados = document.getElementById("mostrar_resultados");
    mostrar_Resultados.innerHTML = `
        <form id="formulario_texto" action="javascript:void(0)">
            <label for="texto">${texto}:</label>
            <input type="text" id="texto" name="texto" required>
            <button type="submit">Enviar</button>
        </form>
    `;
}



/**
 * Funcion para pedir números al usuario, principalmente usado para controlar los errores del menú en el switch.
En este metodo se pide número hasta que te de el correcto evitando tanto cadenas de texto como números negativos

Actualizado: Añadimos error personalizado al igual que el anterior
 *
 * @param {string} texto texto que se le pide al usuario
 * @returns {number} devuelve el número que ha introducido el usuario
 */
function pedir_numero(texto) {
    const mostrar_Resultados = document.getElementById("mostrar_resultados");
    mostrar_Resultados.innerHTML = `
        <form id="formulario_numero">
            <label for="numero">Introduce ${texto}:</label>
            <input type="number" id="numero" name="numero" min="0" max="10" required>
            <button type="submit">Enviar</button>
        </form>`;
}

export default { pedir_string };