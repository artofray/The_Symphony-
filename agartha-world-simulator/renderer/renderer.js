const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');
const cameraSelect = document.getElementById('cameraSelect');
const sleepMode = document.getElementById('sleepMode');
const targetPath = document.getElementById('targetPath');

const filesStat = document.getElementById('filesStat');
const linesStat = document.getElementById('linesStat');
const blocksStat = document.getElementById('blocksStat');
const moodStat = document.getElementById('moodStat');

const rainToggle = document.getElementById('rainToggle');
const humToggle = document.getElementById('humToggle');
const chimeToggle = document.getElementById('chimeToggle');
const volume = document.getElementById('volume');
const botSelect = document.getElementById('botSelect');
const bodyColor = document.getElementById('bodyColor');
const hatColor = document.getElementById('hatColor');
const eyeColor = document.getElementById('eyeColor');
const botSize = document.getElementById('botSize');
const animStyle = document.getElementById('animStyle');
const applyAvatarBtn = document.getElementById('applyAvatarBtn');
const copyAvatarJsonBtn = document.getElementById('copyAvatarJsonBtn');
const avatarJson = document.getElementById('avatarJson');
const applyJsonBtn = document.getElementById('applyJsonBtn');

const world = {
  blocks: [],
  bots: [],
  camera: 'isometric',
  stars: [],
  growthBank: 0
};

const asmr = {
  ctx: null,
  master: null,
  rain: null,
  hum: null,
  chimeTimer: null
};

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initStars() {
  world.stars = Array.from({ length: 220 }, () => ({
    x: rand(0, canvas.width),
    y: rand(0, canvas.height),
    r: rand(0.6, 2.4),
    tw: rand(0.4, 1)
  }));
}
initStars();

