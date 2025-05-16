<script setup>
import { ref, onMounted } from 'vue'

const title = ref('AURORA NEXUS')
const subtitle = ref('PRÄZISION • ELEGANZ • NACHHALTIGKEIT • INNOVATION')
const isLoaded = ref(false)
const isHovered = ref(false)
const activeSection = ref('vision')

// Supersportwagen-Bilder von Pixabay
const carImages = [
  {
    id: 'vision',
    src: 'https://www.bmwusa.com/content/dam/bmw/common/individual/mobile/BMW-Individual-Exterior-05-Mobile.jpg',
    alt: 'BMW Vision Supersportwagen'
  },
  {
    id: 'design',
    src: 'https://cdn.pixabay.com/photo/2016/04/01/12/16/car-1300629_1280.png',
    alt: 'Porsche Sportwagen Konzept'
  },
  {
    id: 'technologie',
    src: 'https://www.motortrend.com/uploads/sites/11/2019/08/Lamborghini-Aventador-SVJ-V12-Engine.jpg?interpolation=lanczos-none&fit=around|660:348',
    alt: 'Lamborghini Technologie'
  },
  {
    id: 'umwelt',
    src: 'https://ecomento.de/wp-content/uploads/2021/05/Lamborghini-Sian-Roadster.jpg',
    alt: 'Elektrischer Supersportwagen'
  }
]

const sections = [
  { id: 'vision', name: 'Vision' },
  { id: 'design', name: 'Design' },
  { id: 'technologie', name: 'Technologie' },
  { id: 'umwelt', name: 'Nachhaltigkeit' }
]

// Statistiken für die Anzeigebalken
const statistics = [
  { name: 'Effizienz', value: 92 },
  { name: 'Nachhaltigkeit', value: 88 },
  { name: 'Performance', value: 95 }
]

// Aktives Bild basierend auf der aktiven Sektion
const activeImage = ref(carImages[0])

function setHovered(status) {
  isHovered.value = status
}

function setActiveSection(id) {
  activeSection.value = id
  activeImage.value = carImages.find(img => img.id === id)
}

onMounted(() => {
  // Verzögerter Start der Animationen
  setTimeout(() => {
    isLoaded.value = true
  }, 300)
})
</script>

