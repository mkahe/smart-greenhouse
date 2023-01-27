import React from "react";
import GaugeChart from "react-gauge-chart";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";
import { FaFan } from "react-icons/fa";
import { RiTempColdLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { MdLightMode } from "react-icons/md";
import { SiOxygen } from "react-icons/si";
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

export default function Main() {
  const gaugeStyle = {
    height: 150,
  };
  const [sensorData, setSensorData] = React.useState({});
  const [historyData, setHistoryData] = React.useState({});
  const [lightOn, setLightOn] = React.useState();
  const [hvacOn, setHvacOn] = React.useState(false);
  const [servo, setServo] = React.useState(20);

  // const [refresh, setRefresh] = React.useState(false);
  const getSensorData = () => {
    console.log("Sensor Data");
    fetch("http://86.50.229.208:5000/sensor-data")
      .then((res) => res.json())
      .then((data) => setSensorData(data));
  };
  const getHistoryData = () => {
    console.log("history Data");
    fetch("http://86.50.229.208:5000/sensor-history")
      .then((res) => res.json())
      .then((data) => setHistoryData(data));
    console.log(historyData);
  };
  const getLightStatus = () => {
    fetch("http://86.50.229.208:5000/light")
      .then((res) => res.json())
      .then(
        (data) => setLightOn(data.lightOn),
        console.log("initial ligh is:"),
        console.log(lightOn)
      );
  };
  const getFanStatus = () => {
    fetch("http://86.50.229.208:5000/hvac")
      .then((res) => res.json())
      .then(
        (data) => setLightOn(data.hvacOn),
        console.log("initial fan is:"),
        console.log(hvacOn)
      );
  };
  const getServoStatus = () => {
    fetch("http://86.50.229.208:5000/servo")
      .then((res) => res.json())
      .then(
        (data) => setServo(data.angle),
        console.log("initial servo is:"),
        console.log(servo)
      );
  };

  React.useEffect(function () {
    const interval = setInterval(() => {
      getSensorData();
      getHistoryData();
    }, 10000);
    getLightStatus();
    getFanStatus();
    getServoStatus();

    return () => clearInterval(interval);
  }, []);

  const co2 = sensorData.co2;
  const humidity = sensorData.humidity;
  const light = sensorData.light;
  const temperature = sensorData.temperature;
  const lastUpdate = sensorData.lastUpdate;
  // const time = new Date(sensorData.lastUpdate).getTime();

  function lightChange() {
    console.log("the onclick light before change is:");
    console.log(lightOn);

    setLightOn((prevLightOn) => !prevLightOn);
    console.log("the onclick light after change is:");
    console.log(lightOn);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lightOn: lightOn }),
    };
    fetch("http://86.50.229.208:5000/light", requestOptions).then((response) =>
      response.json()
    );
  }
  function fanChange() {
    console.log("the onclick fan before change is: ");
    console.log(hvacOn);
    setHvacOn((prevHvacOn) => !prevHvacOn);
    console.log("the onclick fan after change is:");
    console.log(hvacOn);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hvacOn: hvacOn }),
    };
    fetch("http://86.50.229.208:5000/hvac", requestOptions).then((response) =>
      response.json()
    );
  }
  function angleChange(value) {
    setServo(value);
    console.log("the servo after change is:");
    console.log(servo);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ angle: servo }),
    };
    fetch("http://86.50.229.208:5000/servo", requestOptions).then((response) =>
      response.json()
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center main">
      <div className="container row   ">
        <div className="col-md-6 gauge-container  ">
          <div className="gauge d-flex flex-wrap bx-shadow ">
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
              <p className="gauge-title col-12">
                <WiHumidity size={30} color={"yellow"} />
                Humidity
              </p>
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
              <p className="gauge-title col-12">
                <RiTempColdLine size={30} color={"yellow"} />
                Temperature
              </p>
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
              <p className="gauge-title col-12">
                <span className="p-1">
                  <MdLightMode size={30} color={"yellow"} />
                </span>
                Light
              </p>
            </div>
            <div className="col-md-6 ">
              <GaugeChart
                className="col-12 d-flex justify-content-center align-items-center"
                id="gauge-chart2"
                nrOfLevels={20}
                percent={co2 / 100}
                style={gaugeStyle}
              />
              <p className="gauge-title col-12">
                <span className="p-1">
                  <SiOxygen color={"yellow"} size={20} />
                </span>
                CO2
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 graph-container bx-shadow">
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

        <div className="col-md-6 actuator1-container ">
          <div className="actuator1 d-flex justify-content-center align-items-center ">
            <div className="col-6 position-relative">
              <div
                onClick={lightChange}
                className={
                  // MastMal
                  lightOn ? "circle border-red" : "circle border-green"
                }
              >
                {lightOn ? (
                  <BsLightbulbOff
                    color="black"
                    size={100}
                    className="col-md-12 mt-3 icon"
                  />
                ) : (
                  <BsLightbulb
                    color="yellow"
                    size={100}
                    className="col-md-12 mt-3 icon"
                  />
                )}

                <p className="m-3 text-dark icon-title">Light</p>
              </div>
            </div>
            <div className="col-6 position-relative">
              <div
                onClick={fanChange}
                // MastMal
                className={hvacOn ? "circle border-red" : "circle border-green"}
                // onClick={() => setFanOn((prevFanOn) => !prevFanOn)}
              >
                {hvacOn ? (
                  <div className="col-md-12 mt-3">
                    {/* MastMal */}
                    <FaFan color="black" size={100} />
                  </div>
                ) : (
                  <div className="col-md-12 mt-3">
                    <FaFan color="#45b6fe" size={100} className="rotate" />
                  </div>
                )}
                <p className="m-3 text-dark icon-title">Fan</p>
                {/* <button
                  className="btn text-light bg-dark m-3  "
                  onClick={() => setFanOn((prevFanOn) => !prevFanOn)}
                >
                  {fanOn ? "Turn off the Fan" : "Turn on the Fan"}
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 actuator2-container">
          <div className="actuator2  p-5 ">
            <CircularSlider
              width={200}
              progressSize={15}
              dataIndex={servo}
              knobSize={50}
              max={180}
              onChange={(value) => {
                angleChange(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
