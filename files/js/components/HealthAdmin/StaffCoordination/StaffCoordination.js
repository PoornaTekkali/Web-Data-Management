import React, { useState } from 'react';
import './StaffCoordination.css'; // Import CSS file for styling

function StaffCoordination() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'John Doe', role: 'Healthcare Provider', accessLevel: 'Full Access' },
    { id: 2, name: 'Jane Smith', role: 'Pharmacist', accessLevel: 'Limited Access' },
    { id: 3, name: 'Emily Johnson', role: 'Healthcare Provider', accessLevel: 'Full Access' },
    { id: 4, name: 'David Brown', role: 'Administrator', accessLevel: 'Full Access' },
    { id: 5, name: 'Sarah Lee', role: 'Healthcare Provider', accessLevel: 'Limited Access' },
    { id: 6, name: 'Michael Taylor', role: 'Healthcare Provider', accessLevel: 'Limited Access' },
  ]);

  const handleAccessLevelChange = (id, newAccessLevel) => {
    const updatedStaff = staff.map(member => {
      if (member.id === id) {
        return { ...member, accessLevel: newAccessLevel };
      }
      return member;
    });
    setStaff(updatedStaff);
  };

  return (
    <div className='staff-container'>
    <div className="staff-coordination-container">
      <h1 className='staff-heading'>Staff Coordination</h1>
      <div className="staff-list">
        <h2>Staff List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Access Level</th>
              <th>Change Access Level</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.accessLevel}</td>
                <td>
                  <select
                    value={member.accessLevel}
                    onChange={(e) => handleAccessLevelChange(member.id, e.target.value)}
                  >
                    <option value="Full Access">Full Access</option>
                    <option value="Limited Access">Limited Access</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default StaffCoordination;
