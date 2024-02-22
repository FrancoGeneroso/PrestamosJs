
class Prestamo {
    constructor() {
      this.prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
    }
  
    calcularPrestamo(monto, tasaAnual, meses) {
      return new Promise((resolve) => {
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
  
        this.detallesPrestamo = detallesPrestamo;
        this.cuotasMensuales = cuotasMensuales;
  
        resolve();

        
      });
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

    

    limpiarTabla() {
        const tbody = document.getElementById("cuotasMensuales").getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        this.prestamos = [];
        localStorage.setItem("prestamos", JSON.stringify(this.prestamos));
      }
  

     
      async fetchData() {
        try {
          const response = await fetch('data.json');
          if (response.ok) {
            const data = await response.json();
            this.prestamos = data;
            localStorage.setItem("prestamos", JSON.stringify(this.prestamos));
          } else {
            throw new Error("No se pudo obtener los préstamos.");
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.toString(),
          });
        }
      }
  }
  
  
  document.addEventListener("DOMContentLoaded", async () => {
    const prestamoApp = new Prestamo();
    
  
    const montoInput = document.getElementById("monto");
    const tasaAnualInput = document.getElementById("tasaAnual");
    const mesesInput = document.getElementById("meses");

    
  
  
    document.getElementById("prestamoForm").addEventListener("submit", async (event) => {
        event.preventDefault();
  
               
        const monto = parseFloat(document.getElementById("monto").value);
        const tasaAnual = parseFloat(document.getElementById("tasaAnual").value);
        const meses = parseInt(document.getElementById("meses").value);
  
        if (isNaN(monto) || isNaN(tasaAnual) || isNaN(meses)) {
            alert("Por favor, ingrese números válidos.");
            return;
          }
    
          if (!monto || !tasaAnual || !meses) {
            alert("Por favor, complete todos los campos.");
            return;
          }
    
            
         
    
          await prestamoApp.calcularPrestamo(monto, tasaAnual, meses);
    
          setTimeout(() => {

                                
    
            
            const tbody = document.getElementById("cuotasMensuales").getElementsByTagName("tbody")[0];
            tbody.innerHTML = "";
    
            prestamoApp.cuotasMensuales.forEach((cuota) => {
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
    
            prestamoApp.mostrarDetallesPrestamo(prestamoApp.detallesPrestamo);
          }, 2000); 
        });
    
     
      document.getElementById("showPrestamos").addEventListener("click", () => {
        prestamoApp.fetchData().then((data) => {
          
          console.log(data);
        });
      });
    
     
      const tableContainer = document.getElementById("table-container");
      const adquirirPrestamoButton = document.createElement("button");
      adquirirPrestamoButton.textContent = "Adquirir préstamo";
      adquirirPrestamoButton.classList.add("btn", "btn-primary", "ml-3");
    
      adquirirPrestamoButton.addEventListener("click", () => {
        if (!montoInput.checkValidity() || !tasaAnualInput.checkValidity() || !mesesInput.checkValidity()) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
          });
          return;
        }
    
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no puede deshacerse.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, adquirir préstamo!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Préstamo adquirido!", "El préstamo ha sido adquirido.", "success");
            prestamoApp.limpiarTabla()
          }
        });
      });
      
      tableContainer.appendChild(adquirirPrestamoButton);
    });  

  
    