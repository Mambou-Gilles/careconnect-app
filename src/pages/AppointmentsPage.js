import React, { useState } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { mockAppointments } from '../data/appointments';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    date: '',
    time: '',
    provider: '',
    type: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppt({ ...newAppt, [name]: value });
  };

  const handleAddAppointment = () => {
    if (Object.values(newAppt).some(val => !val.trim())) {
      alert('Please fill in all appointment fields.');
      return;
    }
    const id = `appt${appointments.length + 1}`;
    setAppointments([...appointments, { id, ...newAppt }]);
    setNewAppt({
      date: '',
      time: '',
      provider: '',
      type: '',
      location: '',
    });
    setShowAddForm(false);
    alert('Appointment added! (Simulated)');
  };

  // Sort appointments by date, then by time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateA - dateB;
  });

  const upcomingAppointments = sortedAppointments.filter(appt => new Date(appt.date + ' ' + appt.time) >= new Date());
  const pastAppointments = sortedAppointments.filter(appt => new Date(appt.date + ' ' + appt.time) < new Date());

  return (
    <div className="container">
      <h2>My Appointments</h2>

      <div style={{ marginBottom: '30px' }}>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Hide Form' : 'Simulate Add New Appointment'}
        </Button>

        {showAddForm && (
          <Card style={{ marginTop: '20px' }}>
            <h3>Add New Appointment</h3>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" value={newAppt.date} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input type="time" name="time" value={newAppt.time} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Provider:</label>
              <input type="text" name="provider" placeholder="e.g., Dr. Jane Smith" value={newAppt.provider} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input type="text" name="type" placeholder="e.g., Annual Physical" value={newAppt.type} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" name="location" placeholder="e.g., Clinic B, Room 205" value={newAppt.location} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <Button onClick={handleAddAppointment} style={{ marginTop: '15px' }}>Add Appointment</Button>
          </Card>
        )}
      </div>

      <h3>Upcoming Appointments ({upcomingAppointments.length})</h3>
      {upcomingAppointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        upcomingAppointments.map((appt) => (
          <Card key={appt.id} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{appt.type}</h3>
              <span style={{ fontSize: '0.9em', color: 'var(--text-color)' }}>
                **{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}** at **{appt.time}**
              </span>
            </div>
            <p>Provider: **{appt.provider}**</p>
            <p>Location: {appt.location}</p>
          </Card>
        ))
      )}

      <h3>Past Appointments ({pastAppointments.length})</h3>
      {pastAppointments.length === 0 ? (
        <p>No past appointments recorded.</p>
      ) : (
        pastAppointments.map((appt) => (
          <Card key={appt.id} style={{ marginBottom: '15px', opacity: 0.7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{appt.type}</h3>
              <span style={{ fontSize: '0.9em', color: 'var(--text-color)' }}>
                **{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}** at **{appt.time}**
              </span>
            </div>
            <p>Provider: **{appt.provider}**</p>
            <p>Location: {appt.location}</p>
          </Card>
        ))
      )}
    </div>
  );
};

export default AppointmentsPage;
































// import React from 'react';
// import Card from '../components/Card/Card';
// import { mockAppointments } from '../data/appointments';

// const AppointmentsPage = () => {
//   // Sort appointments by date, then by time
//   const sortedAppointments = [...mockAppointments].sort((a, b) => {
//     const dateA = new Date(a.date + ' ' + a.time);
//     const dateB = new Date(b.date + ' ' + b.time);
//     return dateA - dateB;
//   });

//   return (
//     <div className="container">
//       <h2>My Appointments</h2>
//       <div>
//         {sortedAppointments.length === 0 ? (
//           <p>You currently have no appointments scheduled.</p>
//         ) : (
//           sortedAppointments.map((appt) => (
//             <Card key={appt.id}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h3>{appt.type}</h3>
//                 <span style={{ fontSize: '0.9em', color: '#555' }}>
//                   **{appt.date}** at **{appt.time}**
//                 </span>
//               </div>
//               <p>Provider: **{appt.provider}**</p>
//               <p>Location: {appt.location}</p>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppointmentsPage;