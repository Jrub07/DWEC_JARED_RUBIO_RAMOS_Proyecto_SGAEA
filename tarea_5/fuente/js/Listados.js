import BD from './BD.js';
import Asignatura from "./Asignaturas.js";
import Estudiante from './Estudiantes.js';
import Funciones from './Funciones.js';

class Listados {
    #listado_x;
    
    constructor(listado_x = []) {
        this.#listado_x = listado_x;
    }

    set listado_x(listado_x){
        this.#listado_x=listado_x;
    }

    get listado_x() {
        return this.#listado_x;
    }

    eliminar_alumno_listado(id) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_alumnos = BD.recoger_datos("listado_alumnos") || [];
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        
        let indice_para_borrar = -1;
        
        for (let i = 0; i < listado_alumnos.length; i++) {
            if (listado_alumnos[i].id === id) {
                indice_para_borrar = i;
                break;
            }
        }
        
        if (indice_para_borrar === -1) {
            mostrar_Resultados.innerHTML = `
                <p>No existe el alumno en el listado</p>
                <button id="volver">Volver al menú principal</button>
            `;
            setTimeout(() => {
                const botonVolver = document.getElementById("volver");
                if (botonVolver) {
                    botonVolver.addEventListener("click", () => {
                        mostrar_menu();
                    });
                }
            }, 0);
            return false;
        } else {
            listado_alumnos.splice(indice_para_borrar, 1);
        
            for (let i = listado_matriculas.length - 1; i >= 0; i--) {
                if (listado_matriculas[i].estudiante.id === id) {
                    listado_matriculas.splice(i, 1);
                }
            }
        
            BD.guardar_datos("listado_alumnos", listado_alumnos);
            BD.guardar_datos("listado_matriculas", listado_matriculas);
        
            mostrar_Resultados.innerHTML = `
                <p>Alumno borrado con éxito</p>
                <button id="volver">Volver al menú principal</button>
            `;
            setTimeout(() => {
                const botonVolver = document.getElementById("volver");
                if (botonVolver) {
                    botonVolver.addEventListener("click", () => {
                        mostrar_menu();
                    });
                }
            }, 0);
            return true;
        }
    }

    agregar_alumno_listado(alumno) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        
        if (this.#listado_x.some(a => a.id === alumno.id)) {
            mostrar_Resultados.innerHTML = `
                <p>El alumno ya está en el listado</p>
                <button id="volver">Volver</button>`
            ;
        } else {
            this.#listado_x.push(alumno);
            BD.guardar_datos("listado_alumnos", this.#listado_x.map(est => ({
                id: est.id,
                nombre: est.nombre
            })));
    
            mostrar_Resultados.innerHTML = `
                <p>Alumno agregado: ${alumno.nombre}</p>
                <button id="volver">Volver</button>`
            ;
        }
    
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }

    buscar_asignatura(busqueda) {
        const contenedor = document.getElementById("mostrar_resultados");
    
        this.#listado_x = BD.recoger_datos("listado_asignaturas");
    
        let resultados = document.getElementById("resultados_busqueda");
        if (!resultados) {
            resultados = document.createElement("div");
            resultados.id = "resultados_busqueda";
            contenedor.appendChild(resultados);
        }
    
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            resultados.innerHTML = "<p>Error: Listado vacío o búsqueda inválida</p>";
            return;
        }
    
        const patron = new RegExp(busqueda, 'i');
        resultados.innerHTML = "";
        let contador = 0;
    
        this.#listado_x.forEach(asignatura => {
            if (patron.test(asignatura.nombre)) {
                resultados.innerHTML += `<p>${asignatura.nombre}</p>`;
                contador++;
            }
        });
    
        if (contador === 0) {
            resultados.innerHTML = "<p>No se encontraron asignaturas</p>";
        }
    }
    
    buscar_alumno(busqueda) {
        const contenedor = document.getElementById("mostrar_resultados");
    
        this.#listado_x = BD.recoger_datos("listado_alumnos");
    
        let resultados = document.getElementById("resultados_busqueda");
        if (!resultados) {
            resultados = document.createElement("div");
            resultados.id = "resultados_busqueda";
            contenedor.appendChild(resultados);
        }
    
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            resultados.innerHTML = "<p>Error: Listado vacío o búsqueda inválida</p>";
            return;
        }
    
        const patron = new RegExp(busqueda, 'i');
        resultados.innerHTML = "";
        let contador = 0;
    
        this.#listado_x.forEach(alumno => {
            if (patron.test(alumno.nombre)) {
                resultados.innerHTML += `<p>${alumno.nombre}</p>`;
                contador++;
            }
        });
    
        if (contador === 0) {
            resultados.innerHTML = "<p>No se encontraron alumnos</p>";
        }
    }
    
    mostrar_listado_alumnos() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");        
        let datos = BD.recoger_datos("listado_alumnos");
        this.#listado_x = datos;
        
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>El listado está vacío</p>";
        } else {
            let listado = "<p>Listado de estudiantes:</p> <ul>";
            this.#listado_x.forEach(alumno => {
                listado += `<li>${alumno.nombre} - ID: ${alumno.id}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    mostrar_listado_asignaturas() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_asignaturas");
        if (this.#listado_x.length === 0) {
            document.getElementById("mostrar_resultados").innerHTML = "<p>El listado está vacío</p>";
            
        } else {
            let listado = "<p>Listado de asignaturas:</p> <ul>";
            this.#listado_x.forEach(asignatura => { listado += `<li>${asignatura.nombre}</li>`; });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    mostrar_matriculaciones() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_matriculas");
        this.#listado_x = datos;
    
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>Listado de matriculaciones vacío</p>";
        } else {
            let listado = "<p>Listado de matriculaciones: </p> <ul>";
            this.#listado_x.forEach(matricula => {
                listado += `<li>- ID: ${matricula.estudiante.id} -Alumno: ${matricula.estudiante.nombre} - Asignatura: ${matricula.asignatura.nombre} - Fecha matriculación: ${matricula.fecha}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    mostrar_desmatriculaciones() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let datos = BD.recoger_datos("listado_desmatriculaciones");
        this.#listado_x = datos;
    
        if (this.#listado_x.length === 0) {
            mostrar_Resultados.innerHTML = "<p>Listado de desmatriculaciones vacío</p>";
        } else {
            let listado = "<p>Listado de desmatriculaciones: </p> <ul>";
            this.#listado_x.forEach(desmatriculacion => {
                listado += `<li>Alumno: ${desmatriculacion.estudiante.nombre} - Asignatura: ${desmatriculacion.asignatura.nombre} - Fecha matriculación: ${desmatriculacion.fecha_inicio} - Fecha desmatriculación: ${desmatriculacion.fecha_fin}</li>`;
            });
            listado += "</ul>";
            mostrar_Resultados.innerHTML = listado;
        }
    }

    matricular_alumno_asignatura(id, asignatura_nombre) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_alumnos = BD.recoger_datos("listado_alumnos") || [];
        const listado_asignaturas = BD.recoger_datos("listado_asignaturas") || [];
        let listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
    
        let alumno = listado_alumnos.find(al => al.id === id);
        let asignatura = listado_asignaturas.find(asig => asig.nombre === asignatura_nombre);
    
        let fecha_matriculacion = new Date().toLocaleDateString('es-ES');
    
        let ya_matriculado = listado_matriculas.some(matricula => 
            matricula.estudiante.id === id && matricula.asignatura.nombre === asignatura_nombre
        );
    
        if (!alumno || !asignatura || ya_matriculado) {
            mostrar_Resultados.innerHTML = `
                <p>Error: El alumno o la asignatura no existen, o la matrícula ya está registrada.</p>
                <button id="volver">Volver</button>
            `;
        } else {
            const calificaciones = asignatura.calificaciones !== null ? [...asignatura.calificaciones] : [];
    
            listado_matriculas.push({
                estudiante: { id: alumno.id, nombre: alumno.nombre },
                asignatura: { nombre: asignatura.nombre, calificaciones: calificaciones },
                fecha: fecha_matriculacion,
                calificaciones: calificaciones
            });
    
            BD.guardar_datos("listado_matriculas", listado_matriculas);
    
            mostrar_Resultados.innerHTML = `
                <p>Alumno ${alumno.nombre} matriculado en ${asignatura.nombre} con éxito.</p>
                <button id="volver">Volver</button>
            `;
        }
    
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }
    
    eliminar_asignatura_listado(nombre_asignatura, lista_matriculas) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_asignaturas = BD.recoger_datos("listado_asignaturas") || [];
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
    
        let indice_para_borrar = -1;
    
        for (let i = 0; i < listado_asignaturas.length; i++) {
            if (listado_asignaturas[i].nombre === nombre_asignatura) {
                indice_para_borrar = i;
                break;
            }
        }
    
        if (indice_para_borrar === -1) {
            mostrar_Resultados.innerHTML = `
                <p>No existe la asignatura en el listado</p>
                <button id="volver">Volver al menú principal</button>
            `;
            setTimeout(() => {
                const botonVolver = document.getElementById("volver");
                if (botonVolver) {
                    botonVolver.addEventListener("click", () => {
                        mostrar_menu();
                    });
                }
            }, 0);
            return false;
        } else {
            listado_asignaturas.splice(indice_para_borrar, 1);
    
            for (let i = listado_matriculas.length - 1; i >= 0; i--) {
                if (listado_matriculas[i].asignatura.nombre === nombre_asignatura) {
                    listado_matriculas.splice(i, 1);
                }
            }
    
            BD.guardar_datos("listado_asignaturas", listado_asignaturas);
            BD.guardar_datos("listado_matriculas", listado_matriculas);
    
            mostrar_Resultados.innerHTML = `
                <p>Asignatura borrada con éxito</p>
                <button id="volver">Volver al menú principal</button>
            `;
            setTimeout(() => {
                const botonVolver = document.getElementById("volver");
                if (botonVolver) {
                    botonVolver.addEventListener("click", () => {
                        mostrar_menu();
                    });
                }
            }, 0);
            return true;
        }
    }

    desmatricular_alumno_asignatura(id, nombre_asignatura, listado_desmatriculaciones) {
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        const listado_desmatriculados = BD.recoger_datos("listado_desmatriculaciones") || [];
    
        let fecha_desmatriculacion = new Date().toLocaleDateString('es-ES');
        let indice_para_borrar = -1;
        let matricula_borrada = null;
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            if (listado_matriculas[i].estudiante.id === id && listado_matriculas[i].asignatura.nombre === nombre_asignatura) {
                indice_para_borrar = i;
                matricula_borrada = listado_matriculas[i];
                break;
            }
        }
    
        if (indice_para_borrar === -1) {
            return false;
        } else {
            listado_matriculas.splice(indice_para_borrar, 1);
    
            listado_desmatriculados.push({
                estudiante: {
                    id: matricula_borrada.estudiante.id,
                    nombre: matricula_borrada.estudiante.nombre
                },
                asignatura: {
                    nombre: matricula_borrada.asignatura.nombre,
                    calificaciones: matricula_borrada.asignatura.calificaciones
                },
                fecha_inicio: new Date(matricula_borrada.fecha).toLocaleDateString('es-ES'),
                fecha_fin: fecha_desmatriculacion
            });
    
            BD.guardar_datos("listado_matriculas", listado_matriculas);
            BD.guardar_datos("listado_desmatriculaciones", listado_desmatriculados);
    
            return true;
        }
    }

    listado_asignatura_por_alumno(id) {
        let listado = '<li>Listado de asignaturas por alumno:</li> <ul>';
        
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                listado += `<li>${this.#listado_x[i][1].nombre}</li>`;
                
            }
            listado += "</ul>";
        }

    }

    promedio_notas_indidivuales_asignatura(id, asignatura) {
        let listado = BD.recoger_datos("listado_matriculas") || [];
    
        let matricula = null;
        for (let i = 0; i < listado.length; i++) {
            let currentMatricula = listado[i];
            
            if (currentMatricula.estudiante && currentMatricula.estudiante.id && currentMatricula.estudiante.id.trim() === id.trim() &&
                currentMatricula.asignatura && currentMatricula.asignatura.nombre && currentMatricula.asignatura.nombre.trim() === asignatura.trim()) {
                matricula = currentMatricula;
                break;
            }
        }
    
        if (!matricula) {
            document.getElementById("mostrar_resultados").innerHTML = '<p>No existe ese id de alumno o la asignatura</p>';
            return null;
        }
    
        let notasArray = matricula.calificaciones;
        if (!notasArray || notasArray.length === 0) {
            document.getElementById("mostrar_resultados").innerHTML = '<p>No hay notas registradas para esta asignatura.</p>';
            
        }
    
        let suma = notasArray.reduce((acc, nota) => acc + nota, 0);
        let media = Math.round(suma / notasArray.length);
    
        return media;
    }  

    promedio_notas_alumno(id) {
        let listado = BD.recoger_datos("listado_matriculas") || [];
        let suma_promedios = 0;
        let contador_asignaturas = 0;
    
        if (!id || id.trim() === '') {
            return null;
        }
    
        for (let i = 0; i < listado.length; i++) {
            let matricula = listado[i];
            if (matricula.estudiante && matricula.estudiante.id && matricula.estudiante.id.trim() === id.trim()) {
                let promedio_asignatura = this.promedio_notas_indidivuales_asignatura(matricula.estudiante.id, matricula.asignatura.nombre);
                if (promedio_asignatura !== null) {
                    suma_promedios += promedio_asignatura;
                    contador_asignaturas++;
                }
            }
        }
    
        return contador_asignaturas === 0 ? null : suma_promedios / contador_asignaturas;
    }

    agregar_notas_matricula(id, asignatura, nota) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        let listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
    
        let indice_para_calificaciones = null;
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            if (listado_matriculas[i].estudiante.id === id && listado_matriculas[i].asignatura.nombre === asignatura) {
                indice_para_calificaciones = i;
                break;
            }
        }
    
        if (indice_para_calificaciones === null) {
            mostrar_Resultados.innerHTML = `
                <p>No existe esa asignatura o alumno en el listado de matriculaciones.</p>
                <button id="volver">Volver</button>
            `;
            
            document.getElementById("volver").addEventListener("click", () => {
                mostrar_menu();
            });
            
            return;
        }
    
        if (isNaN(nota) || nota < 0 || nota > 10) {
            mostrar_Resultados.innerHTML = `
                <p>La nota debe ser un número entre 0 y 10.</p>
                <button id="volver">Volver</button>
            `;
            document.getElementById("volver").addEventListener("click", () => {
                mostrar_menu();
            });
            return;
        }
    
        listado_matriculas[indice_para_calificaciones].calificaciones.push(nota);
    
        BD.guardar_datos("listado_matriculas", listado_matriculas);
    
        mostrar_Resultados.innerHTML = `
            <p>Nota agregada con éxito.</p>
            <button id="volver">Volver</button>
        `;
    
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }
    
    promedio_asignatura(asignatura) {
        let suma_calificaciones = 0;
        let total_calificaciones = 0;
    
        if (!asignatura || asignatura.trim() === '') {
            return null;
        }
        
        let listado = BD.recoger_datos("listado_matriculas") || [];
        
        for (let i = 0; i < listado.length; i++) {
            let currentMatricula = listado[i];
            
            if (
                currentMatricula.asignatura && 
                currentMatricula.asignatura.nombre &&
                currentMatricula.asignatura.nombre.trim() === asignatura.trim()
            ) {
                let notasArray = currentMatricula.calificaciones;
                if (notasArray && notasArray.length > 0) {
                    for (let j = 0; j < notasArray.length; j++) {
                        suma_calificaciones += notasArray[j];
                        total_calificaciones++;
                    }
                }
            }
        }
        
        if (total_calificaciones === 0) {
            return null;
        }
        
        let promedio = Math.round(suma_calificaciones / total_calificaciones);
        return promedio;
    }

    promedio_todos_estudiantes() {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
    
        let listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        
        let contador_alumnos = 0;
        let sumar_promedios = 0;
        let contador_ids = [];
        let mensaje = '';
    
        if (listado_matriculas.length === 0) {
            mensaje = '<p>No hay alumnos en el listado</p>';
            mostrar_Resultados.innerHTML = mensaje;
            return;
        }
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            let matricula = listado_matriculas[i];
            let id = matricula.estudiante ? matricula.estudiante.id : undefined;
    
            if (!id) {
                continue;
            }
    
            let calificaciones = matricula.calificaciones || [];
            if (calificaciones.length === 0) {
                continue;
            }
    
            let promedio_alumno = calificaciones.reduce((total, calificacion) => total + calificacion, 0) / calificaciones.length;
    
            if (!isNaN(promedio_alumno) && !contador_ids.includes(id)) {
                sumar_promedios += promedio_alumno;
                contador_ids.push(id);
                contador_alumnos++;
            }
        }
    
        if (contador_alumnos === 0) {
            mensaje = '<p>No se encontraron promedios válidos en el listado de alumnos</p>';
            mostrar_Resultados.innerHTML = mensaje;
            return;
        }
    
        let media_alumnos_general = sumar_promedios / contador_alumnos;
        if (isNaN(media_alumnos_general)) {
            mensaje = '<p>Hubo un error al calcular el promedio general.</p>';
            mostrar_Resultados.innerHTML = mensaje;
            return;
        }
    
        media_alumnos_general = media_alumnos_general.toFixed(2);
    
        mensaje = `<p>El promedio general de todos los alumnos es: ${media_alumnos_general}</p>`;
        mostrar_Resultados.innerHTML = mensaje;
    
        mostrar_Resultados.innerHTML += `<button id="boton_volver">Volver</button>`;
        document.getElementById('boton_volver').addEventListener('click', () => {
            mostrar_menu();
        });
    
        return media_alumnos_general;
    }

    reporte_alumno_individual(id) {
        const mostrar_Resultados = document.getElementById("mostrar_resultados");
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        let combinaciones_repetidas = [];
        let alumno_repetido = false;
        let nombre_alumno = '';
        let mensaje = '';
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            let matricula = listado_matriculas[i];
    
            if (matricula.estudiante.id === id) {
                if (!alumno_repetido) {
                    alumno_repetido = true;
                    nombre_alumno = matricula.estudiante.nombre;
                    mensaje += `<p>Alumno: ${nombre_alumno} || Promedio general: ${this.promedio_notas_alumno(id)}</p>`;
                }
    
                let combinacion = [id, matricula.asignatura.nombre];
    
                if (!combinaciones_repetidas.some(a => a[0] === combinacion[0] && a[1] === combinacion[1])) {
                    mensaje += `<p>||Asignatura: ${matricula.asignatura.nombre} || Calificaciones: ${matricula.calificaciones.join(", ")} || Promedio: ${this.promedio_notas_indidivuales_asignatura(id, matricula.asignatura.nombre)} || Fecha matriculación: ${matricula.fecha}</p>`;
                    combinaciones_repetidas.push(combinacion);
                }
            }
        }
    
        if (!alumno_repetido) {
            mensaje = '<p>No se ha encontrado el alumno</p>';
        }
    
        mostrar_Resultados.innerHTML = `
            ${mensaje}
            <button id="volver">Volver</button>
        `;
    
        document.getElementById("volver").addEventListener("click", () => {
            mostrar_menu();
        });
    }
    
    mostrar_reporte_total() {
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        let ids_repetido = [];
        let reporte_completo = "";
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            let id = listado_matriculas[i].estudiante.id;
    
            if (!ids_repetido.includes(id)) {
                let reporte_individual = this.generar_reporte_alumno(id);
                reporte_completo += reporte_individual;
                ids_repetido.push(id);
            }
        }
    
        document.getElementById("mostrar_resultados").innerHTML =`${reporte_completo}`;
    }
    
    generar_reporte_alumno(id) {
        const listado_matriculas = BD.recoger_datos("listado_matriculas") || [];
        let combinaciones_repetidas = [];
        let alumno_repetido = false;
        let nombre_alumno = '';
        let mensaje = '';
    
        for (let i = 0; i < listado_matriculas.length; i++) {
            let matricula = listado_matriculas[i];
    
            if (matricula.estudiante.id === id) {
                if (!alumno_repetido) {
                    alumno_repetido = true;
                    nombre_alumno = matricula.estudiante.nombre;
                    mensaje += `<p>Alumno: ${nombre_alumno} || Promedio general: ${this.promedio_notas_alumno(id)}</p>`;
                }
    
                let combinacion = [id, matricula.asignatura.nombre];
    
                if (!combinaciones_repetidas.some(a => a[0] === combinacion[0] && a[1] === combinacion[1])) {
                    mensaje += `<p>||Asignatura: ${matricula.asignatura.nombre} || Calificaciones: ${matricula.calificaciones.join(", ")} || Promedio: ${this.promedio_notas_indidivuales_asignatura(id, matricula.asignatura.nombre)} || Fecha matriculación: ${matricula.fecha}</p>`;
                    combinaciones_repetidas.push(combinacion);
                }
            }
        }
    
        if (!alumno_repetido) {
            mensaje = '<p>No se ha encontrado el alumno</p>';
        }
    
        return mensaje;
    }

    agregar_asignatura_listado(asignatura) {
    const mostrar_Resultados = document.getElementById("mostrar_resultados");

    if (this.#listado_x.some(a => a.nombre === asignatura.nombre)) {
        mostrar_Resultados.innerHTML = `
            <p>La asignatura ya está en el listado</p>
            <button id="volver">Volver</button>
        `;
    } else {
        this.#listado_x.push(asignatura);
        BD.guardar_datos("listado_asignaturas", this.#listado_x.map(asig => ({
            nombre: asig.nombre,
            calificaciones: asig.calificaciones
        })));

        mostrar_Resultados.innerHTML = `
            <p>Asignatura agregada: ${asignatura.nombre}</p>
            <button id="volver">Volver</button>
        `;
    }

    document.getElementById("volver").addEventListener("click", () => {
        mostrar_menu();
    });
}
}

export default Listados;