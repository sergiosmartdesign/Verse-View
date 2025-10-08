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
    iconSvg: `<svg id="morpheusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 642 480" role="img" aria-label="Morpheus face">
      <path d="M264 200 C264 120 320 80 376 80 C432 80 488 120 488 200 L488 280 C488 340 432 380 376 380 C320 380 264 340 264 280 Z" fill="#60402d" stroke="#2a2f33" stroke-width="10"/>
      <g fill="#0f1112">
        <ellipse cx="320" cy="220" rx="48" ry="28" />
        <ellipse cx="432" cy="220" rx="48" ry="28" />
        <rect x="358" y="210" width="40" height="14" rx="6" />
      </g>
      <path d="M376 248 C368 260 372 280 376 280 C380 280 384 260 376 248 Z" fill="#553324" />
      <line x1="340" y1="314" x2="412" y2="314" stroke="#000000" stroke-width="5" stroke-linecap="round" />
      <path d="M320 330 C344 348 408 348 432 330 C416 340 336 340 320 330 Z" fill="#553324" opacity="0.25" />
    </svg>`,
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