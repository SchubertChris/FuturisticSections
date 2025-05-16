<script setup>
import { ref, onMounted } from 'vue'

const fullTitle = 'Lamborghini'
const typedTitle = ref('')
const showCursor = ref(true)

function typeWriter(text, i = 0) {
  if (i <= text.length) {
    typedTitle.value = text.slice(0, i)
    setTimeout(() => typeWriter(text, i + 1), 120)
  }
}

onMounted(() => {
  typeWriter(fullTitle)
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})

const isDark = ref(false)
</script>

<template>
  <div class="HeroSection-Background">
    <!-- Futuristische Overlay-Elemente unter der Navigation -->
    <div class="grid-overlay"></div>
    <div class="scan-line"></div>

    <div class="asideLeft">
      <span>320</span>
      <span>240</span>
      <span>160</span>
      <span>80</span>
      <span>0</span>
      <div class="tacho-label">KM/H</div>
    </div>
    <div class="asideRight">
      <span>0</span>
      <span>3</span>
      <span>6</span>
      <span>9</span>
      <span>12</span>
      <div class="tacho-label">RPM x1000</div>
    </div>
    <div class="asideBottom"></div>
    <div class="CTA">
      <h1 class="HeroSection-Title">Willkommen bei CandleScope</h1>
      <p class="HeroSection-Subtitle">KRYPTO | ANALYSE | PROGRAMMING | SPORT</p>
    </div>
    <nav class="Navigation">
      <ul class="NavigationList">
        <li class="Home">Übersicht</li>
        <li class="Projects">Projekte</li>
        <li class="About">Über mich</li>
        <li class="Contact">Kontakt</li>
        <li class="Legals">Rechtliches</li>
        <li class="ToggleDL">
          <button @click="isDark = !isDark" :aria-pressed="isDark" class="dark-toggle-btn">
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </li>
      </ul>
    </nav>
  </div>

  <div class="HeroSection-Header">
    <img class="LogoCS" src="../../assets/images/Logo/CSGold.png" alt="Logo CandleScope - Chris Schubert">
  </div>
  <h1 class="Header-Title">{{ typedTitle }}<span v-if="showCursor" style="color:goldenrod;">|</span></h1>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'Futuristic';
  src: url(../../assets/fonts/futuristic_armour/Armour.otf);
}

.Header-Title {
  font-size: 60px;
  font-family: 'Futuristic', Arial, sans-serif !important;
  color: goldenrod;
  position: absolute;
  top: 95px;
  left: 160px;
}

.HeroSection-Background {
  min-height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;

  /* Hintergrundbild als separates Element, das skaliert wird */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://cdn.pixabay.com/photo/2023/08/10/17/39/lamborghini-8182099_960_720.jpg') center center / cover no-repeat;
    background-size: cover;
    background-position: center;
    animation: BackgroundScaler 3s 1 ease-in-out forwards;
    z-index: 0;
  }

  /* Verdunkelungseffekt bleibt statisch */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 1;
  }
}

/* Futuristisches Raster-Overlay */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 2;
  /* Niedriger als die Navigation */
  opacity: 0.5;
  pointer-events: none;
}

/* Scan-Line Effekt */
.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(218, 165, 32, 0.6);
  box-shadow: 0 0 10px rgba(218, 165, 32, 0.8), 0 0 20px rgba(218, 165, 32, 0.5);
  z-index: 3;
  /* Über dem Grid, aber unter der Navigation */
  top: 0;
  opacity: 0.9;
  pointer-events: none;
  animation: scanAnimation 6s linear infinite;
}

@keyframes scanAnimation {
  0% {
    top: -10px;
  }

  100% {
    top: 100vh;
  }
}

