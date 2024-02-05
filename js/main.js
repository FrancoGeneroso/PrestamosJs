class Prestamo {
    constructor() {
        this.prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
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

        this.prestamos.push({
            detalles: detallesPrestamo,
            cuotas: cuotasMensuales
        });

        localStorage.setItem("prestamos", JSON.stringify(this.prestamos));

        this.mostrarDetallesPrestamo(detallesPrestamo);
        this.mostrarCuotasMensuales(cuotasMensuales);
    }

    mostrarDetallesPrestamo(detalles) {
        document.getElementById("detallesPrestamo").textContent = detalles;
    }

    mostrarCuotasMensuales(cuotas) {
        let tbody = document.getElementById("cuotasMensuales").getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

        cuotas.forEach(cuota => {
            let fila = tbody.insertRow();
            let celdaMes = fila.insertCell();
            let celdaCuota = fila.insertCell();
            let celdaInteres = fila.insertCell();
            let celdaAmortizacion = fila.insertCell();

            celdaMes.textContent = cuota.mes;
            celdaCuota.textContent = cuota.cuota;
            celdaInteres.textContent = cuota.interes;
            celdaAmortizacion.textContent = cuota.amortizacion;
        });

    }

    
}

document.addEventListener("DOMContentLoaded", () => {
    const prestamoApp = new Prestamo();

    document.getElementById("prestamoForm").addEventListener("submit", (event) => {
        event.preventDefault();
    
        const monto = parseFloat(document.getElementById("monto").value);
        const tasaAnual = parseFloat(document.getElementById("tasaAnual").value);
        const meses = parseInt(document.getElementById("meses").value);
    
        isNaN(monto) || isNaN(tasaAnual) || isNaN(meses) ? alert("Por favor, ingrese números válidos.") : prestamoApp.calcularPrestamo(monto, tasaAnual, meses);
    });
        }
    );

    


    