import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  /*
  // PRIMERA FORMA DE INICIALIZAR EL STATE = CONSTRUCTOR
  // El constructor es la primera función que se llama cuando se crea una instancia de la clase
  // Es un buen lugar para inicializar el State
  constructor(props) {
    // El constructor siempre recibe props

    // Para llamar el contructor del parent React.Component:
    super(props);

    // Inicializando el State
    // Es la única vez que se hace una asignación directa a this.state
    this.state = {
      // No se sabe el valor actual, se sabe que tomará un número decimal
      lat: null, // lat = latitude
      errorMessage: '', // Para manejar el error cuando la API no responda
    };
  }
  */

  // SEGUNDA FORMA DE INICIALIZAR EL STATE
  // Babel al compilar la siguiente línea, lo que hace es convertirlo a la forma 1
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    console.log('My component was rendered to the screen');
    // Geolocation API
    window.navigator.geolocation.getCurrentPosition(
      // Function Callback is call when it is successfull the position
      (position) => {
        console.log('position', position);
        this.setState({ lat: position.coords.latitude });
      },
      // Failure callback, unable to get the physical position
      (err) => {
        console.log(err);
        // Se llama setState con el fin de volver a renderizar el componente
        // Para que se muestre el mensaje de error
        // Cuando se llama setState estamos añadiendo o modificando propiedades
        // Nunca se están eliminando las propiedades
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log('My component was just updated - it rerendered');
  }

  // React says we have to define render!!!
  render() {
    // El método render se llama muchas veces, cada que se va a renderizar un componente
    // Por eso no es un buen lugar para hacer un llamado a una API

    // Si se tiene un mensaje de error y no se tiene latitud
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    // Si no se tiene un mensaje de error y se tiene la latitud
    if (!this.state.errorMessage && this.state.lat) {
      // return <div>Latitude: {this.state.lat}</div>;
      return <SeasonDisplay latitude={this.state.lat} />;
    }

    // Si no se cumplen los anteriores if
    return <Spinner message='Please accept location request' />;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
