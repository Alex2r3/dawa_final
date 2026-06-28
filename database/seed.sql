-- ============================================================
-- CodeQuest - Seed Data
-- Run AFTER schema.sql
-- Test password for all users: Test1234!
-- Hash generated with bcrypt rounds=10
-- ============================================================

-- ============================================================
-- WORLDS (10)
-- ============================================================
INSERT INTO worlds (id, nombre, descripcion, icono, color, orden) VALUES
('aaaaaaaa-0000-0000-0000-000000000001', 'Fundamentos',             'Los bloques básicos de la programación',               '🧱', '#6366f1', 1),
('aaaaaaaa-0000-0000-0000-000000000002', 'Variables y Tipos',       'Aprende a almacenar y manejar datos',                   '📦', '#8b5cf6', 2),
('aaaaaaaa-0000-0000-0000-000000000003', 'Operadores',              'Operaciones matemáticas y lógicas',                     '⚡', '#f59e0b', 3),
('aaaaaaaa-0000-0000-0000-000000000004', 'Condicionales',           'Toma de decisiones en el código',                       '🔀', '#10b981', 4),
('aaaaaaaa-0000-0000-0000-000000000005', 'Bucles',                  'Repite acciones de forma eficiente',                    '🔄', '#3b82f6', 5),
('aaaaaaaa-0000-0000-0000-000000000006', 'Métodos y Funciones',     'Organiza y reutiliza tu código',                        '🔧', '#ef4444', 6),
('aaaaaaaa-0000-0000-0000-000000000007', 'Arreglos y Colecciones',  'Maneja grupos de datos',                                '📚', '#ec4899', 7),
('aaaaaaaa-0000-0000-0000-000000000008', 'POO',                     'Programación Orientada a Objetos',                      '🏛️', '#14b8a6', 8),
('aaaaaaaa-0000-0000-0000-000000000009', 'SQL y Bases de Datos',    'Consulta y manipula bases de datos',                    '🗄️', '#f97316', 9),
('aaaaaaaa-0000-0000-0000-000000000010', 'Algoritmos',              'Resuelve problemas complejos',                          '🧮', '#a855f7', 10);

-- ============================================================
-- LEVELS (50 = 5 per world)
-- ============================================================

-- World 1: Fundamentos
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000001','¿Qué es un programa?',    'Introducción a la programación',          'facil',   60, 10, 5, 1),
('bbbbbbbb-0001-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000001','Sintaxis básica',          'Aprende las reglas del lenguaje',         'facil',   60, 10, 5, 2),
('bbbbbbbb-0001-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000001','Comentarios en el código', 'Documenta tu código correctamente',       'facil',   60, 10, 5, 3),
('bbbbbbbb-0001-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000001','Salida por consola',       'Muestra información al usuario',          'medio',   45, 20, 10, 4),
('bbbbbbbb-0001-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000001','Jefe: Fundamentos',        'Pon a prueba todo lo aprendido',          'dificil', 30, 40, 20, 5);

-- World 2: Variables y Tipos
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000002','Declarar variables',       'Aprende a crear variables',               'facil',   60, 10, 5, 1),
('bbbbbbbb-0002-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000002','Tipos de datos',           'int, float, String, boolean',             'facil',   60, 10, 5, 2),
('bbbbbbbb-0002-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000002','Constantes',               'Valores que no cambian',                  'medio',   45, 20, 10, 3),
('bbbbbbbb-0002-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000002','Conversión de tipos',      'Casting y conversiones',                  'medio',   45, 20, 10, 4),
('bbbbbbbb-0002-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000002','Jefe: Variables',          'Desafío final de variables',              'dificil', 30, 40, 20, 5);

-- World 3: Operadores
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000003','Operadores aritméticos',   '+, -, *, /, %',                           'facil',   60, 10, 5, 1),
('bbbbbbbb-0003-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000003','Operadores relacionales',  '<, >, ==, !=',                            'facil',   60, 10, 5, 2),
('bbbbbbbb-0003-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000003','Operadores lógicos',       '&&, ||, !',                               'medio',   45, 20, 10, 3),
('bbbbbbbb-0003-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000003','Precedencia de operadores','El orden importa',                        'medio',   45, 20, 10, 4),
('bbbbbbbb-0003-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000003','Jefe: Operadores',         'Combinación de operadores',               'dificil', 30, 40, 20, 5);

-- World 4: Condicionales
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000004','if básico',                'Toma la primera decisión',                'facil',   60, 10, 5, 1),
('bbbbbbbb-0004-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000004','if-else',                  'Dos caminos posibles',                    'facil',   60, 10, 5, 2),
('bbbbbbbb-0004-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000004','else-if en cadena',        'Múltiples condiciones',                   'medio',   45, 20, 10, 3),
('bbbbbbbb-0004-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000004','switch-case',              'Alternativa al if-else',                  'medio',   45, 20, 10, 4),
('bbbbbbbb-0004-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000004','Jefe: Condicionales',      'Lógica condicional avanzada',             'experto', 20, 80, 40, 5);

-- World 5: Bucles
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000005','Bucle for',                'Repite un número fijo de veces',          'facil',   60, 10, 5, 1),
('bbbbbbbb-0005-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000005','Bucle while',              'Repite mientras se cumpla condición',     'facil',   60, 10, 5, 2),
('bbbbbbbb-0005-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000005','Bucle do-while',           'Se ejecuta al menos una vez',             'medio',   45, 20, 10, 3),
('bbbbbbbb-0005-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000005','break y continue',         'Controla la ejecución del bucle',         'medio',   45, 20, 10, 4),
('bbbbbbbb-0005-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000005','Jefe: Bucles',             'Bucles anidados y complejos',             'experto', 20, 80, 40, 5);

