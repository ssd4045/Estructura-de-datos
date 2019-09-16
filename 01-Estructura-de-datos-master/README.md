# Test-first Estructura de Datos

## Introducción

### Contexto

Los Tipos de Datos Abstractos (ADTs) son entidades puramente conceptuales que comprenden información y permiten operaciones sobre esa información. Las estructuras de datos (DSs) son soluciones programáticas reales para implementar un ADT. Ambos son muy importantes para la informática en general y también una gran manera de entender mejor la Programación Orientada a Objetos (OOP).

#### Tipo de Dato Abstracto (ADT)

Un ADT es una descripción de la información, como esa información esta conectada, y performa operaciones sobre la información. Por ejemplo, una lista es una colección ordenada de elementos, que pueden ser añadidos o leidos. Un diccionario es un set de key-value pairs, donde podes obtener o setear un valor (e.g. "Toni") por key (e.g "nombre"). Notece que un ADT dice nada sobre el programa, memoria, pasos, etc. - es solo un concepto 

#### Estructura de Datos (DS)

Un DS por el otro lado es una *solución pragramática* específica para guardar, referir y acceder a la data en la memoria de la computadora. El proposito de una estructura de datos es para implementar un ADT - por ejemplo, tomar el concepto de una lista y hacerlo en código (tomar tal y tal dato en una dirección en memoria e incrementar una variable, etc.).

Normalmente una ADT puede ser implementada via mas de una DS. Dado que diferentes DSs tienen ventajas y desventajas de funcionalidad y performance, es beneficioso tener un solido entendimiento de como funcionan.

#### Que vamos a hacer?

En este taller, vamos a escribir las implementaciones JavaScript de algunos ADT y DSs diferentes, incluyendo colas, listas anidadas, hash tables y árboles de búsqueda binarios.


### Correr los tests

Asumiendo que tienen testem instalado globalmente (`npm install -g testem`), siplemente corran `npm test` en este proyecto para testear todos los specs a la vez. También pueden correr `testem` adentro de una carpeta para correr los specs específicos.

## Parte 1

### The Queue ADT

| **Operacion** | **Acción**                                  | **Notas**                                                                                      |   |   |
|:-------------:|---------------------------------------------|------------------------------------------------------------------------------------------------|---|---|
| `enqueue`     | agrega un valor al queue                    | respeta el orden existente                                                                     |   |   |
| `dequeue`     | remueve un valor del queue                  | Obedece a FIFO (first in first out) y respeta el underflow (que pasa cuando el tamaño es cero) |   |   |
| `size`        | devuelve el numero de elementos en el queue |                                                                                                |   |   |

**NO PUEDEN** usar los metodos `push`/`pop`/`shift`/`unshift`, ni ningun otro metodo del `Array.prototype`, ni `.length`. Puedes usar un objecto o un arreglo para guardar tu data y mantener un `head` y `tail` como puntero que cambia cuando funciones como `enqueue` y `dequeue` son llamadas.

Como un Queue es un tipo de ADT, tiene mas de una DS que puede ser usado para resolverlo. Cuando terminen con su Linked List, traten volver a estos specs y usar la Linked List para implementar el Queue

### The Linked List DS

Las operaciones de la LL son mucho mas facil de entender y tener en cuenta si diagramas los posibles caso paso por paso con lapiz y papel.

### Queue ADT via LL DS

Si has implementado la lista anidada, ahora deberías ir devuelta a tu queue y reimplementarla utilizando la linked list

1. Copiar tu solucion de linked list en un nuevo archivo `ll.js` en la carpeta de queue. 
2. Comenta tu solucion actual de queue
3. Escribe una solucion que utilice tu LL, en vez de un arreglo. 

Notese que los mismos test pueden ser resueltos utilizando dos soluciones muy diferentes. Esto es el core de la distinción entre ADT y DS - la primera es lo que queremos, la segunda es como lo logramos. Es un caso muy común que un ADT tiene muchas DS como implemtacions posibles, cada una con sus pros y cons. Un buen programador elegiria la mejor DS para su caso particular. 

Discute con tu pareja los pros y cons de usar una lista anidada vs. un arreglo para implementar el Queue ADT.

## Parte 2

### Binary Search Tree DS

Arboles son poderosas estructuras de datos que solucionan multiples problemas en la ciencia de la computación. Un Arbol Binario es un tipo de arbol en el cual cada nodo tiene hasta dos hijos, (left and/or right child or lesser/greater child). Es un arbol de busqueda si todos los nodos respetan un orden: todos los valores menores en un nodo especifico son un sub-arbol a la izquierda y todos los valores mayores o iguales de un nodo estan guardados en el sub-arbol a la derecha. Los Arboles son estructuras muy recursivas, dado una raiz de nodo, el hijo izquierdo es la raiz de un sub-arbol y el hijo de la derecha es otra raiz de otro sub-arbol. **Seguramente necesites recursión para resolver los problemas.**

