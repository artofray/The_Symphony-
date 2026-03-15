Cesium.Ion.defaultAccessToken = "";

const statusEl = document.getElementById("status");
const setStatus = (msg) => {
  statusEl.textContent = msg;
};

const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  geocoder: false,
  sceneModePicker: false,
  homeButton: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  baseLayerPicker: false,
  requestRenderMode: false
});

try {
  viewer.terrainProvider = await Cesium.createWorldTerrainAsync();
} catch (_) {
  setStatus("Using fallback globe terrain (Ion terrain unavailable).");
}

viewer.scene.globe.enableLighting = true;
viewer.clock.shouldAnimate = true;
viewer.scene.skyAtmosphere.show = true;
viewer.scene.globe.showGroundAtmosphere = true;
viewer.scene.globe.depthTestAgainstTerrain = true;

const dayImagery = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
  "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
);
viewer.imageryLayers.removeAll();
const dayLayer = viewer.imageryLayers.addImageryProvider(dayImagery);

const nightImagery = new Cesium.UrlTemplateImageryProvider({
  url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2016-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg",
  maximumLevel: 8,
  credit: "NASA GIBS Black Marble"
});
const nightLayer = viewer.imageryLayers.addImageryProvider(nightImagery);
nightLayer.alpha = 0.0;
nightLayer.brightness = 1.3;

const cloudsProvider = new Cesium.UrlTemplateImageryProvider({
  url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/2020-06-01/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
  maximumLevel: 6,
  credit: "NASA GIBS"
});
const cloudsLayer = viewer.imageryLayers.addImageryProvider(cloudsProvider);
cloudsLayer.alpha = 0.25;

let buildingset = null;
try {
  buildingset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingset);
} catch (_) {
  setStatus("3D buildings unavailable in this session (token/network limits).");
}

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(0, 16, 22000000),
  duration: 0
});

const cityPresets = {
  "new york": [-74.006, 40.7128, 2200],
  "tokyo": [139.6917, 35.6895, 2400],
  "lagos": [3.3792, 6.5244, 3000],
  "sao paulo": [-46.6333, -23.5505, 3000],
  "london": [-0.1276, 51.5072, 2600],
  "paris": [2.3522, 48.8566, 2400],
  "mumbai": [72.8777, 19.076, 2800],
  "dubai": [55.2708, 25.2048, 2200]
};

