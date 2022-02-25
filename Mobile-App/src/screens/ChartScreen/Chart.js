import { Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import {
    LineChart,
} from 'react-native-chart-kit';

import CustomButton from '../../components/CustomButton';



const ChartDisplay = () => {

    const [toggle, setToggle] = useState(false);
    const [grapgData, setgraphData] = useState([]);
    const [text, setText] = useState("Show Humidity");
    const [Title, setTitle] = useState("Temperature Line Chart");
    const [ySuffix, setySuffix] = useState("C");
    let [delay, setdelay] = useState(0);
    let data;
    let temp = [];
    let Humidity = [];
    let label = [];

    // setInterval(() =>{
    //   setdelay(delay = delay+1)
    // }, 2000)

    const toggleHandler = () => {
        setToggle(!toggle);
        setText(toggle ? "Show Humidity" : "Show Temp");
        setTitle(toggle ? "Temperature Line Chart" : "Humidity Line Chart");
        setySuffix(toggle ? "C" : "%");
    };



    const dataURL = "http://127.0.0.1:8000/measures"; //for mobile
    useEffect(() => {
        fetch(dataURL)
            .then((response) => response.json()) // get response, convert to json
            .then((json) => {
                data = json;
                data.map((value) => {
                    if (value.measure_type == "temp") {
                        temp.push(value.measure);
                    }
                    if (value.measure_type == "hum") {
                        Humidity.push(value.measure);
                    }

                });

                setgraphData(toggle ? Humidity : temp);
                //console.log(json)
            })
            .catch((error) => alert(error)); // display errors
    }, [toggle]);

    //console.log("chartData" , grapgData); 

    return ( <
        View >
        <
        Text style = {
            {
                marginVertical: 70,
                fontSize: 30,
                textAlign: "center",
                fontWeight: "bold",
                color: "#000000"
            }
        } > { Title } < /Text> <
        LineChart data = {
            {
                labels: label,
                datasets: [{
                    data: grapgData
                }]
            }
        }
        width = { 300 }
        height = { 400 }
        yAxisSuffix = { ySuffix }
        chartConfig = {
            {
                backgroundColor: "#4287f5",
                backgroundGradientFrom: "#4287f5",
                backgroundGradientTo: "#4287f5",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#4287f5"
                }
            }
        }
        bezier style = {
            {
                marginLeft: 35,
                borderRadius: 16
            }
        }

        /> <
        CustomButton title = { text }
        clickHandle = { toggleHandler }
        /> < /
        View >
    );
}

export default ChartDisplay