<template>
  <div class="nightgreen-section" :class="{ 'is-loaded': isLoaded }">
    <!-- Ecken mit Winkeln -->
    <div class="corner corner-top-left"></div>
    <div class="corner corner-top-right"></div>
    <div class="corner corner-bottom-left"></div>
    <div class="corner corner-bottom-right"></div>
    
    <!-- Overlay-Ebenen -->
    <div class="gradient-overlay"></div>
    <div class="noise-overlay"></div>
    <div class="grid-overlay"></div>
    
    <!-- Scan-Effekte -->
    <div class="horizontal-scan"></div>
    <div class="vertical-scan"></div>
    
    <!-- Haupt-Content -->
    <div class="content-container">
      <!-- Header-Bereich -->
      <div class="header-area">
        <div class="logo-container"
          @mouseenter="setHovered(true)"
          @mouseleave="setHovered(false)">
          <div class="logo-glow" :class="{ 'hovered': isHovered }"></div>
          <div class="logo">AN</div>
        </div>
        
        <div class="title-section">
          <h1 class="main-title">{{ title }}</h1>
          <div class="title-underline"></div>
          <p class="subtitle">{{ subtitle }}</p>
        </div>
      </div>
      
      <!-- Haupt-Display-Bereich -->
      <div class="display-container">
        <div class="display-sidebar">
          <div class="sidebar-nav">
            <div v-for="section in sections" 
                 :key="section.id" 
                 @click="setActiveSection(section.id)"
                 :class="['nav-item', { active: activeSection === section.id }]">
              <div class="nav-indicator"></div>
              <span>{{ section.name }}</span>
            </div>
          </div>
          
          <div class="stat-container">
            <h3 class="stat-title">LEISTUNGSDATEN</h3>
            <div v-for="(stat, index) in statistics" 
                 :key="index" 
                 class="stat-item">
              <div class="stat-label">{{ stat.name }}</div>
              <div class="stat-bar">
                <div class="stat-value" :style="{ width: `${stat.value}%` }"></div>
              </div>
              <span class="stat-percentage">{{ stat.value }}%</span>
            </div>
          </div>
        </div>
        
        <div class="main-display">
          <div class="display-corner display-corner-tl"></div>
          <div class="display-corner display-corner-tr"></div>
          <div class="display-corner display-corner-bl"></div>
          <div class="display-corner display-corner-br"></div>
          
          <!-- Bild und Data-Visualisierung -->
          <div class="data-visualization">
            <div class="model-viewer">
              <!-- Hintergrundbild des entsprechenden Sportwagens -->
              <div class="car-image-container">
                <img 
                  :src="activeImage.src" 
                  :alt="activeImage.alt" 
                  class="car-image"
                  :key="activeImage.id"
                />
                <div class="image-overlay"></div>
              </div>
              
              <div class="model-highlight"></div>
              
              <!-- Hexagon-Grid als Overlay für das Bild -->
              <div class="hexagon-grid">
                <div v-for="i in 20" :key="i" 
                     class="hexagon" 
                     :style="{ 
                       top: `${Math.random() * 100}%`, 
                       left: `${Math.random() * 100}%`, 
                       animationDelay: `${Math.random() * 3}s` 
                     }">
                </div>
              </div>
              
              <!-- Kreisförmige Daten-Punkte -->
              <div class="data-points">
                <div v-for="i in 4" :key="i" 
                     class="data-point" 
                     :style="{ 
                       top: `${20 + i * 15}%`, 
                       left: `${10 + i * 20}%`,
                       animationDelay: `${i * 0.5}s`
                     }">
                  <div class="point-pulse"></div>
                  <div class="point-line" 
                       :style="{ 
                         width: `${50 + i * 20}px`, 
                         transform: `rotate(${-30 + i * 15}deg)` 
                       }">
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="display-info">
            <template v-if="activeSection === 'vision'">
              <h2 class="info-title">Unsere Vision</h2>
              <p class="info-text">Die Zukunft der Mobilität neu definieren durch innovative, ressourcenschonende Antriebssysteme, die Leistung und Nachhaltigkeit perfekt vereinen.</p>
            </template>
            
            <template v-else-if="activeSection === 'design'">
              <h2 class="info-title">Präzisions-Design</h2>
              <p class="info-text">Stromlinienförmige Aerodynamik trifft auf zeitlose Eleganz. Jede Linie wurde entwickelt, um Effizienz und Ästhetik in perfekter Balance zu halten.</p>
            </template>
            
            <template v-else-if="activeSection === 'technologie'">
              <h2 class="info-title">Aurora-Technologie</h2>
              <p class="info-text">Unser patentiertes Fusion-Antriebssystem nutzt revolutionäre Energie-Rückgewinnungstechniken, die bis zu 95% der Bremsenergie konvertieren.</p>
            </template>
            
            <template v-else-if="activeSection === 'umwelt'">
              <h2 class="info-title">Nachhaltigkeits-Initiative</h2>
              <p class="info-text">Nullemission ist nur der Anfang. Durch Kreislaufwirtschaft und regenerative Materialien setzen wir neue Maßstäbe für umweltbewusste Mobilität.</p>
            </template>
          </div>
        </div>
      </div>
      
      <!-- Footer mit Call-to-Action -->
      <div class="action-bar">
        <div class="action-status">
          <div class="status-light"></div>
          <span class="status-text">System bereit</span>
        </div>
        
        <button class="action-button">
          <span class="button-text">Erfahrung starten</span>
          <span class="button-icon">↗</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

/* Basis-Setup */
.nightgreen-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: #e8f4ef;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: url('https://4kwallpapers.com/images/walls/thumbs_3t/7895.jpg') center center / cover no-repeat;
  background-attachment: fixed;
}

/* Gestaltete Ecken mit 3px Breite mit Night-Green-Farbverlauf */
.corner {
  position: absolute;
  width: 80px;
  height: 80px;
  z-index: 10;
  pointer-events: none;
}

.corner::before, .corner::after {
  content: '';
  position: absolute;
  background: linear-gradient(135deg, #002515 0%, #00805a 50%, #00d6a1 100%);
  border-radius: 1px;
}

.corner-top-left {
  top: 20px;
  left: 20px;
}

.corner-top-left::before {
  width: 3px;
  height: 40px;
  top: 0;
  left: 0;
}

.corner-top-left::after {
  width: 40px;
  height: 3px;
  top: 0;
  left: 0;
}

.corner-top-right {
  top: 20px;
  right: 20px;
}

.corner-top-right::before {
  width: 3px;
  height: 40px;
  top: 0;
  right: 0;
}

.corner-top-right::after {
  width: 40px;
  height: 3px;
  top: 0;
  right: 0;
}

.corner-bottom-left {
  bottom: 20px;
  left: 20px;
}

.corner-bottom-left::before {
  width: 3px;
  height: 40px;
  bottom: 0;
  left: 0;
}

.corner-bottom-left::after {
  width: 40px;
  height: 3px;
  bottom: 0;
  left: 0;
}

.corner-bottom-right {
  bottom: 20px;
  right: 20px;
}

.corner-bottom-right::before {
  width: 3px;
  height: 40px;
  bottom: 0;
  right: 0;
}

.corner-bottom-right::after {
  width: 40px;
  height: 3px;
  bottom: 0;
  right: 0;
}

/* Overlay-Ebenen */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(0, 20, 10, 0.85) 100%, 
    rgba(0, 30, 20, 0.8) 50%, 
    rgba(0, 40, 30, 0.9) 100%
  );
  z-index: 1;
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');
  pointer-events: none;
  z-index: 2;
  opacity: 0.1;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(to right, rgba(0, 180, 120, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 180, 120, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 3;
  opacity: 0.5;
  pointer-events: none;
}

.horizontal-scan {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 214, 161, 0.7) 50%, transparent 100%);
  box-shadow: 0 0 15px 2px rgba(0, 214, 161, 0.4);
  z-index: 4;
  top: 0;
  opacity: 0.6;
  pointer-events: none;
  animation: horizontalScan 8s linear infinite;
}

