const clock = document.getElementById("clock");
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const emyBubble = document.getElementById("emyBubble");
const appsDiv = document.getElementById("apps");

/* ---------------- Emmy ---------------- */
function emy(text) {
  emyBubble.innerText = text;
}

/* ---------------- Clock ---------------- */
function updateClock() {
  clock.innerText = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
setInterval(updateClock, 1000);
updateClock();

/* ---------------- Theme Toggle ---------------- */
function toggleTheme() {
  if (document.documentElement.getAttribute("data-theme") === "light") {
    document.documentElement.removeAttribute("data-theme");
    emy("Dark Neon Mode activated.");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    emy("Light Mode activated.");
  }
}

/* ---------------- Loader ---------------- */
function loader() {
  return `<div class="loader"></div>`;
}

/* ---------------- Apps List ---------------- */
const apps = [
  { id: "weather", title: "🌦 Weather Forecast", desc: "Live weather (Open-Meteo).", badge: "API" },
  { id: "air", title: "🌫 Air Quality", desc: "Pollution scan (Open-Meteo).", badge: "API" },
  { id: "crypto", title: "💠 Crypto Tracker", desc: "Live crypto prices (CoinGecko).", badge: "LIVE" },
  { id: "wiki", title: "📚 Wikipedia Search", desc: "Search any topic instantly.", badge: "WIKI" },
  { id: "country", title: "🌍 Country Intelligence", desc: "Scan country info (REST Countries).", badge: "API" },
  { id: "earthquake", title: "🌍 Earthquake Radar", desc: "Latest earthquakes (USGS).", badge: "LIVE" },
  { id: "iss", title: "🛰 ISS Tracker", desc: "Track ISS live (HTTPS).", badge: "SPACE" },
  { id: "spacex", title: "🚀 SpaceX Tracker", desc: "Upcoming launch info (SpaceX API).", badge: "SPACE" },
  { id: "fake", title: "📰 Fake News Analyzer", desc: "Wikipedia + clickbait detection.", badge: "AI" },
  { id: "credits", title: "⚡ Credits", desc: "Final page.", badge: "END" }
];

/* ---------------- Render Apps ---------------- */
function renderApps() {
  appsDiv.innerHTML = "";
  apps.forEach(app => {
    const card = document.createElement("div");
    card.className = "app";
    card.onclick = () => openPanel(app.id);

    card.innerHTML = `
      <h2>${app.title}</h2>
      <p>${app.desc}</p>
      <span class="badge">${app.badge}</span>
    `;
    appsDiv.appendChild(card);
  });
}

renderApps();

/* ---------------- Panel System ---------------- */
function openPanel(appId) {
  panel.classList.remove("hidden");

  if (appId === "weather") {
    panelTitle.innerText = "Weather Forecast";
    panelContent.innerHTML = `
      <h3>Weather Forecast</h3>
      <input id="weatherCity" placeholder="City (Tokyo, Delhi, London)" />
      <button onclick="getWeather()">Scan Weather</button>
      <div id="weatherResult" style="margin-top:14px;">---</div>
    `;
    emy("Type a city name and scan the weather.");
  }

  if (appId === "air") {
    panelTitle.innerText = "Air Quality Monitor";
    panelContent.innerHTML = `
      <h3>Air Quality Monitor</h3>
      <input id="airCity" placeholder="City (Paris, Dubai, Seoul)" />
      <button onclick="getAir()">Scan Air</button>
      <div id="airResult" style="margin-top:14px;">---</div>
    `;
    emy("Check PM2.5, PM10, ozone and more.");
  }

  if (appId === "crypto") {
    panelTitle.innerText = "Crypto Tracker";
    panelContent.innerHTML = `
      <h3>Crypto Tracker</h3>
      <div id="cryptoResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadCrypto()">Refresh Prices</button>
    `;
    loadCrypto();
    emy("Fetching crypto prices...");
  }

  if (appId === "wiki") {
    panelTitle.innerText = "Wikipedia Search";
    panelContent.innerHTML = `
      <h3>Wikipedia Search</h3>
      <input id="wikiInput" placeholder="Plastic, AI, Universe..." />
      <button onclick="wikiSearch()">Search</button>
      <div id="wikiResult" style="margin-top:14px;">---</div>
    `;
    emy("Search any topic like a futuristic encyclopedia.");
  }

  if (appId === "country") {
    panelTitle.innerText = "Country Intelligence";
    panelContent.innerHTML = `
      <h3>Country Intelligence</h3>
      <input id="countryInput" placeholder="India, America, Japan..." />
      <button onclick="scanCountry()">Scan Country</button>
      <div id="countryResult" style="margin-top:14px;">---</div>
    `;
    emy("Try typing America, India, France...");
  }

  if (appId === "earthquake") {
    panelTitle.innerText = "Earthquake Radar";
    panelContent.innerHTML = `
      <h3>Earthquake Radar</h3>
      <p style="opacity:0.8;">Latest earthquakes in the last 24 hours.</p>
      <div id="quakeResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadEarthquakes()">Refresh Feed</button>
    `;
    loadEarthquakes();
    emy("Loading earthquake feed...");
  }

  if (appId === "iss") {
    panelTitle.innerText = "ISS Tracker";
    panelContent.innerHTML = `
      <h3>ISS Tracker</h3>
      <div id="issResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadISS()">Refresh Location</button>
    `;
    loadISS();
    emy("Tracking the ISS...");
  }

  if (appId === "spacex") {
    panelTitle.innerText = "SpaceX Tracker";
    panelContent.innerHTML = `
      <h3>SpaceX Launch Tracker</h3>
      <div id="spacexResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadSpaceX()">Refresh Launch</button>
    `;
    loadSpaceX();
    emy("Fetching SpaceX launch...");
  }

  if (appId === "fake") {
    panelTitle.innerText = "Fake News Analyzer";
    panelContent.innerHTML = `
      <h3>Fake News Analyzer</h3>
      <textarea id="newsInput" style="height:140px;" placeholder="Paste headline or paragraph..."></textarea>
      <button onclick="analyzeNews()">Analyze</button>
      <div id="newsResult" style="margin-top:14px;">---</div>
    `;
    emy("Paste a headline and I will scan patterns.");
  }

  if (appId === "credits") {
    panelTitle.innerText = "Credits";
    panelContent.innerHTML = `
      <div style="text-align:center;margin-top:60px;">
        <h1 style="font-weight:950;letter-spacing:2px;">Created by Saanvi</h1>
        <p style="opacity:0.7;margin-top:10px;">NeuraLib OS X • Neon Cyber Edition</p>
      </div>
    `;
    emy("Thanks for exploring NeuraLib OS X.");
  }
}

function closePanel() {
  panel.classList.add("hidden");
  emy("Choose another futuristic tool.");
}

/* ---------------- WEATHER ---------------- */
async function getWeather() {
  const city = document.getElementById("weatherCity").value.trim();
  const out = document.getElementById("weatherResult");

  if (!city) {
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
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
    emy("Weather scan complete.");
  } catch {
    out.innerText = "Weather API failed.";
  }
}

/* ---------------- AIR QUALITY ---------------- */
async function getAir() {
  const city = document.getElementById("airCity").value.trim();
  const out = document.getElementById("airResult");

  if (!city) {
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      out.innerText = "City not found.";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,ozone,nitrogen_dioxide,carbon_monoxide`;
    const airRes = await fetch(airURL);
    const airData = await airRes.json();

    out.innerHTML = `
      <h3>${place.name}, ${place.country}</h3>
      <p>🫁 PM2.5: <b>${airData.current.pm2_5}</b></p>
      <p>🌫 PM10: <b>${airData.current.pm10}</b></p>
      <p>☀ Ozone: <b>${airData.current.ozone}</b></p>
      <p>🚗 NO2: <b>${airData.current.nitrogen_dioxide}</b></p>
      <p>⚠ CO: <b>${airData.current.carbon_monoxide}</b></p>
    `;
    emy("Air scan complete.");
  } catch {
    out.innerText = "Air API failed.";
  }
}

/* ---------------- CRYPTO ---------------- */
async function loadCrypto() {
  const out = document.getElementById("cryptoResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <p>₿ Bitcoin: <b>$${data.bitcoin.usd}</b></p>
      <p>♦ Ethereum: <b>$${data.ethereum.usd}</b></p>
      <p>◎ Solana: <b>$${data.solana.usd}</b></p>
      <p>🐶 Dogecoin: <b>$${data.dogecoin.usd}</b></p>
    `;
    emy("Crypto updated.");
  } catch {
    out.innerText = "Crypto API failed.";
  }
}

/* ---------------- WIKIPEDIA ---------------- */
async function wikiSearch() {
  const input = document.getElementById("wikiInput").value.trim();
  const out = document.getElementById("wikiResult");

  if (!input) {
    out.innerText = "Type something first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.type && data.type.includes("not_found")) {
      out.innerText = "No Wikipedia result found.";
      return;
    }

    out.innerHTML = `
      <h3>${data.title}</h3>
      <p style="margin-top:10px;line-height:1.6;">${data.extract}</p>
    `;
    emy("Wikipedia result loaded.");
  } catch {
    out.innerText = "Wikipedia API failed.";
  }
}

