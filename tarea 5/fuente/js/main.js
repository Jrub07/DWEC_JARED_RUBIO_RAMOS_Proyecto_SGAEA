import Estudiante from './Estudiantes.js';
import Direccion from './Direccion.js';
import Asignaturas from './Asignaturas.js';
import Listados from './Listados.js';
import errorPersonalizado from './errorPersonalizado.js';
import Funciones from './Funciones.js';




 




//Creacion de los objetos para que no de error el menú.

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

//Codigos para testear.
// listado_matriculas.test_matricula('123456','Inglés',listado_alumnos,listado_asignaturas);
// listado_matriculas.test_meter_notas('123456', 'Matematicas');

// Código del menú
let salir_menu = false;
let opcion_menu;

// Se crea un menú usando un bucle para permitir varias gestiones a la vez, cuando se pulse 0 se saldrá.
do {
    console.log(
        'Bienvenido al programa de gestión de alumnos. Escribe una opción del menú:\n' +
        '0- Salir\n' +
        '1- Ver listado de alumnos\n' +
        '2- Ver listado de asignaturas\n' +
        '3- Ver listado de matriculaciones\n' +
        '4- Ver listado de desmatriculaciones\n' +
        '5- Buscar un alumno por texto\n' +
        '6- Agregar un alumno al listado\n' +
        '7- Eliminar un alumno del listado\n' +
        '8- Buscar una asignatura por texto\n' +
        '9- Agregar una asignatura al listado\n' +
        '10- Eliminar una asignatura del listado\n' +
        '11- Matricular a un alumno en una asignatura\n' +
        '12- Desmatricular a un alumno de una asignatura\n' +
        '13- Agregar notas a un estudiante\n' +
        '14- Consultar promedio de un alumno general\n' +
        '15- Consultar promedio de un alumno por asignatura\n' +
        '16- Consultar promedio de una asignatura\n' +
        '17- Consultar promedio general de alumnos\n' +
        '18- Consultar reporte general\n'
    );

    opcion_menu = Funciones.pedir_numero();

    switch (opcion_menu) {
        case 0:
            console.log('Hasta la próxima.');
            salir_menu = true;
            break;

        case 1:
            console.log('Ver listado de alumnos.');
            listado_alumnos.mostrar_listado_alumnos();
            break;

        case 2:
            console.log('Ver listado de asignaturas.');
            listado_asignaturas.mostrar_listado_asignaturas();
            break;

        case 3:
            console.log('Ver listado de matriculaciones.');
            listado_matriculas.mostrar_matriculaciones();
            break;

        case 4:
            console.log('Ver listado de desmatriculaciones.');
            listado_desmatriculaciones.mostrar_desmatriculaciones();
            break;

        case 5:
            console.log('Buscar un alumno por texto.');
            let buscar_alumno = Funciones.pedir_string('texto vas introducir para buscar el alumno');
            listado_alumnos.buscar_alumnos(buscar_alumno);
            break;

        case 6:
            console.log('Agregar un alumno al listado.');
            let nombre = Funciones.pedir_string('nombre para el alumno');
            let id = Funciones.pedir_string('ID del alumno para el alumno');
            let calle = Funciones.pedir_string('Calle nombre para el alumno');
            let numero = Funciones.pedir_string('Número nombre para el alumno');
            let piso = FUnciones.pedir_string('Piso nombre para el alumno');
            let codigo_postal = Funciones.pedir_string('Código Postal nombre para el alumno');
            let provincia = Funciones.pedir_string('Provincia nombre para el alumno');
            let localidad = Funciones.pedir_string('Localidad nombre para el alumno');
            const estudiante_nuevo = new Estudiante(id, nombre, new Direccion(calle, numero, piso, codigo_postal, provincia, localidad));
            estudiante_nuevo.validar_cadenas(nombre);
            listado_alumnos.agregar_alumno_listado(estudiante_nuevo);
            break;

        case 7:
            console.log('Eliminar un alumno del listado.');
            listado_alumnos.mostrar_listado_alumnos();
            let elegir_alumno = Funciones.pedir_string(' ID de alumno para borrar');
            listado_alumnos.eliminar_alumno_listado(elegir_alumno, listado_matriculas, listado_desmatriculaciones);
            listado_alumnos.mostrar_listado_alumnos();
            break;

        case 8:
            console.log('Buscar una asignatura por texto.');
            let buscar_asignatura = Funciones.pedir_string('texto para buscar asignatura');
            listado_asignaturas.buscar_asignatura(buscar_asignatura);
            break;

        case 9:
            console.log('Agregar una asignatura al listado.');
            let nombre_asignatura = Funciones.pedir_string('nombre de la asignatura para agregar');
            const asignatura_nueva = new Asignaturas(nombre_asignatura, null);
            asignatura_nueva.validar_cadena_asignatura(nombre_asignatura);
            listado_asignaturas.agregar_asignatura_listado(asignatura_nueva);
            break;

        case 10:
            console.log('Eliminar una asignatura del listado.');
            let nombre_asignatura_borrar = Funciones.pedir_string('nombre de la asignatura para borrar');
            listado_asignaturas.eliminar_asignatura_listado(nombre_asignatura_borrar, listado_matriculas);
            break;

        case 11:
            console.log('Matricular un alumno en una asignatura.');
            listado_alumnos.mostrar_listado_alumnos();
            let id_alumno = Funciones.pedir_string('ID del alumno a matricular');
            let asignatura_nombre = Funciones.pedir_string('Nombre de la asignatura a matricular');
            listado_matriculas.matricular_alumno_asignatura(id_alumno, asignatura_nombre, listado_alumnos, listado_asignaturas);
            break;

        case 12:
            console.log('Desmatricular un alumno de una asignatura.');
            listado_alumnos.mostrar_listado_alumnos();
            let id_alumno_borrar = Funciones.pedir_string('ID del alumno para desmatricular');
            let asignatura_nombre_borrar = Funciones.pedir_string('Nombre de la asignatura para desmatricular');
            listado_matriculas.desmatricular_alumno_asignatura(id_alumno_borrar, asignatura_nombre_borrar, listado_desmatriculaciones);
            break;

        case 13:
            console.log('Agregar notas a un estudiante.');
            listado_alumnos.mostrar_listado_alumnos();
            let alumnos_asignar_notas = Funciones.pedir_string('ID del alumno para asignar notas');
            let asignatura_asignar_notas = Funciones.pedir_string('Asignatura a la que añadir notas');
            listado_matriculas.agregar_notas_matricula(alumnos_asignar_notas, asignatura_asignar_notas);
            break;

        case 14:
            console.log('Consultar promedio de un alumno general.');
            listado_alumnos.mostrar_listado_alumnos();
            let consultar_alumno_general = Funciones.pedir_string('ID del alumno para consultar promedio general');
            listado_matriculas.promedio_notas_alumno(consultar_alumno_general);
            break;

        case 15:
            console.log('Consultar promedio de un alumno por asignatura.');
            listado_alumnos.mostrar_listado_alumnos();
            let consultar_alumno = Funciones.pedir_string('ID del alumno para consultar promedio por asignatura');
            let consultar_asignatura = Funciones.pedir_string('Nombre de la asignatura para la que ver promedio');
            let ver_promedio=listado_matriculas.promedio_notas_indidivuales_asignatura(consultar_alumno, consultar_asignatura);
            if(ver_promedio!=null){
                console.log(`Promedio para ${consultar_asignatura} es igual a : ${ver_promedio}`);

            }
            break;

        case 16:
            console.log('Consultar promedio de una asignatura.');
            listado_asignaturas.mostrar_listado_asignaturas();
            let promedio_asignatura = Funciones.pedir_string('Nombre de la asignatura para consultar promedio de alumnos');
            listado_matriculas.promedio_notas_asignatura(promedio_asignatura);
            break;

        case 17:
            console.log('Consultar promedio general de alumnos.');
            console.log(`Promedio general de estudiantes: ` + listado_matriculas.promedio_todos_estudiantes());
            break;

        case 18:
            console.log('Consultar reporte general.');           
            listado_matriculas.mostrar_reporte_total();
            break;

        default:
            console.log('No existe esa opción del menú.');
            break;
    }
} while (!salir_menu);