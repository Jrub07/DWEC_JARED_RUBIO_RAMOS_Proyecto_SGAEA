import BD from './BD.js';
import Estudiante from './Estudiantes.js';
import Direccion from './Direccion.js';
import Asignaturas from './Asignaturas.js';
import Listados from './Listados.js';
import errorPersonalizado from './errorPersonalizado.js';
import Funciones from './Funciones.js';

BD.init();

const listado_alumnos = new Listados(BD.recoger_datos("listado_alumnos"));
const listado_asignaturas = new Listados(BD.recoger_datos("listado_asignaturas"));
const listado_matriculas = new Listados(BD.recoger_datos("listado_matriculas"));
const listado_desmatriculaciones = new Listados(BD.recoger_datos("listado_desmatriculaciones"));


document.getElementById('ejecutar').addEventListener('click', () => {
    document.getElementById('ejecutar').style.display = 'none';
    mostrar_menu();
});

function mostrar_menu() {
    const mostrar_Resultados = document.getElementById("mostrar_resultados");
    mostrar_Resultados.innerHTML = `
        <p>Bienvenido al programa de gestión de alumnos.</p>
        <p>Escribe una opción del menú:</p>
        <ul>
            <li>1- Ver listado de alumnos</li>
            <li>2- Ver listado de asignaturas</li>
            <li>3- Ver listado de matriculaciones</li>
            <li>4- Ver listado de desmatriculaciones</li>
            <li>5- Buscar un alumno por texto</li>
            <li>6- Agregar un alumno al listado</li>
            <li>7- Eliminar un alumno del listado</li>
            <li>8- Buscar una asignatura por texto</li>
            <li>9- Agregar una asignatura al listado</li>
            <li>10- Eliminar una asignatura del listado</li>
            <li>11- Matricular a un alumno en una asignatura</li>
            <li>12- Desmatricular a un alumno de una asignatura</li>
            <li>13- Agregar notas a un estudiante</li>
            <li>14- Consultar promedio de un alumno general</li>
            <li>15- Consultar promedio de un alumno por asignatura</li>
            <li>16- Consultar promedio de una asignatura</li>
            <li>17- Consultar promedio general de alumnos</li>
            <li>18- Consultar reporte general</li>
        </ul>

        <!-- Formulario -->
        <form id="formulario_main">
            <input type="number" id="opcion_menu" name="opcion_menu" placeholder="Ingresa una opción entre 0 y 18" required min="0" max="18">
            <button type="submit">Enviar</button>
        </form>
    `;

    document.getElementById("formulario_main").addEventListener("submit", function(event) {
        event.preventDefault();        
        opcion_seleccionada(); 
    });
}

