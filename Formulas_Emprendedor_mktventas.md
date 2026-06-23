# Mapa Maestro de Fórmulas para Emprendedores
## Emperador Financiero · Angelo Nisi · @emperadorfinanciero

> **Cómo usar este documento:** Cada fórmula tiene estructura fija: definición, fórmula, ejemplo numérico e implicancia práctica. Está organizado en 4 bloques. El bloque de Finanzas es el núcleo — si dominás ese, ya tomás mejores decisiones que el 90% de los negocios.

---

## Conceptos Base — Leer antes de las fórmulas

### Contabilidad vs. Finanzas

| | Contabilidad | Finanzas |
|---|---|---|
| **¿Qué hace?** | Registra lo que ya pasó | Decide qué hacer con lo que hay |
| **Pregunta que responde** | ¿Cuánto tengo? | ¿Cuánto necesito? ¿Dónde invierto? |
| **Mirada** | Hacia atrás | Hacia adelante |
| **Quién lo hace** | El contador | El CFO / el dueño estratégico |

> *Analogía:* La contabilidad es el cuaderno donde anotás cada peso que entra y sale. Las finanzas son las decisiones que tomás para que ese dinero crezca.

---

### Facturado vs. Percibido (Cash Collected)

| | Facturado | Percibido (Cash Collected) |
|---|---|---|
| **Definición** | Lo que vendiste, aunque no cobraste todavía | Lo que realmente entró a tu cuenta bancaria |
| **Utilidad** | Analizar rentabilidad económica | Tomar decisiones de caja, sueldos, inversiones |
| **Riesgo** | Podés tener alta facturación y $0 en caja | Es la realidad operativa del negocio |

**Regla de oro:** Para decisiones de caja → usás el Percibido. Para analizar rentabilidad → usás el Facturado. Nunca se mezclan.

---

### Costos Fijos vs. Costos Variables

| | Costo Fijo | Costo Variable |
|---|---|---|
| **Definición** | Se paga vendas o no vendas | Solo existe cuando vendés |
| **Ejemplos** | Alquiler, sueldos base, servicios, software | Materia prima, comisiones de venta, empaque |
| **Comportamiento** | Igual todos los meses | Crece proporcionalmente con el volumen |
| **Impacto** | Te pesa cuando vendés poco | Reduce tu margen por cada unidad vendida |

---

---

# BLOQUE 1 — FINANZAS

> El núcleo de todo. Estas fórmulas son la base para entender si el negocio realmente gana dinero — no lo que parece, sino lo que queda.

---

## F1. Margen Bruto Unitario

**Qué es:** Cuánto queda de cada venta individual antes de pagar los costos fijos (alquiler, sueldos, etc.). Es el termómetro del negocio: si baja sin explicación, algo está mal.

**Fórmulas:**
```
MB$ = Precio de venta − Costo directo del producto/servicio
MB% = (MB$ ÷ Precio de venta) × 100
```

**Ejemplo — Negocio físico (hamburguesería):**
- Precio de venta: $3.500
- Costo ingredientes + empaque: $1.400
- MB$ = $3.500 − $1.400 = **$2.100**
- MB% = ($2.100 ÷ $3.500) × 100 = **60%**

**Implicancia:** Por cada hamburguesa vendida, quedan $2.100 para cubrir alquiler, sueldos y demás estructura. Si el MB% baja de un mes a otro sin motivo → revisá costos, precios o si hay mermas/robos.

> ⚠️ **Señal de alerta:** El margen bruto debe ser similar mes a mes. Una caída brusca indica robo, merma o precios desactualizados.

---

## F2. Margen Neto

**Qué es:** Lo que realmente gana el negocio después de pagar absolutamente todo. Si el margen bruto es el termómetro, el margen neto es el resultado final.

**Fórmulas:**
```
MN$ = Ingresos totales − Todos los costos (fijos + variables + impuestos)
MN% = (MN$ ÷ Ingresos totales) × 100
```

**Ejemplo:**
- Ventas del mes: $9.000.000
- Costo de mercadería vendida (CV): $4.050.000
- Gastos fijos operativos: $3.000.000
- Impuestos y otros: $250.000
- MN$ = $9.000.000 − $7.300.000 = **$1.700.000**
- MN% = ($1.700.000 ÷ $9.000.000) × 100 = **18,9%**

**Implicancia:** Por cada $100 que entra al negocio, $18,9 son ganancia real. Todo lo demás son costos.

---

## F3. Precio Mínimo de Venta

**Qué es:** El precio por debajo del cual perdés dinero en cada venta. Fundamental antes de hacer cualquier descuento o promoción.

**Fórmula:**
```
Precio mínimo = Costo directo ÷ (1 − Margen objetivo %)
```

**Ejemplo:**
- Costo directo: $1.400
- Margen objetivo deseado: 40% (0,40)
- Precio mínimo = $1.400 ÷ (1 − 0,40) = $1.400 ÷ 0,60 = **$2.333**

**Implicancia:** Si ponés el producto en oferta a $2.200, estás perdiendo dinero en cada unidad vendida. Antes de todo descuento, calculá si el precio con descuento sigue siendo mayor al precio mínimo.

---

## F4. Contribución Marginal

**Qué es:** Lo que cada venta aporta para cubrir los costos fijos. Una vez que la contribución marginal total supera los costos fijos, el negocio empieza a ganar.

**Fórmulas:**
```
CM unitaria = Precio de venta − Costo variable unitario
CM total    = Ventas totales − Costos variables totales
% CM        = (CM total ÷ Ventas totales) × 100
```

**Ejemplo:**
- Precio: $3.500 · Costo variable unitario: $1.400
- Ventas del mes: 500 unidades
- CM unitaria = $3.500 − $1.400 = **$2.100**
- CM total = $2.100 × 500 = **$1.050.000**
- Si los gastos fijos son $800.000 → el negocio ya los cubrió y genera $250.000 de utilidad.

