// Flappy Bird Modern dengan pilihan karakter dan tema

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const charSelect = document.getElementById('character-select');
const charButtons = charSelect.querySelectorAll('button');
const themeSelect = document.getElementById('theme-select');
const themeButtons = themeSelect.querySelectorAll('button');

// Konfigurasi game
const GRAVITY = 0.45;
const FLAP = -7.5;
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;
const BIRD_SIZE = 32;
const BIRD_X = 80;

// State game
let birdY = canvas.height / 2;
let birdVelocity = 0;
let pipes = [];
let score = 0;
let gameOver = false;
let bgOffset = 0;
let frame = 0;
let started = false;
let selectedChar = null;
let selectedTheme = null;

// Asset tema
const THEMES = {
  siang: {
    grad: ["#89f7fe", "#66a6ff"],
    awan: "#fff",
    extra: null
  },
  malam: {
    grad: ["#232526", "#414345"],
    awan: "#b0c4de",
    extra: function() {
      // Bulan
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(340, 80, 32, 0, Math.PI * 2);
      ctx.fillStyle = "#fffde4";
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  },
  hutan: {
    grad: ["#a8e063", "#56ab2f"],
    awan: "#e0eafc",
    extra: function() {
      // Pohon
      ctx.save();
      ctx.fillStyle = "#2e7d32";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(60 + i * 120, canvas.height - 40, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#8d5524";
        ctx.fillRect(60 + i * 120 - 8, canvas.height - 40, 16, 40);
        ctx.fillStyle = "#2e7d32";
      }
      ctx.restore();
    }
  },
  salju: {
    grad: ["#e0eafc", "#cfdef3"],
    awan: "#fff",
    extra: function() {
      // Salju di tanah
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
      ctx.restore();
    }
  }
};

// Pilihan karakter
const CHAR_LIST = {
  babi: drawPig,
  ayam: drawChicken,
  burung: drawBird,
  manusia: drawHuman
};

// Event pilih karakter
charButtons.forEach(btn => {
  btn.onclick = () => {
    selectedChar = btn.getAttribute('data-char');
    charSelect.style.display = 'none';
    themeSelect.style.display = 'block';
  };
});

// Event pilih tema
...