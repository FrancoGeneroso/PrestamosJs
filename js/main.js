//let montoPrestamo = prompt("Ingrese el monto del prestamos que desea solicitar:");

//console.log("el monto ingresado es de:", parseFloat(montoPrestamo)); 
/*function Prestamo() {
    let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
    let tasaAnualPrestamo = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
    let mesesPrestamo = parseInt(prompt("Ingrese la cantidad de meses para pagar el préstamo:"));
    
    if (isNaN(montoPrestamo) || isNaN(tasaAnualPrestamo) || isNaN(mesesPrestamo)){
        console.log("Por favor, ingrese números válidos.");
    } else {
        calcularPrestamo(montoPrestamo, tasaAnualPrestamo, mesesPrestamo);
    }
    
}





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



Prestamo()
*/

class Prestamo {
    constructor() {
        this.prestamos = [];
    }

    solicitarPrestamo() {
        let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
        let tasaAnualPrestamo = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
        let mesesPrestamo = parseInt(prompt("Ingrese la cantidad de meses para pagar el préstamo:"));
    
        if (isNaN(montoPrestamo) || isNaN(tasaAnualPrestamo) || isNaN(mesesPrestamo)) {
            console.log("Por favor, ingrese números válidos.");
        } else {
            this.calcularPrestamo(montoPrestamo, tasaAnualPrestamo, mesesPrestamo);
        }
    }

    calcularPrestamo(monto, tasaAnual, meses) {
        let tasaMensual = tasaAnual / 12 / 100;
        let cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
        let detallesPrestamo = `Detalles del préstamo: Monto: ${monto}, Tasa Anual: ${tasaAnual}%, Meses: ${meses}`;
        let cuotasMensuales = [];

        for (let i = 1; i <= meses; i++) {
            let interes = monto * tasaMensual;
            let amortizacion = cuota - interes;

            cuotasMensuales.push({
                mes: i,
                cuota: cuota.toFixed(2),
                interes: interes.toFixed(2),
                amortizacion: amortizacion.toFixed(2)
            });

            monto -= amortizacion;
        }

        console.log(detallesPrestamo);
        console.log("Cuotas mensuales:");
        console.table(cuotasMensuales);

        this.prestamos.push({
            detalles: detallesPrestamo,
            cuotas: cuotasMensuales
        });
    }

    filtrarPrestamosPorMeses(meses) {
        return this.prestamos.filter(prestamo => prestamo.cuotas.length === meses);
    }

   
}

const prestamoApp = new Prestamo();
prestamoApp.solicitarPrestamo();