**Implicancia:** La CM total debe superar los GF para que el negocio gane. Si no los supera, estás en pérdida aunque estés "vendiendo bien".

---

## F5. Contribución Real del Producto (Análisis de Mix)

**Qué es:** Determina cuánto aporta realmente cada producto a la rentabilidad total del negocio, combinando su margen con su volumen de participación en ventas.

**Fórmula:**
```
Contribución real = MB% del producto × Participación en ventas totales (%)
```

**Ejemplo:**
- Producto A: MB 60%, representa el 20% de las ventas → Contribución real: 12%
- Producto B: MB 35%, representa el 70% de las ventas → Contribución real: 24,5%

**Implicancia:** El Producto B, aunque tiene menor margen individual, aporta el doble a la rentabilidad total. Ahí debe estar el foco comercial y de comunicación.

---

## F6. Punto de Equilibrio (PE)

**Qué es:** Cuánto tenés que vender para no ganar ni perder. La primera meta del mes. El día que la cruzás, el resto del mes es ganancia pura.

**Fórmulas:**
```
PE en pesos    = Gastos Fijos ÷ % Margen Bruto (en decimal)
PE en unidades = Gastos Fijos ÷ Contribución Marginal unitaria
```

**Variantes clave:**
```
PE con nueva inversión = (GF + Amortización mensual) ÷ MB%
PE con nueva persona   = (GF + Costo real persona nueva) ÷ MB%
```

**Ejemplo:**
- Gastos fijos: $3.500.000
- MB%: 55% (0,55)
- PE = $3.500.000 ÷ 0,55 = **$6.363.636 de ventas mensuales**

**Implicancia:** Necesitás vender $6.363.636 antes de ganar un peso. Si el negocio tiene 26 días de apertura, necesitás $244.755/día solo para no perder.

> 💡 **Regla:** Usá el PE para evaluar CUALQUIER decisión que sume costos fijos: contratar, alquilar más espacio, comprar equipo.

---

## F7. Punto Óptimo (PO) — La meta real del mes

**Qué es:** A diferencia del PE (que es el mínimo para no perder), el Punto Óptimo es cuánto tenés que vender para ganar lo que querés ganar. Esa es la meta del mes.

**Fórmula:**
```
PO = (Gastos Fijos + Utilidad neta deseada) ÷ MB%
```

**Ejemplo:**
- GF: $3.500.000
- Utilidad deseada: $1.500.000
- MB%: 55%
- PO = ($3.500.000 + $1.500.000) ÷ 0,55 = **$9.090.909 de ventas**

**Implicancia:** Ese es el número que le das al equipo de ventas como objetivo del mes. No el PE (mínimo de supervivencia), sino el PO (la meta de prosperidad).

---

## F8. Proyección Inversa — De utilidad a prospectos

**Qué es:** La fórmula que conecta finanzas con ventas y marketing. Partís de cuánto querés ganar y calculás exactamente cuántos prospectos necesitás. Elimina el "vendo lo que puedo".

**Lógica (se completa de abajo hacia arriba):**
```
1. Utilidad neta deseada             →  $5.000.000
2. + Gastos fijos + variables        →  $3.500.000 + $1.000.000 (variables)
   = Utilidad bruta necesaria        →  $9.500.000
3. ÷ MB%                             →  ÷ 0,90 (90% de margen)
   = Cash Collected necesario        →  $9.444.444 (facturación requerida)
4. ÷ Ticket promedio                 →  ÷ $65.000
   = Total clientes necesarios       →  145 clientes
5. − Clientes actuales (recompra)    →  − 45 (que ya van a volver)
   = Clientes nuevos a conseguir     →  100 clientes nuevos
6. ÷ Tasa de cierre                  →  ÷ 0,40 (40% de cierre)
   = Prospectos necesarios           →  251 prospectos
```

**Implicancia:** El número final (251 prospectos) es exactamente lo que necesitás que marketing genere. Es el puente entre la meta financiera y la acción comercial.

---

## F9. Margen de Seguridad

**Qué es:** Cuánto pueden caer las ventas antes de que el negocio empiece a perder dinero. Mide la fragilidad o robustez del negocio ante caídas de demanda.

**Fórmula:**
```
MS% = ((Ventas actuales − Ventas PE) ÷ Ventas actuales) × 100
```

**Ejemplo:**
- Ventas actuales: $9.000.000
- Ventas en el PE: $6.363.636
- MS = ($9.000.000 − $6.363.636) ÷ $9.000.000 × 100 = **29,3%**

**Implicancia:** Podés caer casi un 30% en ventas antes de entrar en pérdida. Si el margen de seguridad fuera del 5%, cualquier bajón te lleva a rojo. Un negocio con MS bajo es estructuralmente frágil.

---

## F10. ROI de Inversión — Retorno y Recupero

**Qué es:** Para cualquier inversión nueva (máquina, local, tecnología, vehículo): cuánto retorna y en cuánto tiempo recuperás lo invertido.

**Fórmulas:**
```
ROI%           = (Ganancia neta atribuida a la inversión ÷ Costo de la inversión) × 100
Payback (meses) = Inversión total ÷ Utilidad mensual adicional que genera
```

**Regla práctica:**
- Menos de 24 meses → Buen negocio
- 24 a 48 meses → Aceptable, depende del rubro
- Más de 48 meses → Replantear la inversión

**Ejemplo — Máquina nueva para una fábrica:**
- Inversión: $8.000.000
- Utilidad mensual adicional que genera: $400.000
- Payback = $8.000.000 ÷ $400.000 = **20 meses** ✓ Buen negocio.
- Si generara solo $150.000/mes → Payback = 53 meses → Replantear.

