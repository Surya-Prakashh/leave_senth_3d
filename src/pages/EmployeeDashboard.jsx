import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function EmployeeDashboard() {
  const navigate = useNavigate();

  const [leaveForm, setLeaveForm] = useState({
    fromDate: '',
    toDate: '',
    leaveType: 'Casual',
    reason: ''
  });

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [availableLeaves, setAvailableLeaves] = useState({
    Casual: 12,
    Sick: 10,
    Emergency: 5
  });

  const employeeName = localStorage.getItem('username') || 'Employee';
  const employeeEmail = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/leaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leaveForm, employeeName })
    });

    if (response.ok) {
      alert('Leave application submitted successfully!');
      setLeaveForm({ fromDate: '', toDate: '', leaveType: 'Casual', reason: '' });
      fetchLeaveHistory();
    } else {
      alert('Failed to submit leave application.');
    }
  };

  const fetchLeaveHistory = async () => {
    const res = await fetch(`http://localhost:5000/api/leaves/employee/${employeeName}`);
    const data = await res.json();
    setLeaveHistory(data);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <div className="dashboard-container gold-black-theme">
      <header className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="leave-form-section">
          <h2>Apply for Leave</h2>
          <form onSubmit={handleSubmit} className="leave-form">
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                value={leaveForm.fromDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                value={leaveForm.toDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Leave Type</label>
              <select
                value={leaveForm.leaveType}
                onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
              >
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="leave-balance">
          <h2>Available Leaves</h2>
          <ul>
            <li>Casual: {availableLeaves.Casual}</li>
            <li>Sick: {availableLeaves.Sick}</li>
            <li>Emergency: {availableLeaves.Emergency}</li>
          </ul>
        </div>

        <div className="leave-history-section">
          <h2>Leave History</h2>
          <div className="leave-history">
            {leaveHistory.map((leave) => (
              <div key={leave._id} className={`leave-card ${leave.status.toLowerCase()}`}>
                <div className="leave-card-header">
                  <span className="leave-type">{leave.leaveType}</span>
                  <span className={`leave-status ${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </div>
                <div className="leave-card-content">
                  <p>From: {leave.fromDate}</p>
                  <p>To: {leave.toDate}</p>
                  <p>Reason: {leave.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
