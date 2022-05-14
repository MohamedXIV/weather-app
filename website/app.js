/* Global Variables */
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');
const generateButton = document.getElementById('generate');

const zipInput = document.getElementById('zip');
const feelingsText = document.getElementById('feelings');

const apikey = '64476440b3b4805f538caea7e9bce0e1';
const getUrl = (key, zip) => {
  return `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`;
}

let weatherData = {}
const projectObj = {};

//#region Events
generateButton.addEventListener('click', handleGenerate);

//#endregion

//#region callback methods
async function handleGenerate() {
  // Create a new date instance dynamically with JS
  const d = new Date();
  const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

  // console.log(feelings.value);
  const zip = zipInput.value;
  if (zip.length === 0) {
    console.error('Please enter a zip code');
    return;
  }

  await getData(zip);
  projectObj.timestamp = Math.floor(d.getTime() / 60000);
  projectObj.date = newDate;
  projectObj.temp = weatherData.main.temp;
  projectObj.content = feelingsText.value;
  console.log(projectObj);
  await postData('/api/set', projectObj);
  await udpateUI();
}

//#endregion


async function getData(zip = '') {
  try {
    const res = await fetch(getUrl(apikey, zip));
    weatherData = await res.json();
    //return data;
  } catch (err) {
    console.error(err);
  }
}

async function postData(url = '', data = {}) {
  
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  console.log(data);
  try {
    console.log(response.status);
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error("error", error);
  }
}

async function udpateUI(){
  try {
    dateElement.innerHTML = projectObj.date;
    tempElement.innerHTML = projectObj.temp + " celsius";
    contentElement.innerHTML = projectObj.content;
  } catch (error) {
    console.error("error", error);
  }
}