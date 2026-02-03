/**
 * Loader Component - Reusable Loading Animation
 * 
 * A flexible loading spinner with multiple animation styles.
 * Used throughout the application to indicate loading states.
 * 
 * Animation Types:
 * 1. "spinner" (default): Classic rotating circle spinner
 * 2. "pulse": Pulsing dot with fade in/out effect
 * 3. "dots": Three bouncing dots animation
 * 4. "gradient": Rotating gradient ring with color transitions
 * 5. "wave": Five staggered wave bars
 * 6. "ring": Three concentric rotating rings (CHOSEN FOR PRODUCTION)
 * 
 * Props:
 * - type: Animation type (default: "spinner")
 *   Valid values: "spinner" | "pulse" | "dots" | "gradient" | "wave" | "ring"
 * - message: Optional loading message text (default: "Loading...")
 *   Pass empty string to hide message
 * 
 * Styling:
 * - Centered overlay with semi-transparent backdrop
 * - Flexible sizing based on animation type
 * - Smooth transitions
 * - Mobile responsive
 * 
 * Usage Examples:
 * <Loader />
 * <Loader type="ring" message="Loading your dashboard..." />
 * <Loader type="wave" />
 * <Loader type="dots" message="" />
 * 
 * CSS Dependencies: Loader.css with all animation keyframes
 */

import "../styles/components/Loader.css";

function Loader({ type = "spinner", message = "Loading..." }) {
  const renderLoader = () => {
    switch (type) {
      case "pulse":
        return <div className="pulse-loader"></div>;

      case "dots":
        return (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );

      case "gradient":
        return <div className="gradient-spinner"></div>;

      case "wave":
        return (
          <div className="wave-loader">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        );

      case "ring":
        return (
          <div className="ring-loader">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>
        );

      case "spinner":
      default:
        return <div className="spinner"></div>;
    }
  };

  return (
    <div className="loader-container">
      <div className="loader-content">
        {renderLoader()}
        {message && <p className="loader-text">{message}</p>}
      </div>
    </div>
  );
}

export default Loader;
