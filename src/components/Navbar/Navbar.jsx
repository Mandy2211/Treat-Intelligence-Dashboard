const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M16 3 L29 9.5 L29 19 Q29 26 16 30 Q3 26 3 19 L3 9.5 Z"
              fill="none" stroke="#e63946" strokeWidth="1.5"/>
            <circle cx="16" cy="18" r="5" fill="#e63946"/>
            <circle cx="16" cy="18" r="2" fill="#0d0f14"/>
          </svg>
          <span className="navbar-name">ThreatBoard</span>
          <span className="navbar-version">v1.0</span>
        </div>
        <div className="navbar-live">
          <span className="live-dot"></span>
          <span className="live-label">LIVE FEED</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;