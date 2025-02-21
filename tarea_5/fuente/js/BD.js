import Listados from "./Listados.js";
import Direccion from "./Direccion.js";
import Estudiante from "./Estudiantes.js";
import Asignaturas from "./Asignaturas.js";

class base_datos {
    static guardar_datos(clave, datos) {
        localStorage.setItem(clave, JSON.stringify(datos));
    }

    static recoger_datos(clave) {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : console.log('No hay datos');
    }

    //Esto no lo uso, pero lo dejo por si acaso ya que puede ser interesante
    static eliminar_datos(clave) {
        localStorage.removeItem(clave);
    }

    static init() {
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
        const listado_desmatriculaciones = new Listados([
            [estudiante_3, asignatura_2, "22-01-1998", '22-02-2007']
        ]);

        
        this.guardar_datos("listado_alumnos", listado_alumnos.listado_x.map(alumno => ({
            id: alumno.id,
            nombre: alumno.nombre
        })));

        this.guardar_datos("listado_asignaturas", listado_asignaturas.listado_x.map(asignatura => ({
            nombre: asignatura.nombre,
            calificaciones: asignatura.calificaciones
        })));

        this.guardar_datos("listado_matriculas", listado_matriculas.listado_x.map(matricula => ({
            estudiante: {
                id: matricula[0].id,
                nombre: matricula[0].nombre
            },
            asignatura: {
                nombre: matricula[1].nombre,
                calificaciones: matricula[1].calificaciones
            },
            fecha: matricula[2],
            calificaciones: matricula[3]
        })));

        this.guardar_datos("listado_desmatriculaciones", listado_desmatriculaciones.listado_x.map(desmatriculacion => ({
            estudiante: {
                id: desmatriculacion[0].id,
                nombre: desmatriculacion[0].nombre
            },
            asignatura: {
                nombre: desmatriculacion[1].nombre,
                calificaciones: desmatriculacion[1].calificaciones
            },
            fecha_inicio: desmatriculacion[2],
            fecha_fin: desmatriculacion[3]
        })));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    base_datos.init();
});

export default base_datos;