/* ---------------- COUNTRY ---------------- */
async function scanCountry() {
  let input = document.getElementById("countryInput").value.trim();
  const out = document.getElementById("countryResult");

  if (!input) {
    out.innerText = "Type a country first.";
    return;
  }

  const aliases = {
    "america": "United States",
    "usa": "United States",
    "u.s.a": "United States",
    "uk": "United Kingdom",
    "england": "United Kingdom"
  };

  const lower = input.toLowerCase();
  if (aliases[lower]) input = aliases[lower];

  out.innerHTML = loader();

  try {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=true`;
    const res = await fetch(url);

    if (!res.ok) {
      out.innerText = "Country not found.";
      return;
    }

    const data = await res.json();
    const c = data[0];

    const name = c.name.common;
    const capital = c.capital ? c.capital[0] : "N/A";
    const population = c.population ? c.population.toLocaleString() : "N/A";
    const region = c.region || "N/A";
    const currency = c.currencies ? Object.keys(c.currencies)[0] : "N/A";
    const languages = c.languages ? Object.values(c.languages).join(", ") : "N/A";

    out.innerHTML = `
      <h3>${name}</h3>
      <p>🏛 Capital: <b>${capital}</b></p>
      <p>🌍 Region: <b>${region}</b></p>
      <p>👥 Population: <b>${population}</b></p>
      <p>💰 Currency: <b>${currency}</b></p>
      <p>🗣 Languages: <b>${languages}</b></p>
    `;
    emy("Country scan complete.");
  } catch {
    out.innerText = "Country API failed.";
  }
}

/* ---------------- EARTHQUAKE ---------------- */
async function loadEarthquakes() {
  const out = document.getElementById("quakeResult");
  out.innerHTML = loader();

  try {
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    const res = await fetch(url);
    const data = await res.json();

    const list = data.features.slice(0, 12).map(q => {
      return `<li><b>M${q.properties.mag}</b> — ${q.properties.place}</li>`;
    }).join("");

    out.innerHTML = `<ul style="padding-left:20px;line-height:1.6;">${list}</ul>`;
    emy("Earthquake feed loaded.");
  } catch {
    out.innerText = "Earthquake API failed.";
  }
}

/* ---------------- ISS ---------------- */
async function loadISS() {
  const out = document.getElementById("issResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.wheretheiss.at/v1/satellites/25544";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <p>Latitude: <b>${data.latitude.toFixed(3)}</b></p>
      <p>Longitude: <b>${data.longitude.toFixed(3)}</b></p>
      <p>Altitude: <b>${Math.round(data.altitude)} km</b></p>
      <p>Velocity: <b>${Math.round(data.velocity)} km/h</b></p>
    `;
    emy("ISS location updated.");
  } catch {
    out.innerText = "ISS API failed.";
  }
}

