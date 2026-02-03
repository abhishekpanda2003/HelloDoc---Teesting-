/**
 * Payments Page
 * 
 * Displays patient payment history and billing information.
 * 
 * Features:
 * - Display all payments made by patient
 * - Show payment status (Completed, Pending, Cancelled)
 * - Filter by payment status
 * - Search by doctor name, appointment date, or amount
 * - View payment details
 * - Download payment receipts
 * - Display payment method used
 * - Show total amount paid
 * - Responsive card-based layout
 * 
 * Props: None (uses internal state and mock data)
 * 
 * Dependencies:
 * - Loader component for loading state
 * - Payments.css for styling
 */

import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "../styles/pages/Payments.css";

// Mock data - Replace with API call to fetch patient's payments
const mockPaymentsData = [
  {
    id: "PAY-001",
    doctorName: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    appointmentDate: "2024-01-15",
    amount: 150.00,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2024-01-15",
    transactionId: "TXN-2024-001",
    description: "Consultation - Heart Health Check-up",
  },
  {
    id: "PAY-002",
    doctorName: "Dr. James Anderson",
    specialty: "Dermatologist",
    appointmentDate: "2024-01-10",
    amount: 100.00,
    paymentMethod: "Debit Card",
    status: "Completed",
    date: "2024-01-10",
    transactionId: "TXN-2024-002",
    description: "Consultation - Skin Treatment",
  },
  {
    id: "PAY-003",
    doctorName: "Dr. Maria Hernandez",
    specialty: "Pediatrician",
    appointmentDate: "2024-01-05",
    amount: 80.00,
    paymentMethod: "UPI",
    status: "Completed",
    date: "2024-01-05",
    transactionId: "TXN-2024-003",
    description: "Consultation - Annual Health Check-up",
  },
  {
    id: "PAY-004",
    doctorName: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    appointmentDate: "2024-01-20",
    amount: 150.00,
    paymentMethod: "Credit Card",
    status: "Pending",
    date: "2024-01-20",
    transactionId: "TXN-2024-004",
    description: "Consultation - Blood Pressure Management",
  },
  {
    id: "PAY-005",
    doctorName: "Dr. John Smith",
    specialty: "Neurologist",
    appointmentDate: "2023-12-28",
    amount: 120.00,
    paymentMethod: "Net Banking",
    status: "Completed",
    date: "2023-12-28",
    transactionId: "TXN-2023-005",
    description: "Consultation - Neurological Examination",
  },
];

