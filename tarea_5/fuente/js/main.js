import Estudiante from './Estudiantes.js';
import Direccion from './Direccion.js';
import Asignaturas from './Asignaturas.js';
import Listados from './Listados.js';
import errorPersonalizado from './errorPersonalizado.js';
import Funciones from './Funciones.js';

const direccion_1 = new Direccion('Calle ejemplo 1', '22', '1A', '12345', 'Burgos', 'Burgos');
const estudiante_1 = new Estudiante('123456', 'Pepe Sanchez', direccion_1);
const estudiante_2 = new Estudiante('111111', 'Antonio Sanchez', direccion_1);
const estudiante_3 = new Estudiante('222222', 'Raul Sanchez', direccion_1);

const asignatura_1 = new Asignaturas('Matematicas', [5, 5, 5]);
const asignatura_2 = new Asignaturas('Lengua', [8, 8, 8]);
const asignatura_3 = new Asignaturas('Inglés', [1, 2, 3]);

const listado_alumnos = new Listados([estudiante_1, estudiante_2, estudiante_3]);
const listado_asignaturas = new Listados([asignatura_1, asignatura_2, asignatura_3]);
const listado_matriculas = new Listados([
    [estudiante_1, asignatura_1, "22-05-2021", [...asignatura_1.calificaciones]],
    [estudiante_1, asignatura_2, "22-05-2021", [...asignatura_2.calificaciones]],
    [estudiante_2, asignatura_3, "22-05-2021", [...asignatura_3.calificaciones]],
    [estudiante_3, asignatura_1, "22-05-2021", [...asignatura_1.calificaciones]],
]);
let listado_desmatriculaciones = new Listados([[estudiante_3, asignatura_2, "22-01-1998", '22-02-2007']]);

document.getElementById('ejecutar').addEventListener('click', () => {
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
            break;

        case 4:
            mostrar_Resultados.innerHTML = `<p>Ver listado de desmatriculaciones.</p>`;
            listado_desmatriculaciones.mostrar_desmatriculaciones();
            break;

        case 5:
            mostrar_Resultados.innerHTML = `<p>Buscar un alumno por texto.</p>`;
            let buscar_alumno = Funciones.pedir_string('texto vas introducir para buscar el alumno');
            listado_alumnos.buscar_alumnos(buscar_alumno);
            break;

        case 6:
            mostrar_Resultados.innerHTML = `<p>Agregar un alumno al listado.</p>`;
            let nombre = Funciones.pedir_string('nombre para el alumno');
            let id = Funciones.pedir_string('ID del alumno para el alumno');
            let calle = Funciones.pedir_string('Calle nombre para el alumno');
            let numero = Funciones.pedir_string('Número nombre para el alumno');
            let piso = Funciones.pedir_string('Piso nombre para el alumno');
            let codigo_postal = Funciones.pedir_string('Código Postal nombre para el alumno');
            let provincia = Funciones.pedir_string('Provincia nombre para el alumno');
            let localidad = Funciones.pedir_string('Localidad nombre para el alumno');
            const estudiante_nuevo = new Estudiante(id, nombre, new Direccion(calle, numero, piso, codigo_postal, provincia, localidad));
            estudiante_nuevo.validar_cadenas(nombre);
            listado_alumnos.agregar_alumno_listado(estudiante_nuevo);
            break;

        case 7:
            mostrar_Resultados.innerHTML = `<p>Eliminar un alumno del listado.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let elegir_alumno = Funciones.pedir_string(' ID de alumno para borrar');
            listado_alumnos.eliminar_alumno_listado(elegir_alumno, listado_matriculas, listado_desmatriculaciones);
            listado_alumnos.mostrar_listado_alumnos();
            break;

        case 8:
            mostrar_Resultados.innerHTML = `<p>Buscar una asignatura por texto.</p>`;
            let buscar_asignatura = Funciones.pedir_string('texto para buscar asignatura');
            listado_asignaturas.buscar_asignatura(buscar_asignatura);
            break;

        case 9:
            mostrar_Resultados.innerHTML = `<p>Agregar una asignatura al listado.</p>`;
            let nombre_asignatura = Funciones.pedir_string('nombre de la asignatura para agregar');
            const asignatura_nueva = new Asignaturas(nombre_asignatura, null);
            asignatura_nueva.validar_cadena_asignatura(nombre_asignatura);
            listado_asignaturas.agregar_asignatura_listado(asignatura_nueva);
            break;

        case 10:
            mostrar_Resultados.innerHTML = `<p>Eliminar una asignatura del listado.</p>`;
            let nombre_asignatura_borrar = Funciones.pedir_string('nombre de la asignatura para borrar');
            listado_asignaturas.eliminar_asignatura_listado(nombre_asignatura_borrar, listado_matriculas);
            break;

        case 11:
            mostrar_Resultados.innerHTML = `<p>Matricular un alumno en una asignatura.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let id_alumno = Funciones.pedir_string('ID del alumno a matricular');
            let asignatura_nombre = Funciones.pedir_string('Nombre de la asignatura a matricular');
            listado_matriculas.matricular_alumno_asignatura(id_alumno, asignatura_nombre, listado_alumnos, listado_asignaturas);
            break;

        case 12:
            mostrar_Resultados.innerHTML = `<p>Desmatricular un alumno de una asignatura.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let id_alumno_borrar = Funciones.pedir_string('ID del alumno para desmatricular');
            let asignatura_nombre_borrar = Funciones.pedir_string('Nombre de la asignatura para desmatricular');
            listado_matriculas.desmatricular_alumno_asignatura(id_alumno_borrar, asignatura_nombre_borrar, listado_desmatriculaciones);
            break;

        case 13:
            mostrar_Resultados.innerHTML = `<p>Agregar notas a un estudiante.</p>`;
            listado_alumnos.mostrar_listado_alumnos();
            let alumnos_asignar_notas = Funciones.pedir_string('ID del alumno para asignar notas');
            let asignatura_asignar_notas = Funciones.pedir_string('Asignatura a la que añadir notas');
            listado_matriculas.agregar_notas_matricula(alumnos_asignar_notas, asignatura_asignar_notas);
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
}