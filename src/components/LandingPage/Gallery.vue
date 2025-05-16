<script setup>
import { ref, onMounted, computed } from 'vue'

// Galerie-Daten
const gallery = ref([
  { 
    id: 1, 
    title: 'QUANTUM DRIVE', 
    category: 'PROTOTYPE', 
    year: '2045',
    image: 'https://cdn.pixabay.com/photo/2023/01/07/21/31/car-7704144_960_720.jpg' 
  },
  { 
    id: 2, 
    title: 'NEON HORIZON', 
    category: 'CONCEPT', 
    year: '2042',
    image: 'https://cdn.pixabay.com/photo/2016/04/01/12/16/car-1300629_1280.png' 
  },
  { 
    id: 3, 
    title: 'ECLIPSE X9', 
    category: 'PRODUCTION', 
    year: '2041',
    image: 'https://ecomento.de/wp-content/uploads/2021/05/Lamborghini-Sian-Roadster.jpg' 
  },
  { 
    id: 4, 
    title: 'PHANTOM DRIVE', 
    category: 'EXPERIMENTAL', 
    year: '2046',
    image: 'https://www.motortrend.com/uploads/sites/11/2019/08/Lamborghini-Aventador-SVJ-V12-Engine.jpg?interpolation=lanczos-none&fit=around|660:348' 
  },
  { 
    id: 5, 
    title: 'STELLAR GT', 
    category: 'RACING', 
    year: '2043',
    image: 'https://www.topgear.com/sites/default/files/2023/08/P90492179_highRes_bmw-i7-xdrive60-m-sp%20%281%29.jpg' 
  },
  { 
    id: 6, 
    title: 'HYPERDRIVE X', 
    category: 'PROTOTYPE', 
    year: '2044',
    image: 'https://scontent-ber1-1.xx.fbcdn.net/v/t39.30808-6/485146804_10171247475360048_1864602488373211879_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=sig9M5qRHf8Q7kNvwG0U-cY&_nc_oc=AdlzI348D0tT8rXrYLI5_d1PXDsgy-6sOrWjTzz66qHE4r9KuvGcHRELiEAV3n072AoRP54R9vgKZf1Ykogq-T-o&_nc_zt=23&_nc_ht=scontent-ber1-1.xx&_nc_gid=yZBLuzTLRXwbnNz4gUWTZg&oh=00_AfK7ls2LRn2H4QndZxt6U2FGsEKk7wJ1v-bq6QmYvaNH2Q&oe=682BF33B' 
  }
])

// Aktiv ausgewähltes Galerieelement
const activeIndex = ref(0)
const isLoaded = ref(false)
const isPreviewOpen = ref(false)
const imageLoaded = ref(false)

// Wechselt das aktive Element
const setActiveItem = (index) => {
  activeIndex.value = index
}

// Öffnet die Vollbildvorschau
const openPreview = (index) => {
  activeIndex.value = index
  isPreviewOpen.value = true
  imageLoaded.value = false
  document.body.style.overflow = 'hidden' // Verhindert Scrollen
}

// Schließt die Vollbildvorschau
const closePreview = () => {
  isPreviewOpen.value = false
  document.body.style.overflow = 'auto' // Stellt Scrollen wieder her
}

// Nächstes oder vorheriges Bild in der Vorschau
const navigatePreview = (direction) => {
  imageLoaded.value = false
  let newIndex = activeIndex.value + direction
  if (newIndex < 0) newIndex = gallery.value.length - 1
  if (newIndex >= gallery.value.length) newIndex = 0
  activeIndex.value = newIndex
}

// Reagieren auf Tastatureingaben
const handleKeyDown = (e) => {
  if (!isPreviewOpen.value) return
  
  if (e.key === 'ArrowRight') navigatePreview(1)
  else if (e.key === 'ArrowLeft') navigatePreview(-1)
  else if (e.key === 'Escape') closePreview()
}

// Aktives Galerieelement
const activeItem = computed(() => {
  return gallery.value[activeIndex.value]
})

// Bildlademarkierung
const handleImageLoaded = () => {
  imageLoaded.value = true
}