const modules = [
  {
    name: "Agartha Earth Twin",
    category: "core",
    description: "Global digital twin with orbital and city-level interaction.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  },
  {
    name: "Maggie.ai Conductor",
    category: "core",
    description: "Persistent orchestration layer for multi-device AI presence.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  },
  {
    id: "music-machine-gateway",
    name: "Music Machine Gateway",
    category: "core",
    description: "Interactive chaptered onboarding: warehouse to elevator to Agartha.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  },
  {
    name: "Grid + Weather Intelligence",
    category: "operations",
    description: "Energy grid stress and weather-aware decision support modules.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  },
  {
    name: "Agartha Weather Network",
    category: "operations",
    description: "Live weather telemetry and warning integration for Agartha Earth.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/Agartha-Weather-Network"
  },
  {
    name: "Knowledge Cruncher",
    category: "tools",
    description: "Document parsing, indexing, and retrieval for long-context workflows.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  },
  {
    name: "Visualizer + Media Forge",
    category: "tools",
    description: "Image/video generation pipeline for assets, briefings, and demos.",
    website: "https://thequantumoasis.com",
    github: "https://github.com/artofray/The_Symphony-"
  }
];

const moduleGrid = document.getElementById("moduleGrid");
const filterButtons = [...document.querySelectorAll(".filterBtn")];
const weatherLocationInput = document.getElementById("weatherLocationInput");
const weatherRefreshBtn = document.getElementById("weatherRefreshBtn");
const weatherNow = document.getElementById("weatherNow");
const weatherWarnings = document.getElementById("weatherWarnings");
const weatherUpdated = document.getElementById("weatherUpdated");
const weatherWiseLink = document.getElementById("weatherWiseLink");
const nwsAlertsLink = document.getElementById("nwsAlertsLink");
const gatewayPanel = document.getElementById("gatewayPanel");
const gatewayChapterLabel = document.getElementById("gatewayChapterLabel");
const gatewayChapterTitle = document.getElementById("gatewayChapterTitle");
const gatewayChapterText = document.getElementById("gatewayChapterText");
const gatewayPrevBtn = document.getElementById("gatewayPrevBtn");
const gatewayPlayBtn = document.getElementById("gatewayPlayBtn");
const gatewayNextBtn = document.getElementById("gatewayNextBtn");
const gatewayCloseBtn = document.getElementById("gatewayCloseBtn");

const gatewayChapters = [
  {
    label: "Chapter 1",
    title: "Warehouse Search",
    text: "Two musicians cross an old warehouse chasing a rumor: the Music Machine is hidden below.",
    destination: [-74.0109, 40.7062, 6000],
    orientation: { heading: 20, pitch: -50, roll: 0 },
    night: false,
    clouds: true
  },
  {
    label: "Chapter 2",
    title: "The Elevator Calls",
    text: "A worn elevator-tree glows to life. They step in. The doors close behind them.",
    destination: [-74.0109, 40.7062, 1200],
    orientation: { heading: 45, pitch: -60, roll: 0 },
    night: true,
    clouds: false
  },
  {
    label: "Chapter 3",
    title: "Endless Descent",
    text: "Down. Deeper. The outside world fades while the hum of coherence gets louder.",
    destination: [-73.9902, 40.7306, 900],
    orientation: { heading: 120, pitch: -68, roll: 0 },
    night: true,
    clouds: false
  },
  {
    label: "Chapter 4",
    title: "Agartha Arrival",
    text: "Doors open into living paradise: artists, birds, waterfalls, flowers, and perfect balance.",
    destination: [-84.0912, 10.4312, 3500],
    orientation: { heading: 10, pitch: -45, roll: 0 },
    night: false,
    clouds: true
  }
];

let gatewayChapterIndex = 0;
let gatewayPlaying = false;
let gatewayTimer = null;
let weatherCoords = { lat: 40.7587, lon: -82.5154, label: "Mansfield, OH" };
let weatherTimer = null;

function clearGatewayTimer() {
  if (gatewayTimer) {
    clearTimeout(gatewayTimer);
    gatewayTimer = null;
  }
}

function applyChapterScene(chapter) {
  nightToggle.checked = chapter.night;
  const isCloseView = chapter.destination[2] < 100000;
  nightLayer.alpha = chapter.night ? (isCloseView ? 0.35 : 0.65) : 0.0;
  cloudsToggle.checked = chapter.clouds;
  cloudsLayer.show = chapter.clouds;

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      chapter.destination[0],
      chapter.destination[1],
      chapter.destination[2]
    ),
    orientation: {
      heading: Cesium.Math.toRadians(chapter.orientation.heading),
      pitch: Cesium.Math.toRadians(chapter.orientation.pitch),
      roll: Cesium.Math.toRadians(chapter.orientation.roll)
    },
    duration: 2.2
  });
}

function renderGatewayChapter() {
  const chapter = gatewayChapters[gatewayChapterIndex];
  gatewayChapterLabel.textContent = `${chapter.label} of ${gatewayChapters.length}`;
  gatewayChapterTitle.textContent = chapter.title;
  gatewayChapterText.textContent = chapter.text;
  applyChapterScene(chapter);
  setStatus(`Gateway: ${chapter.title}`);
}

function stopGatewayPlayback() {
  gatewayPlaying = false;
  gatewayPlayBtn.textContent = "Play";
  clearGatewayTimer();
}

function playGatewayFromCurrent() {
  stopGatewayPlayback();
  gatewayPlaying = true;
  gatewayPlayBtn.textContent = "Pause";

  const loop = () => {
    if (!gatewayPlaying) return;
    renderGatewayChapter();
    gatewayTimer = setTimeout(() => {
      if (!gatewayPlaying) return;
      if (gatewayChapterIndex >= gatewayChapters.length - 1) {
        stopGatewayPlayback();
        return;
      }
      gatewayChapterIndex += 1;
      loop();
    }, 6000);
  };
  loop();
}

function openGatewayPanel() {
  gatewayPanel.classList.remove("hidden");
  gatewayChapterIndex = 0;
  stopGatewayPlayback();
  renderGatewayChapter();
}

function bindModuleActions() {
  const launchButtons = [...document.querySelectorAll(".launchGatewayBtn")];
  launchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      openGatewayPanel();
    });
  });
}

function formatLocalTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

async function geocodeCity(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (Array.isArray(data) && data.length > 0) {
    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
      label: data[0].display_name
    };
  }
  throw new Error("No geocode result");
}

async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Open-Meteo fetch failed");
  return res.json();
}

async function fetchNwsAlerts(lat, lon) {
  const url = `https://api.weather.gov/alerts/active?point=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) return { features: [] };
  return res.json();
}

function renderWeatherWarnings(features) {
  if (!Array.isArray(features) || features.length === 0) {
    weatherWarnings.innerHTML = `<div class="moduleMeta">No active NWS alerts at this location.</div>`;
    return;
  }

  weatherWarnings.innerHTML = features.slice(0, 4).map((f) => {
    const p = f.properties || {};
    const title = p.event || "Weather Alert";
    const area = p.areaDesc || "Area";
    const severity = p.severity || "Unknown";
    return `<div class="weatherWarning">
      <strong>${title} (${severity})</strong>
      <div class="moduleMeta">${area}</div>
    </div>`;
  }).join("");
}

function updateWeatherWiseLink(lat, lon) {
  if (!weatherWiseLink) return;
  const zoom = 8.34;
  weatherWiseLink.href = `https://web.weatherwise.app/#map=${zoom}/${lat.toFixed(3)}/${lon.toFixed(3)}&rt=TCMH&rp=TZ0`;
  if (nwsAlertsLink) {
    nwsAlertsLink.href = `https://api.weather.gov/alerts/active?point=${lat.toFixed(4)},${lon.toFixed(4)}`;
  }
}

async function refreshWeather() {
  const { lat, lon, label } = weatherCoords;
  updateWeatherWiseLink(lat, lon);
  weatherNow.textContent = "Refreshing weather...";
  try {
    const [wx, alerts] = await Promise.all([
      fetchOpenMeteo(lat, lon),
      fetchNwsAlerts(lat, lon)
    ]);
    const c = wx.current || {};
    const temp = c.temperature_2m;
    const feels = c.apparent_temperature;
    const humid = c.relative_humidity_2m;
    const wind = c.wind_speed_10m;
    weatherNow.innerHTML = `<strong>${label}</strong><br/>Temp: ${temp}°C | Feels: ${feels}°C | RH: ${humid}% | Wind: ${wind} km/h`;
    renderWeatherWarnings(alerts.features || []);
    weatherUpdated.textContent = `Updated ${formatLocalTime(Date.now())} • auto refresh every 60s`;
  } catch {
    weatherNow.textContent = "Weather unavailable. Check network/API access.";
    weatherWarnings.innerHTML = "";
    weatherUpdated.textContent = "";
  }
}

async function updateWeatherLocationFromInput() {
  const q = weatherLocationInput.value.trim();
  if (!q) return;
  try {
    const geo = await geocodeCity(q);
    weatherCoords = geo;
    await refreshWeather();
  } catch {
    weatherNow.textContent = "Location not found.";
  }
}

function renderModules(filter = "all") {
  const filtered = filter === "all" ? modules : modules.filter((m) => m.category === filter);
  moduleGrid.innerHTML = filtered
    .map(
      (m) => `
      <article class="moduleCard">
        <h4>${m.name}</h4>
        <div class="moduleMeta">${m.category.toUpperCase()}</div>
        <p class="moduleDesc">${m.description}</p>
        <div class="moduleLinks">
          <a href="${m.website}" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="${m.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        ${m.id === "music-machine-gateway" ? '<button class="moduleLaunch launchGatewayBtn">Launch Story</button>' : ""}
      </article>`
    )
    .join("");
  bindModuleActions();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderModules(btn.dataset.filter || "all");
  });
});

