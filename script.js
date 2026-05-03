const clock = document.getElementById("clock");
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const emyBubble = document.getElementById("emyBubble");
const appsDiv = document.getElementById("apps");

function emy(text){
  emyBubble.innerText = text;
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
  {id:"country", title:"🌍 Country Intelligence", desc:"Scan country details using REST Countries API.", badge:"API"},
  {id:"wiki", title:"📚 Wikipedia Search", desc:"Knowledge engine powered by Wikipedia API.", badge:"WIKI"},
  {id:"news", title:"📰 Fake News Analyzer", desc:"Analyzer using Wikipedia confirmation + signals.", badge:"AI"},
  {id:"earthquake", title:"🌍 Earthquake Radar", desc:"Latest earthquakes using USGS API.", badge:"LIVE"},
  {id:"iss", title:"🛰 ISS Tracker", desc:"Track International Space Station (Open Notify).", badge:"SPACE"},
  {id:"spaceweather", title:"☀ Space Weather", desc:"Solar storm alerts using NOAA API.", badge:"NOAA"},
  {id:"timezone", title:"🕒 Timezone Explorer", desc:"Live timezones using WorldTimeAPI.", badge:"TIME"},
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
    emy("Search a country to scan its information.");
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
    emy("Tracking ISS live...");
  }

  if(app==="spaceweather"){
    panelTitle.innerText = "Space Weather Monitor";
    panelContent.innerHTML = spaceWeatherHTML();
    loadSpaceWeather();
    emy("Checking solar storm alerts...");
  }

  if(app==="timezone"){
    panelTitle.innerText = "Timezone Explorer";
    panelContent.innerHTML = timezoneHTML();
    emy("Type a timezone like Asia/Kolkata.");
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
  emy("Choose another futuristic tool.");
}

/* WEATHER */
function weatherHTML(){
  return `
    <h3>Weather Forecast (Free API)</h3>
    <input id="weatherCity" placeholder="Enter city name (London, Tokyo, Mumbai)" />
    <button onclick="getWeather()">Get Weather</button>
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

  out.innerText = "Searching city coordinates...";

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

    out.innerText = "Fetching live weather...";

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    const wRes = await fetch(weatherURL);
    const wData = await wRes.json();

    out.innerHTML = `
      <h3>${place.name}, ${place.country}</h3>
      <p>🌡 Temperature: <b>${wData.current.temperature_2m}°C</b></p>
      <p>💨 Wind Speed: <b>${wData.current.wind_speed_10m} km/h</b></p>
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
    <input id="airCity" placeholder="Enter city name (Paris, Dubai)" />
    <button onclick="getAir()">Check Air Quality</button>
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

  out.innerText = "Finding coordinates...";

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

    out.innerText = "Fetching air quality...";

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

    emy("Air quality scan completed.");
  } catch {
    out.innerText = "Air quality API failed.";
  }
}

/* CRYPTO */
function cryptoHTML(){
  return `
    <h3>Crypto Tracker</h3>
    <div id="cryptoResult" style="margin-top:14px;">Loading...</div>
    <button onclick="loadCrypto()">Refresh</button>
  `;
}

async function loadCrypto(){
  const out = document.getElementById("cryptoResult");

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
  }catch{
    out.innerText="Crypto API failed.";
  }
}

/* COUNTRY */
function countryHTML(){
  return `
    <h3>Country Intelligence Scanner</h3>
    <input id="countryInput" placeholder="India, Japan, Canada..." />
    <button onclick="scanCountry()">Scan</button>
    <div id="countryResult" style="margin-top:14px;">---</div>
  `;
}

async function scanCountry(){
  const input=document.getElementById("countryInput").value.trim();
  const out=document.getElementById("countryResult");

  if(!input){ out.innerText="Type a country name."; return; }

  out.innerText="Scanning database...";

  try{
    const url=`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=true`;
    const res=await fetch(url);
    const data=await res.json();

    const c=data[0];
    const name=c.name.common;
    const capital=c.capital?c.capital[0]:"N/A";
    const population=c.population.toLocaleString();
    const region=c.region;
    const currency=c.currencies?Object.keys(c.currencies)[0]:"N/A";
    const languages=c.languages?Object.values(c.languages).join(", "):"N/A";

    out.innerHTML=`
      <h3>${name}</h3>
      <p>🏛 Capital: <b>${capital}</b></p>
      <p>🌍 Region: <b>${region}</b></p>
      <p>👥 Population: <b>${population}</b></p>
      <p>💰 Currency: <b>${currency}</b></p>
      <p>🗣 Languages: <b>${languages}</b></p>
    `;
  }catch{
    out.innerText="Country API failed.";
  }
}

/* WIKI */
function wikiHTML(){
  return `
    <h3>Wikipedia Search</h3>
    <input id="wikiInput" placeholder="AI, Plastic, Universe..." />
    <button onclick="wikiSearch()">Search</button>
    <div id="wikiResult" style="margin-top:14px;">---</div>
  `;
}