.LogoCS {
  position: absolute;
  top: 20px;
  width: 100px;
  height: auto;
  margin: 20px;
  border-radius: 0px 20px 10px 40px;
  box-shadow: inset 0px 0px 10px rgb(218, 165, 32);
  border: 1px solid rgb(218, 165, 32);
  animation: Pulse 0.3s 3 ease-in-out;
  transition: all 0.5s ease;
  background-color: rgba(0, 0, 0, 0.616);
  z-index: 20;

  &:hover {
    box-shadow: inset 0px 0px 20px rgba(139, 106, 21, 0.616);
    cursor: pointer;
    transition: all 0.5s ease;
  }
}

.HeroSection-Header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 15;
  pointer-events: none;
  /* Erlaubt Klicks auf Elemente darunter */
}

.HeroSection-Header .LogoCS {
  pointer-events: auto;
  /* Ermöglicht Interaktion mit dem Logo */
}

.CTA {
  position: absolute;
  top: 25%;
  left: 10%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgb(218, 165, 32);
  border-radius: 20px 40px 20px 40px;
  box-shadow: 0 0 30px 5px rgba(218, 165, 32, 0.25), 0 0 10px 2px rgba(0, 0, 0, 0.5) inset;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: setHight 1s ease-in-out forwards, Pulse 0.6s 2 ease-in-out, Flackern 0.2s 2 ease-in-out;
  backdrop-filter: blur(2px);
  height: 120px;
  overflow: hidden;

  .HeroSection-Title {
    font-family: 'Futuristic', Arial, sans-serif !important;
    color: rgb(218, 165, 32);
    font-size: 3rem;
    font-family: 'Arial Black', Arial, sans-serif;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(218, 165, 32, 0.5), 0 2px 8px rgba(0, 0, 0, 0.7);
    line-height: 1.1;
  }

  .HeroSection-Subtitle {
    color: #fff;
    font-size: 1.3rem;
    font-family: 'Arial', sans-serif;
    letter-spacing: 3px;
    text-shadow: 0 0 6px rgba(218, 165, 32, 0.3);
    margin: 0 auto;
    background: linear-gradient(90deg, rgba(218, 165, 32, 0.15) 0%, rgba(0, 0, 0, 0.2) 100%);
    padding: 8px 18px;
    border-radius: 10px 25px 10px 25px;
    border: 1px solid rgba(218, 165, 32, 0.3);
    box-shadow: 0 0 8px 1px rgba(218, 165, 32, 0.12);
  }
}

@keyframes Flackern {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@keyframes setHight {
  100% {
    opacity: 1;
    height: max-content;
  }
}

.Navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 85%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  z-index: 5;
  /* Höher als die Overlays */

  .NavigationList {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin: 0;

    :nth-child(1) {
      animation: ComeInFromRight 0.5s ease-in-out;
      animation-delay: 0s;
    }

    :nth-child(2) {
      animation: ComeInFromLeft 0.5s ease-in-out;
      animation-delay: 0.1s;
    }

    :nth-child(3) {
      animation: ComeInFromRight 0.5s ease-in-out;
      animation-delay: 0.2s;
    }

    :nth-child(4) {
      animation: ComeInFromLeft 0.5s ease-in-out;
      animation-delay: 0.3s;
    }

    :nth-child(5) {
      animation: ComeInFromRight 0.5s ease-in-out;
      animation-delay: 0.4s;
    }

    :nth-child(6) {
      animation: ComeInFromLeft 0.5s ease-in-out;
      animation-delay: 0.5s;
    }

    li {
      font-family: 'Futuristic', Arial, sans-serif !important;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      text-align: center;
      width: 300px;
      height: 50px;
      border-radius: 0px 20px 10px 40px;
      box-shadow: inset 0px 0px 10px rgb(218, 165, 32);
      border: 1px solid rgb(218, 165, 32);
      animation: Pulse 0.3s 3 ease-in-out;
      transition: all 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.616);
      font-family: 'Arial', sans-serif;
      letter-spacing: 1px;
      position: relative;

      &:hover {
        background-color: rgba(0, 0, 0, 0.816);
        box-shadow: inset 0px 0px 20px rgba(139, 106, 21, 0.616);
        transition: all 0.3s ease;
        cursor: pointer;
        transition: all 0.5s ease;
      }
    }
  }
}