-- World 6: Métodos y Funciones
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000006','¿Qué es un método?',       'Bloques de código reutilizables',         'facil',   60, 10, 5, 1),
('bbbbbbbb-0006-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000006','Parámetros y argumentos',  'Pasa datos a tus funciones',              'facil',   60, 10, 5, 2),
('bbbbbbbb-0006-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000006','Valor de retorno',         'Las funciones que devuelven algo',        'medio',   45, 20, 10, 3),
('bbbbbbbb-0006-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000006','Sobrecarga de métodos',    'El mismo nombre, diferentes parámetros',  'medio',   45, 20, 10, 4),
('bbbbbbbb-0006-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000006','Jefe: Métodos',            'Recursión y métodos complejos',           'experto', 20, 80, 40, 5);

-- World 7: Arreglos
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000007','Crear un arreglo',         'Declara e inicializa arreglos',           'facil',   60, 10, 5, 1),
('bbbbbbbb-0007-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000007','Acceder a elementos',      'Usa índices para acceder a datos',        'facil',   60, 10, 5, 2),
('bbbbbbbb-0007-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000007','Recorrer arreglos',        'Itera sobre todos los elementos',         'medio',   45, 20, 10, 3),
('bbbbbbbb-0007-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000007','ArrayList y listas',       'Colecciones dinámicas',                   'medio',   45, 20, 10, 4),
('bbbbbbbb-0007-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000007','Jefe: Arreglos',           'Algoritmos con arreglos',                 'experto', 20, 80, 40, 5);

-- World 8: POO
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000008','Clases y Objetos',         'Los fundamentos de la POO',               'medio',   45, 20, 10, 1),
('bbbbbbbb-0008-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000008','Atributos y Métodos',      'Define el estado y comportamiento',       'medio',   45, 20, 10, 2),
('bbbbbbbb-0008-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000008','Constructores',            'Crea objetos correctamente',              'medio',   45, 20, 10, 3),
('bbbbbbbb-0008-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000008','Herencia',                 'Reutiliza código con herencia',           'dificil', 30, 40, 20, 4),
('bbbbbbbb-0008-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000008','Jefe: POO',                'Polimorfismo y encapsulamiento',          'experto', 20, 80, 40, 5);

-- World 9: SQL
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000009','SELECT básico',            'Consulta datos de una tabla',             'facil',   60, 10, 5, 1),
('bbbbbbbb-0009-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000009','WHERE y filtros',          'Filtra los resultados',                   'facil',   60, 10, 5, 2),
('bbbbbbbb-0009-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000009','INSERT, UPDATE, DELETE',   'Modifica datos en la BD',                 'medio',   45, 20, 10, 3),
('bbbbbbbb-0009-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000009','JOINs',                    'Une tablas relacionadas',                 'dificil', 30, 40, 20, 4),
('bbbbbbbb-0009-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000009','Jefe: SQL',                'Consultas complejas con subconsultas',    'experto', 20, 80, 40, 5);