**Implicancia:** Antes de comprar cualquier activo, calculá el payback. Si no podés estimar cuánta utilidad adicional genera, la inversión no está justificada financieramente.

---

## F11. Amortización Mensual

**Qué es:** El costo mensual "invisible" de un activo. Debe incluirse en los gastos fijos para calcular el PE real. Si no lo contás, creés que ganás más de lo que realmente ganás.

**Fórmula:**
```
Amortización mensual = Valor de la inversión ÷ Meses de vida útil esperada
```

**Ejemplo:**
- Máquina comprada en $8.000.000
- Vida útil estimada: 48 meses
- Amortización mensual = $8.000.000 ÷ 48 = **$166.667/mes**

**Implicancia:** Ese $166.667 se suma a los gastos fijos para calcular el PE real con la inversión adentro. Muchos dueños de negocio no la incorporan y "ven" utilidades que en realidad ya están comprometidas en el activo.

---

## F12. Facturado vs. Percibido — Cálculo práctico

**Qué es:** La diferencia entre lo que el negocio vendió (facturado) y lo que realmente entró al banco (percibido o cash collected). La diferencia es lo que se llama Cuentas por Cobrar.

**Fórmulas:**
```
Cuentas por Cobrar (CxC) = Facturado − Percibido (Cash Collected)
Tasa de cobro            = (Cobrado ÷ Facturado) × 100
```

**Ejemplo:**
- Ventas del mes (facturado): $10.000.000
- Efectivo cobrado (percibido): $7.200.000
- CxC pendiente = $10.000.000 − $7.200.000 = **$2.800.000**
- Tasa de cobro = ($7.200.000 ÷ $10.000.000) × 100 = **72%**

**Implicancia:** Una tasa de cobro del 72% es baja. Si en 60 días esos $2.800.000 no se cobran, el negocio puede entrar en crisis de caja aunque "haya vendido bien".

---

## F13. Tasa de Cobro y Tasa de Mora

**Qué es:** Miden la salud de la cartera de clientes. La mora alta destruye el flujo de caja aunque las ventas sean buenas.

**Fórmulas:**
```
Tasa de cobro = (Cobrado ÷ Facturado) × 100
Tasa de mora  = (Importe vencido no cobrado ÷ Facturado) × 100
Días de cobro = CxC promedio ÷ Ventas diarias promedio
```

**Benchmarks:**
- Tasa de cobro ≥ 85% → Aceptable
- Tasa de mora ≤ 5% → Saludable
- Tasa de mora > 10% → Problema estructural urgente

**Ejemplo:**
- Facturado: $10.000.000
- Cobrado: $8.500.000 → Tasa de cobro: **85%** ✓
- Vencido impago: $800.000 → Tasa de mora: **8%** ⚠ (en zona de alerta)
- CxC promedio: $1.500.000 · Ventas diarias: $333.333 → Días de cobro: **4,5 días**

---

## F14. Estado de Resultados Simplificado (P&L)

**Qué es:** La radiografía económica del negocio en un período. Muestra si el negocio es rentable. No mezclar con el flujo de caja (que es la radiografía de la liquidez).

**Estructura:**
```
(+) Ingresos (Ventas facturadas)
(−) Costo de Ventas / Mercadería (CV)
(=) UTILIDAD BRUTA (Margen Bruto)
(−) Gastos Operativos Fijos (alquiler, sueldos, servicios)
(=) UTILIDAD OPERATIVA (EBITDA simplificado)
(−) Impuestos / Intereses / Amortizaciones
(=) UTILIDAD NETA
```

**Ejemplo mensual:**
| Línea | Monto | % |
|---|---|---|
| Ventas | $9.000.000 | 100% |
| Costo de ventas (CV) | $4.050.000 | 45% |
| **Utilidad Bruta** | **$4.950.000** | **55%** |
| Gastos fijos operativos | $3.000.000 | 33% |
| **Utilidad Operativa** | **$1.950.000** | **22%** |
| Impuestos y otros | $250.000 | 3% |
| **Utilidad Neta** | **$1.700.000** | **19%** |

**Implicancia:** Este cuadro se revisa mensualmente. Si la utilidad bruta sube pero la neta baja, el problema está en los gastos fijos. Si la utilidad bruta baja, el problema está en los costos de producto o en los precios.

---

## F15. PE con Nueva Contratación — ¿Cuánto le puedo pagar a alguien nuevo?

**Qué es:** Antes de contratar, calculás cuánto más tiene que vender el negocio para que la rentabilidad no baje. Si ese crecimiento es viable, contratás. Si no, esperás o ajustás el sueldo.

**Fórmulas:**
```
Costo real persona     = Sueldo acordado × 1,3 a 1,5
                         (incluye cargas sociales, ART, SAC, vacaciones)

Incremento necesario   = Costo real persona ÷ (1 − % Margen Neto objetivo)
```

**Ejemplo exacto:**
- Sueldo acordado: $250.000
- Costo real (× 1,30): $325.000/mes
- Margen neto objetivo: 30% (0,30)
- Incremento = $325.000 ÷ (1 − 0,30) = $325.000 ÷ 0,70 = **$464.286 adicionales por mes**

**Implicancia:** Si hoy facturás $5.000.000, necesitás llegar a $5.464.286 para que la rentabilidad no baje al contratar. ¿Lo podés lograr en los próximos 1-3 meses? Sí → contratá. No → esperá o renegociá el sueldo.

---

## F16. Costo de Reposición y Margen Real

**Qué es:** En contextos de inflación, el costo relevante no es lo que pagaste, sino lo que te costaría reponer hoy. Si calculás el margen sobre el costo de compra de hace 3 meses, tomás decisiones con datos viejos.

**Fórmula:**
```
Margen real = (Precio de venta − Costo de reposición actual) ÷ Precio de venta × 100
```

