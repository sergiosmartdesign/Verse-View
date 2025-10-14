import * as THREE from 'three';
import gsap from 'gsap';
import { Back } from 'gsap';

// =============================================================================
// VADER THEME CONFIGURATION
// =============================================================================
// This file contains all customizable properties for the Vader theme.
// Edit these values to change the appearance and behavior of the Vader theme.
//
// IMPORTANT: Changes here only affect the Vader theme, not other themes.
// Save this file and the changes will apply immediately via hot reload.
//
// COLOR OPTIONS: Use hex (#FF0000), rgb(255,0,0), or named colors (red)
// FONT WEIGHTS: normal, bold, or numbers 100-900
// POSITIONS: Use px, %, vh, vw, or calc() expressions
// =============================================================================

export const vaderTheme = {
  // Theme identification (DO NOT EDIT)
  themeId: 'vader',
  displayName: 'Vader',

  // Page metadata - Controls browser title and favicon
  pageTitle: 'I find your lack of faith disturbing.',
  favicon: '/svg/vaderfav.svg',

  // Global styling properties - Used as fallbacks for component-specific settings
  colors: {
    background: '#000000',       // Page background color
    primary: '#FF0000',          // Primary accent color (red)
    accent: '#8B0000',           // Secondary accent color (dark red)
  },
  font: {
    family: "'Arial Black', sans-serif", // Global font family fallback
    size: '16px',               // Global font size fallback
  },

  // =============================================================================
  // SEARCH BAR CUSTOMIZATION
  // =============================================================================
  // Customize the search bar appearance, position, and behavior.
  // All properties are optional - themes without these properties use defaults.
  // =============================================================================
  searchBar: {
    // Container styling - Controls the overall search bar positioning
    container: {
      position: {
        top: 'calc(40% + 300px)', // Position from top (can use calc() for relative positioning)
        left: '50%',               // Horizontal centering
      },
      zIndex: 1000,               // Stacking order (higher = on top)
      textAlign: 'center',        // Text alignment within container
    },

    // Input field styling - Controls the appearance of the text input box
    input: {
      // Size dimensions
      size: {
        width: '400px',           // Input width (px, %, vw, etc.)
        height: '20px',          // Input height (px, %, vh, etc.)
        mobileWidth: '80vw',      // Width on mobile devices
      },
      // Shape and borders
      shape: {
        borderRadius: '0px',      // Corner rounding (0px = sharp corners)
      },
      // Background appearance
      background: {
        color: 'rgba(255, 0, 0, 0.1)', // Background color with transparency
      },
      // Border styling
      border: {
        width: '1px',             // Border thickness
        color: '#FF0000',         // Border color (hex, rgb, named colors)
        style: 'solid',           // Border style (solid, dashed, dotted)
      },
      // Text appearance inside the input
      text: {
        color: '#f1830eff',         // Text color (EDIT THIS to change text color)
        fontFamily: "'Impact', 'Arial Black', sans-serif", // Font family stack
        fontSize: '14px',         // Font size (EDIT THIS to change size)
        fontWeight: 'normal',
        letterSpacing: '2px',       // Font weight (normal, bold, 100-900)
        verticalAlign: 'baseline', // Vertical text alignment
      },
      // Visual effects
      effects: {
        boxShadow: 'none',        // Drop shadows (none = no shadow)
        transition: 'all 0.3s',   // Animation timing for hover/focus
      },
    },

    // Placeholder text styling - Controls the typing animation text
    placeholder: {
      text: {
        color: '#f1830eff',
        fontWeight: 'normal'         // Placeholder text color
      },
      position: {
        top: '5px',              // Vertical offset for placeholder text
      },
      animation: {
        initialText: 'Search... and together we can rule this browser...', // Final text after animation
        phrases: [                // Array of phrases for typing animation
          "The Force is strong with this one.",
          "I find your lack of keywords disturbing.",
          "There is no escape from my search algorithm.",
          "The Dark Side of the web holds the answers you seek."
        ],
        typingSpeed: 40,         // Characters per second in animation
      },
    },

    // Icon styling - Controls the Vader helmet icon appearance and position
    icon: {
      svg: './svg/Vader.svg',     // Path to icon SVG file
      position: 'above',         // 'above', 'inline', or 'below' the input
      size: {
        width: '80px',           // Icon width
        height: '80px',          // Icon height
      },
      effects: {
        filter: 'drop-shadow(0 0 4px #58059cff) drop-shadow(0 0 12px #58059cff)', // Glow effect
        opacity: { initial: 0, visible: 1 },     // Fade in animation
        transform: { initial: 'scale(0.3)', visible: 'scale(1)' }, // Scale animation
        transition: 'all 0.8s ease-out',        // Animation timing
      },
    },

    // Load animation - Controls when and how elements appear
    loadAnimation: {
      searchBarDelay: 14000,      // Delay before search bar appears (ms)
      iconDelay: 800,             // Delay before icon appears after search bar (ms)
      effects: {
        opacity: { initial: 0, visible: 1 }, // Fade in from transparent
        transform: { initial: 'scale(0.1)', visible: 'scale(1)' },
        transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',   // Animation timing curve
      },
    },
  },

  // Logic
  backgroundAnimation: {
    animationFrameId: null,
    theme: null, // Referencia al tema para acceder a otras capas

    async loadSvgTexture(svgPath) {
      try {
        const img = new Image();
        // Use relative paths that work in both development and production
        img.src = svgPath.startsWith('./') ? svgPath : `./${svgPath.replace(/^\//, '')}`;
        return new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = (error) => {
            console.warn(`Failed to load SVG texture from ${svgPath}:`, error);
            reject(error);
          };
        });
      } catch (error) {
        console.warn(`Failed to load SVG texture from ${svgPath}:`, error);
        return null;
      }
    },

    init: async function(canvas, theme) {
      this.theme = theme; // Guardamos la referencia al tema

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1);

      const svgResults = await Promise.allSettled([
        this.loadSvgTexture('./svg/gas-planet.svg'),
        this.loadSvgTexture('./svg/rocky-planet.svg'),
        this.loadSvgTexture('./svg/star-killer.svg')
      ]);

      // Extract successful results, use null for failed loads
      const gasPlanetSvg = svgResults[0].status === 'fulfilled' ? svgResults[0].value : null;
      const rockyPlanetSvg = svgResults[1].status === 'fulfilled' ? svgResults[1].value : null;
      const deathStarSvg = svgResults[2].status === 'fulfilled' ? svgResults[2].value : null;
      const rockyCanvas = document.createElement('canvas');
      rockyCanvas.width = 512; rockyCanvas.height = 256;
      const rockyCtx = rockyCanvas.getContext('2d');
      for (let i = 0; i < 2940; i++) { const x = Math.random() * 512; const y = Math.random() * 256; rockyCtx.fillStyle = `rgb(100, 100, 100)`; rockyCtx.fillRect(x, y, 2, 2); }
      for (let i = 0; i < 3000; i++) { const x = Math.random() * 512; const y = Math.random() * 256; const alpha = Math.random() * 0.3 + 0.1; rockyCtx.fillStyle = Math.random() > 0.5 ? `rgba(255, 255, 0, ${alpha})` : `rgba(255, 100, 0, ${alpha})`; rockyCtx.fillRect(x, y, 3, 3); }
      if (rockyPlanetSvg) { rockyCtx.globalAlpha = 0.3; rockyCtx.globalCompositeOperation = 'multiply'; rockyCtx.drawImage(rockyPlanetSvg, 0, 0, 512, 256); rockyCtx.globalAlpha = 1.0; rockyCtx.globalCompositeOperation = 'source-over'; }
      const rockyTexture = new THREE.CanvasTexture(rockyCanvas);
      const gasCanvas = document.createElement('canvas');
      gasCanvas.width = 512; gasCanvas.height = 256;
      const gasCtx = gasCanvas.getContext('2d');
      if (gasPlanetSvg) { gasCtx.drawImage(gasPlanetSvg, 0, 0, 512, 256); }
      const gasTexture = new THREE.CanvasTexture(gasCanvas);
      const deathStarCanvas = document.createElement('canvas');
      deathStarCanvas.width = 1024;
      deathStarCanvas.height = 512;
      const deathStarCtx = deathStarCanvas.getContext('2d');
      deathStarCtx.fillStyle = '#222222';
      deathStarCtx.fillRect(0, 0, 1024, 512);
      if (deathStarSvg) {
        deathStarCtx.drawImage(deathStarSvg, 0, 0, 1024, 512);
      }
      const deathStarTexture = new THREE.CanvasTexture(deathStarCanvas);
      
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      const planetGeometry = new THREE.SphereGeometry(50, 32, 32);
      const planetMaterial1 = new THREE.MeshLambertMaterial({ map: rockyTexture });
      const planet1 = new THREE.Mesh(planetGeometry, planetMaterial1);
      planet1.position.set(500, 200, -800);
      scene.add(planet1);
      const planetMaterial2 = new THREE.MeshLambertMaterial({ map: gasTexture });
      const planet2 = new THREE.Mesh(planetGeometry, planetMaterial2);
      planet2.position.set(-300, -100, -600);
      scene.add(planet2);
      const deathStarGeometry = new THREE.SphereGeometry(300, 64, 64);
      const deathStarMaterial = new THREE.MeshLambertMaterial({ map: deathStarTexture, transparent: true, opacity: 0 });
      const deathStar = new THREE.Mesh(deathStarGeometry, deathStarMaterial);
      deathStar.scale.set(0.1, 0.1, 0.1); // 1. Establecemos la escala inicial a un valor pequeño
      scene.add(deathStar);
      const starCount = 5000;
      const starPositions = []; 
      const lineVertices = new Float32Array(starCount * 6); 
      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 4000;
        const z = (Math.random() - 0.5) * 4000;
        starPositions.push({ x, y, z, velocity: 0 });
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3));
      const starMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
      const starField = new THREE.LineSegments(starGeometry, starMaterial);
      scene.add(starField);
      
      camera.position.z = 1000;
      
      let cameraSpeed = { value: 0.5 };
      let phase = 'static';
      let phaseStartTime = Date.now();
      let sphereComputed = false;
      let orbitAngle = 0;
      let orbitInitialized = false;

      function animate() {
        this.animationFrameId = requestAnimationFrame(animate.bind(this));
        
        const currentTime = Date.now();
        const elapsed = (currentTime - phaseStartTime) / 1000;
        
        if (phase === 'static' && elapsed > 6) {
            phase = 'jump';
            phaseStartTime = currentTime;
            
            gsap.to(planet1.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.5, onComplete: () => planet1.visible = false });
            gsap.to(planet2.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.5, onComplete: () => planet2.visible = false });
            gsap.to(starMaterial.color, { r: 0.5, g: 0.7, b: 1.0, duration: 3.0 });
            gsap.to(cameraSpeed, { value: 20, duration: 3.0 });

            // Inicia la animación del vórtice
            // 2. A los 6 segundos, empieza el fade in
            this.theme.vortexLayer.animation.fadeIn();
            this.theme.vortexLayer.animation.setSpeed('jump'); // Cambia a velocidad rápida
        }

        if (phase === 'jump') {
            if (elapsed > 3.5 && !sphereComputed) {
                starGeometry.computeBoundingSphere();
                
                // Inicia el fade intermedio a mitad del salto
                this.theme.vortexLayer.animation.fadeIntermedio();

                sphereComputed = true;
            }
            if (elapsed > 7) {
                phase = 'arrival';
                phaseStartTime = currentTime;
                
                deathStar.position.set(camera.position.x + 100, camera.position.y + 50, camera.position.z - 4875);
                for(const star of starPositions) { star.velocity = 0; star.x = (Math.random() - 0.5) * 4000 + camera.position.x; star.y = (Math.random() - 0.5) * 4000 + camera.position.y; star.z = camera.position.z - Math.random() * 4000; }
                starGeometry.computeBoundingSphere();

                gsap.to(cameraSpeed, { value: 0, duration: 3.0, ease: 'power2.out' });
                gsap.to(starMaterial.color, { r: 1.0, g: 1.0, b: 1.0, duration: 3.0 });
                gsap.to(deathStar.material, { opacity: 1, duration: 3.0 });
                
                // 2. Añadimos la animación de escala para que crezca hasta su tamaño normal
                gsap.to(deathStar.scale, { x: 1, y: 1, z: 1, duration: 3.5, ease: 'power2.out' });

                // Desvanece el vórtice
                this.theme.vortexLayer.animation.fadeOut(); // 3. Inicia el fade out
                this.theme.vortexLayer.animation.setSpeed('final'); // Cambia a velocidad lenta
            }
        }
        
        if (phase === 'arrival' && elapsed > 3) {
            phase = 'travel'; // 1. Cambiamos a la nueva fase 'travel' en lugar de 'final'
            phaseStartTime = currentTime;
            gsap.killTweensOf(cameraSpeed);
            cameraSpeed.value = 0; 
        }
        
        // 2. Se añade la lógica para la nueva fase 'travel'
        if (phase === 'travel') {
            // Durante esta fase, la cámara puede tener un movimiento muy sutil
            camera.position.z -= 0.1;
            
            // Llama a la animación de viaje del caza TIE (solo la primera vez)
            if (!this.theme.overlayLayer.animation.travelTimeline)
                this.theme.overlayLayer.animation.travelAnimation();

            if (elapsed > 5) { // Duración de la fase 'travel' de 5 segundos
                phase = 'final'; // 3. Después de 5s, pasamos a la fase final de órbita
            }
        }

        if (phase !== 'final') {
          camera.position.z -= cameraSpeed.value;
        }
        if (phase === 'static') {
            planet1.rotation.y += 0.005;
            planet2.rotation.y += 0.003;
        }
        if (phase === 'final') {
            deathStar.rotation.y += 0.001;
            if (!orbitInitialized) {
                orbitAngle = Math.atan2(camera.position.x - deathStar.position.x, camera.position.z - deathStar.position.z);
                orbitInitialized = true;
            }
            const orbitRadius = 4875;
            const orbitSpeed = -0.00002;
            orbitAngle += orbitSpeed;
            camera.position.x = deathStar.position.x + Math.sin(orbitAngle) * orbitRadius;
            camera.position.z = deathStar.position.z + Math.cos(orbitAngle) * orbitRadius;
            camera.lookAt(deathStar.position);
        }
        
        const currentLineVertices = starGeometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
            const star = starPositions[i];
            if (phase === 'jump') { star.velocity += 2; }
            else if (phase === 'arrival') { star.velocity *= 0.95; }
            else if (phase === 'final') { star.velocity = 0; }
            star.z += star.velocity;
            let lineLength = 2;
            if (phase === 'jump') { lineLength += star.velocity * 11; }
            const i6 = i * 6;
            currentLineVertices[i6] = star.x; currentLineVertices[i6 + 1] = star.y; currentLineVertices[i6 + 2] = star.z;
            currentLineVertices[i6 + 3] = star.x; currentLineVertices[i6 + 4] = star.y; currentLineVertices[i6 + 5] = star.z - lineLength;
            if (star.z > camera.position.z) {
                star.z = camera.position.z - 4000;
                star.x = (Math.random() - 0.5) * 4000 + camera.position.x;
                star.y = (Math.random() - 0.5) * 4000 + camera.position.y;
                if (phase === 'jump') { star.velocity = Math.random() * 10 + 5; }
                else { star.velocity = 0; }
            }
        }
        starGeometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
      }
      
      this.scene = scene;
      this.renderer = renderer;
      
      animate.bind(this)();
    },

    destroy: function() {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      
      if (this.scene) {
        this.scene.traverse(object => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
      }
      if (this.renderer) this.renderer.dispose();
    }
  },

  overlayLayer: {
    type: 'dotlottie-vue',
    lottieSrc: 'https://lottie.host/7929d64a-c983-4efb-a55c-ca3574d390f1/IFELBomFxB.lottie',
    animation: {
      introTimeline: null,
      rotationTimeline: null,
      vibrationTimeline: null,
      joltsTimeline: null,
      travelTimeline: null,
      element: null,

      init: function(element, theme) {
        if (!element) return;
        this.element = element;

        // Apply GSAP animations to the Lottie container for cockpit effects
        this.introTimeline = gsap.fromTo(element,
          { opacity: 0, scale: 1.1 },
          {
            opacity: 0.8,
            scale: 1,
            duration: 2.5,
            ease: 'power2.out',
            onComplete: () => {
              this.startRotationAnimation(element);
            }
          }
        );
      },

      startRotationAnimation: function(containerElement) {
        gsap.set(containerElement, { transformOrigin: '50% 50%' });

        this.rotationTimeline = gsap.to(containerElement, {
          rotation: 2.5,
          duration: 1.25,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
          onComplete: () => {
            this.startVibrationAnimation(containerElement);
          }
        });
      },

      startVibrationAnimation: function(containerElement) {
        this.vibrationTimeline = gsap.to(containerElement, {
          x: () => gsap.utils.random(-5, 5),
          y: () => gsap.utils.random(-5, 5),
          rotation: () => gsap.utils.random(-0.8, 0.8),
          duration: 0.05,
          repeat: -1,
          ease: 'none'
        });

        this.joltsTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.9
        }).to(containerElement, {
          x: () => gsap.utils.random(-6, 8),
          y: () => gsap.utils.random(-8,6),
          duration: 0.04,
          ease: 'power4.inOut'
        });

        gsap.delayedCall(4.5, () => {
          if (this.vibrationTimeline) this.vibrationTimeline.kill();
          if (this.joltsTimeline) this.joltsTimeline.kill();

          gsap.to(containerElement, {
            duration: 5,
            x: 1,
            y: -1,
            rotation: 0,
            scale: 0.95,
            ease: Back.easeOut.config(2),
            onComplete: () => {
                  gsap.to(containerElement, { scale: 1, duration: 0.5, ease: 'power1.out' });
            }
          });
        });
      },

      // Travel animation called by backgroundAnimation during 'travel' phase
      travelAnimation: function() {
        if (!this.element) return;

        this.travelTimeline = gsap.to(this.element, {
          rotation: 2.5,
          duration: 3,
          yoyo: true,
          repeat: 3,
          ease: 'sine.inOut'
        });
      },

      destroy: function(element) {
        if (this.introTimeline) this.introTimeline.kill();
        if (this.rotationTimeline) this.rotationTimeline.kill();
        if (this.vibrationTimeline) this.vibrationTimeline.kill();
        if (this.joltsTimeline) this.joltsTimeline.kill();
        if (this.travelTimeline) this.travelTimeline.kill();
        gsap.killTweensOf(this.startVibrationAnimation);
        gsap.killTweensOf(element);
      }
    }
  },

  vortexLayer: {
    type: 'svg',
    styles: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100vmax', // Usa vmax para asegurar que cubra la pantalla en cualquier orientación
      height: '100vmax',
      transform: 'translate(-50%, -50%)',
      'z-index': 5, // Detrás del caza TIE (10), delante del fondo 3D (-1)
      'pointer-events': 'none',
      opacity: 0, // Empieza invisible
      'mix-blend-mode': 'screen', // Blend mode para un efecto más integrado
    },
    async loadSvgContent(svgPath) {
      try {
        // Use relative paths that work in both development and production
        const resolvedPath = svgPath.startsWith('./') ? svgPath : `./${svgPath.replace(/^\//, '')}`;
        const response = await fetch(resolvedPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
      } catch (error) {
        console.error(`Failed to fetch SVG content from ${svgPath}:`, error);
        return null;
      }
    },
    animation: {
      element: null, // Referencia al elemento del DOM
      rotationTimeline: null,
      // Objeto para controlar las velocidades en cada fase
      speeds: {
        initial: 0.01, // Velocidad inicial 
        jump: 0.5,     // Velocidad media
        final: 0.98    // Velocidad final
      },

      init: async function(element, theme) {
        if (!element) return;
        this.element = element; // Guardamos la referencia al elemento
        
        const svgContent = await theme.vortexLayer.loadSvgContent('./svg/vortex.svg');
        if (svgContent) {
          this.element.innerHTML = svgContent;
          const svgElement = this.element.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            // Asegura que el SVG se escale correctamente sin deformarse
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');

            // 1. El SVG empieza a girar inmediatamente pero de forma invisible
            this.startRotation();
          }
        }
      },

      fadeIn: function() {
        if (!this.element) return;
        // Ajuste: Fade in más rápido a una opacidad mayor
        gsap.to(this.element, { opacity: 0.3, duration: 6, ease: 'power2.out' });
      },

      // Nuevo: Fade intermedio para variar la opacidad durante el salto
      fadeIntermedio: function() {
        if (!this.element) return;
        gsap.to(this.element, { opacity: 0.2, duration: 7, ease: 'power2.inOut' });
      },

      fadeOut: function() {
        if (!this.element) return;
        // Ajuste: Fade out un poco más largo para una transición más suave
        gsap.to(this.element, { opacity: 0, duration: 0, ease: 'power2.inOut' });
      },

      startRotation: function() {
        if (!this.element) return;
        // Asegura que la rotación tenga como eje el centro del elemento
        gsap.set(this.element, { transformOrigin: '50% 50%' });
        // La duración inicial se establece con la velocidad 'initial'
        this.rotationTimeline = gsap.to(this.element, { rotation: 360, duration: this.speeds.initial,
          repeat: -1, // Repetir indefinidamente
          ease: 'none'
        });
      },

      // Nueva función para cambiar la velocidad de la rotación
      setSpeed: function(phase) {
        if (this.rotationTimeline && this.speeds[phase]) {
          gsap.to(this.rotationTimeline, { duration: 0.5, timeScale: this.speeds.initial / this.speeds[phase] });
        }
      },

      destroy: function() {
        if (this.rotationTimeline) this.rotationTimeline.kill();
        if (this.element) {
          gsap.killTweensOf(this.element);
          this.element.innerHTML = '';
        }
      }
    }
  },

  // =============================================================================
  // ICON LAYER CUSTOMIZATION
  // =============================================================================
  // Esta capa muestra un SVG que parpadea antes de que aparezca la barra de búsqueda.
  // =============================================================================
  iconLayer: {
    type: 'svg',
    styles: {
      // Posición y tamaño del SVG
      position: 'absolute',
      top: 'calc(40% + 200px)', // Coincide con la barra de búsqueda
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200px', // Ancho del SVG
      'z-index': 1001, // Por encima de la barra de búsqueda
      'pointer-events': 'none',
      opacity: 0, // Empieza invisible
    },
    async loadSvgContent(svgPath) {
      try {
        const response = await fetch(svgPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
      } catch (error) {
        console.error(`Failed to fetch SVG content from ${svgPath}:`, error);
        return null;
      }
    },
    animation: {
      element: null,
      blinkingTimeline: null,

      // --- PARÁMETROS DE ANIMACIÓN CUSTOMIZABLES ---
      svgPath: './svg/search-vader.svg', // Ruta a tu nuevo SVG
      
      // Temporización
      startTime: 3000, // (ms) Cuándo empieza a aparecer (después del inicio)
      disappearOffset: 200, // (ms) Cuánto tiempo antes de la searchBar debe desaparecer

      // Efectos de entrada y salida
      fadeIn: { duration: 0.5, ease: 'power1.out' },
      fadeOut: { duration: 0.1, ease: 'power1.in' },

      // Efecto de parpadeo
      blinking: {
        opacity: 0.4, // Opacidad mínima del parpadeo
        duration: 0.2, // Duración de cada parpadeo
        ease: 'power1.inOut',
      },
      // --- FIN DE PARÁMETROS ---

      init: async function(element, theme) {
        if (!element) return;
        this.element = element;
        
        const svgContent = await theme.iconLayer.loadSvgContent(this.svgPath);
        if (svgContent) {
          element.innerHTML = svgContent;
        }

        // 2. Definir la animación de parpadeo
        this.blinkingTimeline = gsap.timeline({ paused: true, repeat: -1, yoyo: true })
          .to(element, { 
            opacity: this.blinking.opacity, 
            duration: this.blinking.duration, 
            ease: this.blinking.ease 
          });

        // 3. Programar el inicio de la animación
        gsap.delayedCall(this.startTime / 1000, () => {
          gsap.to(element, { opacity: 1, duration: this.fadeIn.duration, ease: this.fadeIn.ease });
          this.blinkingTimeline.play();
        });

        // 4. Programar el final de la animación
        const searchBarDelay = theme.searchBar.loadAnimation.searchBarDelay;
        const endTime = (searchBarDelay - this.disappearOffset) / 1000;
        
        gsap.delayedCall(endTime, () => {
          this.blinkingTimeline.kill();
          gsap.to(element, { opacity: 0, duration: this.fadeOut.duration, ease: this.fadeOut.ease });
        });
      },

      destroy: function() {
        if (this.blinkingTimeline) this.blinkingTimeline.kill();
        gsap.killTweensOf(this.element);
      }
    }
  },

  additionalElements: []
};
