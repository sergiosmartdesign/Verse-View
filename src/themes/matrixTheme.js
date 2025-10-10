export const matrixTheme = {
  themeId: 'matrix',
  displayName: 'The Matrix',

  // Page Metadata
  pageTitle: '💊Follow the white rabbit🐰',
  favicon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' fill=\'%23000\'/%3E%3Cg%3E%3Ctext x=\'3\' y=\'0\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E66%3C/text%3E%3Ctext x=\'3\' y=\'8\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E6f%3C/text%3E%3Ctext x=\'3\' y=\'16\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E6c%3C/text%3E%3Ctext x=\'3\' y=\'24\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E6c%3C/text%3E%3CanimateTransform attributeName=\'transform\' type=\'translate\' values=\'0 -40; 0 40\' dur=\'3s\' repeatCount=\'indefinite\'/%3E%3C/g%3E%3Cg%3E%3Ctext x=\'10\' y=\'0\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E6f%3C/text%3E%3Ctext x=\'10\' y=\'8\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E77%3C/text%3E%3Ctext x=\'10\' y=\'16\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E20%3C/text%3E%3Ctext x=\'10\' y=\'24\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E74%3C/text%3E%3CanimateTransform attributeName=\'transform\' type=\'translate\' values=\'0 -40; 0 40\' dur=\'3.5s\' begin=\'0.5s\' repeatCount=\'indefinite\'/%3E%3C/g%3E%3Cg%3E%3Ctext x=\'18\' y=\'0\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E68%3C/text%3E%3Ctext x=\'18\' y=\'8\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E65%3C/text%3E%3Ctext x=\'18\' y=\'16\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E20%3C/text%3E%3Ctext x=\'18\' y=\'24\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E77%3C/text%3E%3CanimateTransform attributeName=\'transform\' type=\'translate\' values=\'0 -40; 0 40\' dur=\'2.8s\' begin=\'1s\' repeatCount=\'indefinite\'/%3E%3C/g%3E%3Cg%3E%3Ctext x=\'26\' y=\'0\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E68%3C/text%3E%3Ctext x=\'26\' y=\'8\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E69%3C/text%3E%3Ctext x=\'26\' y=\'16\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E74%3C/text%3E%3Ctext x=\'26\' y=\'24\' font-family=\'monospace\' font-size=\'5\' fill=\'%2300ff41\'%3E65%3C/text%3E%3CanimateTransform attributeName=\'transform\' type=\'translate\' values=\'0 -40; 0 40\' dur=\'3.2s\' begin=\'1.5s\' repeatCount=\'indefinite\'/%3E%3C/g%3E%3C/svg%3E',

  // Styling Properties
  colors: {
    background: '#000',
    primary: '#00ff41',
    accent: '#008F11',
  },
  font: {
    family: "'Courier New', monospace",
    size: '16px',
  },

  // Component-Specific Data
  searchBar: {
    iconSvg: `<?xml version="1.0" encoding="UTF-8"?><svg id="morpheusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.35 270.37" role="img" aria-label="Morpheus face"><g id="Layer_1-2" transform="translate(42.67, 54.074) scale(0.6)"><path d="M20.94,115.6S7.95,7.15,108.03,4.03c0,0,90.34-5.19,84.39,111.57,0,0,21.64-7.78,16.77,15.05s-2.16,39.96-17.31,45.15c0,0-6.49-4.15-7.03,35.29,0,0,3.25,17.64-43.28,46.7,0,0-30.29,16.61-58.97,3.63-28.67-12.97-35.7-26.98-42.2-31.13-6.49-4.15-12.44-17.64-14.07-46.7,0,0,4.87-5.71-6.49-6.75S-.16,121.31,7.41,118.19s9.74,3.11,13.52-2.59Z" style="fill:#a68268;"/><path d="M80.59,16.57l2.09,92.12s1.56,4.07-15.64,16.8,8.86,26.47,8.86,26.47c0,0,20.34-17.81,29.72-7.63l1.56,20.87s9,6.91,7.35,11.05-4.71,8.74-11.31,7.82c-6.6-.92-11.08-5.75-16.5-2.76s11.78,9.43,16.26,9.66,3.53,14.95,3.53,14.95l1.18,23s15.32-.92,15.79,14.03c.47,14.95-13.67,11.04-17.91,10.81-4.24-.23-22.15,1.38-21.44,9.89.71,8.51,60.56,5.78,73.99-17.21v-44.88s-4.48-5.29,6.6-15.41c11.08-10.12,13.67-14.49,13.67-14.49,0,0,4.48-5.06,5.66-31.28,1.18-26.22,7.96-63.05-2.38-81.83C171.33,39.74,126.84-.72,80.59,16.57Z" style="fill:#9a7960;"/><path d="M25.61,116.12s6.04-1.97,4.89,41.55c0,0-2.3,4.77,8.05,12.35s16.11,12.91,16.4,32.85-2.01,31.16,1.44,38.46c0,0-25.31-8.98-31.93-55.03-6.62-46.04-1.15-7.59-1.15-7.59,0,0-33.66-35.37-14.67-59.23,0,0,6.62-9.55,16.97-3.37Z" style="fill:#9a7960;"/><path d="M77.27,209.69s22.34-17.94,28.7-6.9c0,0,10.89-9.94,26.16,5.8,0,0,1.7,8-9.9,14.08h-32.24s-6.79-.55-12.73-12.97Z" style="fill:#8b6b56;"/><path d="M184.07,114.59c-.65.43-1.05,1.15-1.09,1.93l-1.93,44.65s1.7.28-5.66,8.01c-7.35,7.73-13.57,8-16.68,20.7-2.97,12.11-.4,43.8-.16,46.71.01.15.04.28.08.43l1.21,4.48s24.44-9.29,26.54-52.57c.01-.25.02-.49-.03-.73-.27-1.42-.95-7.28,5.73-10.17,7.64-3.31,18.95-49.13,13.86-57.41-4.82-7.84-15.47-10.24-21.87-6.02Z" style="fill:#8b6b56;"/><path d="M84.72,180.37s3.68-1.12,7.36,0,11.09,10.77,23.94,2.24c0,0,3.19-3.82,10.78-1.8" style="fill:none; stroke:#624949; stroke-linecap:round; stroke-miterlimit:10; stroke-width:5px;"/><path d="M80.3,210.31s14.97-4.69,25.67.8c0,0,11.51-4.42,24.71-1.34" style="fill:none; stroke:#624949; stroke-linecap:round; stroke-linejoin:round; stroke-width:5px;"/><path d="M20.38,115.6S7.39,7.15,107.47,4.03c0,0,90.34-5.19,84.39,111.57,0,0,21.64-7.78,16.77,15.05-4.87,22.83-2.16,39.96-17.31,45.15,0,0-6.49-4.15-7.03,35.29,0,0,3.25,17.64-43.28,46.7,0,0-30.29,16.61-58.97,3.63-28.67-12.97-35.7-26.98-42.2-31.13-6.49-4.15-12.44-17.64-14.07-46.7,0,0,4.87-5.71-6.49-6.75-11.36-1.04-20.02-55.52-12.44-58.64s9.74,3.11,13.52-2.59Z" style="fill:none; stroke:#231f20; stroke-linejoin:round; stroke-width:8px;"/><ellipse cx="69.33" cy="139.67" rx="27.85" ry="21.32" style="fill:#333;"/><ellipse cx="144.26" cy="139.67" rx="27.85" ry="21.32" style="fill:#333;"/><path d="M88.98,136.7s17.82-16.28,34.78,0" style="fill:none; stroke:#333; stroke-miterlimit:10; stroke-width:8px;"/><ellipse cx="75.69" cy="150.36" rx="10.75" ry="5.66" style="fill:#4c4848;"/><ellipse cx="149.35" cy="151.74" rx="10.75" ry="5.66" style="fill:#4c4848;"/></g></svg>`,
    placeholder: {
      initialText: 'Search the Matrix...',
      phrases: [
        "You're here because you search something.",
        " What you search you can't explain, but you feel it.",
        " It is this feeling that has brought you to me.",
        " Do you know what I'm talking about?"
      ],
      typingSpeed: 45,
    },
  },

  // Logic
  backgroundAnimation: {
    init: function(canvas, theme) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const baseFontSize = 16;
      let columns = Math.floor(canvas.width / baseFontSize);
      let drops = [];
      let fontSizes = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
        fontSizes[x] = Math.random() * 8 + 12;
      }
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / baseFontSize);
        drops = [];
        fontSizes = [];
        for (let x = 0; x < columns; x++) {
          drops[x] = 1;
          fontSizes[x] = Math.random() * 8 + 12;
        }
      });
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const colors = ['#00FF41', '#008F11', '#003B00', '#0D0208'];
      function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const colorIndex = Math.floor((drops[i] * colors.length) / canvas.height);
          ctx.fillStyle = colors[Math.min(colorIndex, colors.length - 1)];
          ctx.font = fontSizes[i] + 'px monospace';
          ctx.fillText(char, i * baseFontSize, drops[i] * fontSizes[i]);
          if (drops[i] * fontSizes[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 0.5;
        }
      }
      const intervalId = setInterval(draw, 50);
      this.destroy = function() {
        clearInterval(intervalId);
      };
    },
    destroy: function() {
      // Will be set by init
    }
  },

  // Extensibility
  additionalElements: []
};