**Ejemplo:**
- Compraste a $1.000 hace 2 meses
- El proveedor hoy pide $1.400 (el costo de reponer)
- Precio de venta: $2.500
- Margen real = ($2.500 − $1.400) ÷ $2.500 × 100 = **44%** (no el 60% que creías)

**Implicancia:** Si usás el costo viejo de $1.000, calculás un margen del 60% y tomás decisiones de precios, descuentos e inversión basadas en un número falso. El margen real es 44% y quizás corresponde actualizar precios.

---

---

# BLOQUE 2 — VENTAS

> Métricas que convierten la actividad comercial en números concretos. Sin esto, las ventas son solo sensaciones.

---

## V1. Ticket Promedio

**Qué es:** El promedio que gasta cada cliente en cada compra. Aumentar el ticket promedio es la forma más rentable de crecer: usás la misma estructura y los mismos clientes, pero vendés más por transacción.

**Fórmula:**
```
Ticket promedio = Ventas totales del período ÷ N° de transacciones
```

**Ejemplo:**
- Ventas del mes: $9.000.000
- Transacciones: 300
- Ticket promedio = $9.000.000 ÷ 300 = **$30.000**

**Implicancia:** Si subís el ticket promedio un 10% (de $30.000 a $33.000) sin cambiar nada más:
- Ventas proyectadas: $33.000 × 300 = $9.900.000 (+$900.000)
- Con MB 55% → **+$495.000 de utilidad adicional** sin gastar más en estructura.

---

## V2. Tasa de Cierre

**Qué es:** De cada 10 personas que consultan o entran al local, cuántas te compran. Mide la efectividad del proceso de venta.

**Fórmula:**
```
Tasa de cierre = (N° de ventas realizadas ÷ N° de prospectos) × 100
```

**Benchmarks negocios físicos:** 20-30% es el promedio de mercado.

**Ejemplo:**
- 100 personas consultaron en el mes
- 35 compraron
- Tasa de cierre = (35 ÷ 100) × 100 = **35%** — por encima del promedio ✓

**Aplicación inversa (muy útil):**
```
Prospectos necesarios = Clientes objetivo ÷ Tasa de cierre
```
Si necesitás 50 ventas con tasa de cierre 35% → necesitás **143 prospectos** (50 ÷ 0,35).

---

## V3. Frecuencia de Compra y Tasa de Recompra

**Qué es:** Cuántas veces en promedio un cliente te compra por período, y qué porcentaje de tus clientes vuelve. Conseguir que los actuales vuelvan cuesta mucho menos que conseguir clientes nuevos.

**Fórmulas:**
```
Frecuencia de compra = N° de transacciones ÷ N° de clientes únicos
Tasa de recompra     = (Clientes que volvieron ÷ Total clientes) × 100
```

**Ejemplo:**
- 300 transacciones · 200 clientes únicos · 45 volvieron a comprar
- Frecuencia = 300 ÷ 200 = **1,5 visitas por cliente**
- Tasa de recompra = (45 ÷ 200) × 100 = **22,5%**

**Implicancia:** Si llevás la recompra de 22,5% a 35%, sin conseguir un solo cliente nuevo la facturación crece. Es el crecimiento de menor costo posible.

---

## V4. LTV — Valor del Cliente en el Tiempo (Lifetime Value)

**Qué es:** Cuánto vale un cliente durante toda su relación con el negocio. Fundamental para saber cuánto podés invertir en conseguir uno nuevo.

**Fórmula:**
```
LTV = Ticket promedio × Frecuencia de compra mensual × Meses de vida del cliente
```

**Ejemplo:**
- Ticket promedio: $30.000
- Frecuencia: 2 veces por mes
- Vida promedio del cliente: 8 meses
- LTV = $30.000 × 2 × 8 = **$480.000**

**Implicancia:** Cada cliente vale $480.000 en el tiempo. Si gastás $5.000 para conseguirlo (CAC), es un negocio extraordinario. Si gastás $300.000, sigue siendo rentable. Conocer el LTV define cuánto podés gastar en marketing.

---

## V5. Proyección de Ventas

**Qué es:** Cálculo anticipado de la facturación del mes, separando el aporte de clientes nuevos y de recompra. Reemplaza el "a ver cómo nos va" por un número concreto antes de empezar el mes.

**Fórmula:**
```
Ventas proyectadas =
  (Prospectos × Tasa de cierre × Ticket promedio)     ← Clientes nuevos
+ (Clientes actuales × Tasa de recompra × Ticket)     ← Recompra
```

**Ejemplo (basado en planilla real):**
- 251 prospectos × 40% cierre × $65.000 = $6.526.000 de clientes nuevos
- 45 recompra × 1 transacción × $65.000 = $2.925.000 de recompra
- **Total proyectado = $9.451.000**

**Implicancia:** Tenés la proyección antes de que empiece el mes. Si no llegás al PO necesario, sabés que hay que aumentar prospectos, mejorar la tasa de cierre o subir el ticket.

---

## V6. Impacto de Subir el Ticket Promedio en la Utilidad

**Qué es:** Calcula directamente cuánta utilidad adicional genera un aumento en el ticket promedio, sin cambiar estructura ni volumen.

**Fórmula:**
```
Impacto en utilidad = (Ticket nuevo − Ticket actual) × N° transacciones × MB%
```

**Ejemplo:**
- Ticket actual: $30.000 → Nuevo: $33.000 (subida de $3.000)
- Transacciones: 300
- MB: 55%
- Impacto = $3.000 × 300 × 0,55 = **$495.000 más de utilidad al mes**

**Implicancia:** Un aumento del 10% en el ticket promedio genera $495.000 adicionales de utilidad. No de ventas — de utilidad neta. Sin un solo cliente nuevo.

---

## V7. ¿Cuánto Vender para Duplicar la Utilidad?

