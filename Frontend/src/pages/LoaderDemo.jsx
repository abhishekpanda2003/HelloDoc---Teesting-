/**
 * Loader Demo Page
 * 
 * Interactive demonstration page showcasing all 6 available loader animations.
 * Used for testing and previewing loader styles without triggering actual data loading.
 * 
 * Available Loaders:
 * 1. Spinner - Classic rotating circle
 * 2. Pulse - Pulsing dot with fade effect
 * 3. Dots - Three bouncing dots
 * 4. Gradient - Rotating gradient ring
 * 5. Wave - Five staggered wave bars
 * 6. Ring - Three concentric rotating rings (SELECTED FOR PRODUCTION)
 * 
 * Features:
 * - Card-based UI with clickable loaders
 * - Auto-hide after 3 seconds
 * - Customizable messages for each loader type
 * - Responsive grid layout
 * 
 * Route: /loader-demo
 * Access: http://localhost:3000/loader-demo
 * 
 * Usage:
 * - Click any loader card to preview it
 * - Loader displays for 3 seconds with custom message
 * - Returns to demo UI after animation completes
 */

import { useState } from "react";
import Loader from "../components/Loader";

function LoaderDemo() {
  const [activeLoader, setActiveLoader] = useState(null);
  const [message, setMessage] = useState("Loading...");

  const loaders = [
    { type: "spinner", label: "Spinner", message: "Loading..." },
    { type: "pulse", label: "Pulse", message: "Fetching data..." },
    { type: "dots", label: "Dots", message: "Please wait..." },
    { type: "gradient", label: "Gradient", message: "Loading your dashboard..." },
    { type: "wave", label: "Wave", message: "Preparing..." },
    { type: "ring", label: "Ring", message: "Almost done..." },
  ];

  const handleLoaderClick = (loader) => {
    setActiveLoader(loader.type);
    setMessage(loader.message);

    // Auto hide loader after 3 seconds
    setTimeout(() => {
      setActiveLoader(null);
    }, 3000);
  };

  // Show selected loader
  if (activeLoader) {
    return <Loader type={activeLoader} message={message} />;
  }

  // Demo UI
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎡 Loader Animations Demo</h1>
      <p style={styles.subtitle}>Click on any loader to see it in action (3 second demo)</p>

      <div style={styles.grid}>
        {loaders.map((loader) => (
          <button
            key={loader.type}
            onClick={() => handleLoaderClick(loader)}
            style={styles.card}
          >
            <h3 style={styles.cardTitle}>{loader.label}</h3>
            <p style={styles.cardText}>Click to view</p>
            <p style={styles.cardType}>Type: {loader.type}</p>
          </button>
        ))}
      </div>

      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>💡 How to Use in Your Project:</h3>
        <pre style={styles.codeBlock}>{`import Loader from "../components/Loader";

// In your component:
const [isLoading, setIsLoading] = useState(false);

if (isLoading) {
  return <Loader type="wave" message="Loading..." />;
}

return <YourContent />;`}</pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f1f6f9 0%, #e8f2f7 100%)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#0f172a",
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "1rem",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto 40px",
  },
  card: {
    padding: "30px",
    background: "white",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    fontSize: "1rem",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  },
  cardTitle: {
    color: "#0f172a",
    margin: "0 0 8px 0",
    fontSize: "1.3rem",
    fontWeight: "600",
  },
  cardText: {
    color: "#94a8b8",
    margin: "8px 0",
    fontSize: "0.9rem",
  },
  cardType: {
    color: "#0aa3b5",
    fontSize: "0.85rem",
    margin: "8px 0 0 0",
    fontWeight: "500",
  },
  infoBox: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  },
  infoTitle: {
    color: "#0f172a",
    marginTop: "0",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  codeBlock: {
    background: "#0f172a",
    color: "#22c55e",
    padding: "20px",
    borderRadius: "8px",
    overflow: "auto",
    fontSize: "0.85rem",
    lineHeight: "1.6",
    margin: "0",
    fontFamily: "monospace",
  },
};

export default LoaderDemo;