.vertical-scan {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 180, 120, 0.7) 50%, transparent 100%);
  box-shadow: 0 0 15px 2px rgba(0, 180, 120, 0.4);
  z-index: 4;
  left: 0;
  opacity: 0.4;
  pointer-events: none;
  animation: verticalScan 12s linear infinite;
}

/* Content-Container */
.content-container {
  position: relative;
  z-index: 5;
  width: 90%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  transform: translateY(40px);
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-loaded .content-container {
  transform: translateY(0);
  opacity: 1;
}

/* Header-Bereich */
.header-area {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}

.logo-container {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(0, 20, 12, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 180, 120, 0.3);
  box-shadow: 0 0 15px rgba(0, 214, 161, 0.2);
  transition: all 0.5s ease;
}

.logo-container:hover {
  border-color: rgba(0, 214, 161, 0.7);
  box-shadow: 0 0 25px rgba(0, 214, 161, 0.4);
}

.logo-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(0, 214, 161, 0.2) 0%, transparent 70%);
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.logo-glow.hovered {
  opacity: 0.7;
}

.logo {
  font-weight: 700;
  font-size: 22px;
  color: #e8f4ef;
  text-shadow: 0 0 10px rgba(0, 214, 161, 0.6);
  z-index: 1;
}

.title-section {
  margin-left: 24px;
}

.main-title {
  font-size: 2.8rem;
  letter-spacing: 2px;
  margin: 0;
  background: linear-gradient(90deg, #00d6a1 0%, #009e78 50%, #00ffc2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 214, 161, 0.3);
}

.title-underline {
  height: 2px;
  width: 180px;
  margin: 8px 0;
  background: linear-gradient(90deg, #00d6a1 0%, #006e4a 100%);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.title-underline::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 214, 161, 0.7), transparent);
  animation: slideRight 3s infinite;
}

.subtitle {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: rgba(232, 244, 239, 0.7);
  margin: 10px 0 0 0;
}

/* Haupt-Display-Bereich */
.display-container {
  display: flex;
  gap: 30px;
  height: 450px;
}

.display-sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar-nav {
  background: rgba(0, 20, 12, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(0, 180, 120, 0.2);
  padding: 16px;
  backdrop-filter: blur(8px);
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 8px 0;
  border-radius: 8px;
  font-weight: 500;
  position: relative;
}

.nav-item:hover {
  background: rgba(0, 214, 161, 0.1);
}

.nav-item.active {
  background: rgba(0, 214, 161, 0.15);
}

.nav-indicator {
  width: 4px;
  height: 0;
  background: #00d6a1;
  border-radius: 2px;
  margin-right: 12px;
  transition: height 0.3s ease;
}

.nav-item.active .nav-indicator {
  height: 20px;
}

.stat-container {
  flex-grow: 1;
  background: rgba(0, 20, 12, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(0, 180, 120, 0.2);
  padding: 16px;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 0.8rem;
  letter-spacing: 2px;
  margin: 0 0 20px 0;
  color: rgba(232, 244, 239, 0.6);
}

.stat-item {
  margin-bottom: 20px;
}

.stat-label {
  font-size: 0.85rem;
  margin-bottom: 6px;
  color: rgba(232, 244, 239, 0.9);
}

.stat-bar {
  height: 8px;
  background: rgba(0, 214, 161, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.stat-value {
  height: 100%;
  background: linear-gradient(90deg, #006e4a 0%, #00d6a1 100%);
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  width: 0;
}

.is-loaded .stat-value {
  /* Wird durch inline-style überschrieben */
}

.stat-percentage {
  font-size: 0.8rem;
  color: rgba(232, 244, 239, 0.7);
  display: flex;
  justify-content: flex-end;
}

.main-display {
  flex-grow: 1;
  position: relative;
  background: rgba(0, 20, 12, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(0, 180, 120, 0.2);
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 214, 161, 0.1);
  display: flex;
  flex-direction: column;
}

/* Display-Ecken */
.display-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 1;
}

.display-corner::before, .display-corner::after {
  content: '';
  position: absolute;
  background: linear-gradient(135deg, #00805a 0%, #00d6a1 100%);
}

.display-corner-tl {
  top: 0;
  left: 0;
}

.display-corner-tl::before {
  width: 3px;
  height: 15px;
  top: 0;
  left: 0;
}

.display-corner-tl::after {
  width: 15px;
  height: 3px;
  top: 0;
  left: 0;
}

.display-corner-tr {
  top: 0;
  right: 0;
}

.display-corner-tr::before {
  width: 3px;
  height: 15px;
  top: 0;
  right: 0;
}

.display-corner-tr::after {
  width: 15px;
  height: 3px;
  top: 0;
  right: 0;
}

.display-corner-bl {
  bottom: 0;
  left: 0;
}

.display-corner-bl::before {
  width: 3px;
  height: 15px;
  bottom: 0;
  left: 0;
}

.display-corner-bl::after {
  width: 15px;
  height: 3px;
  bottom: 0;
  left: 0;
}

.display-corner-br {
  bottom: 0;
  right: 0;
}

.display-corner-br::before {
  width: 3px;
  height: 15px;
  bottom: 0;
  right: 0;
}

.display-corner-br::after {
  width: 15px;
  height: 3px;
  bottom: 0;
  right: 0;
}

.data-visualization {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
}

.model-viewer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.car-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.8s ease;
}

.car-image-container:hover .car-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(0, 30, 20, 0.7) 0%, 
    rgba(0, 50, 35, 0.5) 50%, 
    rgba(0, 100, 70, 0.3) 100%
  );
  z-index: 2;
}

.model-highlight {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 150px;
  background: radial-gradient(ellipse at center, rgba(0, 214, 161, 0.2) 0%, transparent 70%);
  filter: blur(10px);
  z-index: 3;
  animation: pulseHighlight 5s infinite alternate;
}

.hexagon-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}

.hexagon {
  position: absolute;
  width: 40px;
  height: 40px;
  background: 
    linear-gradient(
      120deg, 
      transparent 25%, 
      rgba(0, 214, 161, 0.05) 25%, 
      rgba(0, 214, 161, 0.05) 75%, 
      transparent 75%
    );
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  opacity: 0.5;
  animation: fadeHexagon 4s infinite alternate;
}

.data-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.data-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(0, 214, 161, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 214, 161, 0.6);
  opacity: 0;
  animation: fadePoint 2s forwards;
}

.point-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 214, 161, 0.5);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.point-line {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 214, 161, 0.9) 0%, transparent 100%);
  transform-origin: left center;
}

