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

      // --- Textura del túnel con colores mejorados ---
      const tubeTextureCanvas = document.createElement('canvas');
      tubeTextureCanvas.width = 512;
      tubeTextureCanvas.height = 512;
      const tubeTextureContext = tubeTextureCanvas.getContext('2d');
      tubeTextureContext.fillStyle = '#000000';
      tubeTextureContext.fillRect(0, 0, 512, 512);
      // Rayas azules más pronunciadas
      for (let i = 0; i < 2000; i++) {
          tubeTextureContext.fillStyle = `rgba(0, 150, 255, ${Math.random() * 0.3 + 0.1})`; // Azul más fuerte
          tubeTextureContext.fillRect(Math.random() * 512, Math.random() * 512, 2, Math.random() * 150 + 50);
      }
      // Rayas blancas para contraste
      for (let i = 0; i < 500; i++) {
          tubeTextureContext.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
          tubeTextureContext.fillRect(Math.random() * 512, Math.random() * 512, 1, Math.random() * 200 + 100);
      }
      const tubeTexture = new THREE.CanvasTexture(tubeTextureCanvas);
      tubeTexture.wrapS = THREE.RepeatWrapping;
      tubeTexture.wrapT = THREE.RepeatWrapping;
      tubeTexture.repeat.set(10, 4);

      const tubeCurve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 1000), new THREE.Vector3(0, 0, -3000));
      const tubeGeometry = new THREE.TubeGeometry(tubeCurve, 100, 40, 12, false);
      const tubeMaterial = new THREE.MeshBasicMaterial({
          map: tubeTexture,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0, 
          blending: THREE.AdditiveBlending
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tube);
      let tubeSpeed = { value: 0 };
      
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
        
        // --- Se retrasa el inicio del salto a los 6 segundos ---
        if (phase === 'static' && elapsed > 6) {
            phase = 'jump';
            phaseStartTime = currentTime;
            
            gsap.to(planet1.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.5, onComplete: () => planet1.visible = false });
            gsap.to(planet2.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.5, onComplete: () => planet2.visible = false });
            gsap.to(starMaterial.color, { r: 0.5, g: 0.7, b: 1.0, duration: 3.0 });
            gsap.to(cameraSpeed, { value: 20, duration: 3.0 });

            // Animar el túnel para que aparezca (fade in) y acelere
            gsap.to(tube.material, { opacity: 0.7, duration: 2.5, ease: 'power2.out' });
            gsap.timeline()
              .to(tubeSpeed, { value: 0.25, duration: 4.5, ease: 'power2.in' })
              .to(tubeSpeed, { value: 0, duration: 3, ease: 'power2.out' });
        }

        if (phase === 'jump') {
            if (elapsed > 3.5 && !sphereComputed) {
                starGeometry.computeBoundingSphere();
                sphereComputed = true;
            }
             // Animar el túnel para que desaparezca (fade out) antes de llegar
            if (elapsed > 5.5) {
                 gsap.to(tube.material, { opacity: 0, duration: 1.5, ease: 'power2.in' });
            }

            if (elapsed > 7) {
                phase = 'arrival';
                phaseStartTime = currentTime;
                
                deathStar.position.set(camera.position.x + 100, camera.position.y + 50, camera.position.z - 4875);
                for(const star of starPositions) {
                    star.velocity = 0;
                    star.x = (Math.random() - 0.5) * 4000 + camera.position.x;
                    star.y = (Math.random() - 0.5) * 4000 + camera.position.y;
                    star.z = camera.position.z - Math.random() * 4000;
                }
                starGeometry.computeBoundingSphere();

                gsap.to(cameraSpeed, { value: 0, duration: 3.0, ease: 'power2.out' });
                gsap.to(starMaterial.color, { r: 1.0, g: 1.0, b: 1.0, duration: 3.0 });
                gsap.to(deathStar.material, { opacity: 1, duration: 3.0 });
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
        
        tube.material.map.offset.y -= tubeSpeed.value;

        renderer.render(scene, camera);
      }
      
      this.scene = scene;
      this.renderer = renderer;
      this.tube = tube; 
      
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

  vortexLayer: null, 

  additionalElements: []
};