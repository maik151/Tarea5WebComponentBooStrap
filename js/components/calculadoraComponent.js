// Definimos el nombre del componente en nuestar clase que hereda de HTMLElement
class CalculadoraBasica extends HTMLElement{

    //Definimos una fucnion constructor que se ejecuta al crear el componente
     constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Definimos el HTML DEL componente en base a lo requerido
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../css/bootstrap.min.css" />

      <div class="card p-3 shadow">
        <h4 class="mb-3">Calculadora Básica</h4>
        <div class="mb-2">
          <input type="number" id="num1" class="form-control" placeholder="Número 1">
        </div>
        <div class="mb-2">
          <input type="number" id="num2" class="form-control" placeholder="Número 2">
        </div>
        <div class="mb-2">
          <select id="operacion" class="form-select">
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
          </select>
        </div>
        <button class="btn btn-primary w-100" id="calcular">Calcular</button>
        <div class="mt-3 alert alert-info d-none" id="resultado"></div>
        <hr>
        <h5>Historial</h5>
        <ul class="list-group" id="historial"></ul>
      </div>
    `;
    }

    // Método que se ejecuta cuando el componente se conecta al DOM
    // Aquí es donde agregamos los eventos y la lógica de la calculadora
    // En este caso para mejorar la legibilidad del código, separamos la lógica en métodos donde 
    // el metodo principal ejecuitarCalculo es el que va a realizar toda la logica
    // de esta forma encapsulamos la lógica de la calculadora y la hacemos más legible
    connectedCallback() {
    this.shadowRoot.getElementById('calcular')
      .addEventListener('click', () => this.ejecutarCalculo());
    }
    
    //Metodo
    ejecutarCalculo() {
    const entradas = this.leerEntradas();
    if (!entradas) return;

    const { resultado, simbolo } = this.calcularResultado(entradas);
    this.mostrarResultado(resultado);
    this.emitirEvento(resultado);
    this.agregarAlHistorial(entradas.n1, entradas.n2, simbolo, resultado);
  }

  // Metodo para leer las entradas del input text del selec menu
  leerEntradas() {
    //Definimos las constantes de lectura de los inputs
    // y del select menu de operaciones
    const n1 = parseFloat(this.shadowRoot.getElementById('num1').value);
    const n2 = parseFloat(this.shadowRoot.getElementById('num2').value);
    const operacion = this.shadowRoot.getElementById('operacion').value;
    // Validamos que los valores ingresados sean números válidos
    // y que no se intente dividir por cero
    if (isNaN(n1) || isNaN(n2)) {
      this.mostrarError('Ingresa valores numéricos válidos.');
      return null;
    }
    // Validamos que la operación sea una de las permitidas
    // y que no se intente dividir por cero
    if (operacion === 'dividir' && n2 === 0) {
      this.mostrarError('No se puede dividir por cero.');
      return null;
    }
    // Si todo es correcto, retornamos un objeto con los valores leidos
    return { n1, n2, operacion };
  }

  // Metodo para calcular el resultado de la operación
  //Pedimos como aprametros el objeto generado por la funcion anterior
  calcularResultado({ n1, n2, operacion }) {
    //Definimos una variable resultado y simbolo
    // y dependiendo de la operación seleccionada, realizamos el cálculo
    let resultado, simbolo;
    switch (operacion) {
      case 'sumar': resultado = n1 + n2; simbolo = '+'; break;
      case 'restar': resultado = n1 - n2; simbolo = '-'; break;
      case 'multiplicar': resultado = n1 * n2; simbolo = '×'; break;
      case 'dividir': resultado = n1 / n2; simbolo = '÷'; break;
    }
    // Retornamos un objeto con el resultado y el símbolo de la operación
    return { resultado, simbolo };
  }

  
}

customElements.define('calculadora-basica', CalculadoraBasica);