La excelente calidad de un BST (Binary Search Tree) es que rapido pueden insertar o encontrar un valor particular. Por ejemplo, para conseguir el valor minimo en un BST, solo tenees que seguir el camino izquierdo para abajo. Por cada nodo que saltas, estas en promedio dejando atras la mitad de los nodos restantes en tu busqueda! Esto significa que por un arbol balanceado de n nodos, vas a encontrar el minimo en un promedio de log2(n) movimientos. Log2(n) crece muy muy lentro con respecto a n:

| Numero de n nodos en el árbol | log2(n) (Número de pasos promedios para encontrar le mínimo) |
|-------------------------------|--------------------------------------------------------------|
| 1                             | 0                                                            |
| 8                             | 3                                                            |
| 64                            | 6                                                            |
| 512                           | 9                                                            |
| 4096                          | 12                                                           |

Para un arbol de más de 4000 nodos, vamos a encontrar el nodo minimo en masomenos 12 pasos. Eso es mucho mejor que un arreglo desordenado o una lista anidada, por el cual vamos a tener que checkear 4096 valores para encontrar cual es el minimo. Lamentablemente, este es el caso ideal, y depende the los sub-arboles todos teniendo el mismo numero de numeros a la derecha y a la izquierda (balanceado) - en el peor caso, un arbol degenerado es solo una lista anidada.

Un problema clasico para los arboles es como recorrerlos, visitar y procesar cada nodo. Hay cuatro tipo de recorridos sobre un arbol:

- Breadth-first: Empezar al nivel 0, e ir por todos los nodos del el nivel 1, luego ir por todos los nodos del nivel 2, etc. Esto es significativo cuando el nivel del arbol tiene algun significado. Por ejemplo: una organizacion jerarquica. Es menos util para un BST, donde los niveles usualmente no tienen un significado intrinseco.
- Depth-first: ve para abajo hasta cierto punto de parada antes de moverte a la siguiente rama. Tres tipos:
    + pre-order: procesa el nodo actual, luego ve para abajo por la izquierda y luego por la derecha. Esto procesa el padre antes de las hojas, entonces se puede usar para copiar un arbol.
    + in-order: procesa todos los hijos a la izquierda, luego el valor del nodo, y luego el hijo a la derecha. Este es el mas util para un BST porque respeta el orden del arbol, los valores son procesados de menor a mayor.
    + post-order: procesa todos los hijos a la izquierda, despues los de la derecha, y finalmente el valor del nodo. Esto procesa las hojas antes que los paderes, entonces se puede usar en lenguajes con gestión de memoria para borrar nodos de una manera segura.

### Hash Table DS

> Nota: cuando estes escribiendo tu Hash class, si corres tus testem en tu carpeta de hash vas a necesitar copiar tu archivo de linked list dentro de tu carpeta del hash. Esto es porque Testem no tiene una gestión de dependencias. Ademas, asegurate de llamar tu archivo de LL algo que viene ates q "h" alfabeticamente, ya que Testem carga archivos en orden alfabetico. Por supuesto, si tu corres todos los specs a la vez, ejecutando testem desde el top-lever directory, esto no es necesario. 

Los Hash Tables son un tipo de structura de dato usado para implementar un Diccionario, Arreglo Asociativo u otras entidades que permitan dinamicamente guardar y buscar valor a traves de un string key. Los motores de Javascript (como V8) normalment e implementan objetos usando hash tables, pero no siempre. La idea basica es la siguiente:

- Una hash table contine un arreglo de "contenedores" donde puede guardar data.
- Para guardar un valor asociado a un key (string):
    + Correr la llave a través de un funcion hasheadora para transformarlo a un numero entero
    + Usar ese numero como indece para ver en cual contenedor guardar el valor
- Para buscar el valor por su key:
    + correr la key por la funcion hasheadora para conseguir el número
    + usar el numero para buscar el contenedor donde esta el valor
    + devolver el valor

Desafortunadamente, hay un gran numero de strings permitidas que pueden actuar como llaves, y un cantidad limita de espacio que podriamos reservar para contenedores. ¿Si el numero de contenedores es mucho mas chico que el numero de posibles keys, como manejamos las colisiones (dos keys hasheando al mismo contendor)? Hay varias estrategias, nosotros vamos a usar una estructura de datos secundaria en cada contenedor, una linked list.  

- Para setear un valor por llave, hasheamos la llave, vamos al contendor correspondiente, y guardamos el valor en la lista anidada.
- Si otra accion de guardado hashease al mismo contenedor, no es un problema - solamente añadimos un nuevo nodo a esa lista.

Ahora podemos guardar dos o mas valores en un mismo contenedor, pero tenemos un nuevo problema: ¿Qué valor corresponde a qué key? Necesitamos asociar key y valor de alguna manera. Así cuando buscamos por key podemos buscar a través de la linked list por el key-value pair que matchié nuestra llave, y devolver el valor correspondiente.

## Extra-Credit

### Mas Estructuras!

Si ya terminaste y todavia queda tiempo podes implementar un [Circular-Buffer Queue](https://en.wikipedia.org/wiki/Circular_buffer) y un [Graph](https://en.wikipedia.org/wiki/Graph_ (abstract_data_type)). En los specs dentro de la carpeta extra-credit vas a encontrar más explicación de lo que tenes que hacer. Recomendamos empezar con el Queue.
