const clock = document.getElementById("clock");
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const emyBubble = document.getElementById("emyBubble");
const appsDiv = document.getElementById("apps");

function emy(text){
  emyBubble.innerText = text;
}

function loaderHTML(){
  return `<div class="loader"></div>`;
}

/* Clock */
function updateClock(){
  clock.innerText = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
setInterval(updateClock, 1000);
updateClock();

/* Theme */
function toggleTheme(){
  if(document.documentElement.getAttribute("data-theme") === "light"){
    document.documentElement.removeAttribute("data-theme");
    emy("Dark Neon Mode activated.");
  } else {
    document.documentElement.setAttribute("data-theme","light");
    emy("Light Mode activated.");
  }
}

/* Apps */
const apps = [
  {id:"weather", title:"🌦 Weather Forecast", desc:"Live weather using Open-Meteo API.", badge:"API"},
  {id:"air", title:"🌫 Air Quality Monitor", desc:"AQI & pollution using Open-Meteo API.", badge:"API"},
  {id:"crypto", title:"💠 Crypto Tracker", desc:"Live crypto prices using CoinGecko API.", badge:"LIVE"},
  {id:"country", title:"🌍 Country Intelligence", desc:"Country scanner using REST Countries API.", badge:"API"},
  {id:"wiki", title:"📚 Wikipedia Search", desc:"Knowledge engine powered by Wikipedia API.", badge:"WIKI"},
  {id:"news", title:"📰 Fake News Analyzer", desc:"Wikipedia + clickbait signal analyzer.", badge:"AI"},
  {id:"earthquake", title:"🌍 Earthquake Radar", desc:"Latest earthquakes worldwide (USGS API).", badge:"LIVE"},
  {id:"iss", title:"🛰 ISS Tracker", desc:"Track ISS live using HTTPS satellite API.", badge:"SPACE"},
  {id:"spacex", title:"🚀 SpaceX Launch Tracker", desc:"Upcoming SpaceX launch information.", badge:"SPACE"},
  {id:"timezone", title:"🕒 Timezone Explorer", desc:"Check timezones using WorldTimeAPI.", badge:"TIME"},
  {id:"location", title:"📡 Auto Location Scanner", desc:"Detect your approximate location via IP.", badge:"LIVE"},
  {id:"credits", title:"⚡ System Credits", desc:"Final page.", badge:"END"}
];

function renderApps(){
  appsDiv.innerHTML = "";
  apps.forEach(app=>{
    const card = document.createElement("div");
    card.className = "app";
    card.onclick = ()=>openPanel(app.id);

    card.innerHTML = `
      <h2>${app.title}</h2>
      <p>${app.desc}</p>
      <span class="badge">${app.badge}</span>
    `;

    appsDiv.appendChild(card);
  });
}

renderApps();

/* Panel */
function openPanel(app){
  panel.classList.remove("hidden");

  if(app==="weather"){
    panelTitle.innerText = "Weather Forecast";
    panelContent.innerHTML = weatherHTML();
    emy("Type a city name to get live weather.");
  }

  if(app==="air"){
    panelTitle.innerText = "Air Quality Monitor";
    panelContent.innerHTML = airHTML();
    emy("Check AQI and pollution levels.");
  }

  if(app==="crypto"){
    panelTitle.innerText = "Crypto Tracker";
    panelContent.innerHTML = cryptoHTML();
    loadCrypto();
    emy("Fetching live crypto prices...");
  }

  if(app==="country"){
    panelTitle.innerText = "Country Intelligence";
    panelContent.innerHTML = countryHTML();
    emy("Search a country (America works too).");
  }

  if(app==="wiki"){
    panelTitle.innerText = "Wikipedia Search";
    panelContent.innerHTML = wikiHTML();
    emy("Search anything from Wikipedia.");
  }

  if(app==="news"){
    panelTitle.innerText = "Fake News Analyzer";
    panelContent.innerHTML = fakeNewsHTML();
    emy("Paste a headline. I will analyze it.");
  }

  if(app==="earthquake"){
    panelTitle.innerText = "Earthquake Radar";
    panelContent.innerHTML = earthquakeHTML();
    loadEarthquakes();
    emy("Loading earthquake feed...");
  }

  if(app==="iss"){
    panelTitle.innerText = "ISS Tracker";
    panelContent.innerHTML = issHTML();
    loadISS();
    emy("Tracking International Space Station...");
  }

  if(app==="spacex"){
    panelTitle.innerText = "SpaceX Launch Tracker";
    panelContent.innerHTML = spacexHTML();
    loadSpaceX();
    emy("Fetching SpaceX launch data...");
  }

  if(app==="timezone"){
    panelTitle.innerText = "Timezone Explorer";
    panelContent.innerHTML = timezoneHTML();
    emy("Type timezone like Asia/Kolkata.");
  }

  if(app==="location"){
    panelTitle.innerText = "Auto Location Scanner";
    panelContent.innerHTML = locationHTML();
    detectLocation();
    emy("Scanning your network location...");
  }

  if(app==="credits"){
    panelTitle.innerText = "Credits";
    panelContent.innerHTML = creditsHTML();
    emy("Thanks for exploring NeuraLib OS X.");
  }
}

function closePanel(){
  panel.classList.add("hidden");
  emy("Select another futuristic tool.");
}

/* WEATHER */
function weatherHTML(){
  return `
    <h3>Weather Forecast</h3>
    <input id="weatherCity" placeholder="City (Tokyo, London, Delhi)" />
    <button onclick="getWeather()">Scan Weather</button>
    <div id="weatherResult" style="margin-top:14px;">---</div>
  `;
}

async function getWeather(){
  const city = document.getElementById("weatherCity").value.trim();
  const out = document.getElementById("weatherResult");

  if(!city){
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loaderHTML();

  try{
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if(!geoData.results || geoData.results.length === 0){
      out.innerText = "City not found.";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    const wRes = await fetch(weatherURL);
    const wData = await wRes.json();

    out.innerHTML = `
      <h3>${place.name}, ${place.country}</h3>
      <p>🌡 Temperature: <b>${wData.current.temperature_2m}°C</b></p>
      <p>💨 Wind: <b>${wData.current.wind_speed_10m} km/h</b></p>
      <p>💧 Humidity: <b>${wData.current.relative_humidity_2m}%</b></p>
    `;

    emy("Weather scan completed.");
  } catch {
    out.innerText = "Weather API failed.";
  }
}

/* AIR */
function airHTML(){
  return `
    <h3>Air Quality Monitor</h3>
    <input id="airCity" placeholder="City (Paris, Dubai, Seoul)" />
    <button onclick="getAir()">Scan Air</button>
    <div id="airResult" style="margin-top:14px;">---</div>
  `;
}

async function getAir(){
  const city = document.getElementById("airCity").value.trim();
  const out = document.getElementById("airResult");

  if(!city){
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loaderHTML();

  try{
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if(!geoData.results || geoData.results.length === 0){
      out.innerText = "City not found.";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone`;
    const airRes = await fetch(airURL);
    const airData = await airRes.json();

    out.innerHTML = `
      <h3>${place.name}, ${place.country}</h3>
      <p>🫁 PM2.5: <b>${airData.current.pm2_5}</b></p>
      <p>🌫 PM10: <b>${airData.current.pm10}</b></p>
      <p>⚠ CO: <b>${airData.current.carbon_monoxide}</b></p>
      <p>🚗 NO2: <b>${airData.current.nitrogen_dioxide}</b></p>
      <p>☀ Ozone: <b>${airData.current.ozone}</b></p>
    `;

    emy("Air scan completed.");
  } catch {
    out.innerText = "Air quality API failed.";
  }
}

/* CRYPTO */
function cryptoHTML(){
  return `
    <h3>Crypto Tracker</h3>
    <div id="cryptoResult" style="margin-top:14px;">${loaderHTML()}</div>
    <button onclick="loadCrypto()">Refresh Prices</button>
  `;
}

async function loadCrypto(){
  const out = document.getElementById("cryptoResult");
  out.innerHTML = loaderHTML();

  try{
    const url="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd";
    const res=await fetch(url);
    const data=await res.json();

    out.innerHTML=`
      <p>₿ Bitcoin: <b>$${data.bitcoin.usd}</b></p>
      <p>♦ Ethereum: <b>$${data.ethereum.usd}</b></p>
      <p>◎ Solana: <b>$${data.solana.usd}</b></p>
      <p>🐶 Dogecoin: <b>$${data.dogecoin.usd}</b></p>
    `;

    emy("Crypto feed updated.");
  }catch{
    out.innerText="Crypto API failed.";
  }
}

/* COUNTRY */
function countryHTML(){
  return `
    <h3>Country Intelligence Scanner</h3>
    <input id="countryInput" placeholder="India, America, Japan, France..." />
    <button onclick="scanCountry()">Scan Country</button>
    <div id="countryResult" style="margin-top:14px;">---</div>
  `;
}

async function scanCountry(){
  let input = document.getElementById("countryInput").value.trim();
  const out = document.getElementById("countryResult");

  if(!input){
    out.innerText="Type a country name.";
    return;
  }

  const aliases = {
    "america":"United States",
    "usa":"United States",
    "u.s.a":"United States",
    "uk":"United Kingdom",
    "england":"United Kingdom"
  };

  const lower = input.toLowerCase();
  if(aliases[lower]) input = aliases[lower];

  out.innerHTML = loaderHTML();

  try{
    const url=`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=true`;
    const res=await fetch(url);

    if(!res.ok){
      out.innerText="Country not found.";
      return;
    }

    const data=await res.json();
    const c=data[0];

    const name=c.name.common;
    const capital=c.capital ? c.capital[0] : "N/A";
    const population=c.population ? c.population.toLocaleString() : "N/A";
    const region=c.region || "N/A";
    const currency=c.currencies ? Object.keys(c.currencies)[0] : "N/A";
    const languages=c.languages ? Object.values(c.languages).join(", ") : "N/A";

    out.innerHTML=`
      <h3>${name}</h3>
      <p>🏛 Capital: <b>${capital}</b></p>
      <p>🌍 Region: <b>${region}</b></p>
      <p>👥 Population: <b>${population}</b></p>
      <p>💰 Currency: <b>${currency}</b></p>
      <p>🗣 Languages: <b>${languages}</b></p>
    `;

    emy("Country scan completed.");
  }catch{
    out.innerText="Country API failed.";
  }
}

/* WIKI */
function wikiHTML(){
  return `
    <h3>Wikipedia Search Engine</h3>
    <input id="wikiInput" placeholder="AI, Plastic, Universe..." />
    <button onclick="wikiSearch()">Search</button>
    <div id="wikiResult" style="margin-top:14px;">---</div>
  `;
}

async function wikiSearch(){
  const input=document.getElementById("wikiInput").value.trim();
  const out=document.getElementById("wikiResult");

  if(!input){
    out.innerText="Type something first.";
    return;
  }

  out.innerHTML = loaderHTML();

  try{
    const url=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`;
    const res=await fetch(url);
    const data=await res.json();

    if(data.type && data.type.includes("not_found")){
      out.innerText="No Wikipedia results.";
      return;
    }

    out.innerHTML=`
      <h3>${data.title}</h3>
      <p style="margin-top:10px;line-height:1.6;">${data.extract}</p>
    `;

    emy("Knowledge extracted.");
  }catch{
    out.innerText="Wikipedia API failed.";
  }
}

/* FAKE NEWS */
function fakeNewsHTML(){
  return `
    <h3>Fake News Analyzer</h3>
    <textarea id="newsInput" style="height:140px;" placeholder="Paste headline or paragraph..."></textarea>
    <button onclick="analyzeNews()">Analyze</button>
    <div id="newsResult" style="margin-top:14px;">---</div>
  `;
}

async function analyzeNews(){
  const inputRaw=document.getElementById("newsInput").value.trim();
  const input=inputRaw.toLowerCase();
  const out=document.getElementById("newsResult");

  if(!inputRaw){
    out.innerText="Paste something first.";
    return;
  }

  out.innerHTML = loaderHTML();

  let score=85;
  let signals=[];

  const clickbait=["shocking","unbelievable","secret","exposed","miracle","breaking","you won't believe","truth revealed"];
  const conspiracy=["government hiding","deep state","cover-up","agenda","brainwashing"];

  clickbait.forEach(w=>{
    if(input.includes(w)){
      score -= 12;
      signals.push("Clickbait keyword: " + w);
    }
  });

  conspiracy.forEach(w=>{
    if(input.includes(w)){
      score -= 18;
      signals.push("Conspiracy phrase: " + w);
    }
  });

  const exclamations=(inputRaw.match(/!/g)||[]).length;
  if(exclamations>=3){
    score -= 15;
    signals.push("Too many exclamation marks.");
  }

  if(inputRaw.length < 70){
    score -= 10;
    signals.push("Very short headline (low context).");
  }

  try{
    const topic=inputRaw.split(" ").slice(0,6).join(" ");
    const wikiURL=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    const wikiRes=await fetch(wikiURL);
    const wikiData=await wikiRes.json();

    if(wikiData.extract){
      score += 12;
      signals.push("Wikipedia has related information.");
    }else{
      score -= 15;
      signals.push("Wikipedia could not confirm topic.");
    }
  }catch{
    signals.push("Wikipedia verification failed.");
  }

  if(score>100) score=100;
  if(score<0) score=0;

  let status="Likely Trustworthy";
  if(score<65) status="Suspicious / Misleading";
  if(score<45) status="High Fake Risk";

  out.innerHTML=`
    <h2>Trust Score: ${score}/100</h2>
    <p><b>Status:</b> ${status}</p>

    <h3 style="margin-top:12px;">Signals</h3>
    <ul style="margin-top:10px;padding-left:20px;line-height:1.6;">
      ${signals.length ? signals.map(s=>`<li>${s}</li>`).join("") : "<li>No suspicious patterns found.</li>"}
    </ul>

    <p style="margin-top:12px;opacity:0.7;font-size:12px;">
      This is a heuristic analyzer, not an official fact-checker.
    </p>
  `;

  emy("Fake news analysis complete.");
}

/* EARTHQUAKE */
function earthquakeHTML(){
  return `
    <h3>Earthquake Radar</h3>
    <p style="opacity:0.8;">Latest earthquakes worldwide (24h).</p>
    <div id="quakeResult" style="margin-top:14px;">${loaderHTML()}</div>
    <button onclick="loadEarthquakes()">Refresh Feed</button>
  `;
}

async function loadEarthquakes(){
  const out=document.getElementById("quakeResult");
  out.innerHTML = loaderHTML();

  try{
    const url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    const res=await fetch(url);
    const data=await res.json();

    const list=data.features.slice(0,10).map(q=>{
      return `<li><b>M${q.properties.mag}</b> — ${q.properties.place}</li>`;
    }).join("");

    out.innerHTML=`<ul style="padding-left:20px;line-height:1.6;">${list}</ul>`;
    emy("Earthquake feed updated.");
  }catch{
    out.innerText="Earthquake API failed.";
  }
}

/* ISS */
function issHTML(){
  return `
    <h3>ISS Tracker</h3>
    <div id="issResult" style="margin-top:14px;">${loaderHTML()}</div>
    <button onclick="loadISS()">Refresh Location</button>
  `;
}

async function loadISS(){
  const out=document.getElementById("issResult");
  out.innerHTML = loaderHTML();

  try{
    const url="https://api.wheretheiss.at/v1/satellites/25544";
    const res=await fetch(url);
    const data=await res.json();

    out.innerHTML=`
      <p>Latitude: <b>${data.latitude.toFixed(3)}</b></p>
      <p>Longitude: <b>${data.longitude.toFixed(3)}</b></p>
      <p>Altitude: <b>${Math.round(data.altitude)} km</b></p>
      <p>Velocity: <b>${Math.round(data.velocity)} km/h</b></p>
    `;

    emy("ISS coordinates updated.");
  }catch{
    out.innerText="ISS API failed.";
  }
}

/* SpaceX */
function spacexHTML(){
  return `
    <h3>SpaceX Launch Tracker</h3>
    <div id="spacexResult" style="margin-top:14px;">${loaderHTML()}</div>
    <button onclick="loadSpaceX()">Refresh Launch</button>
  `;
}

async function loadSpaceX(){
  const out=document.getElementById("spacexResult");
  out.innerHTML = loaderHTML();

  try{
    const url="https://api.spacexdata.com/v4/launches/next";
    const res=await fetch(url);
    const data=await res.json();

    out.innerHTML=`
      <h3>${data.name}</h3>
      <p>📅 Launch Date: <b>${new Date(data.date_utc).toLocaleString()}</b></p>
      <p style="margin-top:10px;line-height:1.6;">
        ${data.details ? data.details : "No mission details available."}
      </p>
    `;

    emy("SpaceX launch data loaded.");
  }catch{
    out.innerText="SpaceX API failed.";
  }
}

/* Timezone */
function timezoneHTML(){
  return `
    <h3>Timezone Explorer</h3>
    <input id="tzInput" placeholder="Asia/Kolkata, Europe/London..." />
    <button onclick="checkTimezone()">Check Time</button>
    <div id="tzResult" style="margin-top:14px;">---</div>
  `;
}

async function checkTimezone(){
  const tz=document.getElementById("tzInput").value.trim();
  const out=document.getElementById("tzResult");

  if(!tz){
    out.innerText="Type a timezone first.";
    return;
  }

  out.innerHTML = loaderHTML();

  try{
    const url=`https://worldtimeapi.org/api/timezone/${encodeURIComponent(tz)}`;
    const res=await fetch(url);
    const data=await res.json();

    if(data.error){
      out.innerText="Timezone not found.";
      return;
    }

    out.innerHTML=`
      <p><b>Timezone:</b> ${data.timezone}</p>
      <p><b>Current Time:</b> ${new Date(data.datetime).toLocaleString()}</p>
      <p><b>UTC Offset:</b> ${data.utc_offset}</p>
    `;

    emy("Timezone scan complete.");
  }catch{
    out.innerText="Timezone API failed.";
  }
}

/* Location */
function locationHTML(){
  return `
    <h3>Auto Location Scanner</h3>
    <div id="locResult" style="margin-top:14px;">${loaderHTML()}</div>
    <button onclick="detectLocation()">Rescan</button>
  `;
}

async function detectLocation(){
  const out=document.getElementById("locResult");
  out.innerHTML = loaderHTML();

  try{
    const res=await fetch("https://ipapi.co/json/");
    const data=await res.json();

    out.innerHTML=`
      <p>📍 City: <b>${data.city}</b></p>
      <p>🌍 Country: <b>${data.country_name}</b></p>
      <p>📡 IP: <b>${data.ip}</b></p>
      <p>🕒 Timezone: <b>${data.timezone}</b></p>
    `;

    emy("Location scan completed.");
  }catch{
    out.innerText="Location API failed.";
  }
}

/* Credits */
function creditsHTML(){
  return `
    <div style="text-align:center;margin-top:60px;">
      <h1 style="font-weight:950;letter-spacing:2px;">Created by Saanvi</h1>
      <p style="opacity:0.7;margin-top:10px;">NeuraLib OS X • Neon Cyber Edition</p>
    </div>
  `;
}

emy("Welcome to NeuraLib OS X Pro. Select an API tool.");
