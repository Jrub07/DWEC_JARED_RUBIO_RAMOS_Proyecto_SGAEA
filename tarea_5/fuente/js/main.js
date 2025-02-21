import BD from "./BD.js";
import Estudiante from "./Estudiantes.js";
import Direccion from "./Direccion.js";
import Asignaturas from "./Asignaturas.js";
import Listados from "./Listados.js";
import Funciones from "./Funciones.js";

BD.init();

const listado_alumnos = new Listados(BD.recoger_datos("listado_alumnos"));
const listado_asignaturas = new Listados(BD.recoger_datos("listado_asignaturas"));
const listado_matriculas = new Listados(BD.recoger_datos("listado_matriculas"));
const listado_desmatriculaciones = new Listados(BD.recoger_datos("listado_desmatriculaciones"));

document.getElementById("ejecutar").addEventListener("click", () => {
  document.getElementById("ejecutar").style.display = "none";
  mostrar_menu();
});

function mostrar_menu() {
  const mostrar_Resultados = document.getElementById("mostrar_resultados");
  mostrar_Resultados.innerHTML = `
        <p>Bienvenido al programa de gestión de alumnos.</p>
        <p>Selecciona una opción del menú:</p>
        <ul>
            
            <li><button id="btn_1">1-Ver listado de alumnos</button></li>
            <li><button id="btn_2">2-Ver listado de asignaturas</button></li>
            <li><button id="btn_3">3-Ver listado de matriculaciones</button></li>
            <li><button id="btn_4">4-Ver listado de desmatriculaciones</button></li>
            <li><button id="btn_5">5-Buscar un alumno por texto</button></li>
            <li><button id="btn_6">6-Agregar un alumno al listado</button></li>
            <li><button id="btn_7">7-Eliminar un alumno del listado</button></li>
            <li><button id="btn_8">8-Buscar una asignatura por texto</button></li>
            <li><button id="btn_9">9-Agregar una asignatura al listado</button></li>
            <li><button id="btn_10">10-Eliminar una asignatura del listado</button></li>
            <li><button id="btn_11">Matricular a un alumno en una asignatura</button></li>
            <li><button id="btn_12">11-Desmatricular a un alumno de una asignatura</button></li>
            <li><button id="btn_13">12-Agregar notas a un estudiante</button></li>
            <li><button id="btn_14">13-Consultar promedio de un alumno general</button></li>
            <li><button id="btn_15">14-Consultar promedio de un alumno por asignatura</button></li>
            <li><button id="btn_16">15-Consultar promedio de una asignatura</button></li>
            <li><button id="btn_17">16-Consultar promedio general de alumnos</button></li>
            <li><button id="btn_18">17-Consultar reporte general</button></li>
        </ul>
    `;

    //Opcion nueva, se elimina el 0 de salir y va desde 1 hasta 18 que activa el menú gráfico
    for (let i = 1; i <= 18; i++) {
    const btn = document.getElementById(`btn_${i}`);
    if (btn) {
      btn.addEventListener("click", () => {
        handleOption(i);
      });
    }
  }
}

