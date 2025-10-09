import * as THREE from 'three';

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
        <!-- Vader Helmet -->
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
    // Helper function to load SVG as texture
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
      // Three.js setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1);

      // Load SVG textures asynchronously
      console.log('Loading SVG textures...');
      const [gasPlanetSvg, rockyPlanetSvg] = await Promise.all([
        this.loadSvgTexture('/svg/gas-planet.svg'),
        this.loadSvgTexture('/svg/rocky-planet.svg')
      ]);
      console.log('SVG loading complete:', { gasPlanetSvg: !!gasPlanetSvg, rockyPlanetSvg: !!rockyPlanetSvg });

      // Starfield geometry
      const starCount = 6500;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

        colors[i * 3] = Math.random() > 0.9 ? 1 : 0.8; // R
        colors[i * 3 + 1] = Math.random() > 0.9 ? 0 : 0.8; // G
        colors[i * 3 + 2] = Math.random() > 0.9 ? 0 : 0.8; // B
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Create star texture
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 32;
      starCanvas.height = 32;
      const starCtx = starCanvas.getContext('2d');
      starCtx.fillStyle = '#ffffff';
      starCtx.beginPath();
      starCtx.arc(16, 16, 1, 0, Math.PI * 2);
      starCtx.fill();
      // Add cross for star shape
      starCtx.fillRect(14, 12, 4, 8);
      starCtx.fillRect(12, 14, 8, 4);

      const starTexture = new THREE.CanvasTexture(starCanvas);

      const material = new THREE.PointsMaterial({
        size: 4,
        map: starTexture,
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.1
      });

      const starField = new THREE.Points(geometry, material);
      scene.add(starField);

      // Create planet textures
      // Rocky planet texture with atmospheric gas
      const rockyCanvas = document.createElement('canvas');
      rockyCanvas.width = 512;
      rockyCanvas.height = 256;
      const rockyCtx = rockyCanvas.getContext('2d');
      // Base rocky surface - uniform gray
      for (let i = 0; i < 2940; i++) {  // Reduced by another 40%
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        rockyCtx.fillStyle = `rgb(100, 100, 100)`;  // Uniform gray
        rockyCtx.fillRect(x, y, 2, 2);
      }
      // Add yellow/red atmospheric gas
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const alpha = Math.random() * 0.3 + 0.1;
        const isYellow = Math.random() > 0.5;
        if (isYellow) {
          rockyCtx.fillStyle = `rgba(255, 255, 0, ${alpha})`; // Yellow gas
        } else {
          rockyCtx.fillStyle = `rgba(255, 100, 0, ${alpha})`; // Red gas
        }
        rockyCtx.fillRect(x, y, 3, 3);
      }

      // Apply SVG overlay to rocky planet if available
      if (rockyPlanetSvg) {
        rockyCtx.globalAlpha = 0.3; // Subtle overlay for rocky planet
        rockyCtx.globalCompositeOperation = 'multiply'; // Blend with underlying texture
        rockyCtx.drawImage(rockyPlanetSvg, 0, 0, 512, 256);
        rockyCtx.globalAlpha = 1.0; // Reset alpha
        rockyCtx.globalCompositeOperation = 'source-over'; // Reset composite operation
      }

      const rockyTexture = new THREE.CanvasTexture(rockyCanvas);

      // Jupiter-like gaseous planet texture
      const gasCanvas = document.createElement('canvas');
      gasCanvas.width = 512;
      gasCanvas.height = 256;
      const gasCtx = gasCanvas.getContext('2d');

      // Use SVG as base texture if available, otherwise use procedural texture
      if (gasPlanetSvg) {
        console.log('Using SVG as base texture for gas planet');
        gasCtx.drawImage(gasPlanetSvg, 0, 0, 512, 256);

        // Apply contrast enhancement
        gasCtx.filter = 'contrast(1.3) brightness(1.1)';
        gasCtx.globalCompositeOperation = 'source-over';
        gasCtx.drawImage(gasPlanetSvg, 0, 0, 512, 256);
        gasCtx.filter = 'none';

        // Add purple mist effect around edges
        const gradient = gasCtx.createRadialGradient(256, 128, 200, 256, 128, 256);
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0)'); // transparent purple center
        gradient.addColorStop(0.7, 'rgba(147, 51, 234, 0.1)'); // subtle purple
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0.3)'); // stronger purple at edges

        gasCtx.globalCompositeOperation = 'overlay';
        gasCtx.fillStyle = gradient;
        gasCtx.fillRect(0, 0, 512, 256);

        // Reset composite operation
        gasCtx.globalCompositeOperation = 'source-over';
      } else {
        console.log('Gas planet SVG not available, using procedural texture');
        // Create ImageData for faster pixel manipulation
        const imageData = gasCtx.createImageData(512, 256);
        const data = imageData.data;

        for (let x = 0; x < 512; x++) {
          for (let y = 0; y < 256; y++) {
            const pixelIndex = (y * 512 + x) * 4;

            // Convert to spherical coordinates (latitude from -90 to 90)
            const lat = ((y / 256) - 0.5) * Math.PI; // -π/2 to π/2
            const lon = (x / 512) * 2 * Math.PI;     // 0 to 2π

            // Jupiter's banded structure based on latitude
            const bandIndex = Math.floor((lat + Math.PI/2) / (Math.PI / 8)); // 8 bands
            let baseR, baseG, baseB;
            if (Math.abs(lat) < Math.PI/6) { // Equatorial region
              if (bandIndex % 2 === 0) {
                baseR = 200; baseG = 120; baseB = 60; // Orange-brown
              } else {
                baseR = 150; baseG = 100; baseB = 50; // Darker brown
              }
            } else { // Polar regions
              baseR = 240; baseG = 240; baseB = 240; // White
            }

            // Atmospheric swirls with multiple noise layers
            const swirl1 = Math.sin(lon * 4 + lat * 2) * 0.3;
            const swirl2 = Math.sin(lon * 8 + lat * 4) * 0.2;
            const swirl3 = Math.sin(lon * 16 + lat * 8) * 0.1;
            const turbulence = swirl1 + swirl2 + swirl3;

            // Great Red Spot (approximate position and size)
            const grsLat = -0.3; // Southern hemisphere
            const grsLon = 2.5;  // Around 140 degrees
            const grsSize = 0.3;
            const distToGRS = Math.sqrt((lat - grsLat)**2 + ((lon - grsLon + Math.PI) % (2*Math.PI) - Math.PI)**2);
            const inGRS = distToGRS < grsSize;

            let r = baseR, g = baseG, b = baseB;
            if (inGRS) {
              // Great Red Spot - deep red with some variation
              r = 150 + turbulence * 50;
              g = 30 + turbulence * 30;
              b = 20 + turbulence * 20;
            } else {
              // Apply turbulence to base colors
              r = Math.max(0, Math.min(255, baseR + turbulence * 60));
              g = Math.max(0, Math.min(255, baseG + turbulence * 40));
              b = Math.max(0, Math.min(255, baseB + turbulence * 30));
            }

            // Set pixel data (RGBA)
            data[pixelIndex] = Math.floor(r);     // Red
            data[pixelIndex + 1] = Math.floor(g); // Green
            data[pixelIndex + 2] = Math.floor(b); // Blue
            data[pixelIndex + 3] = 255;           // Alpha
          }
        }

        // Put the image data onto the canvas
        gasCtx.putImageData(imageData, 0, 0);
      }

      const gasTexture = new THREE.CanvasTexture(gasCanvas);
      console.log('Gas texture created:', gasTexture);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Planets
      const planetGeometry = new THREE.SphereGeometry(50, 32, 32);
      const planetMaterial1 = new THREE.MeshLambertMaterial({ map: rockyTexture });
      const planet1 = new THREE.Mesh(planetGeometry, planetMaterial1);
      planet1.position.set(500, 200, -800);
      scene.add(planet1);
      console.log('Rocky planet added to scene');

      const planetMaterial2 = new THREE.MeshLambertMaterial({ map: gasTexture });
      const planet2 = new THREE.Mesh(planetGeometry, planetMaterial2);
      planet2.position.set(-300, -100, -600);
      scene.add(planet2);
      console.log('Gas planet added to scene');

      camera.position.z = 100;

      // Animation state
      let phase = 'static';
      let phaseStartTime = Date.now();
      let cameraSpeed = 0.5;
      let stretchFactor = 1;

      function animate() {
        const currentTime = Date.now();
        const elapsed = (currentTime - phaseStartTime) / 1000;

        // Phase transitions
        if (phase === 'static' && elapsed > 5) {
          phase = 'jump';
          phaseStartTime = currentTime;
        } else if (phase === 'jump' && elapsed > 1.5) {
          phase = 'tunnel';
          phaseStartTime = currentTime;
        } else if (phase === 'tunnel' && elapsed > 10) {
          phase = 'exit';
          phaseStartTime = currentTime;
        } else if (phase === 'exit' && elapsed > 1.5) {
          phase = 'newspace';
          phaseStartTime = currentTime;
        }

        // Camera movement
        if (phase === 'static' || phase === 'newspace') {
          cameraSpeed = 0.5;
        } else if (phase === 'jump') {
          cameraSpeed = Math.min(cameraSpeed + 0.1, 50);
        } else if (phase === 'tunnel') {
          cameraSpeed = 20;
        } else if (phase === 'exit') {
          cameraSpeed = Math.max(cameraSpeed - 0.2, 0.5);
        }

        camera.position.z -= cameraSpeed;

        // Star stretching
        if (phase === 'jump' || phase === 'tunnel') {
          stretchFactor = Math.min(stretchFactor + 0.05, 10);
        } else {
          stretchFactor = Math.max(stretchFactor - 0.05, 1);
        }

        starField.scale.z = stretchFactor;

        // Rotate planets slowly
        planet1.rotation.y += 0.005;
        planet2.rotation.y += 0.003;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      // Store references for disposal
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      this.starField = starField;
      this.planet1 = planet1;
      this.planet2 = planet2;
      this.geometry = geometry;
      this.material = material;
      this.planetGeometry = planetGeometry;
      this.planetMaterial1 = planetMaterial1;
      this.planetMaterial2 = planetMaterial2;
      this.starTexture = starTexture;
      this.rockyTexture = rockyTexture;
      this.gasTexture = gasTexture;
      this.ambientLight = ambientLight;
      this.directionalLight = directionalLight;
      this.gasPlanetSvg = gasPlanetSvg;
      this.rockyPlanetSvg = rockyPlanetSvg;
    },
    destroy: function() {
      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.geometry) {
        this.geometry.dispose();
      }
      if (this.material) {
        this.material.dispose();
      }
      if (this.starTexture) {
        this.starTexture.dispose();
      }
      if (this.planetGeometry) {
        this.planetGeometry.dispose();
      }
      if (this.planetMaterial1) {
        this.planetMaterial1.dispose();
      }
      if (this.planetMaterial2) {
        this.planetMaterial2.dispose();
      }
      if (this.rockyTexture) {
        this.rockyTexture.dispose();
      }
      if (this.gasTexture) {
        this.gasTexture.dispose();
      }
      if (this.scene) {
        // Remove all objects from scene
        while (this.scene.children.length > 0) {
          const object = this.scene.children[0];
          this.scene.remove(object);
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        }
      }
    }
  },

  // Extensibility
  additionalElements: []
};