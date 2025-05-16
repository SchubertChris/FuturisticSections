<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {
  CurrencyDollarIcon,
  CodeBracketIcon,
  PlayIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CubeTransparentIcon,
  CommandLineIcon,
  CircleStackIcon,
  TrophyIcon,
  HeartIcon,
  UserGroupIcon,
  RectangleStackIcon,
  CodeBracketSquareIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CubeIcon,
  PhoneIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon
} from '@heroicons/vue/24/outline';

// Kategorien für die Navigation
const categories = [
  { id: 'crypto', name: 'Krypto', icon: CurrencyDollarIcon },
  { id: 'sport', name: 'Sport', icon: ChartBarIcon },
  { id: 'coding', name: 'Coding', icon: CodeBracketIcon },
  { id: 'gaming', name: 'Gaming', icon: PlayIcon }
];

// Aktive Kategorie
const activeCategory = ref('crypto');

// Animation-Trigger für die Karten
const isVisible = ref(false);
const isChanging = ref(false);

// Hintergrund-Icons nach Kategorie
const backgroundIcons = {
  crypto: [
    { component: CurrencyDollarIcon, size: 24 },
    { component: ArrowTrendingUpIcon, size: 32 },
    { component: CubeTransparentIcon, size: 24 },
    { component: CommandLineIcon, size: 20 },
    { component: CircleStackIcon, size: 28 }
  ],
  sport: [
    { component: TrophyIcon, size: 32 },
    { component: ChartBarIcon, size: 24 },
    { component: HeartIcon, size: 28 },
    { component: UserGroupIcon, size: 32 },
    { component: RectangleStackIcon, size: 20 }
  ],
  coding: [
    { component: CodeBracketIcon, size: 28 },
    { component: CodeBracketSquareIcon, size: 24 },
    { component: PaintBrushIcon, size: 32 },
    { component: DevicePhoneMobileIcon, size: 24 },
    { component: ComputerDesktopIcon, size: 30 }
  ],
  gaming: [
    { component: PlayIcon, size: 32 },
    { component: CubeIcon, size: 28 },
    { component: PhoneIcon, size: 24 },
    { component: RocketLaunchIcon, size: 30 },
    { component: PuzzlePieceIcon, size: 26 }
  ]
};

// Icons für die Animation
interface AnimatedIcon {
  component: any;
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
    animationDelay: string;
    animationDuration: string;
  };
}
const animatedIcons = ref<AnimatedIcon[]>([]);

