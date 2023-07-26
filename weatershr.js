import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  
 
   const[data,setData]=useState(false) 
  const [temperatureResult, setTemperatureResult] = useState([]);
  const[btn1,setBtn1]=useState(false)
  const[btn2,setBtn2]=useState(false)
  const[btn3,setBtn3]=useState(false)
  const[btn4,setBtn4]=useState(false)
  console.log(temperatureResult);

  const getTemperature = async () => {
    const date_Input = window.prompt('Enter a date (YYYY-MM-DD):');
    if (!date_Input) {
      alert('Please enter a valid date.');
      return;
    }

   

    // Use "All Origins" proxy to bypass CORS restrictions
    const PROXY_URL = 'https://api.allorigins.win/get?url=';
    const API_URL = `https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22`;

    try {
      const response = await axios.get(PROXY_URL + encodeURIComponent(API_URL));
      const data = JSON.parse(response.data.contents);
      console.log(data);

      // Filter data for the specific date using the timestamp
      const filteredData = await data.list.filter(item => {
        
        console.log(date_Input, item?.dt_txt?.split(" ")[0]);
        return date_Input === item?.dt_txt?.split(" ")[0];
      });

      setTemperatureResult(filteredData);
      if(filteredData?.length>0){
        setData(true)

      }
      

    //   if (filteredData.length > 0) {
    //     const temperature = filteredData[0].main.temp;
    //     setTemperatureResult(`Temperature on ${date_Input}: ${temperature} °K`);
    //   } else {
    //     setTemperatureResult('No temperature data found for the entered date.');
    //   }
    } catch (error) {
      console.error('Error fetching data:', error);
      setTemperatureResult('An error occurred while fetching data. Please try again later.');
    }
  };

  const btn1func=()=>{
    setBtn1(true)
    setBtn2(false)
    setBtn3(false)

    
  }
  const btn2func=()=>{
    setBtn1(false)
    setBtn2(true)
    setBtn3(false)

    
  }
  const btn3func=()=>{
    setBtn1(false)
    setBtn3(true)
    setBtn2(false)
    
  }

  return (
    <div >
        {!data?<><h1>Weather API - Get Temperature</h1>
      <button onClick={getTemperature} style={{padding:"20px"}}>Get Temperature</button></>
      
      :""}

{data?

<>
      {temperatureResult?.map((item)=>{
        return(
            <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
           {btn1? <h1 style={{backgroundColor:"lightgrey",padding:"20px",textAlign:"center"}}>temp:{" "}{item?.main.temp} K</h1>:""}
           {btn2? <h1 style={{backgroundColor:"lightgrey",padding:"20px",textAlign:"center"}}>wind speed::{" "}{item?.wind.speed} M/h</h1>:""}
           {btn3? <h1 style={{backgroundColor:"lightgrey",padding:"20px",textAlign:"center"}}>pressure::{" "}{item?.main.pressure} N</h1>:""}
            
            </div>
        )
      })}
      <div id="temperatureResult">
        
       
        <div style={{display:'flex',justifyContent:"center"}}>
        <button onClick={btn1func}>1</button>
        <button onClick={btn2func}>2</button>
        <button onClick={btn3func}>3</button>
        <button onClick={()=>setData(false)}>0</button>

        </div>
       
       
      </div>
      </>:""}
    </div>
  );
};

export default WeatherComponent;