function Payments() {
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Load mock payments data
  useEffect(() => {
    setPayments(mockPaymentsData);
  }, []);

  // Loader will only show during actual network requests (e.g., API calls)

  // Calculate total amount paid (only completed payments)
  const totalPaid = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  // Filter payments based on status and search query
  const filteredPayments = payments.filter((payment) => {
    const matchStatus =
      filterStatus === "all" || payment.status === filterStatus;
    const matchSearch =
      payment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.appointmentDate.includes(searchQuery) ||
      payment.amount.toString().includes(searchQuery) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Handle viewing payment details
  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  // Handle receipt download
  const handleDownloadReceipt = (payment) => {
    const receiptContent = `
╔════════════════════════════════════════════════════════════╗
║                    PAYMENT RECEIPT                         ║
║                      HelloDoc                              ║
╚════════════════════════════════════════════════════════════╝

Receipt Number: ${payment.id}
Transaction ID: ${payment.transactionId}
Date: ${payment.date}

────────────────────────────────────────────────────────────

PAYMENT DETAILS:
────────────────────────────────────────────────────────────

Doctor Name:          ${payment.doctorName}
Specialty:            ${payment.specialty}
Appointment Date:     ${payment.appointmentDate}
Description:          ${payment.description}

────────────────────────────────────────────────────────────

AMOUNT DETAILS:
────────────────────────────────────────────────────────────

Consultation Fee:     ₹${payment.amount.toFixed(2)}
Taxes:                ₹0.00
Total Amount:         ₹${payment.amount.toFixed(2)}

────────────────────────────────────────────────────────────

PAYMENT INFORMATION:
────────────────────────────────────────────────────────────

Payment Method:       ${payment.paymentMethod}
Payment Status:       ${payment.status}

────────────────────────────────────────────────────────────

Thank you for using HelloDoc!

This is a computer-generated receipt. No signature is required.

Generated on: ${new Date().toLocaleString()}
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent)
    );
    element.setAttribute(
      "download",
      `Receipt-${payment.id}-${payment.date}.txt`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "Pending":
        return "status-pending";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader type="ring" message="Loading your payment history..." />
      ) : (
        <div className="dashboard-page">
          {/* PAGE CONTROLS */}
          <div className="dashboard-sticky">
            <div className="page-header-row">
              <div /> {/* empty left column – title comes from Layout */}
              <div className="page-header-actions">
                <input
                  type="text"
                  placeholder="Search by doctor, date, or amount..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="payments-filter">
              <button
                className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
                onClick={() => setFilterStatus("all")}
              >
                All ({payments.length})
              </button>
              <button
                className={`filter-btn ${filterStatus === "Completed" ? "active" : ""}`}
                onClick={() => setFilterStatus("Completed")}
              >
                Completed (
                {payments.filter((p) => p.status === "Completed").length})
              </button>
              <button
                className={`filter-btn ${filterStatus === "Pending" ? "active" : ""}`}
                onClick={() => setFilterStatus("Pending")}
              >
                Pending ({payments.filter((p) => p.status === "Pending").length})
              </button>
              <button
                className={`filter-btn ${filterStatus === "Cancelled" ? "active" : ""}`}
                onClick={() => setFilterStatus("Cancelled")}
              >
                Cancelled (
                {payments.filter((p) => p.status === "Cancelled").length})
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="dashboard-scroll">
            {/* SUMMARY CARD */}
            <div className="payments-summary">
              <div className="summary-item">
                <span className="summary-label">Total Paid</span>
                <span className="summary-value">₹{totalPaid.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Transactions</span>
                <span className="summary-value">{payments.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Completed</span>
                <span className="summary-value">
                  {payments.filter((p) => p.status === "Completed").length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pending</span>
                <span className="summary-value">
                  {payments.filter((p) => p.status === "Pending").length}
                </span>
              </div>
            </div>

            {/* PAYMENTS TABLE/CARDS */}
            <div className="payments-container">
              {filteredPayments.length > 0 ? (
                <div className="payments-list">
                  {filteredPayments.map((payment) => (
                    <div key={payment.id} className="payment-row">
                      <div className="payment-info">
                        <div className="payment-header">
                          <h4 className="doctor-name">{payment.doctorName}</h4>
                          <span
                            className={`payment-status ${getStatusClass(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </div>

                        <div className="payment-details">
                          <p className="detail-item">
                            <span className="label">Appointment Date:</span>
                            <span className="value">
                              {payment.appointmentDate}
                            </span>
                          </p>
                          <p className="detail-item">
                            <span className="label">Payment Method:</span>
                            <span className="value">
                              {payment.paymentMethod}
                            </span>
                          </p>
                          <p className="detail-item">
                            <span className="label">Transaction ID:</span>
                            <span className="value">
                              {payment.transactionId}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="payment-amount">
                        <span className="amount">₹{payment.amount.toFixed(2)}</span>
                        <span className="payment-date">{payment.date}</span>
                      </div>

                      <div className="payment-actions">
                        <button
                          className="btn btn-view"
                          onClick={() => handleViewReceipt(payment)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-download"
                          onClick={() => handleDownloadReceipt(payment)}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-payments">
                  <p>No payments found.</p>
                  <p className="text-muted">
                    {searchQuery
                      ? "Try adjusting your search criteria."
                      : "Your payment history will appear here."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR VIEWING RECEIPT */}
      {showModal && selectedPayment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Receipt</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* RECEIPT HEADER */}
              <div className="receipt-header">
                <h3>HelloDoc</h3>
                <p>Digital Healthcare Platform</p>
              </div>

              {/* RECEIPT DETAILS */}
              <div className="receipt-section">
                <h4>Receipt Information</h4>
                <div className="receipt-info">
                  <div className="info-row">
                    <span className="info-label">Receipt Number:</span>
                    <span className="info-value">{selectedPayment.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Transaction ID:</span>
                    <span className="info-value">
                      {selectedPayment.transactionId}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{selectedPayment.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span
                      className={`info-status ${getStatusClass(
                        selectedPayment.status
                      )}`}
                    >
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* DOCTOR INFORMATION */}
              <div className="receipt-section">
                <h4>Doctor Information</h4>
                <div className="receipt-info">
                  <div className="info-row">
                    <span className="info-label">Doctor Name:</span>
                    <span className="info-value">
                      {selectedPayment.doctorName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Specialty:</span>
                    <span className="info-value">
                      {selectedPayment.specialty}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Appointment Date:</span>
                    <span className="info-value">
                      {selectedPayment.appointmentDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div className="receipt-section">
                <h4>Payment Details</h4>
                <div className="receipt-info">
                  <div className="info-row">
                    <span className="info-label">Service:</span>
                    <span className="info-value">
                      {selectedPayment.description}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Payment Method:</span>
                    <span className="info-value">
                      {selectedPayment.paymentMethod}
                    </span>
                  </div>
                  <div className="info-row total">
                    <span className="info-label">Total Amount:</span>
                    <span className="info-value amount">
                      ₹{selectedPayment.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER NOTE */}
              <div className="receipt-footer">
                <p>
                  This is a computer-generated receipt. No signature is
                  required.
                </p>
                <p className="timestamp">
                  Generated on {new Date().toLocaleString()}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-download"
                onClick={() => {
                  handleDownloadReceipt(selectedPayment);
                  setShowModal(false);
                }}
              >
                Download Receipt
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

export default Payments;