// Projekte nach Kategorien
const projects = {
  crypto: [
    { id: 1, title: 'Blockchain Explorer', desc: 'Visualisierung von Blockchain-Transaktionen in Echtzeit.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 2, title: 'NFT Marketplace', desc: 'Handelsplattform für digitale Sammlerstücke mit Blockchain-Technologie.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 3, title: 'DeFi Dashboard', desc: 'Übersicht über dezentrale Finanzanwendungen und Renditen.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 4, title: 'Crypto Wallet', desc: 'Sichere Wallet-Lösung für verschiedene Kryptowährungen.', image: '../../assets/images/Logo/CSGold.png' },
  ],
  sport: [
    { id: 1, title: 'Training Tracker', desc: 'Fortschrittsverfolgung für persönliche Fitnessziele.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 2, title: 'Sport Analytics', desc: 'Datenanalyse für Sportteams und Athleten.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 3, title: 'E-Sport Liga', desc: 'Plattform für professionelle E-Sport-Wettbewerbe.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 4, title: 'Fitness AR', desc: 'Augmented Reality für interaktives Training.', image: '../../assets/images/Logo/CSGold.png' },
  ],
  coding: [
    { id: 1, title: '3D Animation', desc: 'Dreidimensionale Animationen mit modernsten Techniken.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 2, title: 'UI/UX Design', desc: 'Benutzerfreundliche Interfaces mit futuristischem Touch.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 3, title: 'Web Development', desc: 'Responsive Webseiten mit futuristischem Design.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 4, title: 'Game Design', desc: 'Kreative Spielkonzepte und interaktive Erlebnisse.', image: '../../assets/images/Logo/CSGold.png' },
  ],
  gaming: [
    { id: 1, title: 'VR Experience', desc: 'Immersive Virtual-Reality-Welten und Spielkonzepte.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 2, title: 'Mobile Games', desc: 'Interaktive Spielerlebnisse für mobile Endgeräte.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 3, title: 'Gaming Platform', desc: 'Zentrale Plattform für Gamer und Entwickler.', image: '../../assets/images/Logo/CSGold.png' },
    { id: 4, title: 'Game Assets', desc: '3D-Modelle und Texturen für moderne Spielentwicklung.', image: '../../assets/images/Logo/CSGold.png' },
  ]
};

// Methode zum Erstellen der Hintergrund-Icons
const generateBackgroundIcons = () => {
  const newIcons: AnimatedIcon[] = [];
  const currentIcons = backgroundIcons[activeCategory.value];

  // Generiere 20 zufällige Icons
  for (let i = 0; i < 20; i++) {
    const randomIcon = currentIcons[Math.floor(Math.random() * currentIcons.length)];
    const x = Math.random() * 100; // Position in %
    const y = Math.random() * 100; // Position in %
    const size = randomIcon.size;
    const delay = Math.random() * 10; // Zufällige Verzögerung
    const duration = 20 + Math.random() * 20; // Dauer der Animation

    newIcons.push({
      component: randomIcon.component,
      style: {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    });
  }

  animatedIcons.value = newIcons;
};

// Methode zum Ändern der Kategorie
const changeCategory = (category: string) => {
  if (category === activeCategory.value) return;

  isChanging.value = true;
  isVisible.value = false;

  // Verzögerung für den Kategoriewechsel
  setTimeout(() => {
    activeCategory.value = category;
    // Aktualisiere die Hintergrund-Icons
    generateBackgroundIcons();

    // Verzögerung für das Einblenden der neuen Karten
    setTimeout(() => {
      isVisible.value = true;
      isChanging.value = false;
    }, 500);
  }, 600);
};

// Beobachte Änderungen der aktiven Kategorie
watch(activeCategory, () => {
  generateBackgroundIcons();
});

onMounted(() => {
  // Initiale Icons generieren
  generateBackgroundIcons();

  // Verzögerung für den Animations-Trigger
  setTimeout(() => {
    isVisible.value = true;
  }, 500);
});
</script>

<template>
  <!-- Outer Container für die gesamte Komponente -->
  <div class="AnimatedProjects-Container">
    <!-- 1. Haupthintergrund mit Bild -->
    <div class="AnimatedProjects-Background">
      <!-- 2. Overlay-Ebene -->
      <div class="animatedProjects-Overlay">
        <!-- Futuristische Overlay-Elemente -->
        <div class="grid-overlay"></div>
        <div class="scan-line"></div>

        <!-- 3. Projektinhalt-Bereich -->
        <div class="Projects-Background">
          <!-- Hintergrund-Elemente -->
          <div class="cyber-circuit"></div>
          <div class="asideLeft"></div>
          <div class="asideRight"></div>

          <!-- Hintergrund-Icons -->
          <div class="background-icons-container">
            <div v-for="(icon, index) in animatedIcons" :key="index" class="background-icon" :style="icon.style">
              <component :is="icon.component" class="icon" />
            </div>
          </div>

          <!-- Navigation -->
          <div class="category-nav">
            <div v-for="category in categories" :key="category.id" class="nav-item"
              :class="{ 'active': activeCategory === category.id }" @click="changeCategory(category.id)"
              :data-tooltip="category.name">
              <component :is="category.icon" class="nav-icon" />
              <div class="tooltip">{{ category.name }}</div>
            </div>
          </div>

          <!-- Projekt-Container mit Karten -->
          <div class="Projects-Container" :class="{ 'visible': isVisible, 'changing': isChanging }">
            <template v-if="activeCategory === 'crypto'">
              <div v-for="(project, index) in projects.crypto" :key="project.id"
                :class="`ProjectCards ProjectCards${index + 1}`">
                <div class="card-glow"></div>
                <div class="card-content">
                  <img class="Project-Image" src="../../assets/images/Logo/CSGold.png" alt="CSLogo">
                  <article class="ProjectCard-Text">
                    <h2>{{ project.title }}</h2>
                    <p>{{ project.desc }}</p>
                  </article>
                  <div class="card-buttons">
                    <button class="ProjectCard-Details">Details</button>
                    <button class="Live-Demo">Demo</button>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeCategory === 'sport'">
              <div v-for="(project, index) in projects.sport" :key="project.id"
                :class="`ProjectCards ProjectCards${index + 1}`">
                <div class="card-glow"></div>
                <div class="card-content">
                  <img class="Project-Image" src="../../assets/images/Logo/CSGold.png" alt="Placeholder">
                  <article class="ProjectCard-Text">
                    <h2>{{ project.title }}</h2>
                    <p>{{ project.desc }}</p>
                  </article>
                  <div class="card-buttons">
                    <button class="ProjectCard-Details">Details</button>
                    <button class="Live-Demo">Demo</button>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeCategory === 'coding'">
              <div v-for="(project, index) in projects.coding" :key="project.id"
                :class="`ProjectCards ProjectCards${index + 1}`">
                <div class="card-glow"></div>
                <div class="card-content">
                  <img class="Project-Image" src="../../assets/images/Logo/CSGold.png" alt="Placeholder">
                  <article class="ProjectCard-Text">
                    <h2>{{ project.title }}</h2>
                    <p>{{ project.desc }}</p>
                  </article>
                  <div class="card-buttons">
                    <button class="ProjectCard-Details">Details</button>
                    <button class="Live-Demo">Demo</button>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeCategory === 'gaming'">
              <div v-for="(project, index) in projects.gaming" :key="project.id"
                :class="`ProjectCards ProjectCards${index + 1}`">
                <div class="card-glow"></div>
                <div class="card-content">
                  <img class="Project-Image" src="../../assets/images/Logo/CSGold.png" alt="Placeholder">
                  <article class="ProjectCard-Text">
                    <h2>{{ project.title }}</h2>
                    <p>{{ project.desc }}</p>
                  </article>
                  <div class="card-buttons">
                    <button class="ProjectCard-Details">Details</button>
                    <button class="Live-Demo">Demo</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Hauptcontainer
@font-face {
  font-family: "Futuristic";
  src: url(../../assets/fonts/futuristic_armour/Armour.otf);
}

.AnimatedProjects-Container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

// 1. Haupthintergrund
.AnimatedProjects-Background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-image: url("https://cdn.pixabay.com/photo/2024/02/02/18/41/ai-generated-8548846_960_720.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 1;
  filter: brightness(1.1); // Leicht erhöhte Helligkeit für bessere Sichtbarkeit
}

// 2. Overlay-Ebene
.animatedProjects-Overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  z-index: 2;
}

// 3. Projektinhalt-Bereich
.Projects-Background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgba(8, 8, 36, 0.1); // Sehr transparent für maximale Sichtbarkeit des Hintergrundbildes
  overflow: hidden;
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 30, 60, 0.2) 0%, rgba(0, 0, 20, 0.4) 100%);
    z-index: 1;
  }
}

