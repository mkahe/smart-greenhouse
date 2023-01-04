import React from "react";
import GaugeChart from "react-gauge-chart";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";
import { FaFan } from "react-icons/fa";
import CircularSlider from "@fseehawer/react-circular-slider";

// import LineChart from "./LineChart";
import {
  BarChart,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
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
  const [historyData, setHistoryData] = React.useState({});
  const [lightOn, setLightOn] = React.useState(false);
  const [fanOn, setFanOn] = React.useState(false);

  React.useEffect(function () {
    console.log("Effect ran");
    fetch("http://86.50.229.208:5000/sensor-data")
      .then((res) => res.json())
      .then((data) => setSensorData(data));
  }, []);
  React.useEffect(function () {
    console.log("Effect ran");
    fetch("http://86.50.229.208:5000/sensor-history")
      .then((res) => res.json())
      .then((data) => setHistoryData(data));
  }, []);
  // console.log(historyData);
  // console.log("!");

  const co2 = sensorData.co2;
  const humidity = sensorData.humidity;
  const light = sensorData.light;

  const temperature = sensorData.temperature;
  const lastUpdate = sensorData.lastUpdate;
  const time = new Date(sensorData.lastUpdate).getTime();
  console.log(time);
  return (
    <div className="d-flex justify-content-center align-items-center main">
      <div className="container row   ">
        <div className="col-md-6 gauge-container">
          <div className="gauge d-flex flex-wrap  ">
            <div className="col-12 mt-4 justify-content-center align-items-center d-flex">
              <p className="gauge-header ">{lastUpdate}</p>
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
        </div>
        <div className="col-md-6 graph-container">
          <div className="graph d-flex flex-column justify-content-center align-items-center  ">
            <p className="gauge-header  ">Last 24Hours History</p>

            <div className="col-12 d-flex flex-wrap justify-content-center align-items-center lineChart chart">
              <LineChart
                className=""
                width={400}
                height={150}
                data={historyData}
              >
                <Line type="monotone" dataKey="humidity" stroke="#1cccff" />
                <Line type="monotone" dataKey="co2" stroke="#9999ff" />
                <Line type="monotone" dataKey="light" stroke="#001cbf" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
              </LineChart>
            </div>
            <div className="col-12 d-flex flex-wrap justify-content-center align-items-center barChart chart">
              <BarChart width={400} height={100} data={historyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
        {/* SEPEHR CODE  */}
        <div className="col-md-6 actuator1-container ">
          <div className="actuator1 d-flex justify-content-center align-items-center ">
            <div className="col-6">
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
            <div className="col-6">
              {fanOn ? (
                <div className="col-md-12 mt-3">
                  <FaFan color="black" size={100} className="rotate" />
                </div>
              ) : (
                <div className="col-md-12 mt-3">
                  <FaFan color="black" size={100} />
                </div>
              )}

              <button
                className="btn text-light bg-dark m-3  "
                onClick={() => setFanOn((prevFanOn) => !prevFanOn)}
              >
                {fanOn ? "Turn off the Fan" : "Turn on the Fan"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 actuator2-container">
          <div className="actuator2  p-5 ">
            <CircularSlider
              width={200}
              progressSize={15}
              knobSize={50}
              max={180}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
