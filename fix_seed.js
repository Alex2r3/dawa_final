const fs = require('fs');

let sql = fs.readFileSync('d:/reactfinal/database/seed.sql', 'utf8');

// Fix the \n issue in the SQL script by converting literal \n to actual newlines,
// EXCEPT inside the JSON column which needs them escaped, or maybe the JSON doesn't have \n.
// Actually, it's safer to just replace it everywhere except for JSON.
// In seed.sql, the \n is mainly in the `codigo` and `respuesta_correcta` columns.
sql = sql.replace(/\\n/g, '\n');

// Let's make some algorithmic exercises harder (Mundo 10)
sql = sql.replace(
  /'bbbbbbbb-0010-0000-0000-000000000002','multiple','¿Cuál es la complejidad de la búsqueda lineal\?',NULL,'O\(n\)','La búsqueda lineal revisa cada elemento, en el peor caso revisa todos: O\(n\)\.','\{"opciones":\["O\(1\)","O\(log n\)","O\(n\)","O\(n²\)"\]\}',1\)/,
  `'bbbbbbbb-0010-0000-0000-000000000002','multiple','¿Qué estructura de datos es ideal para implementar una búsqueda en anchura (BFS)?',NULL,'Cola (Queue)','BFS explora por niveles, por lo que utiliza una estructura FIFO (First-In, First-Out).','{"opciones":["Pila (Stack)","Cola (Queue)","Árbol Binario","Grafo Dirigido"]}',1)`
);

sql = sql.replace(
  /'bbbbbbbb-0010-0000-0000-000000000005','Jefe Legendario',          'El reto final de CodeQuest',              'leyenda', 15, 150, 75, 5\);/,
  `'bbbbbbbb-0010-0000-0000-000000000005','Jefe Legendario',          'Optimización Dinámica y Grafos',              'leyenda', 15, 150, 75, 5);`
);

sql = sql.replace(
  /'bbbbbbbb-0010-0000-0000-000000000004','multiple','¿Qué es la complejidad O\(1\)\?',NULL,'Tiempo constante, no depende del tamaño de entrada'/g,
  `'bbbbbbbb-0010-0000-0000-000000000004','multiple','¿Cuál es la complejidad temporal de QuickSort en el peor de los casos?',NULL,'O(n²)'`
);

fs.writeFileSync('d:/reactfinal/database/seed.sql', sql);
console.log('seed.sql updated!');