// Futuristisches Raster-Overlay
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to right, rgba(149, 202, 255, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(150, 203, 255, 0.5) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 2;
  opacity: 0.5;
  pointer-events: none;
}

// Animierter Scan-Line Effekt
.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(0, 174, 255);
  box-shadow: 0 0 15px rgba(0, 174, 255, 1), 0 0 30px rgba(0, 174, 255, 0.7);
  z-index: 3;
  top: 0;
  opacity: 0.9;
  pointer-events: none;
  animation: scanAnimation 3s linear infinite;
}

@keyframes scanAnimation {
  0% {
    top: -10px;
  }

  100% {
    top: 100vh;
  }
}

// Cyber-Schaltkreis Hintergrund
.cyber-circuit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100px 100px;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 10% 20%, rgba(0, 174, 255, 0.3) 0%, transparent 25%),
      radial-gradient(circle at 90% 80%, rgba(0, 174, 255, 0.3) 0%, transparent 25%);
    z-index: 0;
    animation: pulseGlow 8s ease-in-out infinite alternate;
  }
}

@keyframes pulseGlow {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 0.9;
  }
}

// Hintergrund-Icons
.background-icons-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  transform: translateX(50%);
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.background-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.5); // Sattigere Farbe für bessere Sichtbarkeit
  opacity: 0;
  transform: translateY(20px);
  animation: floatIcon 20s ease-in-out infinite, fadeInOut 20s ease-in-out infinite;

  .icon {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 4px rgba(0, 174, 255));
  }
}