.display-info {
  height: 120px;
  padding: 20px;
  background: rgba(0, 20, 12, 0.8);
  border-top: 1px solid rgba(0, 180, 120, 0.2);
}

.info-title {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #00d6a1;
}

.info-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(232, 244, 239, 0.8);
}

/* Action-Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 20, 12, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  padding: 5px 20px;
  border: 1px solid rgba(0, 180, 120, 0.2);
  margin-top: 5rem;
}

.action-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-light {
  width: 8px;
  height: 8px;
  background: #00d6a1;
  border-radius: 50%;
  box-shadow: 0 0 10px #00d6a1;
  animation: blink 2s infinite;
}

.status-text {
  font-size: 0.9rem;
  letter-spacing: 1px;
  color: rgba(232, 244, 239, 0.7);
}

.action-button {
  background: linear-gradient(90deg, #006e4a 0%, #00d6a1 100%);
  border: none;
  border-radius: 50px;
  padding: 12px 30px;
  color: #e8f4ef;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 20px rgba(0, 214, 161, 0.3);
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 214, 161, 0.5);
}

.button-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.action-button:hover .button-icon {
  transform: translate(3px, -3px);
}

/* Animationen */
@keyframes horizontalScan {
  0% {
    top: -10px;
  }
  100% {
    top: calc(100% + 10px);
  }
}

@keyframes verticalScan {
  0% {
    left: -10px;
  }
  100% {
    left: calc(100% + 10px);
  }
}

@keyframes slideRight {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadePoint {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeHexagon {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.7;
  }
}

@keyframes pulseHighlight {
  0% {
    opacity: 0.2;
    width: 300px;
  }
  100% {
    opacity: 0.4;
    width: 350px;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.4rem;
  }
  
  .display-container {
    flex-direction: column;
    height: auto;
  }
  
  .display-sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .sidebar-nav {
    flex: 1 1 100%;
  }
  
  .stat-container {
    flex: 1 1 100%;
  }
  
  .main-display {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .header-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .title-section {
    margin-left: 0;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .display-sidebar {
    flex-direction: column;
  }
  
  .action-bar {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .nav-item {
    padding: 10px;
  }
  
  .action-bar {
    border-radius: 20px;
  }
}
</style>