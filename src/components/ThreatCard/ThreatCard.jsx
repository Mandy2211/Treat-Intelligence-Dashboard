import { useState } from "react";
import SeverityBadge from "../SeverityBadge/Severitybadge";
import "../SeverityBadge/SeverityBadge.scss";

const TYPE_COLORS = {
  CVE:        "#457b9d",
  IOC:        "#6a4c93",
  Malware:    "#f4a261",
  Phishing:   "#e9c46a",
  Ransomware: "#e63946",
  APT:        "#c77dff",
};

const ThreatCard = ({ threat }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`threat-card ${threat.isUrgent() ? "threat-card-urgent" : ""}`}>

      <div className="threat-card-header">
        <SeverityBadge severity={threat.severity} score={threat.cvssScore} />
        <span className="threat-card-type" style={{ color: TYPE_COLORS[threat.type] || "#9ca3b0" }}>
          {threat.type}
        </span>
      </div>

      <h3 className="threat-card-title">{threat.title}</h3>

      {threat.cve && <span className="threat-card-cve">{threat.cve}</span>}

      <p className="threat-card-desc">{threat.description}</p>

      {threat.affectedSystems.length > 0 && (
        <div className="threat-card-systems">
          {threat.affectedSystems.slice(0, 3).map((sys) => (
            <span key={sys} className="system-tag">{sys}</span>
          ))}
          {threat.affectedSystems.length > 3 && (
            <span className="system-tag">+{threat.affectedSystems.length - 3}</span>
          )}
        </div>
      )}

      {expanded && (
        <div className="threat-card-expanded">
          {threat.iocs.length > 0 && (
            <div className="expanded-section">
              <span className="expanded-label">Indicators of Compromise</span>
              {threat.iocs.map((ioc) => (
                <code key={ioc} className="ioc-item">{ioc}</code>
              ))}
            </div>
          )}
          {threat.mitre && (
            <div className="expanded-section">
              <span className="expanded-label">MITRE ATT&CK</span>
              <span className="expanded-value">{threat.mitre}</span>
            </div>
          )}
          <div className="expanded-section">
            <span className="expanded-label">Source</span>
            <span className="expanded-value">{threat.source}</span>
          </div>
        </div>
      )}

      <div className="threat-card-footer">
        <span className="threat-card-age">{threat.getAge()}</span>
        <button
          className="threat-card-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less ↑" : "Details ↓"}
        </button>
      </div>

    </div>
  );
};

export default ThreatCard;