@keyframes BackgroundScaler {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

@keyframes Pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes ComeInFromRight {
  0% {
    rotate: 10deg;
    transform: translateX(100%);
    opacity: 0;
  }

  40%,
  90% {
    transition: all 1s;
    background-color: rgba(218, 165, 32, 0.37);
  }

  100% {
    rotate: 0deg;
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes ComeInFromLeft {
  0% {
    rotate: 10deg;
    transform: translateX(-100%);
    opacity: 0;
  }

  40%,
  90% {
    transition: all 1s;
    background-color: rgba(218, 165, 32, 0.37);
  }

  100% {
    rotate: 0deg;
    transform: translateX(0);
    opacity: 1;
  }
}

/* TACHO-DESIGN FÜR ASIDE ELEMENTE */
.asideLeft {
  position: absolute;
  rotate: 45deg;
  left: 50%;
  top: 5%;
  width: 20px;
  height: 80vh;
  border: 1px solid goldenrod;
  border-radius: 10px 0px 0px 50px;
  animation: setInPositionLeft 3s ease-in-out forwards;
  z-index: 4;
  overflow: visible;
  
  /* Gebogener Zeiger-Effekt */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-left: 2px solid rgba(218, 165, 32, 0.7);
    border-radius: 100px 0 0 100px;
    transform: skewY(5deg);
  }
  
  /* Tacho-Markierungen */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 15px,
      rgba(218, 165, 32, 0.6) 15px,
      rgba(218, 165, 32, 0.6) 17px
    );
    mask: linear-gradient(to right, transparent 0%, black 50%, black 100%);
    transform: perspective(200px) rotateY(15deg);
  }
}

@keyframes setInPositionLeft {
  0% {
    opacity: 0.3;
    background-color: rgba(218, 32, 32, 0.37);
  }

  20% {
    background-color: rgba(255, 251, 0, 0.37);
  }

  40%,
  90% {
    opacity: 1;
    transition: all 1s;
    background-color: rgba(35, 139, 21, 0.416);
  }

  100% {
    top: 15%;
    left: 5px;
    rotate: 0deg;
    opacity: 1;
    background-color: rgba(218, 165, 32, 0.37);
    box-shadow: inset 3px 0 10px rgba(218, 165, 32, 0.5);
    transform: perspective(500px) rotateY(15deg);
    clip-path: polygon(0 0, 100% 10%, 100% 90%, 0 100%);
    overflow: visible;
  }
}

.asideRight {
  position: absolute;
  height: 80vh;
  animation-delay: 0.3s;
  rotate: -45deg;
  right: 50%;
  top: 5%;
  width: 20px;
  border: 1px solid goldenrod;
  border-radius: 0px 10px 50px 0px;
  animation: setInPositionRight 3s ease-in-out forwards;
  z-index: 4;
  overflow: visible;
  
  /* Gebogener Zeiger-Effekt */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-right: 2px solid rgba(218, 165, 32, 0.7);
    border-radius: 0 100px 100px 0;
    transform: skewY(-5deg);
  }
  
  /* Tacho-Markierungen mit roter Zone */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(to bottom, 
        transparent 80%, rgba(255, 30, 0, 0.6) 80%, rgba(255, 30, 0, 0.6) 100%),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 15px,
        rgba(218, 165, 32, 0.6) 15px,
        rgba(218, 165, 32, 0.6) 17px
      );
    mask: linear-gradient(to left, transparent 0%, black 50%, black 100%);
    transform: perspective(200px) rotateY(-15deg);
  }
}