**Qué es:** Una de las revelaciones más importantes de las finanzas para negocios: generalmente hay que vender bastante menos de lo que uno imagina para duplicar la ganancia, porque los costos fijos ya están cubiertos.

**Fórmula:**
```
Ventas para duplicar utilidad = (GF + Utilidad actual × 2) ÷ MB%
Crecimiento necesario         = Ventas nueva meta − Ventas actuales
```

**Ejemplo:**
- GF: $3.500.000 · Utilidad actual: $1.700.000 · MB: 55%
- Ventas necesarias = ($3.500.000 + $3.400.000) ÷ 0,55 = **$12.545.455**
- Hoy vendés $9.000.000 → necesitás crecer **$3.545.455 (39%)**

**Implicancia:** Con números de alto margen, a veces solo hace falta un 8-15% más de ventas para duplicar la utilidad. Todo lo que vendés por encima del PE cae casi directo a ganancia.

---

## V8. Eficiencia del Descuento

**Qué es:** Antes de hacer un descuento, calculás cuántas unidades adicionales necesitás vender para mantener la misma utilidad total. Los descuentos sobre productos de bajo margen destruyen rentabilidad.

**Fórmula:**
```
Unidades adicionales necesarias =
  (Utilidad total actual) ÷ (CM unitaria con descuento)
  − Unidades actuales
```

**Ejemplo:**
- Precio actual: $3.500 · CV: $1.400 · CM: $2.100 · Unidades: 100
- Utilidad actual = $2.100 × 100 = $210.000
- Descuento 20%: nuevo precio $2.800 → nueva CM = $2.800 − $1.400 = **$1.400**
- Unidades necesarias = $210.000 ÷ $1.400 = **150 unidades (+50%)**

**Implicancia:** Tenés que vender 50% más unidades solo para mantener la misma utilidad con el descuento aplicado. ¿Realmente el descuento va a generar ese volumen adicional?

---

## V9. Upsell — Impacto por Categoría

**Qué es:** El upsell (vender un producto de mayor valor al cliente que ya está comprando) es el apalancamiento más eficiente: mismo cliente, misma visita, mayor CM.

**Fórmula:**
```
Ganancia adicional = (CM unitaria producto premium − CM unitaria producto base) × Clientes con upsell
```

**Ejemplo:**
- Producto base (el que siempre piden): CM $2.100
- Producto premium (el upgrade): CM $3.800
- 300 transacciones, 20% hacen upsell = 60 clientes
- Ganancia adicional = ($3.800 − $2.100) × 60 = **$102.000 adicionales de utilidad**

**Implicancia:** En negocios físicos: posicioná los productos de mayor margen a la altura de los ojos y entrenás al equipo para sugerir el upgrade. $102.000 sin un solo cliente nuevo, sin publicidad.

---

## V10. Meta Diaria de Ventas

**Qué es:** Convierte el objetivo mensual (PO) en un número operativo diario que el equipo puede ejecutar y medir cada día.

**Fórmulas:**
```
Meta diaria   = PO (Punto Óptimo) ÷ Días de apertura del mes
Meta semanal  = PO ÷ 4
Meta por turno = Meta diaria ÷ N° de turnos
```

**Ejemplo:**
- PO mensual: $9.090.909
- Días de apertura: 26
- Meta diaria = $9.090.909 ÷ 26 = **$349.650/día**
- Meta semanal = $9.090.909 ÷ 4 = **$2.272.727/semana**

**Implicancia:** Ese número es lo que el encargado comunica al equipo cada mañana. Convierte la estrategia financiera en operación diaria concreta.

---

---

# BLOQUE 3 — MARKETING

> Si no sabés cuánto te cuesta cada cliente, no podés escalar. Estas fórmulas hacen la publicidad predecible y la invierten donde rinde.

---

## M1. CAC — Costo de Adquisición de Cliente

**Qué es:** Cuánto gastás para conseguir cada cliente nuevo. Calcularlo por canal es fundamental: un mismo presupuesto puede tener CAC muy distintos según el canal.

**Fórmula:**
```
CAC = Inversión total en marketing ÷ N° de clientes nuevos obtenidos
```

**Ejemplo:**
- Inversión en publicidad del mes: $300.000
- Clientes nuevos conseguidos: 60
- CAC = $300.000 ÷ 60 = **$5.000 por cliente**

**Implicancia:** ¿Es caro o barato? Depende del LTV. Si el LTV es $480.000 y el CAC es $5.000 → ratio de 96x → podés y debés invertir mucho más. Si el LTV fuera $4.000 → perdés dinero en cada cliente nuevo.

---

## M2. CAC Permitido — El Techo de Inversión Publicitaria

**Qué es:** El máximo que podés gastar por conseguir un cliente nuevo y aún ganar dinero. Define el límite de tu inversión en publicidad.

**Fórmula:**
```
CAC permitido máximo = Utilidad neta esperada por cliente (en su vida útil)
                     = LTV × MB% (aproximación)
```

**Ejemplo:**
- LTV: $480.000
- MB%: 55%
- CAC permitido ≈ $480.000 × 0,55 = **$264.000 máximo por cliente**
- CAC actual: $5.000 → Estás usando el 1,9% del techo disponible.

**Implicancia:** Tenés un margen enorme para aumentar la inversión publicitaria antes de llegar al límite de rentabilidad. Si el CAC subiera a $264.000, estarías en el límite. Todo lo que esté por debajo de ese número es una inversión rentable.

---

## M3. ROAS — Retorno Sobre Inversión Publicitaria

**Qué es:** Por cada $1 invertido en publicidad, cuántos $ de ventas generás. El ROAS mínimo para ser rentable depende de tu margen bruto.

**Fórmulas:**
```
ROAS = Ingresos generados por publicidad ÷ Inversión en publicidad
ROAS mínimo para ser rentable = 1 ÷ MB% (en decimal)
```

