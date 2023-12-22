//let montoPrestamo = prompt("Ingrese el monto del prestamos que desea solicitar:");

//console.log("el monto ingresado es de:", parseFloat(montoPrestamo)); 

let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
let tasaAnualPrestamo = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
let mesesPrestamo = parseInt(prompt("Ingrese la cantidad de meses para pagar el préstamo:"));



function calcularPrestamo(monto, tasaAnual, meses) {
    let tasaMensual = tasaAnual / 12 / 100;
    let cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
    
    console.log(`Detalles del préstamo: Monto: ${monto}, Tasa Anual: ${tasaAnual}%, Meses: ${meses}`);
    console.log("Cuotas mensuales:");

    for (let i = 1; i <= meses; i++) {
        let interes = monto * tasaMensual;
        let amortizacion = cuota - interes;
        
        console.log(`Mes ${i}: Cuota: ${cuota.toFixed(2)} - Interés: ${interes.toFixed(2)} - Amortización: ${amortizacion.toFixed(2)}`);

        monto -= amortizacion;
}}

if (isNaN(montoPrestamo) || isNaN(tasaAnualPrestamo) || isNaN(mesesPrestamo)) {
    console.log("Por favor, ingrese números válidos.");
} else {
    calcularPrestamo(montoPrestamo, tasaAnualPrestamo, mesesPrestamo);
}