-- World 10: Algoritmos
INSERT INTO levels (id, world_id, titulo, descripcion, dificultad, tiempo_limite, xp_recompensa, monedas_recompensa, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000010','¿Qué es un algoritmo?',   'Resuelve problemas paso a paso',          'medio',   45, 20, 10, 1),
('bbbbbbbb-0010-0000-0000-000000000002','aaaaaaaa-0000-0000-0000-000000000010','Búsqueda lineal',          'Busca un elemento en una lista',          'medio',   45, 20, 10, 2),
('bbbbbbbb-0010-0000-0000-000000000003','aaaaaaaa-0000-0000-0000-000000000010','Búsqueda binaria',         'Busca eficientemente en datos ordenados', 'dificil', 30, 40, 20, 3),
('bbbbbbbb-0010-0000-0000-000000000004','aaaaaaaa-0000-0000-0000-000000000010','Ordenamiento burbuja',     'Ordena datos con Bubble Sort',            'dificil', 30, 40, 20, 4),
('bbbbbbbb-0010-0000-0000-000000000005','aaaaaaaa-0000-0000-0000-000000000010','Jefe Legendario',          'El reto final de CodeQuest',              'leyenda', 15, 150, 75, 5);

-- ============================================================
-- CHALLENGES (100 = 2 per level)
-- ============================================================

-- Mundo 1 - Nivel 1 (¿Qué es un programa?)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000001','truefalse','Un programa es una secuencia de instrucciones que la computadora puede ejecutar.',NULL,'true','Correcto. Un programa es un conjunto de instrucciones que la computadora ejecuta en orden.','{}',1),
('bbbbbbbb-0001-0000-0000-000000000001','multiple','¿Cuál de los siguientes es un lenguaje de programación?',NULL,'Java','Java es un lenguaje de programación muy popular.','{"opciones":["HTML","CSS","Java","Photoshop"]}',2);

-- Mundo 1 - Nivel 2 (Sintaxis básica)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000002','multiple','¿Qué símbolo termina una sentencia en Java?',NULL,';','En Java, cada sentencia debe terminar con punto y coma.','{"opciones":[".",":",";","!"]}',1),
('bbbbbbbb-0001-0000-0000-000000000002','truefalse','En Java, el código distingue entre mayúsculas y minúsculas.',NULL,'true','Java es case-sensitive: "Variable" y "variable" son diferentes.','{}',2);

-- Mundo 1 - Nivel 3 (Comentarios)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000003','multiple','¿Cómo se escribe un comentario de una sola línea en Java?',NULL,'//','Las líneas que comienzan con // son comentarios en Java.','{"opciones":["#","//","/*","--"]}',1),
('bbbbbbbb-0001-0000-0000-000000000003','truefalse','Los comentarios son ejecutados por la computadora.',NULL,'false','Los comentarios son ignorados por el compilador. Son solo para humanos.','{}',2);

-- Mundo 1 - Nivel 4 (Salida por consola)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000004','predict','¿Qué imprime este código?','System.out.println("Hola Mundo");','Hola Mundo','System.out.println imprime el texto seguido de un salto de línea.','{}',1),
('bbbbbbbb-0001-0000-0000-000000000004','complete','Completa el código para imprimir "CodeQuest":','System.out.___("CodeQuest");','println','El método correcto para imprimir con salto de línea es println.','{}',2);

-- Mundo 1 - Nivel 5 (Jefe Fundamentos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0001-0000-0000-000000000005','sort','Ordena las líneas para imprimir "Hola" y luego "Mundo":',NULL,'System.out.println("Hola");
System.out.println("Mundo");','El orden de ejecución es de arriba hacia abajo.','{"lineas":["System.out.println(\"Mundo\");","System.out.println(\"Hola\");"]}',1),
('bbbbbbbb-0001-0000-0000-000000000005','fix','Encuentra y corrige el error:','System.out.println("Hola Mundo")','Falta el ; al final','Toda sentencia en Java debe terminar con punto y coma.','{}',2);

-- Mundo 2 - Nivel 1 (Declarar variables)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000001','multiple','¿Cuál es la forma correcta de declarar un entero en Java?',NULL,'int numero = 5;','En Java se usa la palabra reservada int para enteros.','{"opciones":["integer numero = 5;","int numero = 5;","num numero = 5;","Int numero = 5;"]}',1),
('bbbbbbbb-0002-0000-0000-000000000001','predict','¿Cuál es el valor de x?','int x = 10;','10','Al declarar int x = 10; el valor de x es 10.','{}',2);

-- Mundo 2 - Nivel 2 (Tipos de datos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000002','multiple','¿Qué tipo de dato se usa para texto en Java?',NULL,'String','String es la clase que representa cadenas de texto en Java.','{"opciones":["text","String","str","char"]}',1),
('bbbbbbbb-0002-0000-0000-000000000002','truefalse','El tipo boolean solo puede tener los valores true o false.',NULL,'true','Boolean es un tipo de dato que solo acepta true o false.','{}',2);

-- Mundo 2 - Nivel 3 (Constantes)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000003','multiple','¿Qué palabra clave se usa para declarar una constante en Java?',NULL,'final','La palabra clave final hace que una variable no pueda cambiar su valor.','{"opciones":["const","constant","final","static"]}',1),
('bbbbbbbb-0002-0000-0000-000000000003','truefalse','Una constante puede cambiar su valor durante la ejecución del programa.',NULL,'false','Una constante (final) no puede cambiar su valor una vez asignado.','{}',2);

-- Mundo 2 - Nivel 4 (Conversión de tipos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000004','predict','¿Qué imprime este código?','int x = 9;
double y = (double) x;
System.out.println(y);','9.0','Al convertir int a double, se agrega el decimal .0','{}',1),
('bbbbbbbb-0002-0000-0000-000000000004','complete','Convierte el int a String:','int n = 42;
String s = String.___(n);','valueOf','String.valueOf() convierte un int a String.','{}',2);

-- Mundo 2 - Nivel 5 (Jefe Variables)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0002-0000-0000-000000000005','sort','Ordena el código para sumar dos números e imprimir el resultado:',NULL,'int a = 5;
int b = 3;
int suma = a + b;
System.out.println(suma);','Primero declaramos las variables, luego calculamos y mostramos.','{"lineas":["int suma = a + b;","System.out.println(suma);","int b = 3;","int a = 5;"]}',1),
('bbbbbbbb-0002-0000-0000-000000000005','fix','Corrige el error en la declaración:','String nombre = Hola;','Falta las comillas alrededor de Hola','Los String literales deben estar entre comillas dobles.','{}',2);

-- Mundo 3 - Nivel 1 (Operadores aritméticos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000001','predict','¿Qué imprime este código?','int a = 10;
int b = 3;
System.out.println(a % b);','1','El operador % devuelve el resto de la división. 10 % 3 = 1','{}',1),
('bbbbbbbb-0003-0000-0000-000000000001','multiple','¿Qué operador se usa para potencia en Java?',NULL,'Math.pow()','Java no tiene operador ** para potencias. Se usa Math.pow().','{"opciones":["**","^","Math.pow()","^^"]}',2);

-- Mundo 3 - Nivel 2 (Operadores relacionales)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000002','predict','¿Qué imprime este código?','System.out.println(5 > 3);','true','5 es mayor que 3, por lo tanto la expresión es true.','{}',1),
('bbbbbbbb-0003-0000-0000-000000000002','truefalse','El operador == compara valores, mientras que = asigna valores.',NULL,'true','== es comparación, = es asignación.','{}',2);

-- Mundo 3 - Nivel 3 (Operadores lógicos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000003','predict','¿Qué resultado da esta expresión?','System.out.println(true && false);','false','El operador && (AND) solo es true si AMBOS son true.','{}',1),
('bbbbbbbb-0003-0000-0000-000000000003','multiple','¿Qué operador lógico es verdadero si AL MENOS UNO es verdadero?',NULL,'||','El operador || (OR) es true si al menos uno de los operandos es true.','{"opciones":["&&","!","||","^^"]}',2);

-- Mundo 3 - Nivel 4 (Precedencia)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000004','predict','¿Cuánto vale esta expresión?','System.out.println(2 + 3 * 4);','14','La multiplicación tiene mayor precedencia que la suma. 3*4=12, 12+2=14','{}',1),
('bbbbbbbb-0003-0000-0000-000000000004','truefalse','Las expresiones entre paréntesis se evalúan primero.',NULL,'true','Los paréntesis tienen la mayor precedencia en Java.','{}',2);

-- Mundo 3 - Nivel 5 (Jefe Operadores)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0003-0000-0000-000000000005','predict','¿Cuál es el resultado?','int x = 5;
x += 3;
System.out.println(x);','8','x += 3 es equivalente a x = x + 3. 5 + 3 = 8','{}',1),
('bbbbbbbb-0003-0000-0000-000000000005','multiple','¿Qué hace el operador ++ en Java?',NULL,'Incrementa el valor en 1','El operador ++ es el operador de incremento, suma 1 al valor actual.','{"opciones":["Multiplica por 2","Incrementa el valor en 1","Concatena strings","Potencia de 2"]}',2);

-- Mundo 4 - Nivel 1 (if básico)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000001','predict','¿Qué imprime este código?','int edad = 20;
if (edad >= 18) {
  System.out.println("Mayor");
}','Mayor','20 >= 18 es true, así que se ejecuta el bloque if.','{}',1),
('bbbbbbbb-0004-0000-0000-000000000001','truefalse','El bloque if se ejecuta cuando la condición es false.',NULL,'false','El bloque if solo se ejecuta cuando la condición es true.','{}',2);

-- Mundo 4 - Nivel 2 (if-else)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000002','predict','¿Qué imprime?','int nota = 45;
if (nota >= 60) {
  System.out.println("Aprobado");
} else {
  System.out.println("Reprobado");
}','Reprobado','45 < 60, por lo que se ejecuta el bloque else.','{}',1),
('bbbbbbbb-0004-0000-0000-000000000002','complete','Completa el código:','if (x > 0) {
  System.out.println("Positivo");
} ___ {
  System.out.println("No positivo");
}','else','La palabra clave else define qué hacer cuando la condición es false.','{}',2);

-- Mundo 4 - Nivel 3 (else-if)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000003','predict','¿Qué imprime?','int n = 0;
if (n > 0) System.out.println("Positivo");
else if (n < 0) System.out.println("Negativo");
else System.out.println("Cero");','Cero','n=0 no es >0 ni <0, por lo que cae en el else final.','{}',1),
('bbbbbbbb-0004-0000-0000-000000000003','multiple','¿Cuántas condiciones else-if puedes tener en una cadena?',NULL,'Ilimitadas','Puedes encadenar tantos else-if como necesites.','{"opciones":["Solo 1","Solo 2","Solo 3","Ilimitadas"]}',2);

-- Mundo 4 - Nivel 4 (switch-case)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000004','predict','¿Qué imprime?','int dia = 2;
switch(dia) {
  case 1: System.out.println("Lunes"); break;
  case 2: System.out.println("Martes"); break;
  default: System.out.println("Otro");
}','Martes','dia=2 coincide con case 2, imprime "Martes" y el break detiene la ejecución.','{}',1),
('bbbbbbbb-0004-0000-0000-000000000004','truefalse','La sentencia break en un switch evita que se ejecuten los siguientes casos.',NULL,'true','Sin break, la ejecución continúa al siguiente case (fall-through).','{}',2);

-- Mundo 4 - Nivel 5 (Jefe Condicionales)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0004-0000-0000-000000000005','sort','Ordena el código para verificar si un número es positivo, negativo o cero:',NULL,'int n = -5;
if (n > 0) {
  System.out.println("Positivo");
} else if (n < 0) {
  System.out.println("Negativo");
} else {
  System.out.println("Cero");
}','El orden de las condiciones importa.','{"lineas":["} else {","int n = -5;","} else if (n < 0) {","if (n > 0) {","  System.out.println(\"Cero\");","  System.out.println(\"Positivo\");","  System.out.println(\"Negativo\");","}"]}',1),
('bbbbbbbb-0004-0000-0000-000000000005','multiple','El operador ternario a ? b : c equivale a:',NULL,'if(a) b else c','El operador ternario es una forma compacta de if-else.','{"opciones":["a && b || c","if(a) b else c","switch(a) {case b: c}","a * b - c"]}',2);

-- Mundo 5 - Nivel 1 (for)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000001','predict','¿Cuántas veces imprime "Hola"?','for(int i = 0; i < 3; i++) {
  System.out.println("Hola");
}','3','El bucle va de i=0 a i=2 (mientras i<3), entonces itera 3 veces.','{}',1),
('bbbbbbbb-0005-0000-0000-000000000001','complete','Completa el for para contar del 1 al 5:','for(int i = 1; i ___ 5; i++) {','<=','i <= 5 incluye el 5 en el rango.','{}',2);

-- Mundo 5 - Nivel 2 (while)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000002','predict','¿Qué imprime este código?','int i = 0;
while(i < 3) {
  System.out.println(i);
  i++;
}','0
1
2','Imprime i=0, 1, 2. Cuando i=3, la condición es falsa y para.','{}',1),
('bbbbbbbb-0005-0000-0000-000000000002','truefalse','Un bucle while puede no ejecutarse nunca si la condición inicial es false.',NULL,'true','Si la condición inicial es false, el while no ejecuta su cuerpo.','{}',2);

-- Mundo 5 - Nivel 3 (do-while)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000003','truefalse','Un do-while siempre se ejecuta al menos una vez.',NULL,'true','En do-while la condición se evalúa DESPUÉS del primer ciclo.','{}',1),
('bbbbbbbb-0005-0000-0000-000000000003','multiple','¿Dónde está la condición en un do-while?',NULL,'Al final del bloque','La condición del do-while va al final: do { } while(condicion);','{"opciones":["Al inicio","En el medio","Al final del bloque","No tiene condición"]}',2);

-- Mundo 5 - Nivel 4 (break y continue)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000004','predict','¿Qué imprime?','for(int i=0;i<5;i++){
  if(i==3) break;
  System.out.println(i);
}','0
1
2','Cuando i=3, el break detiene el bucle. Solo imprime 0, 1, 2.','{}',1),
('bbbbbbbb-0005-0000-0000-000000000004','predict','¿Qué imprime?','for(int i=0;i<5;i++){
  if(i==3) continue;
  System.out.println(i);
}','0
1
2
4','continue salta el resto del ciclo actual. Se salta el 3.','{}',2);

-- Mundo 5 - Nivel 5 (Jefe Bucles)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0005-0000-0000-000000000005','predict','¿Cuánto vale suma?','int suma = 0;
for(int i=1;i<=10;i++) suma += i;
System.out.println(suma);','55','La suma de 1 a 10 es 55. (n*(n+1)/2 = 10*11/2 = 55)','{}',1),
('bbbbbbbb-0005-0000-0000-000000000005','sort','Ordena el código para imprimir los números pares del 1 al 10:',NULL,'for(int i=1;i<=10;i++) {
  if(i%2==0) {
    System.out.println(i);
  }
}','El módulo 2 identifica los números pares.','{"lineas":["for(int i=1;i<=10;i++) {","    System.out.println(i);","  if(i%2==0) {","  }","}"]}',2);

-- Mundo 6 - Nivel 1 (Métodos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000001','multiple','¿Qué tipo de retorno tiene un método que no devuelve nada?',NULL,'void','void indica que el método no devuelve ningún valor.','{"opciones":["null","empty","void","none"]}',1),
('bbbbbbbb-0006-0000-0000-000000000001','truefalse','Un método puede llamarse a sí mismo (recursión).',NULL,'true','La recursión es cuando un método se llama a sí mismo.','{}',2);

-- Mundo 6 - Nivel 2 (Parámetros)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000002','predict','¿Qué imprime?','static void saludar(String nombre) {
  System.out.println("Hola " + nombre);
}
// saludar("Ana");','Hola Ana','El método recibe "Ana" y lo concatena con "Hola ".','{}',1),
('bbbbbbbb-0006-0000-0000-000000000002','complete','Completa la llamada al método:','static int sumar(int a, int b) { return a+b; }
int r = ___(5, 3);','sumar','Se llama al método con su nombre y los argumentos.','{}',2);

-- Mundo 6 - Nivel 3 (Return)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000003','predict','¿Qué imprime?','static int doble(int n) { return n * 2; }
System.out.println(doble(7));','14','doble(7) devuelve 7*2=14.','{}',1),
('bbbbbbbb-0006-0000-0000-000000000003','truefalse','Una función puede tener múltiples sentencias return.',NULL,'true','Se puede tener varios return, pero solo uno se ejecuta por llamada.','{}',2);

-- Mundo 6 - Nivel 4 (Sobrecarga)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000004','truefalse','Dos métodos con el mismo nombre pero diferentes parámetros pueden coexistir en Java.',NULL,'true','Esto se llama sobrecarga de métodos (method overloading).','{}',1),
('bbbbbbbb-0006-0000-0000-000000000004','multiple','¿Qué es la sobrecarga de métodos?',NULL,'Mismo nombre, diferentes parámetros','La sobrecarga permite definir métodos con el mismo nombre pero diferentes firmas.','{"opciones":["Mismo nombre y mismos parámetros","Mismo nombre, diferentes parámetros","Nombres diferentes, mismos parámetros","Un método que llama a otro"]}',2);

-- Mundo 6 - Nivel 5 (Jefe Métodos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0006-0000-0000-000000000005','predict','¿Qué imprime?','static int factorial(int n) {
  if(n==0) return 1;
  return n * factorial(n-1);
}
System.out.println(factorial(4));','24','factorial(4)=4*3*2*1=24. Es un ejemplo de recursión.','{}',1),
('bbbbbbbb-0006-0000-0000-000000000005','sort','Ordena el método que suma un arreglo:',NULL,'static int sumaArreglo(int[] arr) {
  int total = 0;
  for(int n : arr) total += n;
  return total;
}','Primero inicializamos, luego iteramos y acumulamos.','{"lineas":["  return total;","static int sumaArreglo(int[] arr) {","  for(int n : arr) total += n;","  int total = 0;","}"]}',2);

-- Mundo 7 - Nivel 1 (Arreglos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000001','multiple','¿Cómo se declara un arreglo de enteros en Java?',NULL,'int[] nums = new int[5];','Se usa corchetes [] para arreglos y new para instanciar.','{"opciones":["int nums[5];","array<int> nums(5);","int[] nums = new int[5];","int nums = [5];"]}',1),
('bbbbbbbb-0007-0000-0000-000000000001','predict','¿Cuál es el índice del primer elemento de un arreglo?','int[] arr = {10, 20, 30};','0','Los arreglos en Java comienzan en índice 0.','{}',2);

-- Mundo 7 - Nivel 2 (Acceso)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000002','predict','¿Qué imprime?','int[] nums = {5, 10, 15};
System.out.println(nums[1]);','10','nums[1] accede al segundo elemento (índice 1) que es 10.','{}',1),
('bbbbbbbb-0007-0000-0000-000000000002','truefalse','En Java, acceder a un índice fuera del rango del arreglo lanza una excepción.',NULL,'true','Se lanza ArrayIndexOutOfBoundsException.','{}',2);

-- Mundo 7 - Nivel 3 (Recorrer)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000003','predict','¿Qué imprime?','int[] nums = {1,2,3};
for(int n : nums) System.out.print(n+" ");','1 2 3 ','El for-each recorre todos los elementos del arreglo.','{}',1),
('bbbbbbbb-0007-0000-0000-000000000003','complete','Obtén la longitud del arreglo:','int[] arr = {1,2,3,4,5};
int len = arr.___;','length','La propiedad length devuelve el tamaño del arreglo.','{}',2);

-- Mundo 7 - Nivel 4 (ArrayList)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000004','truefalse','Un ArrayList puede cambiar su tamaño dinámicamente.',NULL,'true','A diferencia de los arreglos, ArrayList crece o decrece según necesidad.','{}',1),
('bbbbbbbb-0007-0000-0000-000000000004','multiple','¿Qué método se usa para agregar un elemento a un ArrayList?',NULL,'add()','El método add() añade un elemento al final del ArrayList.','{"opciones":["push()","insert()","add()","append()"]}',2);

-- Mundo 7 - Nivel 5 (Jefe Arreglos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0007-0000-0000-000000000005','predict','¿Qué imprime?','int[] nums = {3,1,4,1,5};
int max = nums[0];
for(int n : nums) if(n>max) max=n;
System.out.println(max);','5','El algoritmo encuentra el máximo recorriendo el arreglo. El mayor es 5.','{}',1),
('bbbbbbbb-0007-0000-0000-000000000005','sort','Ordena el código para invertir un arreglo de 3 elementos:',NULL,'int[] arr = {1,2,3};
int temp = arr[0];
arr[0] = arr[2];
arr[2] = temp;','Para invertir se necesita una variable temporal.','{"lineas":["arr[2] = temp;","int temp = arr[0];","int[] arr = {1,2,3};","arr[0] = arr[2];"]}',2);

-- Mundo 8 - Nivel 1 (Clases)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000001','multiple','¿Qué es un objeto en POO?',NULL,'Una instancia de una clase','Un objeto es una instancia concreta de una clase.','{"opciones":["Un tipo de dato primitivo","Una función especial","Una instancia de una clase","Un archivo del proyecto"]}',1),
('bbbbbbbb-0008-0000-0000-000000000001','truefalse','Una clase es una plantilla para crear objetos.',NULL,'true','La clase define la estructura y comportamiento; el objeto es la instancia.','{}',2);

-- Mundo 8 - Nivel 2 (Atributos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000002','predict','¿Qué imprime?','class Perro {
  String nombre = "Rex";
}
Perro p = new Perro();
System.out.println(p.nombre);','Rex','Se accede al atributo nombre del objeto p.','{}',1),
('bbbbbbbb-0008-0000-0000-000000000002','multiple','¿Qué modificador de acceso hace un atributo accesible solo dentro de la clase?',NULL,'private','private restringe el acceso solo a la propia clase.','{"opciones":["public","protected","private","default"]}',2);

-- Mundo 8 - Nivel 3 (Constructores)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000003','truefalse','El constructor de una clase tiene el mismo nombre que la clase.',NULL,'true','El constructor siempre lleva el mismo nombre que su clase.','{}',1),
('bbbbbbbb-0008-0000-0000-000000000003','complete','Completa el constructor:','class Auto {
  String marca;
  ___ Auto(String m) { this.marca = m; }
}','public','Los constructores generalmente son public para poder crear objetos desde fuera.','{}',2);

-- Mundo 8 - Nivel 4 (Herencia)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000004','multiple','¿Qué palabra clave se usa para heredar en Java?',NULL,'extends','La palabra clave extends permite que una clase herede de otra.','{"opciones":["implements","inherits","extends","super"]}',1),
('bbbbbbbb-0008-0000-0000-000000000004','truefalse','En Java, una clase puede heredar de múltiples clases simultáneamente.',NULL,'false','Java no soporta herencia múltiple de clases (sí de interfaces).','{}',2);

-- Mundo 8 - Nivel 5 (Jefe POO)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0008-0000-0000-000000000005','multiple','¿Qué es el polimorfismo?',NULL,'Un objeto comportarse de múltiples formas','El polimorfismo permite que objetos de distintas clases respondan al mismo mensaje.','{"opciones":["Tener múltiples constructores","Heredar de varias clases","Un objeto comportarse de múltiples formas","Ocultar los atributos"]}',1),
('bbbbbbbb-0008-0000-0000-000000000005','truefalse','La encapsulación consiste en ocultar los detalles internos de una clase.',NULL,'true','La encapsulación protege los datos internos usando private y getters/setters.','{}',2);

-- Mundo 9 - Nivel 1 (SELECT)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000001','complete','Completa la consulta para obtener todos los usuarios:','SELECT ___ FROM users;','*','El asterisco * selecciona todas las columnas de la tabla.','{}',1),
('bbbbbbbb-0009-0000-0000-000000000001','multiple','¿Qué hace SELECT DISTINCT?',NULL,'Elimina duplicados en los resultados','DISTINCT filtra los valores repetidos del resultado.','{"opciones":["Ordena los resultados","Elimina duplicados en los resultados","Cuenta los registros","Filtra por condición"]}',2);

-- Mundo 9 - Nivel 2 (WHERE)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000002','complete','Filtra usuarios mayores de 18 años:','SELECT * FROM users WHERE edad ___ 18;','>','El operador > filtra los mayores de 18.','{}',1),
('bbbbbbbb-0009-0000-0000-000000000002','predict','¿Qué cláusula ordena los resultados?','SELECT * FROM users ORDER BY nombre ___','ASC','ASC ordena de forma ascendente (A-Z, 1-9).','{}',2);

-- Mundo 9 - Nivel 3 (INSERT/UPDATE/DELETE)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000003','multiple','¿Qué comando elimina registros de una tabla?',NULL,'DELETE','DELETE FROM tabla WHERE condicion elimina registros.','{"opciones":["REMOVE","DROP","DELETE","CLEAR"]}',1),
('bbbbbbbb-0009-0000-0000-000000000003','truefalse','UPDATE sin WHERE modifica TODOS los registros de la tabla.',NULL,'true','Siempre usar WHERE con UPDATE para no modificar toda la tabla accidentalmente.','{}',2);

-- Mundo 9 - Nivel 4 (JOINs)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000004','multiple','¿Qué tipo de JOIN devuelve solo los registros que coinciden en ambas tablas?',NULL,'INNER JOIN','INNER JOIN devuelve la intersección de las dos tablas.','{"opciones":["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN"]}',1),
('bbbbbbbb-0009-0000-0000-000000000004','truefalse','Un LEFT JOIN devuelve todos los registros de la tabla izquierda aunque no haya coincidencia.',NULL,'true','LEFT JOIN incluye todos los de la izquierda, con NULL donde no hay match.','{}',2);

-- Mundo 9 - Nivel 5 (Jefe SQL)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0009-0000-0000-000000000005','multiple','¿Qué función cuenta el número de registros?',NULL,'COUNT()','COUNT(*) cuenta todos los registros; COUNT(col) cuenta no nulos.','{"opciones":["SUM()","TOTAL()","COUNT()","NUMBER()"]}',1),
('bbbbbbbb-0009-0000-0000-000000000005','complete','Agrupa por departamento y cuenta empleados:','SELECT depto, COUNT(*) FROM empleados ___ BY depto;','GROUP','GROUP BY agrupa los registros según una columna.','{}',2);

-- Mundo 10 - Nivel 1 (Algoritmos)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000001','multiple','¿Qué es la complejidad O(1)?',NULL,'Tiempo constante, no depende del tamaño de entrada','O(1) significa que el tiempo de ejecución es constante independientemente del input.','{"opciones":["Muy lento","Tiempo constante, no depende del tamaño de entrada","Siempre tarda 1 segundo","El algoritmo más rápido posible"]}',1),
('bbbbbbbb-0010-0000-0000-000000000001','truefalse','Un algoritmo O(n²) es más eficiente que uno O(n log n) para entradas grandes.',NULL,'false','O(n log n) es más eficiente que O(n²) para entradas grandes.','{}',2);

-- Mundo 10 - Nivel 2 (Búsqueda Lineal)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000002','multiple','¿Qué estructura de datos es ideal para implementar una búsqueda en anchura (BFS)?',NULL,'Cola (Queue)','BFS explora por niveles, por lo que utiliza una estructura FIFO (First-In, First-Out).','{"opciones":["Pila (Stack)","Cola (Queue)","Árbol Binario","Grafo Dirigido"]}',1),
('bbbbbbbb-0010-0000-0000-000000000002','truefalse','La búsqueda lineal requiere que el arreglo esté ordenado.',NULL,'false','La búsqueda lineal funciona con arreglos desordenados.','{}',2);

-- Mundo 10 - Nivel 3 (Búsqueda Binaria)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000003','multiple','¿Cuál es la complejidad de la búsqueda binaria?',NULL,'O(log n)','La búsqueda binaria divide el espacio de búsqueda a la mitad cada vez: O(log n).','{"opciones":["O(n)","O(log n)","O(n²)","O(1)"]}',1),
('bbbbbbbb-0010-0000-0000-000000000003','truefalse','La búsqueda binaria requiere que los datos estén ordenados.',NULL,'true','La búsqueda binaria solo funciona con arreglos ordenados.','{}',2);

-- Mundo 10 - Nivel 4 (Bubble Sort)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000004','predict','¿Cuántas comparaciones hace bubble sort en el peor caso para n=3?','// arreglo: {3, 2, 1}','3','En el peor caso, n*(n-1)/2 = 3*2/2 = 3 comparaciones.','{}',1),
('bbbbbbbb-0010-0000-0000-000000000004','multiple','¿Cuál es la complejidad de Bubble Sort en el peor caso?',NULL,'O(n²)','Bubble Sort tiene complejidad cuadrática en el peor caso.','{"opciones":["O(n)","O(log n)","O(n²)","O(n log n)"]}',2);

-- Mundo 10 - Nivel 5 (Jefe Legendario)
INSERT INTO challenges (level_id, tipo, pregunta, codigo, respuesta_correcta, explicacion, metadata_json, orden) VALUES
('bbbbbbbb-0010-0000-0000-000000000005','multiple','¿Qué algoritmo de ordenamiento tiene la mejor complejidad promedio?',NULL,'Quick Sort (O(n log n))','Quick Sort tiene O(n log n) en promedio, siendo muy eficiente.','{"opciones":["Bubble Sort O(n²)","Selection Sort O(n²)","Quick Sort (O(n log n))","Insertion Sort O(n²)"]}',1),
('bbbbbbbb-0010-0000-0000-000000000005','sort','Ordena los pasos del algoritmo de búsqueda binaria:',NULL,'int izq = 0;
int der = arr.length - 1;
while(izq <= der) {
  int mid = (izq + der) / 2;
  if(arr[mid] == target) return mid;
  if(arr[mid] < target) izq = mid + 1;
  else der = mid - 1;
}','La búsqueda binaria divide el espacio a la mitad en cada paso.','{"lineas":["  if(arr[mid] < target) izq = mid + 1;","int izq = 0;","  int mid = (izq + der) / 2;","int der = arr.length - 1;","  if(arr[mid] == target) return mid;","while(izq <= der) {","  else der = mid - 1;","}"]}',2);

-- ============================================================
-- ACHIEVEMENTS (20)
-- ============================================================
INSERT INTO achievements (nombre, descripcion, icono, xp_bonus, monedas_bonus, condicion) VALUES
('Primer Paso',       'Completa tu primer nivel',                    '👣', 50,  25,  'first_level'),
('Velocista',         'Responde correctamente en menos de 5 segundos','⚡', 30,  15,  'fast_answer'),
('Racha x3',          'Responde 3 preguntas seguidas correctas',       '🔥', 20,  10,  'streak_3'),
('Racha x5',          'Responde 5 preguntas seguidas correctas',       '🔥🔥', 50, 25,  'streak_5'),
('Racha x10',         'Responde 10 preguntas seguidas correctas',      '💥', 100, 50,  'streak_10'),
('Invencible',        'Completa un nivel sin errores',                '🛡️', 75,  35,  'perfect_level'),
('Explorador',        'Desbloquea 3 mundos diferentes',               '🗺️', 60,  30,  'unlock_3_worlds'),
('Conquistador',      'Completa un mundo completo',                   '👑', 150, 75,  'complete_world'),
('Maestro SQL',       'Completa el mundo de SQL',                     '🗄️', 200, 100, 'complete_sql_world'),
('Guerrero de Bucles','Completa el mundo de Bucles',                  '🔄', 200, 100, 'complete_loops_world'),
('Arquitecto',        'Completa el mundo de POO',                     '🏛️', 200, 100, 'complete_oop_world'),
('Coleccionista',     'Desbloquea 10 logros',                        '🎖️', 100, 50,  'collect_10_achievements'),
('Estudioso',         'Completa 10 niveles',                          '📖', 80,  40,  'complete_10_levels'),
('Experto',           'Completa 25 niveles',                          '🎓', 150, 75,  'complete_25_levels'),
('Leyenda',           'Completa todos los mundos',                    '🌟', 500, 250, 'complete_all_worlds'),
('Millonario',        'Acumula 1000 monedas',                        '💰', 0,   0,   'coins_1000'),
('Nivel 5',           'Alcanza el nivel 5 de jugador',               '⭐', 50,  25,  'player_level_5'),
('Nivel 10',          'Alcanza el nivel 10 de jugador',              '⭐⭐', 100, 50,  'player_level_10'),
('Persistente',       'Realiza 50 intentos en total',                 '💪', 40,  20,  'attempts_50'),
('Madrugador',        'Completa un nivel antes de las 8am',           '🌅', 30,  15,  'early_bird');

-- ============================================================
-- TEST USERS
-- Note: Passwords need bcrypt hash. Default password: Test1234!
-- Generate hash via: node -e "const b=require('bcrypt');b.hash('Test1234!',10).then(console.log)"
-- ============================================================
INSERT INTO users (id, username, email, password_hash, avatar, xp_total, nivel, monedas) VALUES
('cccccccc-0000-0000-0000-000000000001', 'ProCoder99',  'procoder@test.com',  '$2b$10$placeholder_hash_run_app_to_register', 'https://api.dicebear.com/7.x/pixel-art/svg?seed=procoder',  1250, 10, 620),
('cccccccc-0000-0000-0000-000000000002', 'NinjaJava',   'ninja@test.com',     '$2b$10$placeholder_hash_run_app_to_register', 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ninja',     850,  8,  430),
('cccccccc-0000-0000-0000-000000000003', 'AlgoMaster',  'algo@test.com',      '$2b$10$placeholder_hash_run_app_to_register', 'https://api.dicebear.com/7.x/pixel-art/svg?seed=algomaster', 2100, 14, 1050);
