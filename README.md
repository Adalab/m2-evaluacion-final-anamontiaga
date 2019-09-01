# Ejercicio de evaluación final ‒ Módulo 2

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, dondedemostraremos los conocimientos de JavaScript a dquiridos durante el módulo. El ejercicio también tiene una parte de maquetación con HTML y Sass, os recomendamos dedicar esfuerzo a la
maquetación una vez terminada la parte de JavaScript, ya que los criterios de evaluación están relacionados con esta última.

Vamos de definir los distintos hitos del ejercicio:

## 1. Estructura básica
En primer lugar vamos a realizar una estructura básica sobre este modelo. No nos centramos en
medidas, colores ni tipografía hasta un hito posterior.
La aplicación de búsqueda de series consta de dos partes
1. Un campo de texto y un botón para buscar series por su título
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título

## 2. Búsqueda
Al hacer clic sobre el botón de 'Buscar', nuestra aplicación debe conectarse al API abierto de TVMaze para búsqueda de series. Os recomendamos echar un vistazo al JSON que devuelve una petición de búsqueda para ver qué datos de los que nos devuelve necesitamos. Para construir la URL de búsqueda necesitaremos recoger el texto que ha introducido el usuario en el campo de búsqueda. Por cada show contenido en el resultado de búsqueda debemos pintar una tarjeta donde mostramos una imagen de la serie y el título.

Algunas de las series que obtenemos en los resultados no tienen imagen. En ese caso debemos mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto:
https://via.placeholder.com/210x295/ffffff/666666/?text=TV

## 3. Favoritos
Una vez aparecen los resultados de búsqueda, podremos indicar cuáles son nuestras series favoritas. Para ello, al hacer clic sobre un resultado el color de fondo y el de fuente se intercambian. Además, debes crear un listado (array) con las series favoritas que almacenamos en una variable. Este listado lo mostraremos en la parte izquierda de la pantalla, debajo del formulario de búqueda. Para terminar, si volvemos a realizar una nueva búsqueda, los favoritos se irán acumulando en nuestra lista.

## 4.Almacenamiento local
Vamos a almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página
el listado de favoritos se mantiene.

### BONUS: Afinar la maquetación
Una vez terminada la parte de interacción, podemos centrarnos en la parte de maquetación donde tenéis libertad para decidir los estilo. En cualquier caso os dejamos una propuesta gráfica.

### BONUS: Borrar favoritos
Como bonus, os proponemos la opción de borrar favoritos. De esta forma, al hacer clic sobre el icono de la 'x' al lado de los favoritos, podremos borrarlos (de nuestra lista y del localStorage).
Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar favorito al hacer clic sobre una serie. Y que, si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).

Y ya sería fantástico si al final de la lista de favoritos tenemos un botón para borrarlos todos.