/* ---------------- SpaceX ---------------- */
async function loadSpaceX() {
  const out = document.getElementById("spacexResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.spacexdata.com/v4/launches/next";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <h3>${data.name}</h3>
      <p>📅 Launch Date: <b>${new Date(data.date_utc).toLocaleString()}</b></p>
      <p style="margin-top:10px;line-height:1.6;">
        ${data.details ? data.details : "No mission details available."}
      </p>
    `;
    emy("SpaceX launch loaded.");
  } catch {
    out.innerText = "SpaceX API failed.";
  }
}

/* ---------------- Fake News Analyzer ---------------- */
async function analyzeNews() {
  const inputRaw = document.getElementById("newsInput").value.trim();
  const input = inputRaw.toLowerCase();
  const out = document.getElementById("newsResult");

  if (!inputRaw) {
    out.innerText = "Paste a headline first.";
    return;
  }

  out.innerHTML = loader();

  let score = 85;
  let signals = [];

  const clickbait = ["shocking", "unbelievable", "secret", "exposed", "miracle", "you won't believe", "truth revealed"];
  const conspiracy = ["deep state", "cover-up", "agenda", "government hiding", "brainwashing"];

  clickbait.forEach(word => {
    if (input.includes(word)) {
      score -= 12;
      signals.push("Clickbait keyword detected: " + word);
    }
  });

  conspiracy.forEach(word => {
    if (input.includes(word)) {
      score -= 18;
      signals.push("Conspiracy phrase detected: " + word);
    }
  });

  const exclamations = (inputRaw.match(/!/g) || []).length;
  if (exclamations >= 3) {
    score -= 14;
    signals.push("Too many exclamation marks.");
  }

  if (inputRaw.length < 70) {
    score -= 10;
    signals.push("Very short headline (low context).");
  }

  try {
    const topic = inputRaw.split(" ").slice(0, 6).join(" ");
    const wikiURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    const wikiRes = await fetch(wikiURL);
    const wikiData = await wikiRes.json();

    if (wikiData.extract) {
      score += 12;
      signals.push("Wikipedia contains related topic.");
    } else {
      score -= 15;
      signals.push("Wikipedia did not confirm topic.");
    }
  } catch {
    signals.push("Wikipedia verification failed.");
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let status = "Likely Trustworthy";
  if (score < 65) status = "Suspicious / Misleading";
  if (score < 45) status = "High Fake News Risk";

  out.innerHTML = `
    <h2>Trust Score: ${score}/100</h2>
    <p><b>Status:</b> ${status}</p>
    <h3 style="margin-top:12px;">Signals</h3>
    <ul style="margin-top:10px;padding-left:20px;line-height:1.6;">
      ${signals.length ? signals.map(s => `<li>${s}</li>`).join("") : "<li>No suspicious patterns found.</li>"}
    </ul>
    <p style="margin-top:12px;opacity:0.7;font-size:12px;">
      This is a heuristic analyzer, not a real fact-checker.
    </p>
  `;

  emy("Fake news analysis complete.");
}

/* Startup */
emy("NeuraLib OS X loaded. Choose an API tool.");const clock = document.getElementById("clock");
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const emyBubble = document.getElementById("emyBubble");
const appsDiv = document.getElementById("apps");

/* ---------------- Emmy ---------------- */
function emy(text) {
  emyBubble.innerText = text;
}

/* ---------------- Clock ---------------- */
function updateClock() {
  clock.innerText = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
setInterval(updateClock, 1000);
updateClock();

/* ---------------- Theme Toggle ---------------- */
function toggleTheme() {
  if (document.documentElement.getAttribute("data-theme") === "light") {
    document.documentElement.removeAttribute("data-theme");
    emy("Dark Neon Mode activated.");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    emy("Light Mode activated.");
  }
}

/* ---------------- Loader ---------------- */
function loader() {
  return `<div class="loader"></div>`;
}

/* ---------------- Apps List ---------------- */
const apps = [
  { id: "weather", title: "🌦 Weather Forecast", desc: "Live weather (Open-Meteo).", badge: "API" },
  { id: "air", title: "🌫 Air Quality", desc: "Pollution scan (Open-Meteo).", badge: "API" },
  { id: "crypto", title: "💠 Crypto Tracker", desc: "Live crypto prices (CoinGecko).", badge: "LIVE" },

  { id: "apod", title: "🛰 NASA Space Feed", desc: "Astronomy Picture of the Day.", badge: "NASA" },
  { id: "mars", title: "🚗 Mars Rover Photos", desc: "Real Mars images from NASA.", badge: "NASA" },
  { id: "currency", title: "💱 Currency Converter", desc: "Convert money instantly.", badge: "FX" },

  { id: "wiki", title: "📚 Wikipedia Search", desc: "Search any topic instantly.", badge: "WIKI" },
  { id: "country", title: "🌍 Country Intelligence", desc: "Scan country info (REST Countries).", badge: "API" },
  { id: "earthquake", title: "🌍 Earthquake Radar", desc: "Latest earthquakes (USGS).", badge: "LIVE" },
  { id: "iss", title: "🛰 ISS Tracker", desc: "Track ISS live (HTTPS).", badge: "SPACE" },
  { id: "spacex", title: "🚀 SpaceX Tracker", desc: "Upcoming launch info (SpaceX API).", badge: "SPACE" },
  { id: "fake", title: "📰 Fake News Analyzer", desc: "Wikipedia + clickbait detection.", badge: "AI" },
  { id: "credits", title: "⚡ Credits", desc: "Final page.", badge: "END" }
];

/* ---------------- Render Apps ---------------- */
function renderApps() {
  appsDiv.innerHTML = "";
  apps.forEach(app => {
    const card = document.createElement("div");
    card.className = "app";
    card.onclick = () => openPanel(app.id);

    card.innerHTML = `
      <h2>${app.title}</h2>
      <p>${app.desc}</p>
      <span class="badge">${app.badge}</span>
    `;
    appsDiv.appendChild(card);
  });
}
renderApps();

/* ---------------- Panel System ---------------- */
function openPanel(appId) {
  panel.classList.remove("hidden");

  if (appId === "weather") {
    panelTitle.innerText = "Weather Forecast";
    panelContent.innerHTML = `
      <h3>Weather Forecast</h3>
      <input id="weatherCity" placeholder="City (Tokyo, Delhi, London)" />
      <button onclick="getWeather()">Scan Weather</button>
      <div id="weatherResult" style="margin-top:14px;">---</div>
    `;
    emy("Type a city name and scan the weather.");
  }

  if (appId === "air") {
    panelTitle.innerText = "Air Quality Monitor";
    panelContent.innerHTML = `
      <h3>Air Quality Monitor</h3>
      <input id="airCity" placeholder="City (Paris, Dubai, Seoul)" />
      <button onclick="getAir()">Scan Air</button>
      <div id="airResult" style="margin-top:14px;">---</div>
    `;
    emy("Check PM2.5, PM10, ozone and more.");
  }

  if (appId === "crypto") {
    panelTitle.innerText = "Crypto Tracker";
    panelContent.innerHTML = `
      <h3>Crypto Tracker</h3>
      <div id="cryptoResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadCrypto()">Refresh Prices</button>
    `;
    loadCrypto();
    emy("Fetching crypto prices...");
  }

  /* NASA APOD */
  if (appId === "apod") {
    panelTitle.innerText = "NASA Astronomy Picture of the Day";
    panelContent.innerHTML = `
      <h3>NASA Space Feed</h3>
      <p style="opacity:0.8;">Live Astronomy Picture of the Day.</p>
      <div id="apodResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadAPOD()">Reload</button>
    `;
    loadAPOD();
    emy("Connecting to NASA Space Feed...");
  }

  /* Mars Rover */
  if (appId === "mars") {
    panelTitle.innerText = "Mars Rover Photos";
    panelContent.innerHTML = `
      <h3>Mars Rover Photos</h3>
      <p style="opacity:0.8;">Real photos from Mars (Curiosity Rover).</p>

      <select id="marsCamera">
        <option value="">All Cameras</option>
        <option value="FHAZ">Front Hazard Camera</option>
        <option value="RHAZ">Rear Hazard Camera</option>
        <option value="NAVCAM">Navigation Camera</option>
        <option value="MAST">Mast Camera</option>
      </select>

      <button onclick="loadMars()">Load Photos</button>
      <div id="marsResult" style="margin-top:14px;">---</div>
    `;
    emy("Choose a camera and load Mars images.");
  }

  /* Currency Converter */
  if (appId === "currency") {
    panelTitle.innerText = "Currency Converter";
    panelContent.innerHTML = `
      <h3>Currency Converter</h3>

      <input id="amount" type="number" placeholder="Amount (example: 100)" />

      <select id="fromCur">
        <option value="USD">USD - Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="INR">INR - Rupee</option>
        <option value="GBP">GBP - Pound</option>
        <option value="JPY">JPY - Yen</option>
        <option value="CAD">CAD - Canada</option>
        <option value="AUD">AUD - Australia</option>
      </select>

      <select id="toCur">
        <option value="INR">INR - Rupee</option>
        <option value="USD">USD - Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - Pound</option>
        <option value="JPY">JPY - Yen</option>
        <option value="CAD">CAD - Canada</option>
        <option value="AUD">AUD - Australia</option>
      </select>

      <button onclick="convertCurrency()">Convert</button>
      <div id="currencyResult" style="margin-top:14px;">---</div>
    `;
    emy("Convert any currency instantly.");
  }

  if (appId === "wiki") {
    panelTitle.innerText = "Wikipedia Search";
    panelContent.innerHTML = `
      <h3>Wikipedia Search</h3>
      <input id="wikiInput" placeholder="Plastic, AI, Universe..." />
      <button onclick="wikiSearch()">Search</button>
      <div id="wikiResult" style="margin-top:14px;">---</div>
    `;
    emy("Search any topic like a futuristic encyclopedia.");
  }

  if (appId === "country") {
    panelTitle.innerText = "Country Intelligence";
    panelContent.innerHTML = `
      <h3>Country Intelligence</h3>
      <input id="countryInput" placeholder="India, America, Japan..." />
      <button onclick="scanCountry()">Scan Country</button>
      <div id="countryResult" style="margin-top:14px;">---</div>
    `;
    emy("Try typing America, India, France...");
  }

  if (appId === "earthquake") {
    panelTitle.innerText = "Earthquake Radar";
    panelContent.innerHTML = `
      <h3>Earthquake Radar</h3>
      <p style="opacity:0.8;">Latest earthquakes in the last 24 hours.</p>
      <div id="quakeResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadEarthquakes()">Refresh Feed</button>
    `;
    loadEarthquakes();
    emy("Loading earthquake feed...");
  }

  if (appId === "iss") {
    panelTitle.innerText = "ISS Tracker";
    panelContent.innerHTML = `
      <h3>ISS Tracker</h3>
      <div id="issResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadISS()">Refresh Location</button>
    `;
    loadISS();
    emy("Tracking the ISS...");
  }

  if (appId === "spacex") {
    panelTitle.innerText = "SpaceX Tracker";
    panelContent.innerHTML = `
      <h3>SpaceX Launch Tracker</h3>
      <div id="spacexResult" style="margin-top:14px;">${loader()}</div>
      <button onclick="loadSpaceX()">Refresh Launch</button>
    `;
    loadSpaceX();
    emy("Fetching SpaceX launch...");
  }

  if (appId === "fake") {
    panelTitle.innerText = "Fake News Analyzer";
    panelContent.innerHTML = `
      <h3>Fake News Analyzer</h3>
      <textarea id="newsInput" style="height:140px;" placeholder="Paste headline or paragraph..."></textarea>
      <button onclick="analyzeNews()">Analyze</button>
      <div id="newsResult" style="margin-top:14px;">---</div>
    `;
    emy("Paste a headline and I will scan patterns.");
  }

  if (appId === "credits") {
    panelTitle.innerText = "Credits";
    panelContent.innerHTML = `
      <div style="text-align:center;margin-top:60px;">
        <h1 style="font-weight:950;letter-spacing:2px;">Created by Saanvi</h1>
        <p style="opacity:0.7;margin-top:10px;">NeuraLib OS X • Neon Cyber Edition</p>
      </div>
    `;
    emy("Thanks for exploring NeuraLib OS X.");
  }
}

function closePanel() {
  panel.classList.add("hidden");
  emy("Choose another futuristic tool.");
}

/* ---------------- WEATHER ---------------- */
async function getWeather() {
  const city = document.getElementById("weatherCity").value.trim();
  const out = document.getElementById("weatherResult");

  if (!city) {
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
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
    emy("Weather scan complete.");
  } catch {
    out.innerText = "Weather API failed.";
  }
}

/* ---------------- AIR QUALITY ---------------- */
async function getAir() {
  const city = document.getElementById("airCity").value.trim();
  const out = document.getElementById("airResult");

  if (!city) {
    out.innerText = "Type a city first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      out.innerText = "City not found.";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,ozone,nitrogen_dioxide,carbon_monoxide`;
    const airRes = await fetch(airURL);
    const airData = await airRes.json();

    out.innerHTML = `
      <h3>${place.name}, ${place.country}</h3>
      <p>🫁 PM2.5: <b>${airData.current.pm2_5}</b></p>
      <p>🌫 PM10: <b>${airData.current.pm10}</b></p>
      <p>☀ Ozone: <b>${airData.current.ozone}</b></p>
      <p>🚗 NO2: <b>${airData.current.nitrogen_dioxide}</b></p>
      <p>⚠ CO: <b>${airData.current.carbon_monoxide}</b></p>
    `;
    emy("Air scan complete.");
  } catch {
    out.innerText = "Air API failed.";
  }
}

