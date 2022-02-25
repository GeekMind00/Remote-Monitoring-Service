import React from "react";
import { useEffect, useState } from "react";
import Graph from "./Graph";
import styles from "./styles.module.css";

function Home() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("Show Temp");
  const [chartData, setChartData] = useState([]);
  const [tittle, setTittle] = useState("Pressure");
  let [sec, setSec] = useState(0);
  let data;
  let temp = [];
  let pressure = [];

  /*   setInterval(() => {
    setSec((sec = sec + 1));
  }, 3000); */

  const dataURL = "http://127.0.0.1:8000/measures";
  useEffect(() => {
    fetch(dataURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        data = json;
        console.log(json)
        //setChartData(data);
        data.map((x) => {
          temp.push(x.Temperature_C);
          pressure.push(x.Humadity);
        });
        setChartData(toggle ? temp : pressure);
        console.log(json);
      })
      .catch((error) => alert(error)); // display errors
  }, [toggle]);
  const toggleHandler = () => {
    setToggle(!toggle);
    setText(toggle ? "Show Temp" : "Show Pressure");
    setTittle(toggle ? "Pressure" : "Temp");
  };

  console.log("chartData", chartData);

  return (
    <div className={styles.container}>
      <div className={styles.buttondiv}>
        <button className={styles.button} onClick={toggleHandler}>
          {text}
        </button>
      </div>
      <div>
        <div>
          <Graph data={chartData} tittle={tittle} />
        </div>
      </div>
    </div>
  );
}

export default Home;
