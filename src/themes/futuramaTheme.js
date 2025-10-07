export const futuramaTheme = {
  themeId: 'futurama',
  displayName: 'Futurama',
  
  pageTitle: 'Good news, everyone!',
  favicon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>',

  colors: {
    background: '#000000', // Black
    primary: '#99FF00',   // Planet Express green
    accent: '#FFD700',     // Gold/Yellow accent
  },
  font: {
    family: "'Futura', sans-serif",
    size: '16px',
  },
  searchBar: {
    iconSvg: `<svg id="benderIcon" width="80" height="100" viewBox="0 0 80 100">
        <!-- Head -->
        <rect x="10" y="10" width="60" height="70" fill="#C0C0C0" rx="10" />
        <!-- Antenna -->
        <rect x="38" y="0" width="4" height="10" fill="#A9A9A9" />
        <circle cx="40" cy="5" r="5" fill="#FF0000" />
        <!-- Eye Visor -->
        <rect x="15" y="25" width="50" height="20" fill="#000000" />
        <!-- Mouth -->
        <rect x="25" y="55" width="30" height="5" fill="#000000" />
      </svg>`,
    placeholder: {
      initialText: 'Search the future...',
      phrases: [
        "Bite my shiny metal ass!",
        "Well, we're boned.",
        "I'm back, baby!",
        "Hey, sexy mama. Wanna kill all humans?"
      ],
      typingSpeed: 50,
    },
  },
  backgroundAnimation: {
    init: function(canvas, theme) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = theme.colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Placeholder for a more complex starfield or tube animation
    },
    destroy: function() {
      // Cleanup logic if needed
    }
  },
  additionalElements: []
};