@keyframes floatIcon {
  0% {
    transform: translateY(20px) rotate(0deg);
  }

  25% {
    transform: translateY(-30px) translateX(20px) rotate(5deg);
  }

  50% {
    transform: translateY(-70px) translateX(-10px) rotate(-2deg);
  }

  75% {
    transform: translateY(-100px) translateX(30px) rotate(8deg);
  }

  100% {
    transform: translateY(-150px) rotate(0deg);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 0.7; // Höhere Opazität für bessere Sichtbarkeit
  }

  50% {
    opacity: 1; // Volle Opazität im Mittelpunkt der Animation
  }

  80% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}

// Navigationsleiste
.category-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  position: relative;
  z-index: 10;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(0, 30, 60, 0.5);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 174, 255, 0.7);
  box-shadow: 0 0 20px rgba(0, 174, 255, 0.2);
  transform: translateY(30px);

  .nav-item {
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgba(0, 40, 80, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);

      .tooltip {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &.active {
      background: rgba(0, 174, 255, 0.8);
      box-shadow: 0 0 15px rgba(0, 174, 255, 0.7);

      .nav-icon {
        color: #000;
      }
    }

    .nav-icon {
      width: 24px;
      height: 24px;
      color: rgba(0, 174, 255, 0.9);
      transition: all 0.3s ease;
    }

    .tooltip {
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: rgba(0, 40, 80, 0.9);
      color: rgba(0, 174, 255, 0.9);
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      border: 1px solid rgba(0, 174, 255, 0.3);

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 40, 80, 0.9) transparent transparent transparent;
      }
    }
  }
}

// Container für Projekt-Karten
.Projects-Container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 100px);
  position: relative;
  z-index: 5;

  &.changing {
    .ProjectCards {
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  }

  // Gemeinsamer Stil für alle Projektkarten
  .ProjectCards {
    position: absolute;
    width: 25%;
    max-width: 350px;
    min-width: 220px;
    height: 400px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 174, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 174, 255, 0.1);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    transform: scale(0.8);
    background-color: rgba(0, 30, 60, 0.5);

    // Glasmorphismus-Effekt
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: all 0.5s ease;
    }

    &:hover {
      transform: translateY(-10px) scale(1.03) !important;
      box-shadow: 0 0 30px rgba(0, 174, 255, 0.3);

      &::before {
        left: 100%;
        transition: all 0.8s ease;
      }

      .card-glow {
        opacity: 0.8;
      }
    }

    // Inhalt der Karten
    .card-content {
      position: relative;
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      z-index: 2;
    }

    // Bild
    .Project-Image {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 15px;
      border: 1px solid rgba(0, 174, 255, 0.3);
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    // Text
    .ProjectCard-Text {
      flex-grow: 1;

      h2 {
        font-family: 'Futuristic', sans-serif;
        font-size: 1.5rem;
        color: rgba(0, 174, 255, 0.9);
        margin-bottom: 10px;
        text-shadow: 0 0 5px rgba(0, 174, 255, 0.3);
      }

      p {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    // Buttons
    .card-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      button {
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;

        &.ProjectCard-Details {
          background: transparent;
          color: rgba(0, 174, 255, 0.9);
          border: 1px solid rgba(0, 174, 255, 0.5);

          &:hover {
            background: rgba(0, 174, 255, 0.1);
            box-shadow: 0 0 10px rgba(0, 174, 255, 0.3);
          }
        }

        &.Live-Demo {
          background: rgba(0, 174, 255, 0.9);
          color: #000;

          &:hover {
            background: rgba(0, 174, 255, 1);
            box-shadow: 0 0 10px rgba(0, 174, 255, 0.5);
            transform: translateY(-2px);
          }
        }
      }
    }

    // Glüheffekt
    .card-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(0, 174, 255, 0.3) 0%, transparent 70%);
      opacity: 0.3;
      z-index: 1;
      transition: opacity 0.5s ease;
    }
  }

  // Individuelle Positionen und Animationen für jede Karte
  &.visible {
    .ProjectCards1 {
      top: 10%;
      left: 25%;
      opacity: 1;
      transform: scale(1) rotate(-2deg);
      transition-delay: 0.2s;
    }

    .ProjectCards2 {
      top: 10%;
      right: 25%;
      opacity: 1;
      transform: scale(1) rotate(2deg);
      transition-delay: 0.4s;
    }

    .ProjectCards3 {
      bottom: 12%;
      left: 28%;
      opacity: 1;
      transform: scale(1) rotate(2deg);
      transition-delay: 0.6s;
    }

    .ProjectCards4 {
      bottom: 10%;
      right: 25%;
      opacity: 1;
      transform: scale(1) rotate(-2deg);
      transition-delay: 0.8s;
    }
  }

  // Startpositionen für die Animation
  .ProjectCards1 {
    top: 100vh;
    left: 10%;
    transform: scale(0.8) rotate(-5deg);
  }

  .ProjectCards2 {
    top: 100vh;
    right: 10%;
    transform: scale(0.8) rotate(5deg);
  }

  .ProjectCards3 {
    bottom: -100vh;
    left: 10%;
    transform: scale(0.8) rotate(5deg);
  }

  .ProjectCards4 {
    bottom: -100vh;
    right: 10%;
    transform: scale(0.8) rotate(-5deg);
  }
}

