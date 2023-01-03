import React from "react";
import GaugeChart from "react-gauge-chart";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";

// import LineChart from "./LineChart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const data = [
  {
    name: "10 am",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "11 am",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12 am",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "13 am",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "14 am",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "15 am",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "16 am",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Main() {
  const gaugeStyle = {
    height: 150,
  };
  const [sensorData, setSensorData] = React.useState({});
  const [lightOn, setLightOn] = React.useState(false);

  React.useEffect(function () {
    console.log("Effect ran");
    fetch("http://86.50.229.208:5000/sensor-data")
      .then((res) => res.json())
      .then((data) => setSensorData(data));
  }, []);
  console.log(sensorData);
  console.log("sensorData");
  const co2 = sensorData.co2;
  const humidity = sensorData.humidity;
  const light = sensorData.light;

  const temperature = sensorData.temperature;
  const lastUpdate = sensorData.lastUpdate;
  console.log(lightOn);
  return (
    <div className="d-flex justify-content-center align-items-center main">
      <div className="container row gy-4 gx-4 ">
        <div className="gauge-container col-md-6 d-flex flex-wrap  ">
          <div className="col-md-12 mt-4 justify-content-center align-items-center d-flex">
            <p className="gauge-header ">some text here</p>
          </div>

          <div className="col-md-6 ">
            <GaugeChart
              className="col-12 d-flex justify-content-center align-items-center"
              id="gauge-chart2"
              nrOfLevels={20}
              percent={humidity / 100}
              style={gaugeStyle}
              colors={["#45b6fe", "#45b6fe"]}
            />
            <p className="gauge-title col-12">Humidity</p>
          </div>
          <div className="col-md-6 ">
            <GaugeChart
              className="col-12 d-flex justify-content-center align-items-center"
              id="gauge-chart2"
              nrOfLevels={20}
              percent={temperature / 100}
              style={gaugeStyle}
              formatTextValue={(value) => value + " °C"}
              colors={["#45b6fe", "#ff0000"]}
            />
            <p className="gauge-title col-12">Temperature</p>
          </div>
          <div className="col-md-6 ">
            <GaugeChart
              className="col-12 d-flex justify-content-center align-items-center"
              id="gauge-chart2"
              nrOfLevels={20}
              percent={light / 100}
              style={gaugeStyle}
              colors={["#000000", "#ffffff"]}
            />
            <p className="gauge-title col-12">Light</p>
          </div>
          <div className="col-md-6 ">
            <GaugeChart
              className="col-12 d-flex justify-content-center align-items-center"
              id="gauge-chart2"
              nrOfLevels={20}
              percent={co2 / 100}
              style={gaugeStyle}
            />
            <p className="gauge-title col-12">CO2</p>
          </div>
        </div>
        <div className="graph col-md-6 d-flex justify-content-center align-items-center">
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#000000" />

            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
        {/* SEPEHR CODE  */}
        <div className="actuator1 col-md-6 ">
          {lightOn ? (
            <BsLightbulb
              color="#ffbc00"
              size={100}
              className="col-md-12 mt-3"
            />
          ) : (
            <BsLightbulbOff
              color="black"
              size={100}
              className="col-md-12 mt-3"
            />
          )}

          <button
            className="btn text-light bg-dark m-3  "
            onClick={() => setLightOn((prevLightOn) => !prevLightOn)}
          >
            {lightOn ? "Turn off the Light" : "Turn on the Light"}
          </button>
        </div>
        <div className="actuator2 col-md-6 ">1</div>
      </div>
    </div>
  );
}