function handleOption(opcion_menu) {
  const mostrar_Resultados = document.getElementById("mostrar_resultados");

  switch (opcion_menu) {
    
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
      Funciones.pedir_string("alumno a buscar");
      setTimeout(() => {
        const formulario = document.getElementById("formulario_texto");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const busqueda = document.getElementById("texto").value.trim();
            listado_alumnos.buscar_alumno(busqueda);
          });
        }
      }, 10);
      break;
    case 6:
      listado_alumnos.mostrar_listado_alumnos();
      mostrar_Resultados.innerHTML += `<p>Agregar un alumno al listado.</p>
                    <form id="formulario_alumno">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" pattern="[A-Za-záéíóúÁÉÍÓÚüÜ]+" required>
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

            const estudiante_nuevo = new Estudiante(
              id,
              nombre,
              new Direccion(calle, numero, piso, codigo_postal, provincia, localidad)
            );
            estudiante_nuevo.validar_cadenas(nombre);
            listado_alumnos.agregar_alumno_listado(estudiante_nuevo);
          });
        }
      }, 10);
      break;

    case 7:
      listado_alumnos.mostrar_listado_alumnos();
      mostrar_Resultados.innerHTML += `
        <p>Eliminar un alumno del listado.</p>
        <form id="formulario_borrar">
            <input type="text" id="id_alumno" name="id_alumno" placeholder="ID del alumno para borrar" required>
            <input type="submit" value="Borrar">
            <section id="resultado_borrar"></section>
        </form>
    `;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_borrar");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const id_alumno = document.getElementById("id_alumno").value.trim();
            const resultadoBorrar = document.getElementById("resultado_borrar");
            if (id_alumno) {
              listado_alumnos.eliminar_alumno_listado(id_alumno);
              if (resultadoBorrar) {
                resultadoBorrar.innerHTML = "<p>Alumno borrado con éxito.</p>";
              }
            } else {
              if (resultadoBorrar) {
                resultadoBorrar.innerHTML = "<p>Por favor, ingrese un ID válido.</p>";
              }
            }
          });
        }
      }, 10);
      break;

    case 8:
      mostrar_Resultados.innerHTML = `<p>Buscar una asignatura por texto.</p>`;
      Funciones.pedir_string("Asignatura a buscar");
      setTimeout(() => {
        const formulario = document.getElementById("formulario_texto");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const busqueda = document.getElementById("texto").value.trim();
            listado_asignaturas.buscar_asignatura(busqueda);
          });
        }
      }, 10);
      break;

    case 9:
      mostrar_Resultados.innerHTML = `<p>Agregar una asignatura al listado.</p>
            <form id="formulario_asignatura">
                <label for="nombre_asignatura">Nombre de la asignatura:</label>
                <input type="text" id="nombre_asignatura" name="nombre_asignatura" pattern="[A-Za-záéíóúÁÉÍÓÚüÜ]+" required>
                <button type="submit">Agregar asignatura</button>
            </form>`;
      setTimeout(() => {
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
      }, 10);
      break;

    case 10:
      listado_asignaturas.mostrar_listado_asignaturas();
      mostrar_Resultados.innerHTML += `
        <p>Eliminar una asignatura del listado.</p>
        <form id="formulario_borrar_asignatura">
            <input type="text" id="nombre_asignatura" name="nombre_asignatura" placeholder="Nombre de la asignatura para borrar" required>
            <input type="submit" value="Borrar">
            <section id="resultado_borrar_asignatura"></section>
        </form>
    `;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_borrar_asignatura");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombre_asignatura = document.getElementById("nombre_asignatura").value.trim();
            const resultadoBorrar = document.getElementById("resultado_borrar_asignatura");
            if (nombre_asignatura) {
              const eliminada = listado_asignaturas.eliminar_asignatura_listado(nombre_asignatura, listado_matriculas);
              if (resultadoBorrar) {
                if (eliminada) {
                  resultadoBorrar.innerHTML = "<p>Asignatura borrada con éxito.</p>";
                } else {
                  resultadoBorrar.innerHTML = "<p>No existe esa asignatura en el listado.</p>";
                }
              }
            } else {
              if (resultadoBorrar) {
                resultadoBorrar.innerHTML = "<p>Por favor, ingrese un nombre de asignatura válido.</p>";
              }
            }
          });
        }
      }, 10);
      break;

    case 11:
      listado_matriculas.mostrar_matriculaciones();
      mostrar_Resultados.innerHTML += `<p>Matricular un alumno en una asignatura.</p>
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
            listado_matriculas.matricular_alumno_asignatura(id_alumno, asignatura_nombre);
          });
        }
      }, 10);
      break;

    case 12:
      listado_matriculas.mostrar_matriculaciones();
      mostrar_Resultados.innerHTML += `
        <p>Desmatricular un alumno de una asignatura.</p>
        <form id="formulario_desmatricular">
            <label for="id_alumno">ID del alumno:</label>
            <input type="text" id="id_alumno" name="id_alumno" placeholder="Ingrese el ID del alumno" required>
            <label for="asignatura_nombre">Nombre de la asignatura:</label>
            <input type="text" id="asignatura_nombre" name="asignatura_nombre" placeholder="Ingrese la asignatura" required>
            <input type="submit" value="Desmatricular">
            <section id="resultado_desmatricular"></section>
        </form>
    `;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_desmatricular");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const id_alumno = document.getElementById("id_alumno").value.trim();
            const asignatura_nombre = document.getElementById("asignatura_nombre").value.trim();
            const resultadoDesmatricular = document.getElementById("resultado_desmatricular");
            if (id_alumno && asignatura_nombre) {
              const exito = listado_matriculas.desmatricular_alumno_asignatura(
                id_alumno,
                asignatura_nombre,
                listado_desmatriculaciones
              );
              if (resultadoDesmatricular) {
                if (exito) {
                  resultadoDesmatricular.innerHTML = "<p>Alumno desmatriculado con éxito.</p>";
                } else {
                  resultadoDesmatricular.innerHTML = "<p>No se encontró la matrícula para eliminar.</p>";
                }
              }
            } else {
              if (resultadoDesmatricular) {
                resultadoDesmatricular.innerHTML = "<p>Por favor, complete todos los campos.</p>";
              }
            }
          });
        }
      }, 10);
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
              <label for="nota">Nota:</label>
              <input type="number" id="nota" name="nota" min="0" max="10" required>
              <button type="submit">Agregar nota</button>
          </form>
      `;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_notas");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const id_alumno = document.getElementById("id_alumno").value.trim();
            const asignatura_nombre = document.getElementById("asignatura_nombre").value.trim();
            const nota = parseInt(document.getElementById("nota").value.trim());
            let mensajeError = document.getElementById("mensaje_error");
            if (!mensajeError) {
              mensajeError = document.createElement("p");
              mensajeError.id = "mensaje_error";
              formulario.appendChild(mensajeError);
            }
            if (isNaN(nota)) {
              mensajeError.innerHTML = "La nota debe ser un número válido.";
              return;
            }
            mensajeError.innerHTML = "";
            listado_matriculas.agregar_notas_matricula(id_alumno, asignatura_nombre, nota);
          });
        }
      }, 10);
      break;

    case 14:
      listado_alumnos.mostrar_listado_alumnos();
      mostrar_Resultados.innerHTML = `
                <p>Consultar promedio de un alumno general.</p>
                <form id="formulario_promedio_general">
                    <label for="id_alumno">ID del alumno:</label>
                    <input type="text" id="id_alumno" name="id_alumno" required>
                    <button type="submit">Consultar promedio</button>
                </form>
                <section id="resultado_consulta"></section>`;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_promedio_general");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const id_alumno = document.getElementById("id_alumno").value.trim();
            let promedio = listado_matriculas.promedio_notas_alumno(id_alumno);
            if (promedio === null) {
              document.getElementById("resultado_consulta").innerHTML += `<p>No se encontraron asignaturas para este alumno.</p>`;
            } else {
              document.getElementById("resultado_consulta").innerHTML += `<p>El promedio general del alumno es: ${promedio}</p>`;
            }
          });
        }
      }, 10);
      break;

    case 15:
      listado_matriculas.mostrar_matriculaciones();
      mostrar_Resultados.innerHTML += `
                    <p>Consultar promedio de un alumno por asignatura.</p>
                    <form id="formulario_promedio_asignatura">
                        <label for="id_alumno">ID del alumno:</label>
                        <input type="text" id="id_alumno" name="id_alumno" required>
                        <br>
                        <label for="asignatura">Nombre de la asignatura:</label>
                        <input type="text" id="asignatura" name="asignatura" required>
                        <br>
                        <button type="submit">Consultar promedio</button>
                    </form>
                    <section id="resultado_consulta"></section>`;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_promedio_asignatura");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const id_alumno = document.getElementById("id_alumno").value.trim();
            const asignatura = document.getElementById("asignatura").value.trim();
            let ver_promedio = listado_matriculas.promedio_notas_indidivuales_asignatura(id_alumno, asignatura);
            if (ver_promedio != null) {
              document.getElementById("resultado_consulta").innerHTML = `<p>Promedio para ${asignatura} es igual a: ${ver_promedio}</p>`;
            } else {
              document.getElementById("resultado_consulta").innerHTML = `<p>No se encontró promedio para ${asignatura}.</p>`;
            }
          });
        }
      }, 10);
      break;

    case 16:
      listado_asignaturas.mostrar_listado_asignaturas();
      mostrar_Resultados.innerHTML += `
                <p>Consultar promedio de una asignatura.</p>
                <form id="formulario_promedio_asignatura">
                    <label for="asignatura">Nombre de la asignatura:</label>
                    <input type="text" id="asignatura" name="asignatura" required>
                    <button type="submit">Consultar promedio</button>
                </form>
                <section id="resultado_consulta"></section>`;
      setTimeout(() => {
        const formulario = document.getElementById("formulario_promedio_asignatura");
        if (formulario) {
          formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const asignatura = document.getElementById("asignatura").value.trim();
            const promedio = listado_matriculas.promedio_asignatura(asignatura);
            if (promedio !== null) {
              document.getElementById("resultado_consulta").innerHTML = `<p>El promedio de la asignatura ${asignatura} es: ${promedio}</p>`;
            } else {
              document.getElementById("resultado_consulta").innerHTML = `<p>No se encontraron calificaciones para la asignatura ${asignatura}.</p>`;
            }
          });
        }
      }, 10);
      break;

    case 17:
      listado_alumnos.mostrar_listado_alumnos();
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

  // Botón para volver al menú principal que aparece debajo de cada opcion
  mostrar_Resultados.innerHTML += `<button id="boton_volver">Volver</button>`;
  document.getElementById("boton_volver").addEventListener("click", () => {
    mostrar_menu();
  });
}

window.mostrar_menu = mostrar_menu;
