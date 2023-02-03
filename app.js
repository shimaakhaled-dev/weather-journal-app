/* Global Variables */
const button = document.getElementById("generate");
// Personal API Key for OpenWeatherMap API
const apiKey = "2d10fc52c788cac43ed402bfb1a9b8e7&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//Function to be called in eventListener
async function Action() {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=`;

  fetchData(baseUrl)
    .then((data) => {
      const dataToSend = {
        myTemp: data.main.temp,
        myFeeling: feeling,
        myDate: newDate,
      };
      //function to send data to localServer
      async function send(route, dataToSend) {
        await fetch(route, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
      }
      send("/triger", dataToSend);
    })
    .then(retrieveData());
}

//function to get data from openWeatherMap
const fetchData = async (baseUrl) => {
  try {
    const response = await fetch(baseUrl + apiKey);
    const datajson = await response.json();

    if (datajson.cod == 200) {
      return datajson;
    } else {
      console.log(datajson.message);
    }
  } catch (error) {
    console.log("ooops", error);
  }
};

//function to get data from localServer
const retrieveData = async () => {
  const request = await fetch("/return");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.myTemp) + "degrees";
    document.getElementById("content").innerHTML = allData.myFeeling;
    document.getElementById("date").innerHTML = allData.myDate;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Add EventListener (click) to button to get Data
button.addEventListener("click", Action);
