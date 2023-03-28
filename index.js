let states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
const apiKey = "43c9c8c543bfb593f22056af4732861f";

let countryCode = "US";
const limit = "5";
let lat = "";
let lon = "";
let currentWeatherUrl = "";
let fahren = 0;
async function getCity(enteredCity, enteredState, saved) {
  let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${enteredCity},${enteredState},${countryCode}&appid=${apiKey}`;
  let res = await fetch(geoUrl);
  let data = await res.json();
  let dataObj = data[0];
  lat = dataObj.lat;
  lon = dataObj.lon;
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  if (!saved) {
    getCurrentWeather();
    console.log("current");
  } else {
    getCurrentWeatherSavedAreas();
    console.log("saved");
  }
  //   console.log(city, lat, lon, st, country);
}

async function getCurrentWeather() {
  let res = await fetch(currentWeatherUrl);
  let data = await res.json();
  console.log(data);
  let dataObj = data;
  let icon = dataObj.weather[0].icon;
  let kel = dataObj.main.temp;
  fahren = Math.round(((kel - 273.15) * 9) / 5 + 32);
  console.log(fahren);
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let day1Icon = document.getElementById("day1Icon");
  day1Icon.src = iconUrl;
  let day1IconId = document.getElementById("day1IconId");
  console.log(dataObj.name);
  day1IconId.textContent = dataObj.name;
  let currentTemp = document.getElementById("currentTemp");
  currentTemp.textContent = fahren + `\xB0 F`;
  let div1 = document.getElementById("div-current");
  console.log(div1);
  let date = document.createElement("p");
  date.textContent = new Date().toLocaleString();
  div1.appendChild(date);
}
let select = document.getElementById("select");
states.forEach((state) => {
  let option = document.createElement("option");
  (option.textContent = state), (option.value = state);
  select.appendChild(option);
});
//
//
//
//
//
//
//get data for saved areas
async function getCurrentWeatherSavedAreas() {
  let res = await fetch(currentWeatherUrl);
  let data = await res.json();
  console.log(data);
  let dataObj = data;
  let icon = dataObj.weather[0].icon;
  let kel = dataObj.main.temp;
  fahren = Math.round(((kel - 273.15) * 9) / 5 + 32);
  console.log(fahren);
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  console.log(dataObj.name);
  let h3 = document.createElement("h3");
  h3.classList.add("savedArea");
  h3.textContent = dataObj.name;
  let p = document.createElement("p");
  p.classList.add("savedAreaP");
  p.textContent = fahren + `\xB0 F`;
  let img = document.createElement("img");
  img.classList.add("savedAreaImg");
  img.src = iconUrl;
  let saved_div = document.getElementById("saved-div");
  let saved_div1 = document.createElement("div");
  saved_div1.classList.add("saved_div1");
  saved_div1.appendChild(h3);
  saved_div1.appendChild(p);
  saved_div1.appendChild(img);
  let date = document.createElement("p");
  date.textContent = new Date().toLocaleString();
  saved_div1.appendChild(date);
  let del = document.createElement("button");
  del.type = "button";
  del.class = "delete";
  del.textContent = "Delete";
  saved_div1.appendChild(del);
  saved_div.appendChild(saved_div1);
  del.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(dataObj.name);
    removeArea(dataObj.name);
    p.remove();
    h3.remove();
    img.remove();
    date.remove();
    del.remove();
  });
}
//
//
//
//
//

let city = document.getElementById("city");
let state = document.getElementById("select");
let submit = document.getElementById("submit");
let form = document.getElementById("form");
let checkbox = document.getElementById("checkbox");
let savedAreas = [];
form.addEventListener("submit", (e) => {
  console.log("form");
  e.preventDefault();
  let saved = false;
  console.log(city.value, state.value, saved);
  getCity(city.value, state.value);
  if (checkbox.checked) {
    addSaved(city.value, state.value);
  }
});
//show saved areas
let show = document.getElementById("show");
let showing = false;
show.addEventListener("click", (e) => {
  if (!showing) {
    e.preventDefault();
    let saved = true;
    savedAreas.forEach((area) => {
      getCity(area.city, area.state, saved);
    });
    saved = false;
    showing = true;
  } else {
    let saved_div1 = document.getElementsByClassName("saved_div1");
    console.log(saved_div1);
    for (item of saved_div1) {
      item.remove();
    }

    showing = false;
  }
});

function addSaved(city, state) {
  savedAreas.push({
    city: city,
    state: state,
  });
  console.log(savedAreas);
}

function removeArea(city) {
  console.log(city);
  savedAreas = savedAreas.filter((e) => e.city != city);
  console.log(savedAreas);
}

let celCheck = document.getElementById("celsius");
celCheck.addEventListener("change", () => {
  let celsius = Math.round((fahren - 32 * 5) / 9);
  if (celCheck.checked) {
    currentTemp.textContent = celsius + `\xB0 C`;
  } else {
    currentTemp.textContent = fahren + `\xB0 F`;
  }
});