onMounted(() => {
  // Tastenereignis hinzufügen
  window.addEventListener('keydown', handleKeyDown)
  
  // Verzögerter Start der Animationen
  setTimeout(() => {
    isLoaded.value = true
  }, 300)
  
  return () => {
    // Tastenereignis entfernen
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <div class="cyberpunk-gallery" :class="{ 'is-loaded': isLoaded }">
    <!-- Ecken mit Winkeln -->
    <div class="corner corner-top-left"></div>
    <div class="corner corner-top-right"></div>
    <div class="corner corner-bottom-left"></div>
    <div class="corner corner-bottom-right"></div>
    
    <!-- Overlay-Ebenen -->
    <div class="glitch-overlay"></div>
    <div class="gradient-overlay"></div>
    <div class="grid-overlay"></div>
    
    <!-- Scan-Effekte -->
    <div class="horizontal-scan"></div>
    <div class="vertical-scan"></div>
    
    <!-- Galerie-Header -->
    <div class="gallery-header">
      <div class="header-glow"></div>
      <h1 class="gallery-title">FUTURE <span class="accent-text">VISION</span> GALLERY</h1>
      <div class="tech-line"></div>
      <p class="gallery-subtitle">INNOVATION • DESIGN • TECHNOLOGY • EXCELLENCE</p>
    </div>
    
    <!-- Hauptgalerie-Grid -->
    <div class="gallery-grid">
      <div v-for="(item, index) in gallery" 
           :key="item.id" 
           class="gallery-item"
           :class="{ 'active': index === activeIndex }"
           @click="openPreview(index)">
        <div class="item-frame">
          <div class="frame-corner frame-corner-tl"></div>
          <div class="frame-corner frame-corner-tr"></div>
          <div class="frame-corner frame-corner-bl"></div>
          <div class="frame-corner frame-corner-br"></div>
          
          <div class="item-image-container">
            <img :src="item.image" :alt="item.title" class="item-image">
            <div class="item-overlay">
              <div class="item-details">
                <h3 class="item-title">{{ item.title }}</h3>
                <div class="item-meta">
                  <span class="item-category">{{ item.category }}</span>
                  <span class="item-year">{{ item.year }}</span>
                </div>
              </div>
              <div class="item-indicator">
                <div class="indicator-dot"></div>
                <div class="indicator-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Vollbild-Vorschau -->
    <div class="fullscreen-preview" v-if="isPreviewOpen" @click="closePreview">
      <div class="preview-content" @click.stop>
        <!-- Ecken im Vorschaufenster -->
        <div class="preview-corner preview-corner-tl"></div>
        <div class="preview-corner preview-corner-tr"></div>
        <div class="preview-corner preview-corner-bl"></div>
        <div class="preview-corner preview-corner-br"></div>
        
        <!-- Steuerungselemente -->
        <button class="preview-close" @click="closePreview">×</button>
        <button class="preview-nav preview-prev" @click.stop="navigatePreview(-1)">
          <span class="nav-arrow">‹</span>
        </button>
        <button class="preview-nav preview-next" @click.stop="navigatePreview(1)">
          <span class="nav-arrow">›</span>
        </button>
        
        <!-- Bild und Details -->
        <div class="preview-image-container">
          <img 
            :src="activeItem.image" 
            :alt="activeItem.title" 
            class="preview-image"
            :class="{ 'image-loaded': imageLoaded }"
            @load="handleImageLoaded"
          >
          <div class="loading-indicator" v-if="!imageLoaded">
            <div class="loading-spinner"></div>
          </div>
        </div>
        
        <div class="preview-details">
          <h2 class="preview-title">{{ activeItem.title }}</h2>
          <div class="preview-line"></div>
          <div class="preview-meta">
            <div class="meta-item">
              <span class="meta-label">KATEGORIE</span>
              <span class="meta-value">{{ activeItem.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">JAHR</span>
              <span class="meta-value">{{ activeItem.year }}</span>
            </div>
          </div>
          <div class="tech-specs">
            <div class="spec-item">
              <div class="spec-bar">
                <div class="spec-fill" :style="{ width: '85%' }"></div>
              </div>
              <span class="spec-label">PERFORMANCE</span>
            </div>
            <div class="spec-item">
              <div class="spec-bar">
                <div class="spec-fill" :style="{ width: '92%' }"></div>
              </div>
              <span class="spec-label">INNOVATION</span>
            </div>
            <div class="spec-item">
              <div class="spec-bar">
                <div class="spec-fill" :style="{ width: '78%' }"></div>
              </div>
              <span class="spec-label">EFFICIENCY</span>
            </div>
          </div>
        </div>
        
        <!-- Miniaturansicht unten -->
        <div class="preview-thumbnails">
          <div 
            v-for="(item, index) in gallery" 
            :key="item.id"
            class="thumbnail-item"
            :class="{ 'active': index === activeIndex }"
            @click.stop="setActiveItem(index)"
          >
            <img :src="item.image" :alt="item.title" class="thumbnail-image">
            <div class="thumbnail-highlight"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');

/* Basis-Setup */
.cyberpunk-gallery {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
  /* Hintergrundbild */
  background: url('https://cdn.pixabay.com/photo/2023/01/07/21/31/car-7704144_960_720.jpg') center center / cover no-repeat fixed;
}

/* Gestaltete Ecken mit 3px Breite und Apple-Farbverlauf */
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
  background: linear-gradient(135deg, #06f 0%, #9506f9 50%, #f60689 100%);
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
    rgba(6, 11, 40, 0.8) 0%, 
    rgba(22, 11, 46, 0.7) 50%, 
    rgba(37, 3, 51, 0.85) 100%
  );
  z-index: 1;
}

.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(99, 16, 207, 0.1) 1px, 
    transparent 1px
  ), 
  linear-gradient(
    90deg, 
    rgba(99, 16, 207, 0.1) 1px, 
    transparent 1px
  );
  background-size: 2px 2px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.2;
  animation: glitchEffect 8s infinite;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(to right, rgba(125, 71, 229, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(125, 71, 229, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 3;
  opacity: 0.4;
  pointer-events: none;
}

.horizontal-scan {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(125, 180, 255, 0.8) 50%, transparent 100%);
  box-shadow: 0 0 15px 2px rgba(70, 131, 255, 0.8);
  z-index: 4;
  top: 0;
  opacity: 0.7;
  pointer-events: none;
  animation: horizontalScan 8s linear infinite;
}

.vertical-scan {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(149, 66, 244, 0.8) 50%, transparent 100%);
  box-shadow: 0 0 15px 2px rgba(149, 66, 244, 0.7);
  z-index: 4;
  left: 0;
  opacity: 0.5;
  pointer-events: none;
  animation: verticalScan 12s linear infinite;
}

/* Galerie-Header */
.gallery-header {
  position: relative;
  z-index: 5;
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  transform: translateY(30px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-loaded .gallery-header {
  transform: translateY(0);
  opacity: 1;
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(125, 71, 229, 0.2) 0%, transparent 70%);
  z-index: -1;
  filter: blur(20px);
}

.gallery-title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #72bbff 0%, #a066f7 50%, #ff66c4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(70, 131, 255, 0.3);
}

.accent-text {
  color: #f60689;
  -webkit-text-fill-color: #f60689;
  text-shadow: 0 0 15px rgba(246, 6, 137, 0.5);
}

.tech-line {
  height: 2px;
  width: 180px;
  margin: 15px auto;
  background: linear-gradient(90deg, #06f 0%, #9506f9 100%);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.tech-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  animation: slideRight 3s infinite;
}

.gallery-subtitle {
  font-size: 1rem;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.7);
  margin: 10px 0 0 0;
}

/* Galerie-Grid */
.gallery-grid {
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  z-index: 5;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.3s;
}

.gallery-item {
  flex: 0 1 400px;
  max-width: 100%;
  margin-bottom: 0;
}

.is-loaded .gallery-grid {
  opacity: 1;
  transform: translateY(0);
}

/* Galerie-Elemente */
.gallery-item {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease;
}


.gallery-item:hover {
  transform: translateY(-5px) scale(1.02);
}

.gallery-item:hover .item-overlay {
  opacity: 1;
}

.gallery-item:hover .item-image {
  transform: scale(1.05);
}

.gallery-item:hover .indicator-dot {
  opacity: 0.9;
}

.gallery-item:hover .indicator-line {
  width: 30px;
}

.item-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(125, 71, 229, 0.3);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(125, 71, 229, 0.2);
}

/* Frame-Ecken */
.frame-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 2;
}

.frame-corner::before, .frame-corner::after {
  content: '';
  position: absolute;
  background: linear-gradient(135deg, #06f 0%, #9506f9 100%);
}

.frame-corner-tl {
  top: 0;
  left: 0;
}

.frame-corner-tl::before {
  width: 3px;
  height: 15px;
  top: 0;
  left: 0;
}

.frame-corner-tl::after {
  width: 15px;
  height: 3px;
  top: 0;
  left: 0;
}

.frame-corner-tr {
  top: 0;
  right: 0;
}

.frame-corner-tr::before {
  width: 3px;
  height: 15px;
  top: 0;
  right: 0;
}

.frame-corner-tr::after {
  width: 15px;
  height: 3px;
  top: 0;
  right: 0;
}

.frame-corner-bl {
  bottom: 0;
  left: 0;
}

.frame-corner-bl::before {
  width: 3px;
  height: 15px;
  bottom: 0;
  left: 0;
}

.frame-corner-bl::after {
  width: 15px;
  height: 3px;
  bottom: 0;
  left: 0;
}

.frame-corner-br {
  bottom: 0;
  right: 0;
}

.frame-corner-br::before {
  width: 3px;
  height: 15px;
  bottom: 0;
  right: 0;
}

.frame-corner-br::after {
  width: 15px;
  height: 3px;
  bottom: 0;
  right: 0;
}

.item-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(6, 11, 40, 0.8) 0%, rgba(6, 11, 40, 0.4) 50%, rgba(6, 11, 40, 0.2) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1;
}

.item-details {
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.gallery-item:hover .item-details {
  transform: translateY(0);
}

.item-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: white;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  opacity: 0.8;
}

.item-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 2;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  background: #f60689;
  border-radius: 50%;
  opacity: 0.5;
  box-shadow: 0 0 10px rgba(246, 6, 137, 0.8);
  transition: opacity 0.3s ease;
}