function opcion_seleccionada() {
    const opcion_menu = parseInt(document.getElementById("opcion_menu").value);
    const mostrar_Resultados = document.getElementById("mostrar_resultados");

    switch (opcion_menu) {
        case 0:
            mostrar_Resultados.innerHTML = `<p>Hasta la próxima.</p>`;
            break;
        case 1:
            mostrar_Resultados.innerHTML = `<p>Ver listado de alumnos.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            break;
        case 2:
            mostrar_Resultados.innerHTML = `<p>Ver listado de asignaturas.</p>`;
            listado_asignaturas.mostrar_listado_asignaturas();
            break;
        case 3:
            mostrar_Resultados.innerHTML = `<p>Ver listado de matriculaciones.</p>`;
            listado_matriculas.mostrar_matriculaciones();
            break;
        case 4:
            mostrar_Resultados.innerHTML = `<p>Ver listado de desmatriculaciones.</p>`;
            listado_desmatriculaciones.mostrar_desmatriculaciones();
            break;
        case 5:
            mostrar_Resultados.innerHTML = `<p>Buscar un alumno por texto.</p>`;
            Funciones.pedir_string('alumno a buscar');                
            setTimeout(() => {
                const formulario = document.getElementById("formulario_texto");
                if (formulario) {
                    formulario.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const busqueda = document.getElementById("texto").value.trim();
                        listado_alumnos.buscar_alumno(busqueda);
                    });
                }
            }, 0);
            break;
        case 6:
            listado_alumnos.mostrar_listado_alumnos();                      
            mostrar_Resultados.innerHTML+=
                   `<p>Agregar un alumno al listado.</p>
                    <form id="formulario_alumno">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id" required>
                    <label for="calle">Calle:</label>
                    <input type="text" id="calle" name="calle" required>
                    <label for="numero">Número:</label>
                    <input type="text" id="numero" name="numero" required>
                    <label for="piso">Piso:</label>
                    <input type="text" id="piso" name="piso" required>
                    <label for="codigo_postal">Código Postal:</label>
                    <input type="text" id="codigo_postal" name="codigo_postal" required>
                    <label for="provincia">Provincia:</label>
                    <input type="text" id="provincia" name="provincia" required>
                    <label for="localidad">Localidad:</label>
                    <input type="text" id="localidad" name="localidad" required>
                    <button type="submit">Agregar alumno</button>
                </form>`;
            
            setTimeout(() => {
                const formulario = document.getElementById("formulario_alumno");
                if (formulario) {
                    formulario.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const nombre = document.getElementById("nombre").value.trim();
                        const id = document.getElementById("id").value.trim();
                        const calle = document.getElementById("calle").value.trim();
                        const numero = document.getElementById("numero").value.trim();
                        const piso = document.getElementById("piso").value.trim();
                        const codigo_postal = document.getElementById("codigo_postal").value.trim();
                        const provincia = document.getElementById("provincia").value.trim();
                        const localidad = document.getElementById("localidad").value.trim();
                        
                        const estudiante_nuevo = new Estudiante(id, nombre, new Direccion(calle, numero, piso, codigo_postal, provincia, localidad));
                        estudiante_nuevo.validar_cadenas(nombre);
                        listado_alumnos.agregar_alumno_listado(estudiante_nuevo);
                    });
                }
            }, 0);
            break;

            // PENDIENTE DE ARREGLAR
            case 7:            
                listado_alumnos.mostrar_listado_alumnos();                
                mostrar_Resultados.innerHTML += `
                    <p>Eliminar un alumno del listado.</p>
                    <form id="formulario_borrar">
                        <input type="text" id="id_alumno" name="id_alumno" placeholder="ID del alumno para borrar" required>
                        <input type="submit" value="Borrar">
                    </form>`;

                setTimeout(() => {
                    const formulario = document.getElementById("formulario_borrar");
                    if (formulario) {
                        formulario.addEventListener("submit", (event) => {
                            event.preventDefault();
                            const id_alumno = document.getElementById("id_alumno").value.trim();
                            if (id_alumno) {
                                listado_alumnos.eliminar_alumno_listado(id_alumno);
                                listado_alumnos.mostrar_listado_alumnos();
                            } else {
                                mostrar_Resultados.innerHTML = "<p>Por favor, ingrese un ID válido.</p>";
                            }
                        });
                    }
                }, 0);
                break;

        
            case 8:
                mostrar_Resultados.innerHTML = `<p>Buscar una asignatura por texto.</p>`;
            
                Funciones.pedir_string('Asignatura a buscar');           
                
                setTimeout(() => {
                    const formulario = document.getElementById("formulario_texto");
                    if (formulario) {
                        formulario.addEventListener("submit", (event) => {
                            event.preventDefault();
                            const busqueda = document.getElementById("texto").value.trim();                        
                            listado_asignaturas.buscar_asignatura(busqueda);
                        });
                    }
                }, 0);
                break;          
        
            
        
        case 9:
            mostrar_Resultados.innerHTML = `<p>Agregar una asignatura al listado.</p>
            <form id="formulario_asignatura">
                <label for="nombre_asignatura">Nombre de la asignatura:</label>
                <input type="text" id="nombre_asignatura" name="nombre_asignatura" required>
                <button type="submit">Agregar asignatura</button>
                </form>`;
            
                setTimeout((event) => {
                    const formulario = document.getElementById("formulario_asignatura");
                    if (formulario) {
                        formulario.addEventListener("submit", (event) => {
                            event.preventDefault();
                            const nombre_asignatura = document.getElementById("nombre_asignatura").value.trim();
                            const asignatura_nueva = new Asignaturas(nombre_asignatura, null);
                            asignatura_nueva.validar_cadena_asignatura(nombre_asignatura);
                            listado_asignaturas.agregar_asignatura_listado(asignatura_nueva);
                        });
                    }
                }, 0);
           
            break;
        // PENDIENTE DE ARREGLAR
        case 10:
            mostrar_Resultados.innerHTML = `<p>Eliminar una asignatura del listado.</p>`;
            let nombre_asignatura_borrar = Funciones.pedir_string('nombre de la asignatura para borrar');
            listado_asignaturas.eliminar_asignatura_listado(nombre_asignatura_borrar, listado_matriculas);
            break;

        case 11:            
            mostrar_Resultados.innerHTML = `<p>Matricular un alumno en una asignatura.</p>
                <form id="formulario_matricular">
                    <label for="id_alumno">ID del alumno:</label>
                    <input type="text" id="id_alumno" name="id_alumno" required>
                    <label for="asignatura_nombre">Nombre de la asignatura:</label>
                    <input type="text" id="asignatura_nombre" name="asignatura_nombre" required>
                    <button type="submit">Matricular</button>
                </form>`;
            
            setTimeout(() => {
                const formulario = document.getElementById("formulario_matricular");
                if (formulario) {
                    formulario.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const id_alumno = document.getElementById("id_alumno").value.trim();
                        const asignatura_nombre = document.getElementById("asignatura_nombre").value.trim();
                        
                        // Llamamos a la función para matricular al alumno
                        listado_matriculas.matricular_alumno_asignatura(id_alumno, asignatura_nombre);
                    });
                }
            }, 0);
            break;
        
            //PENDIENTE
        case 12:
            mostrar_Resultados.innerHTML = `<p>Desmatricular un alumno de una asignatura.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let id_alumno_borrar = Funciones.pedir_string('ID del alumno para desmatricular');
            let asignatura_nombre_borrar = Funciones.pedir_string('Nombre de la asignatura para desmatricular');
            listado_matriculas.desmatricular_alumno_asignatura(id_alumno_borrar, asignatura_nombre_borrar, listado_desmatriculaciones);
            break;

        case 13:            
            listado_matriculas.mostrar_matriculaciones();                       
            mostrar_Resultados.innerHTML += `
                <p>Agregar notas a un estudiante.</p>
                <form id="formulario_notas">
                    <label for="id_alumno">ID del alumno:</label>
                    <input type="text" id="id_alumno" name="id_alumno" required>
                    <label for="asignatura_nombre">Nombre de la asignatura:</label>
                    <input type="text" id="asignatura_nombre" name="asignatura_nombre" required>
                    <label for="notas">Notas:</label>
                    <input type="text" id="notas" name="notas" min="0" max="10" required>
                    <button type="submit">Agregar nota</button>
                </form>`;

            setTimeout(() => {
                const formulario = document.getElementById("formulario_notas");
                if (formulario) {
                    formulario.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const id_alumno = document.getElementById("id_alumno").value.trim();
                        const asignatura_nombre = document.getElementById("asignatura_nombre").value.trim();
                        const notas = document.getElementById("notas").value.trim();

                        listado_matriculas.agregar_notas_matricula(id_alumno, asignatura_nombre, notas);
                    });
                }
            }, 0);
            break;


        case 14:
            mostrar_Resultados.innerHTML = `<p>Consultar promedio de un alumno general.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let consultar_alumno_general = Funciones.pedir_string('ID del alumno para consultar promedio general');
            listado_matriculas.promedio_notas_alumno(consultar_alumno_general);
            break;
        case 15:
            mostrar_Resultados.innerHTML = `<p>Consultar promedio de un alumno por asignatura.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let consultar_alumno = Funciones.pedir_string('ID del alumno para consultar promedio por asignatura');
            let consultar_asignatura = Funciones.pedir_string('Nombre de la asignatura para la que ver promedio');
            let ver_promedio = listado_matriculas.promedio_notas_indidivuales_asignatura(consultar_alumno, consultar_asignatura);
            if (ver_promedio != null) {
                mostrar_Resultados.innerHTML += `<p>Promedio para ${consultar_asignatura} es igual a: ${ver_promedio}</p>`;
            }
            break;
        case 16:
            mostrar_Resultados.innerHTML = `<p>Consultar promedio de una asignatura.</p>`;
            listado_asignaturas.mostrar_listado_asignaturas();
            let promedio_asignatura = Funciones.pedir_string('Nombre de la asignatura para consultar promedio de alumnos');
            listado_matriculas.promedio_notas_asignatura(promedio_asignatura);
            break;
        case 17:
            mostrar_Resultados.innerHTML = `<p>Consultar promedio general de alumnos.</p>`;
            mostrar_Resultados.innerHTML += `<p>Promedio general de estudiantes: ${listado_matriculas.promedio_todos_estudiantes()}</p>`;
            break;
        case 18:
            mostrar_Resultados.innerHTML = `<p>Consultar reporte general.</p>`;
            listado_matriculas.mostrar_reporte_total();
            break;
        default:
            mostrar_Resultados.innerHTML = `<p>No existe esa opción del menú.</p>`;
            break;
    }

    mostrar_Resultados.innerHTML += `<button id="boton_volver">Volver</button>`;
    document.getElementById('boton_volver').addEventListener('click', () => {
        mostrar_menu();
    });
}

window.mostrar_menu = mostrar_menu;