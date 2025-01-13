## Classes

<dl>
<dt><a href="#Direccion">Direccion</a></dt>
<dd></dd>
<dt><a href="#Usuarios">Usuarios</a></dt>
<dd></dd>
<dt><a href="#Estudiante">Estudiante</a> ⇐ <code><a href="#Usuarios">Usuarios</a></code></dt>
<dd></dd>
<dt><a href="#Asignaturas">Asignaturas</a></dt>
<dd></dd>
<dt><a href="#Listados">Listados</a></dt>
<dd></dd>
<dt><a href="#errorPersonalizado">errorPersonalizado</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#pedir_string">pedir_string(texto)</a> ⇒ <code>string</code></dt>
<dd><p>Funcion para pedir texto al usuario, ya que se va a usar un menú e indicarle instrucciones al usuario de lo que tiene que escribir.
La funcion principal es ahorrar líneas de código y no escribir todo de nuevo, y corregir que no sea entrada null o espacio vacio.
Nueva modificacion, ahora en vez de imprimir el error por console.log ahora lanza un error personalizado</p>
</dd>
<dt><a href="#pedir_numero">pedir_numero()</a> ⇒ <code>number</code></dt>
<dd><p>Funcion para pedir números al usuario, principalmente usado para controlar los errores del menú en el switch.
En este metodo se pide número hasta que te de el correcto evitando tanto cadenas de texto como números negativos</p>
<p>Actualizado: Añadimos error personalizado al igual que el anterior</p>
</dd>
</dl>

<a name="Direccion"></a>

## Direccion
**Kind**: global class

