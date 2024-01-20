
class Prestamo {
    constructor() {
        this.prestamos = [];
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
        console.table(cuotasMensuales, ["mes", "cuota", "interes", "amortizacion"]);

        this.prestamos.push({
            detalles: detallesPrestamo,
            cuotas: cuotasMensuales
        });
    }

    filtrarPrestamosPorMeses(meses) {
        return this.prestamos.filter(prestamo => prestamo.cuotas.length === meses);
    }

   
}



 function solicitarPrestamo() {
	 
        let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
        let tasaAnualPrestamo = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
        let mesesPrestamo = parseInt(prompt("Ingrese la cantidad de meses para pagar el préstamo:"));
    
        if (isNaN(montoPrestamo) || isNaN(tasaAnualPrestamo) || isNaN(mesesPrestamo)) {
            console.log("Por favor, ingrese números válidos.");
        } else {
			const prestamoApp = new Prestamo();
            prestamoApp.calcularPrestamo(montoPrestamo, tasaAnualPrestamo, mesesPrestamo);
        }
    }

solicitarPrestamo();