/* ---------------- CRYPTO ---------------- */
async function loadCrypto() {
  const out = document.getElementById("cryptoResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <p>₿ Bitcoin: <b>$${data.bitcoin.usd}</b></p>
      <p>♦ Ethereum: <b>$${data.ethereum.usd}</b></p>
      <p>◎ Solana: <b>$${data.solana.usd}</b></p>
      <p>🐶 Dogecoin: <b>$${data.dogecoin.usd}</b></p>
    `;
    emy("Crypto updated.");
  } catch {
    out.innerText = "Crypto API failed.";
  }
}

/* ---------------- NASA APOD ---------------- */
async function loadAPOD() {
  const out = document.getElementById("apodResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    const res = await fetch(url);
    const data = await res.json();

    if (data.media_type === "video") {
      out.innerHTML = `
        <h3>${data.title}</h3>
        <p style="opacity:0.8;">(Video today)</p>
        <a href="${data.url}" target="_blank" style="color:cyan;">Open Video</a>
        <p style="margin-top:12px;line-height:1.6;">${data.explanation}</p>
      `;
    } else {
      out.innerHTML = `
        <h3>${data.title}</h3>
        <img src="${data.url}" style="width:100%;border-radius:18px;margin-top:12px;" />
        <p style="margin-top:12px;line-height:1.6;">${data.explanation}</p>
      `;
    }

    emy("NASA space feed loaded.");
  } catch {
    out.innerText = "NASA APOD API failed.";
  }
}

/* ---------------- Mars Rover ---------------- */
async function loadMars() {
  const out = document.getElementById("marsResult");
  const camera = document.getElementById("marsCamera").value;

  out.innerHTML = loader();

  try {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY`;
    const res = await fetch(url);
    const data = await res.json();

    let photos = data.latest_photos;

    if (camera) {
      photos = photos.filter(p => p.camera.name === camera);
    }

    photos = photos.slice(0, 8);

    if (photos.length === 0) {
      out.innerText = "No photos found for this camera.";
      return;
    }

    out.innerHTML = photos.map(p => `
      <div style="margin-bottom:16px;">
        <img src="${p.img_src}" style="width:100%;border-radius:18px;" />
        <p style="margin-top:6px;opacity:0.8;font-size:12px;">
          Camera: ${p.camera.full_name} | Sol: ${p.sol}
        </p>
      </div>
    `).join("");

    emy("Mars images loaded.");
  } catch {
    out.innerText = "Mars Rover API failed.";
  }
}