**Ejemplo:**
- Inversión en ads: $300.000
- Ventas atribuidas: $1.800.000
- MB%: 55%
- ROAS obtenido = $1.800.000 ÷ $300.000 = **6x**
- ROAS mínimo = 1 ÷ 0,55 = **1,82x** (por debajo de ese número, perdés con la publicidad)

**Implicancia:** Con ROAS 6x estás muy por encima del mínimo de 1,82x. La publicidad es claramente rentable. Si el ROAS bajara a 1,5x, estarías perdiendo dinero en cada venta conseguida por ads.

---

## M4. Costo por Etapa del Embudo

**Qué es:** El embudo de ventas costeado. En negocios físicos: cuánto cuesta que una persona llegue al local, que consulte y que compre. Cada etapa del embudo tiene un costo y una palanca de mejora distinta.

**Fórmulas:**
```
Costo por visita (CPV) = Inversión ÷ N° de personas que llegaron al local
Costo por consulta     = Inversión ÷ N° de personas que preguntaron/consultaron
Costo por venta (CPVenta) = Inversión ÷ N° de ventas cerradas
```

**Ejemplo:**
- Inversión: $300.000
- Visitas al local: 500 personas → CPV: $600
- Consultas: 100 personas → Costo por consulta: $3.000
- Ventas: 35 → CPVenta: $8.571

**Análisis de rentabilidad:**
- CPVenta: $8.571 + CV: $1.400 = Costo total por venta con publicidad: $9.971
- Precio de venta: $30.000 → CM neta con publicidad: $20.029 → **Rentable** ✓

---

## M5. Rentabilidad por Canal de Marketing

**Qué es:** Mide si cada canal de publicidad genera más de lo que cuesta. La regla es simple: si el canal es rentable, escalá. Si no lo es, cortalo o rediseñalo.

**Fórmula:**
```
Rentabilidad del canal = CM total generada por el canal − Inversión en el canal
```

**Ejemplo comparativo:**
| Canal | Inversión | Clientes | CAC | CM/cliente | Resultado |
|---|---|---|---|---|---|
| Instagram Ads | $150.000 | 30 | $5.000 | $16.500 | **+$345.000** ✓ |
| Volantes | $80.000 | 4 | $20.000 | $16.500 | **−$14.000** ✗ |
| Total | $230.000 | 34 | — | — | +$331.000 |

**Implicancia:** Con el mismo presupuesto, si eliminás los volantes y volcás todo a Instagram, el resultado mejora sustancialmente. El error clásico es tomar el CAC promedio de todos los canales juntos.

---

## M6. Presupuesto Máximo de Publicidad

**Qué es:** Cuánto podés invertir en publicidad sin poner en riesgo la operación. La respuesta está en la diferencia entre el PE y tu nivel de ventas actual.

**Fórmula:**
```
Presupuesto disponible = (Ventas actuales − PE) × MB%
Regla práctica: reinvertir 30-50% de esa utilidad disponible en crecimiento.
```

**Ejemplo:**
- Ventas actuales: $9.000.000
- PE: $6.363.636
- Diferencia: $2.636.364 × 0,55 (MB) = $1.450.000 de utilidad disponible
- Presupuesto de publicidad: 40% × $1.450.000 = **$580.000 disponibles para ads**

---

## M7. Tasa de Conversión por Etapa del Embudo

**Qué es:** Qué porcentaje de personas pasan de una etapa a la siguiente. Identificás el punto de mayor fuga y ahí enfocás la mejora.

**Fórmula:**
```
Conversión por etapa = (Salida de la etapa ÷ Entrada de la etapa) × 100
```

**Ejemplo:**
- 500 visitas → 100 consultas: conversión **20%** (visita a consulta)
- 100 consultas → 35 ventas: conversión **35%** (consulta a venta)

**Análisis:** La mayor fuga está en el paso de visita a consulta (solo el 20% pregunta). Si lo mejorás al 30%:
- 500 × 30% = 150 consultas × 35% = **52 ventas** (vs. 35 actuales)
- Sin aumentar un peso de publicidad, ni cambiar la tasa de cierre.

---

## M8. Predicción de Ventas por Inversión en Publicidad

**Qué es:** Con tus datos históricos, calculás el resultado esperado antes de gastar. La publicidad deja de ser un gasto y se convierte en una ecuación predecible.

**Fórmula:**
```
Ventas proyectadas = (Inversión ÷ Costo por venta histórico) × Ticket promedio
CM esperada        = Ventas proyectadas × MB%
Ganancia sobre inversión = CM esperada − Inversión
```

**Ejemplo:**
- Costo por venta histórico: $8.571
- Ticket promedio: $30.000
- Inversión disponible: $500.000
- Ventas proyectadas = ($500.000 ÷ $8.571) × $30.000 = **$1.750.000**
- CM esperada = $1.750.000 × 0,55 = $962.500
- Ganancia neta sobre inversión = $962.500 − $500.000 = **$462.500**

---

## M9. Ratio LTV / CAC — El Indicador Más Completo

**Qué es:** La relación entre lo que vale un cliente (LTV) y cuánto cuesta conseguirlo (CAC). Es el indicador maestro de la salud del modelo de adquisición.

**Fórmula:**
```
Ratio LTV/CAC = LTV ÷ CAC
```

**Benchmarks:**
- < 2x → Modelo insostenible, revisá urgente
- 2x a 3x → Aceptable, mejorar
- 3x a 5x → Saludable ✓
- > 5x → Excelente, escalar agresivamente

**Ejemplo:**
- LTV: $480.000 · CAC: $5.000
- Ratio = $480.000 ÷ $5.000 = **96x** → Escalar inversión publicitaria de manera agresiva.

---

---

# BLOQUE 4 — EQUIPO

> Cada persona es un costo fijo. Estas fórmulas convierten las decisiones de personas en decisiones financieras con número concreto.

---