// Animation für Kategorienwechsel
.Projects-Container:not(.visible) {
  .ProjectCards1 {
    top: -100vh;
    left: 10%;
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
    transition-delay: 0.2s;
  }

  .ProjectCards2 {
    top: -100vh;
    right: 10%;
    opacity: 0;
    transform: scale(0.8) rotate(5deg);
    transition-delay: 0.1s;
  }

  .ProjectCards3 {
    bottom: 100vh;
    left: 10%;
    opacity: 0;
    transform: scale(0.8) rotate(5deg);
    transition-delay: 0.3s;
  }

  .ProjectCards4 {
    bottom: 100vh;
    right: 10%;
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
    transition-delay: 0.4s;
  }
}

// Responsive Design
@media (max-width: 1200px) {
  .Projects-Container {
    .ProjectCards {
      width: 35%;
    }
  }
}

@media (max-width: 768px) {
  .category-nav {
    max-width: 80%;
    flex-wrap: wrap;
    padding: 15px;
    gap: 15px;

    .nav-item {
      width: 40px;
      height: 40px;

      .nav-icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  .Projects-Container {
    flex-direction: column;
    height: auto;
    padding: 50px 0;

    &.visible {

      .ProjectCards1,
      .ProjectCards2,
      .ProjectCards3,
      .ProjectCards4 {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 20px auto;
        width: 80%;
        max-width: 350px;
      }
    }
  }

  .background-icon {
    display: none;
  }
}

.asideLeft {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-top: 100vh solid transparent;
  border-bottom: 100vh solid transparent;
  border-right: 0 solid rgba(158, 224, 255, 0.2);
  border-left: none;
  pointer-events: none;
  z-index: 4;
  transform: translateY(-50%) translateY(50vh);
  animation: GrowBorderLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.asideRight {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  border-top: 100vh solid transparent;
  border-bottom: 100vh solid transparent;
  border-left: 0 solid rgba(158, 224, 255, 0.2);
  border-right: none;
  pointer-events: none;
  z-index: 4;
  transform: translateY(-50%) translateY(50vh);
  animation: GrowBorderRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes GrowBorderLeft {
  0% {
    border-right-width: 0;
  }

  100% {
    border-right-width: 200px;
  }
}

@keyframes GrowBorderRight {
  0% {
    border-left-width: 0;
  }

  100% {
    border-left-width: 200px;
  }
}
</style>

<script lang="ts">
export default {
  name: 'AnimationProjects'
}
</script>