* [Direccion](#Direccion)
    * [new Direccion(calle, numero, piso, codigoPostal, provincia, localidad)](#new_Direccion_new)
    * [.calle](#Direccion+calle) : <code>string</code>
    * [.numero](#Direccion+numero) : <code>string</code>
    * [.piso](#Direccion+piso) : <code>string</code>
    * [.codigoPostal](#Direccion+codigoPostal) : <code>string</code>
    * [.provincia](#Direccion+provincia) : <code>string</code>
    * [.localidad](#Direccion+localidad) : <code>string</code>
    * [.calle](#Direccion+calle) ⇒ <code>string</code>
    * [.numero](#Direccion+numero) ⇒ <code>string</code>
    * [.piso](#Direccion+piso) ⇒ <code>string</code>
    * [.codigoPostal](#Direccion+codigoPostal) ⇒ <code>string</code>
    * [.provincia](#Direccion+provincia) ⇒ <code>string</code>
    * [.localidad](#Direccion+localidad) ⇒ <code>string</code>

<a name="new_Direccion_new"></a>

### new Direccion(calle, numero, piso, codigoPostal, provincia, localidad)
Clase base para construir una dirección que irá posteriormente en un objeto de tipo Estudiante


| Param | Type | Description |
| --- | --- | --- |
| calle | <code>string</code> | La calle de la direccion |
| numero | <code>string</code> | El número de la dirección |
| piso | <code>string</code> | El piso de la dirección |
| codigoPostal | <code>string</code> | El codigo postal de la dirección |
| provincia | <code>string</code> | El nombre de la provicia |
| localidad | <code>string</code> | El nombre de la localidad |

<a name="Direccion+calle"></a>

### direccion.calle : <code>string</code>
Set del parametro calle

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+numero"></a>

### direccion.numero : <code>string</code>
Set del parametro numero

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+piso"></a>

### direccion.piso : <code>string</code>
Set para el parametro piso

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+codigoPostal"></a>

### direccion.codigoPostal : <code>string</code>
Set para el parametro codigoPostal

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+provincia"></a>

### direccion.provincia : <code>string</code>
Set para el parametro provincia

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+localidad"></a>

### direccion.localidad : <code>string</code>
Set para el parametro localidad

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
<a name="Direccion+calle"></a>

### direccion.calle ⇒ <code>string</code>
Get del parametro calle

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - La calle de la dirección
<a name="Direccion+numero"></a>

### direccion.numero ⇒ <code>string</code>
Get del parametro numero

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - El número de la dirección
<a name="Direccion+piso"></a>

### direccion.piso ⇒ <code>string</code>
Get para el parametro piso

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - El piso de la dirección
<a name="Direccion+codigoPostal"></a>

### direccion.codigoPostal ⇒ <code>string</code>
Get para el parametro codigoPostal

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - El codigo postal de la dirección
<a name="Direccion+provincia"></a>

### direccion.provincia ⇒ <code>string</code>
Get para el parametro provincia

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - El nombre de la provincia
<a name="Direccion+localidad"></a>

### direccion.localidad ⇒ <code>string</code>
Get para el parametro localidad

**Kind**: instance property of [<code>Direccion</code>](#Direccion)
**Returns**: <code>string</code> - El nombre de la localidad
<a name="Usuarios"></a>

## Usuarios
**Kind**: global class

* [Usuarios](#Usuarios)
    * [new Usuarios(id, nombre)](#new_Usuarios_new)
    * [.id](#Usuarios+id) : <code>string</code>
    * [.nombre](#Usuarios+nombre) : <code>string</code>
    * [.id](#Usuarios+id) ⇒ <code>string</code>
    * [.nombre](#Usuarios+nombre) ⇒ <code>string</code>
    * [.validar_cadenas(cadena)](#Usuarios+validar_cadenas)

<a name="new_Usuarios_new"></a>

### new Usuarios(id, nombre)
Clase Usuarios, que se usará para crear los objetos de tipo Estudiante


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | El identificador del usuario |
| nombre | <code>string</code> | El nombre del usuario |

<a name="Usuarios+id"></a>

### usuarios.id : <code>string</code>
Set para el parametro id

**Kind**: instance property of [<code>Usuarios</code>](#Usuarios)
<a name="Usuarios+nombre"></a>

### usuarios.nombre : <code>string</code>
Set para el parametro nombre

**Kind**: instance property of [<code>Usuarios</code>](#Usuarios)
<a name="Usuarios+id"></a>

### usuarios.id ⇒ <code>string</code>
Get para el parametro id

**Kind**: instance property of [<code>Usuarios</code>](#Usuarios)
**Returns**: <code>string</code> - El identificador del usuario
<a name="Usuarios+nombre"></a>

### usuarios.nombre ⇒ <code>string</code>
get para el parametro nombre

**Kind**: instance property of [<code>Usuarios</code>](#Usuarios)
**Returns**: <code>string</code> - El nombre del usuario
<a name="Usuarios+validar_cadenas"></a>

### usuarios.validar\_cadenas(cadena)
Metodo para hacer override posteriormente en la clase Estudiante

**Kind**: instance method of [<code>Usuarios</code>](#Usuarios)

| Param | Type | Description |
| --- | --- | --- |
| cadena | <code>string</code> | cadena a validar |

<a name="Estudiante"></a>

## Estudiante ⇐ [<code>Usuarios</code>](#Usuarios)
**Kind**: global class
**Extends**: [<code>Usuarios</code>](#Usuarios)

* [Estudiante](#Estudiante) ⇐ [<code>Usuarios</code>](#Usuarios)
    * [new Estudiante(id, nombre, direccion)](#new_Estudiante_new)
    * [.id](#Estudiante+id) : <code>string</code>
    * [.nombre](#Estudiante+nombre) : <code>string</code>
    * [.direccion](#Estudiante+direccion) : <code>string</code>
    * [.id](#Estudiante+id) ⇒ <code>string</code>
    * [.nombre](#Estudiante+nombre) ⇒ <code>string</code>
    * [.direccion](#Estudiante+direccion) ⇒ <code>string</code>
    * [.validar_cadenas(cadena)](#Estudiante+validar_cadenas) ⇒ <code>string</code>

<a name="new_Estudiante_new"></a>

### new Estudiante(id, nombre, direccion)
Clase  Estudiante que hereda de Usuarios


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del estudiante |
| nombre | <code>string</code> | nombre del estudiante |
| direccion | <code>string</code> | direccion del estudiante |

<a name="Estudiante+id"></a>

### estudiante.id : <code>string</code>
Set para el parametro id

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
**Overrides**: [<code>id</code>](#Usuarios+id)
<a name="Estudiante+nombre"></a>

### estudiante.nombre : <code>string</code>
Set para el parametro nombre

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
**Overrides**: [<code>nombre</code>](#Usuarios+nombre)
<a name="Estudiante+direccion"></a>

### estudiante.direccion : <code>string</code>
Set para el parametro direccion

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
<a name="Estudiante+id"></a>

### estudiante.id ⇒ <code>string</code>
Get para el parametro id

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
**Overrides**: [<code>id</code>](#Usuarios+id)
**Returns**: <code>string</code> - El identificador del estudiante
<a name="Estudiante+nombre"></a>

### estudiante.nombre ⇒ <code>string</code>
Get para el parametro nombre

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
**Overrides**: [<code>nombre</code>](#Usuarios+nombre)
**Returns**: <code>string</code> - El nombre del estudiante
<a name="Estudiante+direccion"></a>

### estudiante.direccion ⇒ <code>string</code>
Get para el parametro direccion

**Kind**: instance property of [<code>Estudiante</code>](#Estudiante)
**Returns**: <code>string</code> - La dirección del estudiante
<a name="Estudiante+validar_cadenas"></a>

### estudiante.validar\_cadenas(cadena) ⇒ <code>string</code>
Metodo override para comprobar las cadenas de texto para el nombre.
    Se crea una expresion regular para comprobar el nombre para que solo tenga espacios y letras
    Si está bien se deja el nombre como está, pero si no lo está se le pide al usuario una cadena correcta
    hasta que la escriba bien

**Kind**: instance method of [<code>Estudiante</code>](#Estudiante)
**Overrides**: [<code>validar\_cadenas</code>](#Usuarios+validar_cadenas)
**Returns**: <code>string</code> - La cadena correcta

| Param | Type | Description |
| --- | --- | --- |
| cadena | <code>string</code> | La cadena a comprobar |

<a name="Asignaturas"></a>

## Asignaturas
**Kind**: global class

* [Asignaturas](#Asignaturas)
    * [new Asignaturas(nombre, calificaciones)](#new_Asignaturas_new)
    * [.nombre](#Asignaturas+nombre) : <code>string</code>
    * [.calificaciones](#Asignaturas+calificaciones) : <code>array</code>
    * [.nombre](#Asignaturas+nombre) ⇒ <code>string</code>
    * [.calificaciones](#Asignaturas+calificaciones) ⇒ <code>array</code>
    * [.validar_cadena_asignatura(cadena)](#Asignaturas+validar_cadena_asignatura) ⇒ <code>string</code>

<a name="new_Asignaturas_new"></a>

### new Asignaturas(nombre, calificaciones)
Clase asignatura, en ella se pone el nombre de la asignatura y unas calificaciones generales para esta, posteriormente se podrán
añadir notas individuales sin afectar a la general, pero si son añadidas aquí si el objeto es compartido afecta a varios alumnos,útil
si ha habido cualquier nota conjunta


| Param | Type | Description |
| --- | --- | --- |
| nombre | <code>string</code> | nombre de la asignatura |
| calificaciones | <code>array</code> | calificaciones generales por asignatura |

<a name="Asignaturas+nombre"></a>

### asignaturas.nombre : <code>string</code>
Set para el nombre de la asignatura

**Kind**: instance property of [<code>Asignaturas</code>](#Asignaturas)
<a name="Asignaturas+calificaciones"></a>

### asignaturas.calificaciones : <code>array</code>
Set para las calificaciones de la asignatura

**Kind**: instance property of [<code>Asignaturas</code>](#Asignaturas)
<a name="Asignaturas+nombre"></a>

### asignaturas.nombre ⇒ <code>string</code>
get para el nombre de la asignatura

**Kind**: instance property of [<code>Asignaturas</code>](#Asignaturas)
**Returns**: <code>string</code> - El nombre de la asignatura
<a name="Asignaturas+calificaciones"></a>

### asignaturas.calificaciones ⇒ <code>array</code>
Get para las calificaciones de la asignatura

**Kind**: instance property of [<code>Asignaturas</code>](#Asignaturas)
**Returns**: <code>array</code> - Las calificaciones de la asignatura
<a name="Asignaturas+validar_cadena_asignatura"></a>

### asignaturas.validar\_cadena\_asignatura(cadena) ⇒ <code>string</code>
Metodo igual para el nombre de los alumnos pero ahora para comprobar la cadena de texto

**Kind**: instance method of [<code>Asignaturas</code>](#Asignaturas)
**Returns**: <code>string</code> - cadena correcta

| Param | Type | Description |
| --- | --- | --- |
| cadena | <code>string</code> | cadena a validar |

<a name="Listados"></a>

## Listados
**Kind**: global class

* [Listados](#Listados)
    * [new Listados([listado_x])](#new_Listados_new)
    * [.listado_x](#Listados+listado_x) : <code>array</code>
    * [.listado_x](#Listados+listado_x) ⇒ <code>array</code>
    * [.agregar_alumno_listado(alumno)](#Listados+agregar_alumno_listado)
    * [.eliminar_alumno_listado(id, lista_matricula)](#Listados+eliminar_alumno_listado)
    * [.agregar_asignatura_listado(asignatura)](#Listados+agregar_asignatura_listado)
    * [.eliminar_asignatura_listado(asignatura, lista_matriculas)](#Listados+eliminar_asignatura_listado)
    * [.buscar_asignatura(busqueda)](#Listados+buscar_asignatura)
    * [.buscar_alumnos(busqueda)](#Listados+buscar_alumnos)
    * [.mostrar_listado_alumnos()](#Listados+mostrar_listado_alumnos)
    * [.mostrar_listado_asignaturas()](#Listados+mostrar_listado_asignaturas)
    * [.mostrar_matriculaciones()](#Listados+mostrar_matriculaciones)
    * [.mostrar_desmatriculaciones()](#Listados+mostrar_desmatriculaciones)
    * [.matricular_alumno_asignatura(id, asignatura_nombre, listado_alumnos, listado_asignaturas)](#Listados+matricular_alumno_asignatura)
    * [.test_matricula(id, asignatura_nombre, listado_alumnos, listado_asignaturas)](#Listados+test_matricula)
    * [.desmatricular_alumno_asignatura(id, nombre_asignatura, listado_desmatriculaciones)](#Listados+desmatricular_alumno_asignatura)
    * [.agregar_notas_matricula(id, asignatura)](#Listados+agregar_notas_matricula)
    * [.test_meter_notas(id, asignatura)](#Listados+test_meter_notas)
    * [.listado_asignatura_por_alumno(id)](#Listados+listado_asignatura_por_alumno)
    * [.promedio_notas_indidivuales_asignatura(id, asignatura)](#Listados+promedio_notas_indidivuales_asignatura) ⇒ <code>number</code>
    * [.promedio_notas_alumno(id)](#Listados+promedio_notas_alumno) ⇒ <code>number</code>
    * [.promedio_notas_asignatura(asignatura)](#Listados+promedio_notas_asignatura)
    * [.promedio_todos_estudiantes()](#Listados+promedio_todos_estudiantes) ⇒ <code>number</code>
    * [.reporte_alumno_individual(id)](#Listados+reporte_alumno_individual)
    * [.mostrar_reporte_total()](#Listados+mostrar_reporte_total)

<a name="new_Listados_new"></a>

### new Listados([listado_x])
Clase listado general usada para todos los listados del programa, se llama a su atributolistado_x
ya que x representa todo lo que puede guardar, desde alumnos, hasta notas a manera de array


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [listado_x] | <code>array</code> | <code>[]</code> | listado de alumnos, asignaturas, matriculaciones o desmatriculaciones |

<a name="Listados+listado_x"></a>

### listados.listado\_x : <code>array</code>
Set del listado de alumnos, asignaturas, matriculaciones o desmatriculaciones

**Kind**: instance property of [<code>Listados</code>](#Listados)
<a name="Listados+listado_x"></a>

### listados.listado\_x ⇒ <code>array</code>
Get del listado de alumnos, asignaturas, matriculaciones o desmatriculaciones

**Kind**: instance property of [<code>Listados</code>](#Listados)
**Returns**: <code>array</code> - El listado de alumnos, asignaturas, matriculaciones o desmatricaliones
<a name="Listados+agregar_alumno_listado"></a>

### listados.agregar\_alumno\_listado(alumno)
Metodo para agregar alumnos a una lista de alumnos
    El metodo controla un parametro tipo objeto, y funciona a modo de condicional: Si el listado contiene la id
    del alumno introducido no dejará añadir el alumno y lo mostrará por consola, si no lo tiene se añadirá al listado,
    para finalmente mostrar el listado y se vea que se ha añadido correctamente (esto último se puede obviar, pero se deja
    como test para comprobar que se ha añadido)

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| alumno | <code>object</code> | objeto de tipo Estudiante |

<a name="Listados+eliminar_alumno_listado"></a>

### listados.eliminar\_alumno\_listado(id, lista_matricula)
Método para eliminar alumnos.
    Se pide el id del alumno por teclado y con un bucle for se recorre las posiciones buscando el id dentro del listado.
    Si se encuentra el id se incrementa un contador en 1 y se guarda el índice para borarrlo posteriormente.
    Si el contador es igual a 0 se indica al usuario que no existe el usuario en el listado y se acaba el programa, pero si existe
    se elimina del listado con un splice indicandole el indice para borrar

    Además de eso, cuando se elimina el listado de uno de los listados base (listado asignaturas o listado alumnos) se borra en listado matriculas
    ya que no tiene mucho sentido dejarlo sin actualizar. Esto se hace con un bucle for inverso que corte las posiciones
    donde se encuentre el id del alumno, y que puede haber varios alumnos, además se hace inverso ya que se va recortando la longitud del array por
    cada splice y es mas facil de manejar así

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a eliminar |
| lista_matricula | <code>object</code> | objeto listado de matriculaciones |

<a name="Listados+agregar_asignatura_listado"></a>

### listados.agregar\_asignatura\_listado(asignatura)
Metodo para añadir asignaturas al listado, es una copia de agregar_alumno_listado, pero cambiando
        lo que se busca

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| asignatura | <code>object</code> | objeto de tipo Asignatura      * |

<a name="Listados+eliminar_asignatura_listado"></a>

### listados.eliminar\_asignatura\_listado(asignatura, lista_matriculas)
Metodo para borrar asignaturas de un listado, es igual que el de eliminar alumnos del listado

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| asignatura | <code>string</code> | nombre de la asignatura a eliminar |
| lista_matriculas | <code>object</code> | objeto listado de matriculaciones |

<a name="Listados+buscar_asignatura"></a>

### listados.buscar\_asignatura(busqueda)
Metodo para buscar un patron de texto que coincida parcialmente.
    Se crea un parametro de busqueda que es un texto, y se pasa como parametro de una expresion regular
    ignorando que sea mayúsucla o minúscula. Con un condicional se busca con un condicional que el listado no esté vacio y
    que con la funcion trim que no se introduzca un espacio vacío. Si no pasa la condicion muestra un error y sino busca
    en un for each dentro del listado si está con la funcion test de la expresión regular, si es así se incrementa el contador.
    Si este contador sigue en 0, indicará al usuario que no hay nada en la cadena

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| busqueda | <code>string</code> | nombre de la asignatura a buscar |

<a name="Listados+buscar_alumnos"></a>

### listados.buscar\_alumnos(busqueda)
Metodo exacatamente igual que el anterior, pero buscandolo para alumnos

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| busqueda | <code>string</code> | cadena a buscar |

<a name="Listados+mostrar_listado_alumnos"></a>

### listados.mostrar\_listado\_alumnos()
Metodo para ver el listado completo de alumnos.
    Con un condicional se comprueba si el listado está vacío indicando que lo está y
    sino se hace un foreach con los nombres de los alumnos.

**Kind**: instance method of [<code>Listados</code>](#Listados)
<a name="Listados+mostrar_listado_asignaturas"></a>

### listados.mostrar\_listado\_asignaturas()
Metodo para ver el listado de asignaturas, que es exactamente igual al anterior

**Kind**: instance method of [<code>Listados</code>](#Listados)
<a name="Listados+mostrar_matriculaciones"></a>

### listados.mostrar\_matriculaciones()
Metodo para ver las matriculaciones.
    Es parecido a los anteriores, pero se recorre la lista con un bucle for para ir indicandole en cada
    posicion lo que busca

**Kind**: instance method of [<code>Listados</code>](#Listados)
<a name="Listados+mostrar_desmatriculaciones"></a>

### listados.mostrar\_desmatriculaciones()
Metodo para ver las desmatriculaciones. Es igual al anterior, pero solo busca en la lista de desmatriculaciones.

**Kind**: instance method of [<code>Listados</code>](#Listados)
<a name="Listados+matricular_alumno_asignatura"></a>

### listados.matricular\_alumno\_asignatura(id, asignatura_nombre, listado_alumnos, listado_asignaturas)
Metodo para matricular a un alumno a un listado de matriculaciones.

    El método usa la id del alumno, el nombre a la asignarura, y los listados de alumnos y asignaturas para comprobar
    que tanto la id como el alumno estén previamente en los listados.

    Para comprobar esto se hace 3 condicionales para buscarlos dentro de un bucle for en sus listados correspodientes
    , si están se añade un valor a un indice o se incrementa un contador. Si los 2 indices no se modifican en los condicionales y
    el contador no se mantiene como se indica se le indica al usuario y se acaba el metodo. Si se han encontrado en un listado de matriculaciones se añaden ambos
     objetos junto con la fecha de matriculacion en formato europeo dia-mes-año y una copia por referencia de las calificaciones

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a matricular |
| asignatura_nombre | <code>string</code> | nombre de la asignatura a matricular |
| listado_alumnos | <code>object</code> | nombre del listado de alumnos para comprobar |
| listado_asignaturas | <code>object</code> | nombre del listado de asignaturas para comprobar |

<a name="Listados+test_matricula"></a>

### listados.test\_matricula(id, asignatura_nombre, listado_alumnos, listado_asignaturas)
Test para comprobar dónde están los fallos en las matriculaciones si los hubiera.
    /* Consiste en un if anidado que fuerza a la salida cada vez que hay algo mal para que se vea
    todo de manera más clara a la hora de cambiar algo.

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a matricular |
| asignatura_nombre | <code>string</code> | nombre de la asignatura a matricular |
| listado_alumnos | <code>object</code> | objeto listado de alumnos |
| listado_asignaturas | <code>object</code> | objeto listado de asignaturas |

<a name="Listados+desmatricular_alumno_asignatura"></a>

### listados.desmatricular\_alumno\_asignatura(id, nombre_asignatura, listado_desmatriculaciones)
Metodo para desmatricular a un alumno del listado.
    Es un metodo parecido a otros anteriores para borrar elementos de listados, con la diferencia que ahora
    cuando se borra se añade a un listado de dematriculaciones en el que se añade tambien la fecha de desmatriculaciones

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a desmatricular |
| nombre_asignatura | <code>string</code> | nombre de la asignatura a desmatricular |
| listado_desmatriculaciones | <code>object</code> | objeto listado de desmatriculaciones |

<a name="Listados+agregar_notas_matricula"></a>

### listados.agregar\_notas\_matricula(id, asignatura)
Metodo para agregar notas individuales a los alumnos matriculados.
    Se pide al usuario el id del alumno y el nombre de la asignatura. Con un bucle for
    se busca en el listado esos parametros y se guarda en un indice. Si este indice no se encuentra y se mantiene
    como null dentro de todo el bucle for se indica al usuario y se acaba. Si lo encuentra se hacen 2 bucles, uno para pedir
    cuantas notas se van a introducir y otra para notas individuales. Si fallan cualquiera de los 2 se vuelve a pedir el número hasta
    que se meta correctamente. Las notas se controla que estén entre 0 y 10, si está todo correcto se da cada salida individiual y luego
    la salida general del bucle añadiendose al listado de matriculaciones en las notas individuales si el contador es igual al numero
    de calificaciones a introducir

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno al que añadir notas |
| asignatura | <code>string</code> | nombre de la asignatura a la que añadir notas |

<a name="Listados+test_meter_notas"></a>

### listados.test\_meter\_notas(id, asignatura)
Test para ver si se están añadiendo notas correctamente.
    /*El test comparte la funcionalidad de agregar notas pero con la diferencia que se van guardando en un array a parte
    finalmente se comprueba si las notas coinciden con array pop en un bucle inverso (ya que pop extra la última)
    Si las notas x coindicen en posicion en los array se sabe que se ha hecho bien

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | id del alumno a testear |
| asignatura | <code>\*</code> | nombre de la asignatura a testear |

<a name="Listados+listado_asignatura_por_alumno"></a>

### listados.listado\_asignatura\_por\_alumno(id)
Metodo para filtrar las asignaturas por alumno.
    Con el id del alumno se pasa por un bucle y para cada posicion en la que esté el alumno
    se imprime el nombre de la asignatura

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a filtrar |

<a name="Listados+promedio_notas_indidivuales_asignatura"></a>

### listados.promedio\_notas\_indidivuales\_asignatura(id, asignatura) ⇒ <code>number</code>
Metodo para calcular el promedio de asignaturas inviduales.
    Se comprueba primero que los parametros estén dentro del listado con bucles for y se asignan valores
    a los indices. Si algo de los indices es null se acaba el metodo y se le indica al usuario que no están en el listado
    el alumno o asignatura.
    Si se encuentran se recorre con un bucle cada nota y se va sumando en un contador y luego se divide entre la longitud del array

**Kind**: instance method of [<code>Listados</code>](#Listados)
**Returns**: <code>number</code> - devuelve el promedio de las notas de la asignatura

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a calcular |
| asignatura | <code>string</code> | nombre de la asignatura a calcular |

<a name="Listados+promedio_notas_alumno"></a>

### listados.promedio\_notas\_alumno(id) ⇒ <code>number</code>
Metodo para calcular el promedio general de un alumno en todas las asignaturas.
    Es parecido al anterior en estructura, pero con la diferencia que se van acumulando en el contador
    el promedio volviendo a la funcion anterior para luego dividirlo entre el numero hecho con un contador de asignaturas

**Kind**: instance method of [<code>Listados</code>](#Listados)
**Returns**: <code>number</code> - devuelve el promedio general del alumno

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a calcular |

<a name="Listados+promedio_notas_asignatura"></a>

### listados.promedio\_notas\_asignatura(asignatura)
Metodo para calcular el promedio por asignatura.
    Parecido a los anteriores en estructura pero se hace un doble bucle para una vez encontrado
    el indice de la asignatura se vayan guardando las calificaciones individuales de cada alumno.

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| asignatura | <code>string</code> | nombre de la asignatura a calcular |

<a name="Listados+promedio_todos_estudiantes"></a>

### listados.promedio\_todos\_estudiantes() ⇒ <code>number</code>
Metodo para calcular la media de todos los alumnos.
    Parecido a los anteriores, pero con un array para guardar las id de cada alumno, ya que hay riesgo de que se repita el alumno

**Kind**: instance method of [<code>Listados</code>](#Listados)
**Returns**: <code>number</code> - devuelve la media general de todos los alumnos
<a name="Listados+reporte_alumno_individual"></a>

### listados.reporte\_alumno\_individual(id)
Metodo para mostrar todos los datos individuales del alumno en el listado.
     Cuenta con un array que va guardando las combinaciones entre asignatura e id para que no se repita
     El metodo parte de un booleano en false y entra a un bucle que va buscando los datos que interesa en el listado, ya que el alumno
     no se ha repetido se entra al bucle y marca la primera linea que indica su nombre y promedio general. Esto ya no se repetira más ya que ahora
     el valor es true.

     Posteriormete se crea una combinacion de atributos y con some se comprueba está dentro del array de combinaciones, si no lo está lo incorpora
     e imprime todo lo necesario para las asignturas que sean necesarias

**Kind**: instance method of [<code>Listados</code>](#Listados)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id del alumno a reportar |

<a name="Listados+mostrar_reporte_total"></a>

### listados.mostrar\_reporte\_total()
Metodo para reporte general de alumnos, para que no haya problemas con el anterior, ya que se llama para cada id,
    se crea un array con los id repetidos, ya que sino le puede pasar el mismo id y que se imprima x veces

**Kind**: instance method of [<code>Listados</code>](#Listados)
<a name="errorPersonalizado"></a>

## errorPersonalizado
**Kind**: global class
<a name="new_errorPersonalizado_new"></a>

### new errorPersonalizado(mensaje)
Error personalizado para que hereda de la clase general error.


| Param | Type | Description |
| --- | --- | --- |
| mensaje | <code>string</code> | mensaje de error personalizado |

<a name="pedir_string"></a>

## pedir\_string(texto) ⇒ <code>string</code>
Funcion para pedir texto al usuario, ya que se va a usar un menú e indicarle instrucciones al usuario de lo que tiene que escribir.
La funcion principal es ahorrar líneas de código y no escribir todo de nuevo, y corregir que no sea entrada null o espacio vacio.
Nueva modificacion, ahora en vez de imprimir el error por console.log ahora lanza un error personalizado

**Kind**: global function
**Returns**: <code>string</code> - devuelve la cadena de texto que ha introducido el usuario

| Param | Type | Description |
| --- | --- | --- |
| texto | <code>string</code> | texto que se le pide al usuario |

<a name="pedir_numero"></a>

## pedir\_numero() ⇒ <code>number</code>
Funcion para pedir números al usuario, principalmente usado para controlar los errores del menú en el switch.
En este metodo se pide número hasta que te de el correcto evitando tanto cadenas de texto como números negativos

Actualizado: Añadimos error personalizado al igual que el anterior

**Kind**: global function
**Returns**: <code>number</code> - devuelve el número que ha introducido el usuario