function createBots() {
  world.bots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Agent-${i + 1}`,
    x: rand(0.1, 0.9),
    y: rand(0.25, 0.9),
    vx: rand(-0.0004, 0.0004),
    vy: rand(-0.0004, 0.0004),
    target: null,
    carrying: false,
    avatar: {
      bodyColor: '#f28c49',
      hatColor: '#ffd34d',
      eyeColor: '#1f1209',
      sizeScale: 1,
      anim: i % 3 === 0 ? 'bounce' : i % 3 === 1 ? 'sway' : 'blink'
    }
  }));
}
createBots();

function loadAvatarState() {
  try {
    const raw = localStorage.getItem('agartha_avatar_state');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    for (const item of parsed) {
      const bot = world.bots.find((b) => b.id === item.id);
      if (bot && item.avatar) {
        bot.avatar = { ...bot.avatar, ...item.avatar };
      }
    }
  } catch {
    // ignore bad local storage state
  }
}

function saveAvatarState() {
  const slim = world.bots.map((b) => ({ id: b.id, avatar: b.avatar }));
  localStorage.setItem('agartha_avatar_state', JSON.stringify(slim));
}

function populateBotSelect() {
  botSelect.innerHTML = world.bots.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
}

function getSelectedBot() {
  const id = Number(botSelect.value || world.bots[0].id);
  return world.bots.find((b) => b.id === id) || world.bots[0];
}

function syncFormFromBot(bot) {
  bodyColor.value = bot.avatar.bodyColor;
  hatColor.value = bot.avatar.hatColor;
  eyeColor.value = bot.avatar.eyeColor;
  botSize.value = String(Math.round(bot.avatar.sizeScale * 100));
  animStyle.value = bot.avatar.anim;
  avatarJson.value = JSON.stringify(bot.avatar, null, 2);
}

function applyFormToBot(bot) {
  bot.avatar = {
    bodyColor: bodyColor.value,
    hatColor: hatColor.value,
    eyeColor: eyeColor.value,
    sizeScale: Math.max(0.6, Math.min(1.8, Number(botSize.value) / 100)),
    anim: animStyle.value
  };
  avatarJson.value = JSON.stringify(bot.avatar, null, 2);
  saveAvatarState();
}

function isoProject(x, y, z) {
  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.72;
  const scale = Math.min(canvas.width, canvas.height) * 0.32;

  if (world.camera === 'top') {
    return { px: cx + (x - 0.5) * scale, py: cy - (y - 0.5) * scale };
  }
  if (world.camera === 'ground') {
    return { px: cx + (x - 0.5) * scale * 0.95, py: cy - z * scale * 0.8 - (y - 0.5) * scale * 0.1 };
  }
  return {
    px: cx + (x - y) * scale * 0.5,
    py: cy + (x + y) * scale * 0.23 - z * scale * 0.7
  };
}

function addBlock() {
  const x = rand(0.1, 0.9);
  const y = rand(0.2, 0.9);
  const nearby = world.blocks.filter((b) => Math.hypot(b.x - x, b.y - y) < 0.09);
  const z = nearby.length ? Math.max(...nearby.map((b) => b.z)) + 0.012 : 0.01;
  world.blocks.push({ x, y, z, hue: rand(160, 300) });
}

function updateBots(dt) {
  for (const b of world.bots) {
    if (!b.target || Math.random() < 0.01) {
      b.target = { x: rand(0.1, 0.9), y: rand(0.2, 0.9) };
    }
    const dx = b.target.x - b.x;
    const dy = b.target.y - b.y;
    const d = Math.max(0.0001, Math.hypot(dx, dy));
    b.vx += (dx / d) * 0.0009 * dt;
    b.vy += (dy / d) * 0.0009 * dt;
    b.vx *= 0.94;
    b.vy *= 0.94;
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    b.x = Math.max(0.06, Math.min(0.94, b.x));
    b.y = Math.max(0.12, Math.min(0.94, b.y));
  }
}

function drawBot(bot) {
  const p = isoProject(bot.x, bot.y, 0.02);
  const s = Math.max(7, Math.min(canvas.width, canvas.height) * 0.008) * (bot.avatar.sizeScale || 1);
  const t = performance.now() * 0.001;
  let yOff = 0;
  let xOff = 0;
  let blinkScale = 1;
  if (bot.avatar.anim === 'bounce') {
    yOff = Math.sin(t * 4 + bot.id) * s * 0.18;
  } else if (bot.avatar.anim === 'sway') {
    xOff = Math.sin(t * 2 + bot.id) * s * 0.22;
  } else if (bot.avatar.anim === 'blink') {
    blinkScale = Math.sin(t * 2.2 + bot.id) > 0.86 ? 0.2 : 1;
  }

  ctx.save();
  ctx.translate(p.px + xOff, p.py + yOff);

  // body (happy hard-hat lobster/umpa builder)
  ctx.fillStyle = bot.avatar.bodyColor;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 1.25, s * 0.95, 0, 0, Math.PI * 2);
  ctx.fill();

  // tiny eyes
  ctx.fillStyle = bot.avatar.eyeColor;
  ctx.beginPath();
  ctx.ellipse(-s * 0.3, -s * 0.2, s * 0.12, s * 0.12 * blinkScale, 0, 0, Math.PI * 2);
  ctx.ellipse(s * 0.3, -s * 0.2, s * 0.12, s * 0.12 * blinkScale, 0, 0, Math.PI * 2);
  ctx.fill();

  // smile
  ctx.strokeStyle = '#5f2713';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, s * 0.08, s * 0.42, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // hard hat
  ctx.fillStyle = bot.avatar.hatColor;
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.95, s * 1.05, s * 0.46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(-s * 1.08, -s * 0.95, s * 2.16, s * 0.25);

  ctx.restore();
}

function drawBlock(block) {
  const p = isoProject(block.x, block.y, block.z);
  const w = Math.max(6, Math.min(canvas.width, canvas.height) * 0.0075);
  const h = w * 0.55;
  ctx.fillStyle = `hsl(${block.hue} 70% 55%)`;
  ctx.fillRect(p.px - w * 0.5, p.py - h, w, h);
}

function drawWorldBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const st of world.stars) {
    const twinkle = 0.35 + Math.sin((Date.now() * 0.0015) + st.tw * 10) * 0.25;
    ctx.fillStyle = `rgba(210,230,255,${twinkle})`;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const grad = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
  grad.addColorStop(0, 'rgba(20,34,52,0.14)');
  grad.addColorStop(1, 'rgba(42,89,66,0.33)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, canvas.height * 0.46, canvas.width, canvas.height * 0.54);
}

function tickGrowthFromStats(delta) {
  // growth based on new lines/files observed + slow ambient growth
  const activity = delta.lines * 0.02 + delta.files * 0.5 + delta.bytes / 30000;
  world.growthBank += Math.max(0.25, activity);
  let spawned = 0;
  while (world.growthBank >= 1) {
    addBlock();
    world.growthBank -= 1;
    spawned += 1;
    if (spawned > 10) break;
  }
}

function updateMood() {
  if (world.blocks.length < 80) return 'Focused';
  if (world.blocks.length < 250) return 'Happy';
  return 'Thriving';
}

function initAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  asmr.ctx = new AC();
  asmr.master = asmr.ctx.createGain();
  asmr.master.gain.value = Number(volume.value) / 100;
  asmr.master.connect(asmr.ctx.destination);

  // Rain: filtered noise
  const rainBuffer = asmr.ctx.createBuffer(1, asmr.ctx.sampleRate * 2, asmr.ctx.sampleRate);
  const data = rainBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
  const rain = asmr.ctx.createBufferSource();
  rain.buffer = rainBuffer;
  rain.loop = true;
  const rainFilter = asmr.ctx.createBiquadFilter();
  rainFilter.type = 'highpass';
  rainFilter.frequency.value = 1300;
  const rainGain = asmr.ctx.createGain();
  rainGain.gain.value = 0.14;
  rain.connect(rainFilter).connect(rainGain).connect(asmr.master);
  rain.start();
  asmr.rain = rainGain;

  // Hum: sine oscillator
  const humOsc = asmr.ctx.createOscillator();
  humOsc.type = 'sine';
  humOsc.frequency.value = 62;
  const humGain = asmr.ctx.createGain();
  humGain.gain.value = 0.1;
  humOsc.connect(humGain).connect(asmr.master);
  humOsc.start();
  asmr.hum = humGain;

  const maybeChime = () => {
    if (!asmr.ctx) return;
    if (!chimeToggle.checked) return;
    const osc = asmr.ctx.createOscillator();
    const g = asmr.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = rand(420, 950);
    g.gain.value = 0.0001;
    osc.connect(g).connect(asmr.master);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.05, asmr.ctx.currentTime + 0.07);
    g.gain.exponentialRampToValueAtTime(0.0001, asmr.ctx.currentTime + 2.1);
    osc.stop(asmr.ctx.currentTime + 2.2);
  };
  asmr.chimeTimer = setInterval(maybeChime, 6500);
}

function syncAudioSettings() {
  if (!asmr.master) return;
  asmr.master.gain.value = Number(volume.value) / 100;
  if (asmr.rain) asmr.rain.gain.value = rainToggle.checked ? 0.14 : 0.0001;
  if (asmr.hum) asmr.hum.gain.value = humToggle.checked ? 0.1 : 0.0001;
}

let lastTime = performance.now();
function frame(now) {
  const dt = Math.min(50, now - lastTime);
  lastTime = now;

  drawWorldBackground();
  updateBots(dt);
  world.blocks.forEach(drawBlock);
  world.bots.forEach(drawBot);

  blocksStat.textContent = String(world.blocks.length);
  moodStat.textContent = updateMood();

  if (sleepMode.checked) {
    ctx.fillStyle = 'rgba(17, 27, 46, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(frame);
}

cameraSelect.addEventListener('change', () => {
  world.camera = cameraSelect.value;
});
rainToggle.addEventListener('change', syncAudioSettings);
humToggle.addEventListener('change', syncAudioSettings);
chimeToggle.addEventListener('change', syncAudioSettings);
volume.addEventListener('input', syncAudioSettings);
botSelect.addEventListener('change', () => syncFormFromBot(getSelectedBot()));
applyAvatarBtn.addEventListener('click', () => applyFormToBot(getSelectedBot()));
copyAvatarJsonBtn.addEventListener('click', async () => {
  const bot = getSelectedBot();
  const text = JSON.stringify(bot.avatar, null, 2);
  avatarJson.value = text;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // clipboard optional
  }
});
applyJsonBtn.addEventListener('click', () => {
  try {
    const parsed = JSON.parse(avatarJson.value || '{}');
    const bot = getSelectedBot();
    bot.avatar = {
      bodyColor: parsed.bodyColor || bot.avatar.bodyColor,
      hatColor: parsed.hatColor || bot.avatar.hatColor,
      eyeColor: parsed.eyeColor || bot.avatar.eyeColor,
      sizeScale: Math.max(0.6, Math.min(1.8, Number(parsed.sizeScale ?? bot.avatar.sizeScale))),
      anim: ['bounce', 'sway', 'blink'].includes(parsed.anim) ? parsed.anim : bot.avatar.anim
    };
    syncFormFromBot(bot);
    saveAvatarState();
  } catch {
    // ignore invalid JSON
  }
});

window.addEventListener('click', () => {
  if (!asmr.ctx) initAudio();
});

if (window.agarthaAPI) {
  window.agarthaAPI.getTarget().then((p) => {
    targetPath.textContent = `Watching: ${p}`;
  });
  window.agarthaAPI.getBaseline().then((b) => {
    filesStat.textContent = String(b.files || 0);
    linesStat.textContent = String(b.lines || 0);
  });
  window.agarthaAPI.onStats((payload) => {
    filesStat.textContent = String(payload.now.files);
    linesStat.textContent = String(payload.now.lines);
    tickGrowthFromStats(payload.delta);
  });
}

requestAnimationFrame(frame);
loadAvatarState();
populateBotSelect();
syncFormFromBot(world.bots[0]);