@keyframes setInPositionRight {
  0% {
    opacity: 0.3;
    background-color: rgba(218, 32, 32, 0.37);
  }

  20% {
    background-color: rgba(255, 251, 0, 0.37);
  }

  40%,
  90% {
    opacity: 1;
    transition: all 1s;
    background-color: rgba(35, 139, 21, 0.416);
  }

  100% {
    top: 15%;
    right: 5px;
    rotate: 0deg;
    opacity: 1;
    background-color: rgba(218, 165, 32, 0.37);
    box-shadow: inset -3px 0 10px rgba(218, 165, 32, 0.5);
    transform: perspective(500px) rotateY(-15deg);
    clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%);
    overflow: visible;
  }
}

.asideBottom {
  position: absolute;
  bottom: 200px;
  left: 5px;
  transform: translateX(50%);
  border: 1px solid black;
  width: 50%;
  max-height: 20px;
  border-radius: 0px 0px 50px 50px;
  animation: ScaleUpFromBottom 3s ease-in-out forwards;
  animation-delay: 0.6s;
  z-index: 4;
}

@keyframes ScaleUpFromBottom {
  0% {
    height: 10px;
    opacity: 0.4;
    background-color: rgba(218, 32, 32, 0.37);
  }

  20% {
    background-color: rgba(255, 251, 0, 0.37);
  }

  40%,
  90% {
    opacity: 1;
    transition: all 1s;
    background-color: rgba(35, 139, 21, 0.416);
  }

  100% {
    bottom: 10px;
    height: 80vh;
    background-color: rgba(218, 165, 32, 0.37);
  }
}

/* Tacho-Zahlen Stil */
.asideLeft span, .asideRight span {
  color: goldenrod;
  font-family: 'Futuristic', Arial, sans-serif !important;
  font-size: 11px;
  text-shadow: 0 0 5px rgba(218, 165, 32, 0.8);
  position: absolute;
  z-index: 30;  /* Höhere Z-Index */
  pointer-events: none;
  overflow: visible;
  animation: fadeInWithDelay 1s ease-in-out forwards;
  animation-delay: 3s;
}

@keyframes fadeInWithDelay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Geschwindigkeitstacho Zahlen - zur Mitte hin */
.asideLeft span:nth-child(1) {
  top: 15%;
  right: -30px;
}

.asideLeft span:nth-child(2) {
  top: 30%;
  right: -30px;
}

.asideLeft span:nth-child(3) {
  top: 45%;
  right: -30px;
}

.asideLeft span:nth-child(4) {
  top: 60%;
  right: -30px;
}

.asideLeft span:nth-child(5) {
  top: 75%;
  right: -30px;
}

/* Drehzahlmesser Zahlen - zur Mitte hin */
.asideRight span:nth-child(1) {
  top: 15%;
  left: -20px;
}

.asideRight span:nth-child(2) {
  top: 30%;
  left: -20px;
}

.asideRight span:nth-child(3) {
  top: 45%;
  left: -20px;
}

.asideRight span:nth-child(4) {
  top: 60%;
  left: -20px;
}

.asideRight span:nth-child(5) {
  top: 75%;
  left: -20px;
  color: #ff3300; /* Rote Farbe für den höchsten Wert */
  text-shadow: 0 0 5px rgba(255, 51, 0, 0.8);
}

.tacho-label {
  position: absolute;
  color: goldenrod;
  font-family: 'Futuristic', Arial, sans-serif !important;
  font-size: 9px;
  text-shadow: 0 0 5px rgba(218, 165, 32, 0.8);
  z-index: 30;  /* Höhere Z-Index */
  pointer-events: none;
  overflow: visible;
  animation: fadeInWithDelay 1s ease-in-out forwards;
  animation-delay: 3s;
}

.asideLeft .tacho-label {
  top: 5%;
  right: -32px;
}

.asideRight .tacho-label {
  top: 5%;
  left: -60px;
}

/* Wichtig: Animationen müssen beibehalten werden */
.asideLeft, .asideRight, .asideLeft *, .asideRight * {
  animation-fill-mode: forwards !important;
}

.dark-toggle-btn {
  font-family: 'Futuristic', Arial, sans-serif !important;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  name: 'HeroSectionLandingPage'
}
</script>