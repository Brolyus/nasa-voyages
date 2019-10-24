import React, {Component} from 'react';

class UtilisatorVehicleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: '',
      speed: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ vehicle: event.target.value });
    console.log(this.state.vehicle)
  }

  handleSpeedChange(event) {
    this.setState({ speed: event.target.value });
    console.log(this.state.speed)
  }
  
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='vehicleName'>Vehicle : </label>
        <input
          id='vehicleName'
          name='vehicleName'
          type='text'
          value={this.state.vehicle}
          onChange={this.handleChange}
        />  
        <p>{this.state.vehicle}</p>
      
        <label htmlFor='vehicleName'>Speed Average : </label>
        <input
          id='speedAverage'
          name='speedAverage'
          type='number'
          value={this.state.speed}
          onChange={this.handleSpeedChange}
        />  
        <p>{this.state.speed}</p>
      </form>
    )
  }
}

export default UtilisatorVehicleForm