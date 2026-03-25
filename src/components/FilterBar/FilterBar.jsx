const SEVERITIES  = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"];
const TYPES       = ["ALL", "CVE", "IOC", "Malware", "Phishing", "Ransomware", "APT"];
const SORT_OPTIONS = [
  { value: "date",     label: "Newest first" },
  { value: "severity", label: "Severity"     },
  { value: "cvss",     label: "CVSS score"   },
];

const FilterBar = ({
  searchQuery, onSearchChange,
  activeSeverity, onSeverityChange,
  activeType, onTypeChange,
  sortBy, onSortChange,
  resultCount,
}) => {
  return (
    <div className="filterbar">

      <div className="filterbar-search-wrap">
        <input
          type="text"
          className="filterbar-search"
          placeholder="Search threats, CVEs…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="filterbar-clear" onClick={() => onSearchChange("")}>✕</button>
        )}
      </div>

      <div className="filterbar-group">
        <span className="filterbar-label">Severity</span>
        <div className="filterbar-pills">
          {SEVERITIES.map((sev) => (
            <button
              key={sev}
              className={`pill ${activeSeverity === sev ? "pill-active" : ""} pill-${sev.toLowerCase()}`}
              onClick={() => onSeverityChange(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="filterbar-group">
        <span className="filterbar-label">Type</span>
        <div className="filterbar-pills">
          {TYPES.map((type) => (
            <button
              key={type}
              className={`pill ${activeType === type ? "pill-active" : ""}`}
              onClick={() => onTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filterbar-bottom">
        <span className="filterbar-count">
          {resultCount} threat{resultCount !== 1 ? "s" : ""} found
        </span>
        <div className="filterbar-sort">
          <span className="filterbar-label">Sort</span>
          <select
            className="filterbar-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
};

export default FilterBar;