async function wikiSearch(){
  const input=document.getElementById("wikiInput").value.trim();
  const out=document.getElementById("wikiResult");

  if(!input){ out.innerText="Type something first."; return; }

  out.innerText="Connecting to Wikipedia...";

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

  if(!inputRaw){ out.innerText="Paste something first."; return; }

  out.innerText="Analyzing signals...";

  let score=80;
  let signals=[];

  ["shocking","unbelievable","secret","exposed","miracle","breaking"].forEach(w=>{
    if(input.includes(w)){ score-=12; signals.push("Clickbait: "+w); }
  });

  if((inputRaw.match(/!/g)||[]).length>=3){
    score-=14;
    signals.push("Too many exclamation marks.");
  }

  try{
    const topic=inputRaw.split(" ").slice(0,5).join(" ");
    const wikiURL=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    const wikiRes=await fetch(wikiURL);
    const wikiData=await wikiRes.json();

    if(wikiData.extract){
      score+=15;
      signals.push("Wikipedia confirms related topic.");
    }else{
      score-=15;
      signals.push("Wikipedia did not confirm topic.");
    }
  }catch{
    signals.push("Wikipedia check failed.");
  }

  if(score>100) score=100;
  if(score<0) score=0;

  let status="Likely Trustworthy";
  if(score<65) status="Suspicious / Misleading";
  if(score<45) status="High Fake Risk";

  out.innerHTML=`
    <h2>Trust Score: ${score}/100</h2>
    <p><b>Status:</b> ${status}</p>
    <ul style="margin-top:10px;padding-left:20px;line-height:1.6;">
      ${signals.length?signals.map(s=>`<li>${s}</li>`).join(""):"<li>No suspicious patterns found.</li>"}
    </ul>
  `;
}

/* EARTHQUAKE (USGS) */
function earthquakeHTML(){
  return `
    <h3>Earthquake Radar</h3>
    <p style="opacity:0.8;">Latest earthquakes (worldwide).</p>
    <div id="quakeResult" style="margin-top:14px;">Loading...</div>
    <button onclick="loadEarthquakes()">Refresh</button>
  `;
}

async function loadEarthquakes(){
  const out=document.getElementById("quakeResult");

  try{
    const url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    const res=await fetch(url);
    const data=await res.json();

    const list=data.features.slice(0,8).map(q=>{
      return `<li><b>M${q.properties.mag}</b> - ${q.properties.place}</li>`;
    }).join("");

    out.innerHTML=`<ul style="padding-left:20px;line-height:1.6;">${list}</ul>`;
  }catch{
    out.innerText="Earthquake API failed.";
  }
}

/* ISS TRACKER */
function issHTML(){
  return `
    <h3>ISS Tracker</h3>
    <div id="issResult" style="margin-top:14px;">Loading...</div>
    <button onclick="loadISS()">Refresh</button>
  `;
}

async function loadISS(){
  const out=document.getElementById("issResult");

  try{
    const url="http://api.open-notify.org/iss-now.json";
    const res=await fetch(url);
    const data=await res.json();

    out.innerHTML=`
      <p>Latitude: <b>${data.iss_position.latitude}</b></p>
      <p>Longitude: <b>${data.iss_position.longitude}</b></p>
      <p>Timestamp: <b>${new Date(data.timestamp*1000).toLocaleString()}</b></p>
    `;
  }catch{
    out.innerText="ISS API blocked (GitHub Pages blocks HTTP).";
  }
}

/* SPACE WEATHER (NOAA) */
function spaceWeatherHTML(){
  return `
    <h3>Space Weather Alerts</h3>
    <div id="spaceResult" style="margin-top:14px;">Loading...</div>
    <button onclick="loadSpaceWeather()">Refresh</button>
  `;
}

async function loadSpaceWeather(){
  const out=document.getElementById("spaceResult");

  try{
    const url="https://services.swpc.noaa.gov/json/alerts.json";
    const res=await fetch(url);
    const data=await res.json();

    if(!data || data.length===0){
      out.innerText="No active alerts.";
      return;
    }

    const list=data.slice(0,5).map(a=>{
      return `<li><b>${a.product_id}</b>: ${a.message}</li>`;
    }).join("");

    out.innerHTML=`<ul style="padding-left:20px;line-height:1.6;">${list}</ul>`;
  }catch{
    out.innerText="NOAA API failed.";
  }
}

/* TIMEZONE */
function timezoneHTML(){
  return `
    <h3>Timezone Explorer</h3>
    <input id="tzInput" placeholder="Asia/Kolkata, Europe/London, America/New_York" />
    <button onclick="checkTimezone()">Check Time</button>
    <div id="tzResult" style="margin-top:14px;">---</div>
  `;
}

async function checkTimezone(){
  const tz=document.getElementById("tzInput").value.trim();
  const out=document.getElementById("tzResult");

  if(!tz){ out.innerText="Type a timezone first."; return; }

  out.innerText="Fetching time...";

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
  }catch{
    out.innerText="Timezone API failed.";
  }
}

/* LOCATION */
function locationHTML(){
  return `
    <h3>Auto Location Scanner</h3>
    <div id="locResult" style="margin-top:14px;">Scanning...</div>
    <button onclick="detectLocation()">Rescan</button>
  `;
}

async function detectLocation(){
  const out=document.getElementById("locResult");

  try{
    const res=await fetch("https://ipapi.co/json/");
    const data=await res.json();

    out.innerHTML=`
      <p>📍 City: <b>${data.city}</b></p>
      <p>🌍 Country: <b>${data.country_name}</b></p>
      <p>📡 IP: <b>${data.ip}</b></p>
      <p>🕒 Timezone: <b>${data.timezone}</b></p>
    `;
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

emy("Welcome to NeuraLib OS X v2. Select an API tool.");