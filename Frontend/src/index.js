/**
 * Main Entry Point - HelloDoc Frontend Application
 * 
 * This file initializes the React application and renders it to the DOM.
 * It imports the global CSS styles and the main App component.
 * 
 * React StrictMode is enabled for development to help identify potential issues.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
