import React from 'react'
import './GameFormVehicle.css'

class GameFormVehicle extends React.Component {
  render() {
    return (
      <div className='Vehicle'>
      <form onSubmit={this.props.handleSubmit}>
        <label className='LabelVehicle'>
          Choose your vehicle:
          <select defaultValue={this.props.vehicleOptions[0]} onChange={this.props.handleVehicleChange}>
            {this.props.vehicleOptions.map(option => {
              return (
              <option key={`vehicule_${option}`} value={option}>{option}</option>
            )})}
          </select>
        </label>
      </form>
      </div>
    );
  }
}
export default GameFormVehicle