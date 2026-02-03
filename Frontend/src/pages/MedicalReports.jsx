/**
 * Medical Reports Page
 * 
 * Displays patient medical reports and prescriptions uploaded by doctors.
 * 
 * Features:
 * - Display list of medical reports and prescriptions
 * - View reports online with full details
 * - Download reports as PDF
 * - Filter by report type (Report, Prescription)
 * - Search by doctor name or date
 * - Loading state with ring loader animation
 * - Responsive card-based layout
 * 
 * Props: None (uses internal state and mock data)
 * 
 * Dependencies:
 * - Loader component for loading state
 * - MedicalReports.css for styling
 * - html2pdf library for PDF download
 */

import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "../styles/pages/MedicalReports.css";

// Mock data - Replace with API call to fetch patient's reports
const mockReportsData = [
  {
    id: 1,
    doctorName: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    type: "Report",
    title: "Heart Health Check-up Report",
    date: "2024-01-15",
    description: "Comprehensive cardiac examination and ECG analysis",
    fileUrl: "heart-report-jan2024.pdf",
    content: "Heart Rate: 72 BPM\nBlood Pressure: 120/80 mmHg\nECG: Normal\nConclusion: Patient is in good cardiac health. Continue regular exercise routine.",
  },
  {
    id: 2,
    doctorName: "Dr. James Anderson",
    specialty: "Dermatologist",
    type: "Prescription",
    title: "Skin Treatment Prescription",
    date: "2024-01-10",
    description: "Prescribed medications for dermatitis treatment",
    fileUrl: "derma-prescription-jan2024.pdf",
    content: "Medication 1: Hydrocortisone Cream 1% - Apply twice daily\nMedication 2: Cetirizine 10mg - Take once daily\nDuration: 2 weeks\nFollow-up: After 2 weeks",
  },
  {
    id: 3,
    doctorName: "Dr. Maria Hernandez",
    specialty: "Pediatrician",
    type: "Report",
    title: "Annual Health Check-up Report",
    date: "2024-01-05",
    description: "Routine pediatric examination and growth assessment",
    fileUrl: "pediatric-report-jan2024.pdf",
    content: "Height: 140cm\nWeight: 35kg\nVaccination Status: Up to date\nDental Health: Good\nOverall Assessment: Child is healthy and developing normally.",
  },
  {
    id: 4,
    doctorName: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    type: "Prescription",
    title: "Blood Pressure Management Prescription",
    date: "2023-12-28",
    description: "Medication prescription for blood pressure control",
    fileUrl: "bp-prescription-dec2023.pdf",
    content: "Medication: Lisinopril 10mg - Take once daily\nDosage Instructions: Take in the morning with water\nDuration: Ongoing\nMonitor: Check BP weekly",
  },
];

function MedicalReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Load mock reports data
  useEffect(() => {
    setReports(mockReportsData);
  }, []);

  // Loader will only show during actual network requests (e.g., API calls)

  // Filter reports based on type and search query
  const filteredReports = reports.filter((report) => {
    const matchType = filterType === "all" || report.type === filterType;
    const matchSearch =
      report.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.date.includes(searchQuery);
    return matchType && matchSearch;
  });

  // Handle viewing report details
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Handle PDF download
  const handleDownloadPDF = (report) => {
    // Create a simple PDF-like download
    // For production, use html2pdf or jsPDF library
    const pdfContent = `
MEDICAL REPORT / PRESCRIPTION
================================

Doctor: ${report.doctorName}
Specialty: ${report.specialty}
Date: ${report.date}
Type: ${report.type}
Title: ${report.title}

Description: ${report.description}

DETAILS:
${report.content}

================================
Generated on: ${new Date().toLocaleString()}
Patient Portal - HelloDoc
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(pdfContent)
    );
    element.setAttribute("download", `${report.title.replace(/\s+/g, "-")}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      {isLoading ? (
        <Loader type="ring" message="Loading your medical reports..." />
      ) : (
        <div className="dashboard-page">
          {/* PAGE CONTROLS */}
          <div className="dashboard-sticky">
            <div className="page-header-row">
              <div /> {/* empty left column – title comes from Layout */}
              <div className="page-header-actions">
                <input
                  type="text"
                  placeholder="Search by doctor, title, or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="reports-filter">
              <button
                className={`filter-btn ${filterType === "all" ? "active" : ""}`}
                onClick={() => setFilterType("all")}
              >
                All ({reports.length})
              </button>
              <button
                className={`filter-btn ${filterType === "Report" ? "active" : ""}`}
                onClick={() => setFilterType("Report")}
              >
                Reports ({reports.filter((r) => r.type === "Report").length})
              </button>
              <button
                className={`filter-btn ${filterType === "Prescription" ? "active" : ""}`}
                onClick={() => setFilterType("Prescription")}
              >
                Prescriptions (
                {reports.filter((r) => r.type === "Prescription").length})
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="dashboard-scroll">
            <div className="reports-container">
              {filteredReports.length > 0 ? (
                <div className="reports-grid">
                  {filteredReports.map((report) => (
                    <div key={report.id} className="report-card">
                      <div className="report-header">
                        <span className={`report-type ${report.type.toLowerCase()}`}>
                          {report.type}
                        </span>
                        <span className="report-date">{report.date}</span>
                      </div>

                      <div className="report-body">
                        <h3 className="report-title">{report.title}</h3>

                        <div className="report-doctor">
                          <p className="doctor-name">{report.doctorName}</p>
                          <p className="doctor-specialty">{report.specialty}</p>
                        </div>

                        <p className="report-description">
                          {report.description}
                        </p>
                      </div>

                      <div className="report-actions">
                        <button
                          className="btn btn-view"
                          onClick={() => handleViewReport(report)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-download"
                          onClick={() => handleDownloadPDF(report)}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reports">
                  <p>No medical reports found.</p>
                  <p className="text-muted">
                    {searchQuery
                      ? "Try adjusting your search criteria."
                      : "Medical reports uploaded by your doctors will appear here."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR VIEWING REPORT DETAILS */}
      {showModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedReport.title}</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">Doctor:</span>
                  <span className="meta-value">{selectedReport.doctorName}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Specialty:</span>
                  <span className="meta-value">
                    {selectedReport.specialty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Date:</span>
                  <span className="meta-value">{selectedReport.date}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Type:</span>
                  <span className={`type-badge ${selectedReport.type.toLowerCase()}`}>
                    {selectedReport.type}
                  </span>
                </div>
              </div>

              <div className="modal-description">
                <h4>Description</h4>
                <p>{selectedReport.description}</p>
              </div>

              <div className="modal-report-content">
                <h4>Report Details</h4>
                <pre>{selectedReport.content}</pre>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-download"
                onClick={() => {
                  handleDownloadPDF(selectedReport);
                  setShowModal(false);
                }}
              >
                Download PDF
              </button>
              <button
                className="btn btn-close"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MedicalReports;
