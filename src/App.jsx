import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar/Navbar";
import StatsPanel from "./components/statspanel/statspanel";
import FilterBar from "./components/FilterBar/FilterBar";
import ThreatCard from "./components/ThreatCard/ThreatCard";
import ThreatChart from "./components/ThreatChart/ThreatChart";
import { ThreatFeed } from "./utils/Threatfeed";
import "./App.scss";
import "./components/Navbar/Navbar.scss";
import "./components/StatsPanel/StatsPanel.scss";
import "./components/FilterBar/FilterBar.scss";
import "./components/ThreatCard/ThreatCard.scss";
import "./components/ThreatChart/ThreatChart.scss";

const App = () => {
  const [threats, setThreats]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [searchQuery, setSearchQuery]       = useState("");
  const [activeSeverity, setActiveSeverity] = useState("ALL");
  const [activeType, setActiveType]         = useState("ALL");
  const [sortBy, setSortBy]                 = useState("date");

  useEffect(() => {
    const feed = new ThreatFeed();
    const data = feed.getThreats();
    setTimeout(() => {
      setThreats(data);
      setLoading(false);
    }, 800);
  }, []);

  const filteredThreats = useMemo(() => {
    return threats
      .filter((t) => {
        const matchesSeverity = activeSeverity === "ALL" || t.severity === activeSeverity;
        const matchesType     = activeType === "ALL"     || t.type === activeType;
        const matchesSearch   =
          searchQuery === "" ||
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.cve?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSeverity && matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "date")     return new Date(b.date) - new Date(a.date);
        if (sortBy === "severity") {
          const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
          return order[a.severity] - order[b.severity];
        }
        if (sortBy === "cvss") return b.cvssScore - a.cvssScore;
        return 0;
      });
  }, [threats, activeSeverity, activeType, searchQuery, sortBy]);

  const stats = useMemo(() => {
    const feed = new ThreatFeed();
    return feed.computeStats(threats);
  }, [threats]);

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <StatsPanel stats={stats} loading={loading} />
        <ThreatChart threats={threats} loading={loading} />
        <FilterBar
          searchQuery={searchQuery}       onSearchChange={setSearchQuery}
          activeSeverity={activeSeverity} onSeverityChange={setActiveSeverity}
          activeType={activeType}         onTypeChange={setActiveType}
          sortBy={sortBy}                 onSortChange={setSortBy}
          resultCount={filteredThreats.length}
        />
        <div className="feed">
          {loading ? (
            <div className="loader">
              <span className="loader-dot" />
              <p>Fetching threat intelligence feed…</p>
            </div>
          ) : filteredThreats.length === 0 ? (
            <div className="empty">No threats match current filters.</div>
          ) : (
            filteredThreats.map((threat) => (
              <ThreatCard key={threat.id} threat={threat} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;