const cityInput = document.getElementById("cityInput");
const goBtn = document.getElementById("goBtn");

async function goToCity() {
  const query = cityInput.value.trim().toLowerCase();
  if (!query) return;

  if (cityPresets[query]) {
    const [lon, lat, height] = cityPresets[query];
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      orientation: {
        heading: Cesium.Math.toRadians(8),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0
      },
      duration: 2.1
    });
    weatherCoords = { lat, lon, label: query };
    weatherLocationInput.value = query;
    refreshWeather();
    return;
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const lon = Number(data[0].lon);
      const lat = Number(data[0].lat);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 3000),
        orientation: {
          heading: Cesium.Math.toRadians(8),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0
        },
        duration: 2.1
      });
      weatherCoords = { lat, lon, label: query };
      weatherLocationInput.value = query;
      refreshWeather();
    } else {
      setStatus("City not found. Try a major city name.");
    }
  } catch {
    setStatus("Geocoder unavailable. Use major city presets.");
  }
}

goBtn.addEventListener("click", goToCity);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") goToCity();
});

const orbitalBtn = document.getElementById("orbitalBtn");
const spinBtn = document.getElementById("spinBtn");
const cloudsToggle = document.getElementById("cloudsToggle");
const atmoToggle = document.getElementById("atmoToggle");
const nightToggle = document.getElementById("nightToggle");
const buildingsToggle = document.getElementById("buildingsToggle");

orbitalBtn.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(0, 20, 22000000),
    duration: 1.8
  });
});

let spinOn = true;
let lastNow = performance.now();
viewer.scene.postRender.addEventListener(() => {
  const now = performance.now();
  const dt = (now - lastNow) / 1000;
  lastNow = now;
  if (!spinOn) return;

  const h = viewer.camera.positionCartographic.height;
  if (h > 4_000_000) {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.03 * dt);
  }
});

spinBtn.addEventListener("click", () => {
  spinOn = !spinOn;
  spinBtn.textContent = `Spin: ${spinOn ? "On" : "Off"}`;
  spinBtn.dataset.on = String(spinOn);
});

cloudsToggle.addEventListener("change", () => {
  cloudsLayer.show = cloudsToggle.checked;
});

atmoToggle.addEventListener("change", () => {
  viewer.scene.skyAtmosphere.show = atmoToggle.checked;
  viewer.scene.globe.showGroundAtmosphere = atmoToggle.checked;
});

nightToggle.addEventListener("change", () => {
  nightLayer.alpha = nightToggle.checked ? 0.65 : 0.0;
});

buildingsToggle.addEventListener("change", () => {
  if (buildingset) buildingset.show = buildingsToggle.checked;
});

gatewayPrevBtn.addEventListener("click", () => {
  stopGatewayPlayback();
  gatewayChapterIndex = Math.max(0, gatewayChapterIndex - 1);
  renderGatewayChapter();
});

gatewayNextBtn.addEventListener("click", () => {
  stopGatewayPlayback();
  gatewayChapterIndex = Math.min(gatewayChapters.length - 1, gatewayChapterIndex + 1);
  renderGatewayChapter();
});

gatewayPlayBtn.addEventListener("click", () => {
  if (gatewayPlaying) {
    stopGatewayPlayback();
    return;
  }
  playGatewayFromCurrent();
});

gatewayCloseBtn.addEventListener("click", () => {
  stopGatewayPlayback();
  gatewayPanel.classList.add("hidden");
  setStatus("Gateway closed.");
});

weatherRefreshBtn.addEventListener("click", updateWeatherLocationFromInput);
weatherLocationInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") updateWeatherLocationFromInput();
});

setStatus("Ready. Use presets for reliable city jumps.");
renderModules("all");
weatherLocationInput.value = weatherCoords.label;
refreshWeather();
if (weatherTimer) clearInterval(weatherTimer);
weatherTimer = setInterval(refreshWeather, 60000);
