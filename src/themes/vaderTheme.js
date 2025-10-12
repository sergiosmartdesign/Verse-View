import * as THREE from 'three';
import gsap from 'gsap';
import { Back } from 'gsap';

export const vaderTheme = {
  themeId: 'vader',
  displayName: 'Vader',

  // Page Metadata
  pageTitle: 'I find your lack of faith disturbing.',
  favicon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚔️</text></svg>',

  // Styling Properties
  colors: {
    background: '#000000',
    primary: '#FF0000',
    accent: '#8B0000',
  },
  font: {
    family: "'Arial Black', sans-serif",
    size: '16px',
  },

  // Component-Specific Data
  searchBar: {
    iconSvg: `<svg id="vaderIcon" width="80" height="100" viewBox="0 0 80 100">
        <rect x="10" y="10" width="60" height="70" fill="#000000" stroke="#FF0000" stroke-width="2" rx="5" />
        <rect x="20" y="20" width="40" height="30" fill="#000000" />
        <circle cx="30" cy="35" r="5" fill="#FF0000" />
        <circle cx="50" cy="35" r="5" fill="#FF0000" />
        <rect x="25" y="50" width="30" height="5" fill="#FF0000" />
        <rect x="35" y="60" width="10" height="15" fill="#FF0000" />
      </svg>`,
    placeholder: {
      initialText: 'Search the dark side...',
      phrases: [
        "The Force is strong with this one.",
        "I find your lack of faith disturbing.",
        "Do. Or do not. There is no try.",
        "You underestimate the power of the Dark Side."
      ],
      typingSpeed: 40,
    },
  },

  // Logic
  backgroundAnimation: {
    animationFrameId: null,
    theme: null, // Referencia al tema para acceder a otras capas

    async loadSvgTexture(svgPath) {
      try {
        const img = new Image();
        img.src = svgPath;
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

      const [gasPlanetSvg, rockyPlanetSvg, deathStarSvg] = await Promise.all([
        this.loadSvgTexture('/svg/gas-planet.svg'),
        this.loadSvgTexture('/svg/rocky-planet.svg'),
        this.loadSvgTexture('/svg/star-killer.svg')
      ]);
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
        }

        if (phase === 'jump') {
            if (elapsed > 3.5 && !sphereComputed) {
                starGeometry.computeBoundingSphere();
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

                // Desvanece el vórtice
                this.theme.vortexLayer.animation.fadeOut(); // 3. Inicia el fade out
            }
        }
        
        if (phase === 'arrival' && elapsed > 3) {
            phase = 'final';
            gsap.killTweensOf(cameraSpeed);
            cameraSpeed.value = 0; 
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
            if (phase === 'jump') { star.velocity += 0.15; }
            else if (phase === 'arrival') { star.velocity *= 0.95; }
            else if (phase === 'final') { star.velocity = 0; }
            star.z += star.velocity;
            let lineLength = 1.5;
            if (phase === 'jump') { lineLength += star.velocity * 5; }
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
    type: 'svg',
    content: '', 
    styles: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      'z-index': 10,
      'pointer-events': 'none',
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
      introTimeline: null,
      rotationTimeline: null,
      vibrationTimeline: null,
      joltsTimeline: null,

      init: async function(element, theme) {
        if (!element) return;
        
        const svgContent = await theme.overlayLayer.loadSvgContent('/svg/TieAdvance1.svg');
        
        if (svgContent) {
          element.innerHTML = svgContent;
          const newSvgElement = element.querySelector('svg');
          if (newSvgElement) {
            newSvgElement.style.width = '100%';
            newSvgElement.style.height = '100%';
            newSvgElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');

            this.introTimeline = gsap.fromTo(element, 
              { opacity: 0, scale: 1.1 }, 
              { 
                opacity: 0.8,
                scale: 1,
                duration: 2.5,
                ease: 'power2.out',
                onComplete: () => {
                  this.startRotationAnimation(newSvgElement);
                }
              }
            );
          }
        }
      },

      startRotationAnimation: function(svgElement) {
        gsap.set(svgElement, { transformOrigin: '50% 50%' });
        
        this.rotationTimeline = gsap.to(svgElement, {
          rotation: 2.5,
          duration: 1.25,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
          onComplete: () => {
            this.startVibrationAnimation(svgElement);
          }
        });
      },

      startVibrationAnimation: function(svgElement) {
        this.vibrationTimeline = gsap.to(svgElement, {
          x: () => gsap.utils.random(-5, 5),
          y: () => gsap.utils.random(-5, 5),
          rotation: () => gsap.utils.random(-0.8, 0.8),
          duration: 0.05,
          repeat: -1,
          ease: 'none'
        });

        this.joltsTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.4
        }).to(svgElement, {
          x: () => gsap.utils.random(-12, 12),
          y: () => gsap.utils.random(-12, 12),
          duration: 0.04,
          ease: 'power4.inOut'
        });
        
        gsap.delayedCall(4.5, () => {
          if (this.vibrationTimeline) this.vibrationTimeline.kill();
          if (this.joltsTimeline) this.joltsTimeline.kill();
          
          gsap.to(svgElement, {
            duration: 1.5,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 0.98,
            ease: Back.easeOut.config(2),
            onComplete: () => {
                 gsap.to(svgElement, { scale: 1, duration: 0.5, ease: 'power1.out' });
            }
          });
        });
      },

      destroy: function(element) {
        if (this.introTimeline) this.introTimeline.kill();
        if (this.rotationTimeline) this.rotationTimeline.kill();
        if (this.vibrationTimeline) this.vibrationTimeline.kill();
        if (this.joltsTimeline) this.joltsTimeline.kill();
        gsap.killTweensOf(this.startVibrationAnimation);
        const svgElement = element ? element.querySelector('svg') : null;
        if (svgElement) {
          gsap.killTweensOf(svgElement);
        }
        gsap.killTweensOf(element);
        if (element) {
          element.innerHTML = '';
        }
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
        const response = await fetch(svgPath);
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
      rotationSpeed: 15, // Variable para controlar la velocidad de rotación (menor es más rápido)

      init: async function(element, theme) {
        if (!element) return;
        this.element = element; // Guardamos la referencia al elemento
        
        const svgContent = await theme.vortexLayer.loadSvgContent('/svg/vortex.svg');
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
        // Fade in de 3 segundos hasta un 50% de opacidad
        gsap.to(this.element, { opacity: 0.5, duration: 3.0, ease: 'power2.out' });
      },

      fadeOut: function() {
        if (!this.element) return;
        // Fade out de 2 segundos hasta desaparecer
        gsap.to(this.element, { opacity: 0, duration: 2.0, ease: 'power2.inOut' });
      },

      startRotation: function() {
        if (!this.element) return;
        // Asegura que la rotación tenga como eje el centro del elemento
        gsap.set(this.element, { transformOrigin: '50% 50%' });
        this.rotationTimeline = gsap.to(this.element, { rotation: 360, duration: this.rotationSpeed,
          repeat: -1, // Repetir indefinidamente
          ease: 'none'
        });
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

  additionalElements: []
};