/* ---------------- Currency Converter ---------------- */
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCur").value;
  const to = document.getElementById("toCur").value;
  const out = document.getElementById("currencyResult");

  if (!amount || amount <= 0) {
    out.innerText = "Enter a valid amount.";
    return;
  }

  out.innerHTML = loader();

  try {
    const url = `https://open.er-api.com/v6/latest/${from}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.rates[to]) {
      out.innerText = "Currency conversion failed.";
      return;
    }

    const rate = data.rates[to];
    const result = (amount * rate).toFixed(2);

    out.innerHTML = `
      <h3>${amount} ${from} = ${result} ${to}</h3>
      <p style="opacity:0.8;">Rate: 1 ${from} = ${rate} ${to}</p>
    `;

    emy("Currency conversion complete.");
  } catch {
    out.innerText = "Currency API failed.";
  }
}

/* ---------------- WIKIPEDIA ---------------- */
async function wikiSearch() {
  const input = document.getElementById("wikiInput").value.trim();
  const out = document.getElementById("wikiResult");

  if (!input) {
    out.innerText = "Type something first.";
    return;
  }

  out.innerHTML = loader();

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.type && data.type.includes("not_found")) {
      out.innerText = "No Wikipedia result found.";
      return;
    }

    out.innerHTML = `
      <h3>${data.title}</h3>
      <p style="margin-top:10px;line-height:1.6;">${data.extract}</p>
    `;
    emy("Wikipedia result loaded.");
  } catch {
    out.innerText = "Wikipedia API failed.";
  }
}

/* ---------------- COUNTRY ---------------- */
async function scanCountry() {
  let input = document.getElementById("countryInput").value.trim();
  const out = document.getElementById("countryResult");

  if (!input) {
    out.innerText = "Type a country first.";
    return;
  }

  const aliases = {
    "america": "United States",
    "usa": "United States",
    "u.s.a": "United States",
    "uk": "United Kingdom",
    "england": "United Kingdom"
  };

  const lower = input.toLowerCase();
  if (aliases[lower]) input = aliases[lower];

  out.innerHTML = loader();

  try {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=true`;
    const res = await fetch(url);

    if (!res.ok) {
      out.innerText = "Country not found.";
      return;
    }

    const data = await res.json();
    const c = data[0];

    const name = c.name.common;
    const capital = c.capital ? c.capital[0] : "N/A";
    const population = c.population ? c.population.toLocaleString() : "N/A";
    const region = c.region || "N/A";

    out.innerHTML = `
      <h3>${name}</h3>
      <p>🏛 Capital: <b>${capital}</b></p>
      <p>🌍 Region: <b>${region}</b></p>
      <p>👥 Population: <b>${population}</b></p>
    `;
    emy("Country scan complete.");
  } catch {
    out.innerText = "Country API failed.";
  }
}