## E1. Costo Real de una Persona

**Qué es:** Lo que aparece en el recibo de sueldo no es el costo real del empleado. El costo real incluye todas las cargas, beneficios y pagos proporcionales que la empresa enfrenta.

**Fórmula:**
```
Costo real = Sueldo bruto acordado × 1,3 a 1,5
             (cargas sociales + ART + SAC + vacaciones + beneficios)
```

**Ejemplo:**
- Sueldo neto acordado: $250.000
- Factor de cargas: × 1,35
- Costo real = $250.000 × 1,35 = **$337.500/mes**

**Implicancia:** Ese $337.500 es el número que impacta el PE y el punto óptimo. No los $250.000 que aparecen en el contrato.

---

## E2. Facturación por Colaborador

**Qué es:** Mide la eficiencia del equipo. Si al agregar personal la facturación por colaborador sube, el negocio escala bien. Si baja, hay un problema de productividad o de modelo.

**Fórmula:**
```
Facturación por colaborador = Ventas totales ÷ N° de empleados (equivalente full-time)
```

**Benchmarks:**
- Negocios digitales de servicio: USD 5.000-10.000/mes/persona como mínimo saludable
- Negocios físicos: depende del rubro, pero el ratio debe mantenerse o crecer al sumar personal

**Ejemplo:**
- Ventas: $9.000.000 · Equipo: 6 personas
- Facturación/colaborador = $9.000.000 ÷ 6 = **$1.500.000/mes por persona**
- Al contratar el 7° empleado: $9.000.000 ÷ 7 = $1.285.714 → el ratio baja.
- Para mantener el ratio con 7 personas: necesitás facturar $10.500.000.

---

## E3. Incremento Necesario de Ventas para Mantener Rentabilidad al Contratar

**Qué es:** Cuánto más tiene que vender el negocio para que la contratación no baje la rentabilidad. La respuesta define si la contratación tiene sentido ahora o hay que esperarla.

**Fórmulas:**
```
Costo real persona     = Sueldo × 1,3 a 1,5
Incremento necesario   = Costo real persona ÷ (1 − % Margen Neto objetivo)
```

**Ejemplo:**
- Sueldo: $250.000 · Costo real: $325.000
- Margen neto objetivo: 30% (0,30)
- Incremento = $325.000 ÷ (1 − 0,30) = $325.000 ÷ 0,70 = **$464.286 adicionales/mes**

**Si hoy facturás $5.000.000 → necesitás $5.464.286 para mantener la rentabilidad.**

**Criterio de decisión:**
- ¿Podés lograr ese crecimiento en 1-3 meses? → **Contratá**
- ¿No es claro cómo lograrlo? → **Esperá o renegociá el sueldo**

---

## E4. Comisiones y Bonos Ligados a Rentabilidad (no a ventas brutas)

**Qué es:** Las comisiones sobre ventas brutas pueden arruinar un negocio: el vendedor cobra aunque la empresa no gane. Las comisiones sobre utilidad neta alinean los incentivos del equipo con los del negocio.

**Fórmula:**
```
Bono = % acordado × Utilidad neta del período
Solo se activa si la utilidad supera el umbral mínimo definido
```

**Ejemplo con estructura de 3 umbrales:**
| Utilidad neta del mes | % de Bono |
|---|---|
| Menos de $1.000.000 | 0% — el negocio no llegó |
| $1.000.000 a $2.000.000 | 3% sobre la utilidad |
| Más de $2.000.000 | 5% sobre la utilidad |

- Mes con utilidad $1.700.000 → Bono = $1.700.000 × 3% = **$51.000**
- Mes con utilidad $800.000 → Bono = **$0** (no activó el umbral)

**Implicancia:** El equipo sabe que ganar más para el negocio es ganar más para ellos. El dueño solo paga el bono cuando realmente ganó.

---

## E5. Eficiencia Operativa del Equipo

**Qué es:** Qué porcentaje de la capacidad operativa disponible está siendo utilizada. Antes de contratar más personal, lo primero es maximizar la eficiencia del equipo actual.

**Fórmulas:**
```
Eficiencia operativa = (Producción/ventas reales ÷ Capacidad máxima) × 100
Costo de ociosidad   = (1 − Eficiencia%) × Costos fijos totales
```

**Ejemplo:**
- Capacidad máxima del equipo actual: 500 ventas/mes
- Ventas reales: 300 ventas
- Eficiencia = (300 ÷ 500) × 100 = **60%**
- Costo de ociosidad = (1 − 0,60) × $3.500.000 = **$1.400.000/mes "perdidos"**

**Implicancia:** Hay un 40% de capacidad ociosa. La solución no es contratar más — es llenar la capacidad existente primero. Solo cuando la eficiencia supere el 85-90% tiene sentido evaluar una nueva contratación.

---

## E6. Valor Hora del Dueño — Qué Delegar y Qué No

**Qué es:** Si no sabés cuánto vale tu hora como dueño, tomás decisiones de delegación al revés. El criterio es simple: si una tarea puede hacerla alguien a menor costo que tu valor hora, delegala.

**Fórmulas:**
```
Valor hora dueño      = Utilidad neta mensual deseada ÷ Horas trabajadas por mes
Valor hora empleado   = Costo real mensual ÷ Horas trabajadas
```

**Ejemplo:**
- Utilidad deseada: $3.000.000/mes
- Horas trabajadas: 160 horas/mes
- Valor hora del dueño = $3.000.000 ÷ 160 = **$18.750/hora**

**Criterio de delegación:**
- ¿La tarea se puede resolver con alguien a $3.000/hora? → Delegala. Ganás $15.750 por hora liberada.
- ¿La tarea requiere tu criterio y habilidad específica? → Hacela vos.

**Implicancia:** Usar 2 horas en tareas de $1.500/hora te cuesta $35.000 de oportunidad (esas 2 horas usadas en tu core rentan $37.500).

