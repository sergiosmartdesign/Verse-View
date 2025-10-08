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
    init: function(canvas, theme) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.9 ? theme.colors.primary : '#FFFFFF'
        });
      }

      let animationId;
      function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
          ctx.fillStyle = star.color;
          ctx.fillRect(star.x, star.y, star.size, star.size);
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });

        animationId = requestAnimationFrame(animate);
      }
      animate();

      this.destroy = function() {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    },
    destroy: function() {
      // Will be set by init
    }
  },

  // Extensibility
  additionalElements: []
};