import React from "react";
import GameFormPlanet from "./GameFormPlanet";
import GameFormVehicle from "./GameFormVehicle";
import UtilisatorVehicleForm from "./UtilisatorVehicleForm";
import vehicleList from "../data/vehicleList";
import "./Game.css";
import { Snackbar, FABButton, Icon, Button } from "react-mdl";
import { Link } from "react-router-dom";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planetList: [],
      planetOptions: [],
      vehicleOptions: vehicleList.map(option => option.vehicle),
      depart: "",
      departPosition: "",
      arrival: "",
      arrivalPosition: "",
      distance: "",
      vehicle: "",
      speed: "",
      time: "",
      customSpeed: "",
      customVehicle: "",
      resultStatus: false,
      isSnackbarActive: false,
      addVehicleVisible: false
    };
    this.handleDepartChange = this.handleDepartChange.bind(this);
    this.handleArrivalChange = this.handleArrivalChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleCustomVehicleChange = this.handleCustomVehicleChange.bind(this);
    this.handleCustomSpeedChange = this.handleCustomSpeedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitNewVehicle = this.handleSubmitNewVehicle.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.setAllPlanets = this.setAllPlanets.bind(this);
    this.handleAddVehicleAppear = this.handleAddVehicleAppear.bind(this);
  }
  componentDidMount() {
    fetch("https://api.le-systeme-solaire.net/rest/bodies")
      .then(response => response.json())
      .then(data =>
        data.bodies.filter(options => {
          if (options.isPlanet || options.englishName === "Sun") {
            this.setState({
              planetList: [...this.state.planetList, options]
            });
          }
        })
      )
      .then(this.setAllPlanets);
  }

  setAllPlanets() {
    this.setState({
      planetOptions: this.state.planetList.map(option => option.name)
    });
  }

  handleDepartChange(event) {
    this.state.planetList.forEach(planet => {
      if (planet.name === event.target.value) {
        this.setState({
          departPosition: planet.semimajorAxis,
          depart: event.target.value,
          resultStatus: false
        });
      }
    });
  }
  handleArrivalChange(event) {
    this.state.planetList.forEach(planet => {
      if (planet.name === event.target.value) {
        this.setState({
          arrivalPosition: planet.semimajorAxis,
          arrival: event.target.value,
          resultStatus: false
        });
      }
    });
  }

  handleVehicleChange(event) {
    vehicleList.forEach(vehicle => {
      if (vehicle.vehicle === event.target.value) {
        this.setState({
          speed: vehicle.speed,
          vehicle: event.target.value,
          resultStatus: false
        });
      }
    });
  }
  handleCustomVehicleChange(event) {
    this.setState({ customVehicle: event.target.value, resultStatus: false });
  }

  handleCustomSpeedChange(event) {
    this.setState({ customSpeed: event.target.value, resultStatus: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    const timeResult = Math.floor(
      Math.abs(this.state.departPosition - this.state.arrivalPosition) /
        this.state.speed
    );
    this.setState({
      time: timeResult,
      distance: Math.abs(
        this.state.departPosition - this.state.arrivalPosition
      ),
      resultStatus: true
    });
  }

  handleAddVehicleAppear() {
    this.setState({
      addVehicleVisible: !this.state.addVehicleVisible
    });
  }

  handleSubmitNewVehicle(event) {
    vehicleList[vehicleList.length] = {
      vehicle: this.state.customVehicle,
      speed: this.state.customSpeed
    };
    this.setState({
      vehicleOptions: vehicleList.map(option => option.vehicle),
      isSnackbarActive: true
    });
  }

  handleTimeoutSnackbar() {
    this.setState({ isSnackbarActive: false });
  }

  render() {
    const { isSnackbarActive } = this.state;
    return (
      <div className="Game">
        <div className="plan-travel">
          <h3>Planifier votre voyage</h3>
          <GameFormPlanet
            depart={this.state.depart}
            arrival={this.state.arrival}
            planetOptions={this.state.planetOptions}
            handleDepartChange={this.handleDepartChange}
            handleArrivalChange={this.handleArrivalChange}
            handleSubmit={this.handleSubmit}
          />
          <GameFormVehicle
            vehicleOptions={this.state.vehicleOptions}
            handleVehicleChange={this.handleVehicleChange}
            handleSubmit={this.handleSubmit}
          />
          <div className="Create">
            <h3 className="OrCreate">Ou crée ton véhicule</h3>
            <FABButton colored ripple onClick={this.handleAddVehicleAppear}>
              <Icon name="+" />
            </FABButton>
            {this.state.addVehicleVisible ? (
              <>
                <UtilisatorVehicleForm
                  handleCustomVehicleChange={this.handleCustomVehicleChange}
                  handleCustomSpeedChange={this.handleCustomSpeedChange}
                />
                <Button
                  raised
                  accent
                  type="submit"
                  value="Ajouter"
                  onClick={this.handleSubmitNewVehicle}
                >
                  Ajouter
                </Button>
              </>
            ) : null}
          </div>
        </div>
        <Snackbar
          active={isSnackbarActive}
          onTimeout={this.handleTimeoutSnackbar}
        >
          {`${this.state.customVehicle} ajouté à la liste des véhicules`}
        </Snackbar>
        <br />

        {this.state.resultStatus ? (
          <div className="calculation">
            La distance entre{" "}
            {this.state.depart.replace(/[0-9]/g, "").replace(/\(|\)/g, "")} et{" "}
            {this.state.arrival.replace(/[0-9]/g, "").replace(/\(|\)/g, "")} est
            de{" "}
            {this.state.distance
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            km
            <br />
            En {this.state.vehicle}, cela prendrai{" "}
            {this.state.time.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            heures pour faire le voyage, soit:
            <br />
            <ul>
              <li>
                {Math.floor(this.state.time / 24)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                jours.
              </li>
              <li>
                ou{" "}
                {Math.floor(this.state.time / 24 / 365)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                années
              </li>
              <li>
                Pour plus d'informations sur votre destination, voir notre
                lexique ci-desous:
                <br />
                <Button raised accent>
                  <Link to="/Lexique" className="LinkLexique">
                    Lexique
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="DivCalcul">
            <Button
              raised
              accent
              className="Calcul"
              type="submit"
              value="Calculer"
              onClick={this.handleSubmit}
            >
              Calculer
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default Game;