---

## E7. PE de Inversión en Publicidad desde la Perspectiva del Equipo

**Qué es:** Cuánto puede crecer la inversión publicitaria antes de necesitar más equipo para sostener la demanda. Conecta el crecimiento de marketing con la capacidad operativa.

**Fórmula:**
```
Capacidad adicional sin nueva contratación =
  (Capacidad máxima − Demanda actual) × Ticket promedio

Inversión publicitaria máxima sin contratar =
  Capacidad adicional sin contratar ÷ Ticket × CPVenta
```

**Ejemplo:**
- Capacidad máxima: 500 ventas · Ventas actuales: 300 → Capacidad libre: 200 ventas
- Si las 200 ventas adicionales se consiguen con publicidad a CPVenta $8.571:
- Inversión publicitaria que el equipo puede absorber sin contratar = 200 × $8.571 = **$1.714.200**

**Implicancia:** Podés gastar hasta $1.714.200 más en publicidad sin necesitar contratar a nadie. Recién si la publicidad genera más de 200 ventas adicionales, el equipo se desborda y hay que sumar personal.

---

---

## Tabla Resumen — Las 42 Fórmulas

| # | Nombre | Bloque | Para qué decisión |
|---|---|---|---|
| F1 | Margen Bruto Unitario | Finanzas | ¿Me rinde este producto? |
| F2 | Margen Neto | Finanzas | ¿Gana dinero el negocio en total? |
| F3 | Precio Mínimo | Finanzas | ¿Hasta dónde puedo bajar el precio? |
| F4 | Contribución Marginal | Finanzas | ¿Cuánto aporta cada venta a los fijos? |
| F5 | Contribución Real (Mix) | Finanzas | ¿En qué producto debo enfocarme? |
| F6 | Punto de Equilibrio | Finanzas | ¿Cuánto tengo que vender mínimo? |
| F7 | Punto Óptimo | Finanzas | ¿Cuánto tengo que vender para ganar X? |
| F8 | Proyección Inversa | Finanzas | ¿Cuántos prospectos necesito? |
| F9 | Margen de Seguridad | Finanzas | ¿Qué tan frágil es el negocio? |
| F10 | ROI de Inversión | Finanzas | ¿Conviene esta inversión? ¿En cuánto la recupero? |
| F11 | Amortización Mensual | Finanzas | ¿Cuánto me cuesta el activo por mes? |
| F12 | Facturado vs. Percibido | Finanzas | ¿Por qué no hay plata si vendí bien? |
| F13 | Tasa de Cobro y Mora | Finanzas | ¿Qué tan sana está mi cartera? |
| F14 | Estado de Resultados | Finanzas | ¿Cuál fue el resultado real del mes? |
| F15 | PE con Nueva Persona | Finanzas | ¿Cuánto le puedo pagar a quien contrató? |
| F16 | Costo de Reposición | Finanzas | ¿Mi margen es real o está inflado? |
| V1 | Ticket Promedio | Ventas | ¿Cuánto gasta cada cliente? |
| V2 | Tasa de Cierre | Ventas | ¿Qué tan eficiente es el proceso de venta? |
| V3 | Frecuencia y Recompra | Ventas | ¿Cuánto valen los clientes actuales? |
| V4 | LTV | Ventas | ¿Cuánto vale un cliente en el tiempo? |
| V5 | Proyección de Ventas | Ventas | ¿Cuánto voy a facturar este mes? |
| V6 | Impacto de Subir Ticket | Ventas | ¿Qué pasa si cobro $X más por venta? |
| V7 | Duplicar Utilidad | Ventas | ¿Cuánto más tengo que vender para ganar el doble? |
| V8 | Eficiencia del Descuento | Ventas | ¿Me conviene hacer este descuento? |
| V9 | Upsell por Categoría | Ventas | ¿Cuánto gano si el cliente sube de producto? |
| V10 | Meta Diaria | Ventas | ¿Cuánto tiene que vender el equipo hoy? |
| M1 | CAC | Marketing | ¿Cuánto me cuesta cada cliente nuevo? |
| M2 | CAC Permitido | Marketing | ¿Cuánto puedo gastar en conseguir un cliente? |
| M3 | ROAS | Marketing | ¿Rinde la publicidad? |
| M4 | Costo por Etapa | Marketing | ¿Dónde se pierde el dinero en el embudo? |
| M5 | Rentabilidad por Canal | Marketing | ¿Qué canal de marketing funciona? |
| M6 | Presupuesto Máximo Ads | Marketing | ¿Cuánto puedo gastar en publicidad sin riesgo? |
| M7 | Conversión por Etapa | Marketing | ¿Dónde se van los clientes potenciales? |
| M8 | Predicción por Inversión | Marketing | Si invierto $X en ads, ¿cuánto vendo? |
| M9 | Ratio LTV/CAC | Marketing | ¿Es sano mi modelo de adquisición? |
| E1 | Costo Real Persona | Equipo | ¿Cuánto me cuesta realmente un empleado? |
| E2 | Facturación por Colaborador | Equipo | ¿Es eficiente el equipo? |
| E3 | Incremento para Contratar | Equipo | ¿Puedo permitirme contratar ahora? |
| E4 | Comisiones sobre Utilidad | Equipo | ¿Cómo remunerar al equipo bien? |
| E5 | Eficiencia Operativa | Equipo | ¿Tengo capacidad ociosa? |
| E6 | Valor Hora del Dueño | Equipo | ¿Qué debo delegar? |
| E7 | PE de Inversión Publicitaria | Equipo | ¿Cuánto puedo crecer antes de necesitar más equipo? |

---

---

*Emperador Financiero · Angelo Nisi · @emperadorfinanciero*

*Versión 1.0 — Junio 2026 · Uso exclusivo interno y de clientes*
