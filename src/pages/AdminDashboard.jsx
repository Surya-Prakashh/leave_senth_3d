import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState({
    employeeName: '',
    leaveType: '',
    status: ''
  });

  const fetchLeaveRequests = async () => {
    const res = await fetch('http://localhost:5000/api/leaves');
    const data = await res.json();
    setLeaveRequests(data);
  };

  const handleStatusUpdate = async (id, status) => {
    await fetch(`http://localhost:5000/api/leaves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchLeaveRequests();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const filteredRequests = leaveRequests.filter((request) => {
    return (
      request.employeeName.toLowerCase().includes(filter.employeeName.toLowerCase()) &&
      (filter.leaveType === '' || request.leaveType === filter.leaveType) &&
      (filter.status === '' || request.status === filter.status)
    );
  });

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="filter-section">
          <h2>Filters</h2>
          <div className="filter-form">
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                value={filter.employeeName}
                onChange={(e) => setFilter({ ...filter, employeeName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Leave Type</label>
              <select
                value={filter.leaveType}
                onChange={(e) => setFilter({ ...filter, leaveType: e.target.value })}
              >
                <option value="">All</option>
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="leave-requests-section">
          <h2>Leave Requests</h2>
          <div className="leave-requests">
            {filteredRequests.map((request) => (
              <div key={request._id} className="leave-card">
                <div className="leave-card-header">
                  <span className="employee-name">{request.employeeName}</span>
                  <span className={`leave-status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>
                <div className="leave-card-content">
                  <p>Type: {request.leaveType}</p>
                  <p>From: {request.fromDate}</p>
                  <p>To: {request.toDate}</p>
                  <p>Reason: {request.reason}</p>
                </div>
                {request.status === 'Pending' && (
                  <div className="leave-card-actions">
                    <button
                      className="approve-button"
                      onClick={() => handleStatusUpdate(request._id, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusUpdate(request._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
