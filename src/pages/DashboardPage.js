import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { mockAppointments } from '../data/appointments';
import { mockMessages } from '../data/messages';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const patientName = "Jane Doe";
  const primaryCareProvider = "Dr. Emily White";
  const lastVisit = "June 10, 2025";
  const unreadMessages = mockMessages.filter(msg => !msg.read).length;

  // Find the next upcoming appointment
  const now = new Date();
  const nextAppointment = mockAppointments
    .filter(appt => new Date(appt.date + ' ' + appt.time) >= now)
    .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))[0];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Loading patient dashboard...</p>
        {/* You can add a simple spinner icon here */}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome back, **{patientName}**!</h2>

      <Card className="summary-card">
        <h3>Your Health Snapshot</h3>
        <p>
          **Primary Care Provider:** {primaryCareProvider}
        </p>
        <p>
          **Last Visit:** {lastVisit}
        </p>
        <p>
          **Recent Health Status:** Blood pressure stable, medication review complete.
        </p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
        <Card>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span role="img" aria-label="calendar">📅</span> My Appointments
          </h3>
          {nextAppointment ? (
            <>
              <p>
                **Next:** {new Date(nextAppointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {nextAppointment.time}
              </p>
              <p>With: **{nextAppointment.provider}** for {nextAppointment.type}</p>
            </>
          ) : (
            <p>No upcoming appointments found. Stay healthy!</p>
          )}
          <Link to="/appointments">
            <Button variant="secondary" style={{ marginTop: '15px' }}>View All Appointments</Button>
          </Link>
        </Card>

        <Card>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span role="img" aria-label="envelope">✉️</span> My Messages
          </h3>
          {unreadMessages > 0 ? (
            <p>You have **{unreadMessages} new message(s)** waiting.</p>
          ) : (
            <p>No new messages. Your inbox is clear!</p>
          )}
          <Link to="/messages">
            <Button variant="secondary" style={{ marginTop: '15px' }}>Go to Messages</Button>
          </Link>
        </Card>

        <Card>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span role="img" aria-label="book">📚</span> Health Resources
          </h3>
          <p>Explore a curated library of health and wellness information.</p>
          <Link to="/resources">
            <Button variant="secondary" style={{ marginTop: '15px' }}>Browse Resources</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;










// import React from 'react';
// import { Link } from 'react-router-dom';
// import Card from '../components/Card/Card';
// import Button from '../components/Button/Button';
// import { mockAppointments } from '../data/appointments';
// import { mockMessages } from '../data/messages';

// const DashboardPage = () => {
//   const patientName = "Jane Doe"; // Mock patient name
//   const unreadMessages = mockMessages.filter(msg => !msg.read).length;
//   const nextAppointment = mockAppointments.find(appt => new Date(appt.date) >= new Date()) || mockAppointments[0]; // Get next or first

//   return (
//     <div className="container">
//       <h2>Welcome, {patientName}!</h2>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
//         <Card>
//           <h3>My Appointments</h3>
//           {nextAppointment ? (
//             <p>
//               **Next: {nextAppointment.date} at {nextAppointment.time} with {nextAppointment.provider} ({nextAppointment.type})**
//             </p>
//           ) : (
//             <p>No upcoming appointments.</p>
//           )}
//           <Link to="/appointments">
//             <Button variant="secondary">View All Appointments</Button>
//           </Link>
//         </Card>

//         <Card>
//           <h3>My Messages</h3>
//           {unreadMessages > 0 ? (
//             <p>You have **{unreadMessages} new message(s)**.</p>
//           ) : (
//             <p>No new messages.</p>
//           )}
//           <Link to="/messages">
//             <Button variant="secondary">Go to Messages</Button>
//           </Link>
//         </Card>

//         <Card>
//           <h3>Health Resources</h3>
//           <p>Explore a library of health and wellness information.</p>
//           <Link to="/resources">
//             <Button variant="secondary">Browse Resources</Button>
//           </Link>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;