/* ---------------- EARTHQUAKE ---------------- */
async function loadEarthquakes() {
  const out = document.getElementById("quakeResult");
  out.innerHTML = loader();

  try {
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    const res = await fetch(url);
    const data = await res.json();

    const list = data.features.slice(0, 12).map(q => {
      return `<li><b>M${q.properties.mag}</b> — ${q.properties.place}</li>`;
    }).join("");

    out.innerHTML = `<ul style="padding-left:20px;line-height:1.6;">${list}</ul>`;
    emy("Earthquake feed loaded.");
  } catch {
    out.innerText = "Earthquake API failed.";
  }
}

/* ---------------- ISS ---------------- */
async function loadISS() {
  const out = document.getElementById("issResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.wheretheiss.at/v1/satellites/25544";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <p>Latitude: <b>${data.latitude.toFixed(3)}</b></p>
      <p>Longitude: <b>${data.longitude.toFixed(3)}</b></p>
      <p>Altitude: <b>${Math.round(data.altitude)} km</b></p>
      <p>Velocity: <b>${Math.round(data.velocity)} km/h</b></p>
    `;
    emy("ISS location updated.");
  } catch {
    out.innerText = "ISS API failed.";
  }
}

/* ---------------- SpaceX ---------------- */
async function loadSpaceX() {
  const out = document.getElementById("spacexResult");
  out.innerHTML = loader();

  try {
    const url = "https://api.spacexdata.com/v4/launches/next";
    const res = await fetch(url);
    const data = await res.json();

    out.innerHTML = `
      <h3>${data.name}</h3>
      <p>📅 Launch Date: <b>${new Date(data.date_utc).toLocaleString()}</b></p>
      <p style="margin-top:10px;line-height:1.6;">
        ${data.details ? data.details : "No mission details available."}
      </p>
    `;
    emy("SpaceX launch loaded.");
  } catch {
    out.innerText = "SpaceX API failed.";
  }
}

/* ---------------- Fake News Analyzer ---------------- */
async function analyzeNews() {
  const inputRaw = document.getElementById("newsInput").value.trim();
  const input = inputRaw.toLowerCase();
  const out = document.getElementById("newsResult");

  if (!inputRaw) {
    out.innerText = "Paste a headline first.";
    return;
  }

  out.innerHTML = loader();

  let score = 85;
  let signals = [];

  const clickbait = ["shocking", "unbelievable", "secret", "exposed", "miracle", "you won't believe", "truth revealed"];
  clickbait.forEach(word => {
    if (input.includes(word)) {
      score -= 12;
      signals.push("Clickbait keyword detected: " + word);
    }
  });

  const exclamations = (inputRaw.match(/!/g) || []).length;
  if (exclamations >= 3) {
    score -= 14;
    signals.push("Too many exclamation marks.");
  }

  try {
    const topic = inputRaw.split(" ").slice(0, 6).join(" ");
    const wikiURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    const wikiRes = await fetch(wikiURL);
    const wikiData = await wikiRes.json();

    if (wikiData.extract) {
      score += 12;
      signals.push("Wikipedia contains related topic.");
    } else {
      score -= 15;
      signals.push("Wikipedia did not confirm topic.");
    }
  } catch {
    signals.push("Wikipedia verification failed.");
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let status = "Likely Trustworthy";
  if (score < 65) status = "Suspicious / Misleading";
  if (score < 45) status = "High Fake News Risk";

  out.innerHTML = `
    <h2>Trust Score: ${score}/100</h2>
    <p><b>Status:</b> ${status}</p>
    <h3 style="margin-top:12px;">Signals</h3>
    <ul style="margin-top:10px;padding-left:20px;line-height:1.6;">
      ${signals.length ? signals.map(s => `<li>${s}</li>`).join("") : "<li>No suspicious patterns found.</li>"}
    </ul>
  `;

  emy("Fake news analysis complete.");
}

/* Startup */
emy("NeuraLib OS X loaded. Choose an API tool.");
