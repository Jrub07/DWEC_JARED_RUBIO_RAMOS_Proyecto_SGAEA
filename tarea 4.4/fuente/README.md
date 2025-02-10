# 1º División en módulos

Para poder dividir el proyecto en módulos se recogió el código original y se dividió según sus clases, es decir:

- **1º Dirección**  
- **2º Usuarios**  
- **3º Estudiantes**  
- **4º Asignaturas**  
- **5º Listados**  
- **6º Error personalizado**  
- **7º Funciones**  
- **8º Main**  

# 2º Exportación e importación  

A la hora de exportar e importar código es necesario implementar comandos. En este caso, la primera clase que surge es `Direccion.js`, la cual se exportará como `default` ya que se emplea como conjunto con el resto de clases.  

`Direccion` se exportará para `Usuarios`, y en esta clase se importará mediante el comando `import` con el nombre de su clase y la dirección donde se encuentra. Por ejemplo:

```javascript
import Direccion from './Direccion.js';
```

Dirección se implementa en `Usuarios`, y esta última se implementa en `Estudiante` como herencia, usando la misma lógica de exportación/importación.

Posteriormente se crean las clases de `Asignaturas`, que junto a `Estudiante` se implementan en `Listados`  (clase para manejar listados de ambas), exportándose como default.

Finalmente se crean las clases `Funciones` y `ErrorPersonalizado`, que son exportadas como default e implementadas en la clase main mediante importación general:

 ```javascript

import Estudiante from './Estudiantes.js';

import Direccion from './Direccion.js';

import Asignaturas from './Asignaturas.js';

import Listados from './Listados.js';

import errorPersonalizado from './errorPersonalizado.js';

import Funciones from './Funciones.js';´´´