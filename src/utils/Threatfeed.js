export class Threat {
  constructor({ id, title, description, severity, type, cve, cvssScore, date, source, affectedSystems, iocs, mitre }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.severity = severity;
    this.type = type;
    this.cve = cve || null;
    this.cvssScore = cvssScore;
    this.date = date;
    this.source = source;
    this.affectedSystems = affectedSystems || [];
    this.iocs = iocs || [];
    this.mitre = mitre || null;
  }

  isUrgent() {
    return this.severity === "CRITICAL" || this.cvssScore >= 9.0;
  }

  getAge() {
    const diff = Date.now() - new Date(this.date).getTime();
    const hours = Math.floor(diff / 3_600_000);
    const days = Math.floor(diff / 86_400_000);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

export class ThreatFeed {
  constructor() {
    this._cache = null;
  }

  _daysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
  }

  getThreats() {
    if (this._cache) return this._cache;

    const raw = [
      {
        id: "T001",
        title: "Critical RCE in Apache Log4j (Log4Shell)",
        description: "A zero-day RCE vulnerability in Apache Log4j 2 allows attackers to execute arbitrary code by sending a specially crafted request.",
        severity: "CRITICAL", type: "CVE", cve: "CVE-2021-44228",
        cvssScore: 10.0, date: this._daysAgo(1), source: "NVD",
        affectedSystems: ["Java apps", "Apache", "VMware"],
        iocs: ["45.155.205.233", "log4j-exploit.jar"],
        mitre: "T1190 — Exploit Public-Facing Application",
      },
      {
        id: "T002",
        title: "LockBit 3.0 Ransomware Campaign",
        description: "LockBit 3.0 operators targeting financial institutions using phishing emails with malicious Excel macros as initial access vector.",
        severity: "CRITICAL", type: "Ransomware", cve: null,
        cvssScore: 9.8, date: this._daysAgo(0), source: "CloudSEK XVigil",
        affectedSystems: ["Windows Server", "Active Directory"],
        iocs: ["invoice_q4.xlsm", "185.220.101.42"],
        mitre: "T1566.001 — Spearphishing Attachment",
      },
      {
        id: "T003",
        title: "ProxyLogon — Microsoft Exchange RCE",
        description: "Chain of four vulnerabilities in Microsoft Exchange Server allowing unauthenticated attackers to deploy web shells.",
        severity: "CRITICAL", type: "CVE", cve: "CVE-2021-26855",
        cvssScore: 9.8, date: this._daysAgo(3), source: "Microsoft MSRC",
        affectedSystems: ["Exchange 2013", "Exchange 2016", "Exchange 2019"],
        iocs: ["China Chopper webshell"],
        mitre: "T1505.003 — Web Shell",
      },
      {
        id: "T004",
        title: "APT29 Targeting Government via SolarWinds",
        description: "APT29 implanted SUNBURST backdoor into SolarWinds Orion update pipeline, affecting 18,000+ organizations worldwide.",
        severity: "HIGH", type: "APT", cve: "CVE-2020-10148",
        cvssScore: 9.0, date: this._daysAgo(5), source: "CISA",
        affectedSystems: ["SolarWinds Orion", "Windows", "Azure AD"],
        iocs: ["avsvmcloud.com", "freescanonline.com"],
        mitre: "T1195.002 — Supply Chain Compromise",
      },
      {
        id: "T005",
        title: "Credential Stuffing on Banking Portals",
        description: "Threat actors using 2.1M stolen credentials for automated login attempts against online banking portals.",
        severity: "HIGH", type: "IOC", cve: null,
        cvssScore: 8.1, date: this._daysAgo(2), source: "CloudSEK BeVigil",
        affectedSystems: ["Web apps", "Mobile banking"],
        iocs: ["91.108.4.0/22"],
        mitre: "T1110.004 — Credential Stuffing",
      },
      {
        id: "T006",
        title: "Emotet Botnet Resurgence — Wave 5",
        description: "Emotet re-emerged distributing malicious Word documents via email, acting as downloader for TrickBot and Cobalt Strike.",
        severity: "HIGH", type: "Malware", cve: null,
        cvssScore: 8.8, date: this._daysAgo(4), source: "CERT-In",
        affectedSystems: ["Windows", "MS Office"],
        iocs: ["payment_overdue.docm", "107.172.197.175"],
        mitre: "T1566 — Phishing",
      },
      {
        id: "T007",
        title: "GitHub PAT Exposure in Public Repos",
        description: "Thousands of repositories exposing Personal Access Tokens in commit history, harvested by automated scanners within minutes.",
        severity: "MEDIUM", type: "IOC", cve: null,
        cvssScore: 6.5, date: this._daysAgo(6), source: "CloudSEK XVigil",
        affectedSystems: ["CI/CD pipelines", "Cloud infra"],
        iocs: [],
        mitre: "T1552.001 — Credentials In Files",
      },
      {
        id: "T008",
        title: "Spear-Phishing Targeting BFSI Sector",
        description: "Attackers spoofing RBI domain sending phishing emails to bank employees requesting credentials under compliance audit pretext.",
        severity: "MEDIUM", type: "Phishing", cve: null,
        cvssScore: 6.8, date: this._daysAgo(7), source: "CloudSEK XVigil",
        affectedSystems: ["Email clients", "VPN portals"],
        iocs: ["rbi-compliance-audit.com"],
        mitre: "T1566.002 — Spearphishing Link",
      },
      {
        id: "T009",
        title: "OpenSSL Buffer Overflow Vulnerability",
        description: "Buffer overflow in OpenSSL 3.0.x triggered by malicious email address in a certificate, causing crash or RCE.",
        severity: "HIGH", type: "CVE", cve: "CVE-2022-3602",
        cvssScore: 7.5, date: this._daysAgo(8), source: "OpenSSL Security",
        affectedSystems: ["OpenSSL 3.0.0–3.0.6", "Linux", "Web servers"],
        iocs: [],
        mitre: "T1190 — Exploit Public-Facing Application",
      },
      {
        id: "T010",
        title: "FIN7 Web Skimmers on Indian e-Commerce",
        description: "FIN7 deploying Magecart-style JS injections on checkout pages of Indian e-commerce platforms to harvest card data.",
        severity: "HIGH", type: "APT", cve: null,
        cvssScore: 8.3, date: this._daysAgo(2), source: "CloudSEK BeVigil",
        affectedSystems: ["Magento", "WooCommerce"],
        iocs: ["cdn-assets.storage-cloud.info"],
        mitre: "T1185 — Browser Session Hijacking",
      },
      {
        id: "T011",
        title: "Subdomain Takeover on Fortune 500 Assets",
        description: "Misconfigured DNS CNAME records pointing to decommissioned cloud services allow attackers to serve malicious content on legitimate subdomains.",
        severity: "MEDIUM", type: "IOC", cve: null,
        cvssScore: 5.4, date: this._daysAgo(9), source: "CloudSEK BeVigil",
        affectedSystems: ["AWS S3", "Azure Blob", "Heroku"],
        iocs: [],
        mitre: "T1584.001 — Compromise Infrastructure",
      },
      {
        id: "T012",
        title: "Spring4Shell RCE (Spring Framework)",
        description: "Critical RCE in Spring Framework affecting Spring MVC and WebFlux apps running on JDK 9+.",
        severity: "CRITICAL", type: "CVE", cve: "CVE-2022-22965",
        cvssScore: 9.8, date: this._daysAgo(10), source: "VMware Security",
        affectedSystems: ["Spring Boot", "Tomcat", "JDK 9+"],
        iocs: ["spring-shell.jsp"],
        mitre: "T1190 — Exploit Public-Facing Application",
      },
    ];

    this._cache = raw.map((item) => new Threat(item));
    return this._cache;
  }

  computeStats(threats) {
    if (!threats.length) return { total: 0, critical: 0, high: 0, newToday: 0, avgCvss: 0 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      total: threats.length,
      critical: threats.filter((t) => t.severity === "CRITICAL").length,
      high: threats.filter((t) => t.severity === "HIGH").length,
      newToday: threats.filter((t) => new Date(t.date) >= today).length,
      avgCvss: (threats.reduce((sum, t) => sum + t.cvssScore, 0) / threats.length).toFixed(1),
    };
  }
}