.indicator-line {
  height: 2px;
  width: 15px;
  background: linear-gradient(90deg, #f60689 0%, transparent 100%);
  margin-left: 5px;
  transition: width 0.3s ease;
}

/* Vollbild-Vorschau */
.fullscreen-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.preview-content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90%;
  max-height: 800px;
  background: rgba(10, 14, 40, 0.7);
  border: 1px solid rgba(125, 71, 229, 0.3);
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  padding: 20px;
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Vorschau-Ecken */
.preview-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
}

.preview-corner::before, .preview-corner::after {
  content: '';
  position: absolute;
  background: linear-gradient(135deg, #06f 0%, #9506f9 100%);
}

.preview-corner-tl {
  top: 0;
  left: 0;
}

.preview-corner-tl::before {
  width: 3px;
  height: 25px;
  top: 0;
  left: 0;
}

.preview-corner-tl::after {
  width: 25px;
  height: 3px;
  top: 0;
  left: 0;
}

.preview-corner-tr {
  top: 0;
  right: 0;
}

.preview-corner-tr::before {
  width: 3px;
  height: 25px;
  top: 0;
  right: 0;
}

.preview-corner-tr::after {
  width: 25px;
  height: 3px;
  top: 0;
  right: 0;
}

.preview-corner-bl {
  bottom: 0;
  left: 0;
}

.preview-corner-bl::before {
  width: 3px;
  height: 25px;
  bottom: 0;
  left: 0;
}

.preview-corner-bl::after {
  width: 25px;
  height: 3px;
  bottom: 0;
  left: 0;
}

.preview-corner-br {
  bottom: 0;
  right: 0;
}

.preview-corner-br::before {
  width: 3px;
  height: 25px;
  bottom: 0;
  right: 0;
}

.preview-corner-br::after {
  width: 25px;
  height: 3px;
  bottom: 0;
  right: 0;
}

/* Steuerungselemente */
.preview-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(10, 14, 40, 0.7);
  border: 1px solid rgba(125, 71, 229, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.preview-close:hover {
  background: rgba(125, 71, 229, 0.3);
  transform: scale(1.1);
}

.preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 80px;
  background: rgba(10, 14, 40, 0.4);
  border: 1px solid rgba(125, 71, 229, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.preview-prev {
  left: 10px;
  border-radius: 0 5px 5px 0;
}

.preview-next {
  right: 10px;
  border-radius: 5px 0 0 5px;
}

.preview-nav:hover {
  background: rgba(125, 71, 229, 0.3);
  width: 60px;
}

.nav-arrow {
  transition: transform 0.3s ease;
}

.preview-prev:hover .nav-arrow {
  transform: translateX(-5px);
}

.preview-next:hover .nav-arrow {
  transform: translateX(5px);
}

/* Vorschaubild */
.preview-image-container {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.preview-image.image-loaded {
  opacity: 1;
}

/* Ladeanimation */
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(125, 71, 229, 0.3);
  border-top-color: #f60689;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Details-Bereich */
.preview-details {
  grid-column: 2;
  grid-row: 1;
  padding: 20px;
  background: rgba(6, 11, 40, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(125, 71, 229, 0.2);
  display: flex;
  flex-direction: column;
}

.preview-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  background: linear-gradient(90deg, #72bbff 0%, #a066f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.preview-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, rgba(125, 71, 229, 0.8) 0%, transparent 100%);
  margin-bottom: 20px;
}

.preview-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.7rem;
  opacity: 0.7;
  letter-spacing: 1px;
}

.meta-value {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Technische Spezifikationen */
.tech-specs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: auto;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.spec-bar {
  height: 6px;
  width: 100%;
  background: rgba(125, 71, 229, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.spec-fill {
  height: 100%;
  background: linear-gradient(90deg, #06f 0%, #9506f9 100%);
  border-radius: 3px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.spec-label {
  font-size: 0.8rem;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
}

/* Miniaturansicht unten */
.preview-thumbnails {
  grid-column: 1 / 3;
  grid-row: 2;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 5px;
  scrollbar-width: thin;
  scrollbar-color: rgba(125, 71, 229, 0.5) rgba(10, 14, 40, 0.3);
}

.preview-thumbnails::-webkit-scrollbar {
  height: 6px;
}

.preview-thumbnails::-webkit-scrollbar-track {
  background: rgba(10, 14, 40, 0.3);
  border-radius: 3px;
}

.preview-thumbnails::-webkit-scrollbar-thumb {
  background: rgba(125, 71, 229, 0.5);
  border-radius: 3px;
}

.thumbnail-item {
  flex: 0 0 120px;
  height: 70px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-item:hover {
  transform: translateY(-2px);
}

.thumbnail-item.active {
  border-color: #f60689;
  box-shadow: 0 0 10px rgba(246, 6, 137, 0.5);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(125, 71, 229, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumbnail-item:hover .thumbnail-highlight,
.thumbnail-item.active .thumbnail-highlight {
  opacity: 1;
}

/* Animationen */
@keyframes glitchEffect {
  0%, 100% {
    opacity: 0.1;
    transform: translate(0, 0);
  }
  92%, 94% {
    opacity: 0.3;
    transform: translate(3px, 0);
  }
  93%, 95% {
    opacity: 0.3;
    transform: translate(-3px, 0);
  }
  96%, 98% {
    opacity: 0.3;
    transform: translate(0, 2px);
  }
  97%, 99% {
    opacity: 0.3;
    transform: translate(0, -2px);
  }
}

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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .gallery-title {
    font-size: 2.5rem;
  }
  
  .preview-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    overflow-y: auto;
    height: 95%;
  }
  
  .preview-image-container {
    grid-column: 1;
    grid-row: 1;
    height: 50vh;
  }
  
  .preview-details {
    grid-column: 1;
    grid-row: 2;
  }
  
  .preview-thumbnails {
    grid-column: 1;
    grid-row: 3;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .preview-nav {
    width: 40px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .preview-content {
    padding: 15px;
  }
  
  .preview-meta {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-title {
    font-size: 1.8rem;
  }
  
  .gallery-subtitle {
    font-size: 0.8rem;
  }
  
  .preview-thumbnails {
    gap: 5px;
  }
  
  .thumbnail-item {
    flex: 0 0 80px;
    height: 50px;
  }
}
</style>