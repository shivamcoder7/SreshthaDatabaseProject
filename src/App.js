import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Alert } from '@mui/material';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import { getMembers, createMember, updateMember, deleteMember } from './services/api';

// Dummy data for testing when backend is not connected
const dummyMembers = [
  {
    _id: '1',
    batch: '2023-01',
    sNo: '001',
    name: 'Shivam Pr',
    dateOfBirth: '1990-05-15',
    department: 'Engineering',
    profession: 'Software Engineer',
    phoneNo: '123-456-7890',
    facilitator: 'Surya Narayan Pr',
    chanting: 32,
    reading: true,
    hearing: false,
    seriousness: 'Low',
    remarks: 'Active participant in morning chanting sessions'
  },
  {
    _id: '2',
    batch: '2023-01',
    sNo: '002',
    name: 'Suresh Pr',
    dateOfBirth: '1988-08-22',
    department: 'Medical',
    profession: 'Doctor',
    phoneNo: '098-765-4321',
    facilitator: 'Surya Narayan Pr',
    chanting: 64,
    reading: true,
    hearing: true,
    seriousness: 'High',
    remarks: 'Regular attendee of reading sessions'
  },
  {
    _id: '3',
    batch: '2023-02',
    sNo: '003',
    name: 'Mohit Pr',
    dateOfBirth: '1995-03-10',
    department: 'Education',
    profession: 'Teacher',
    phoneNo: '555-555-5555',
    facilitator: 'Surya Narayan Pr',
    chanting: 48,
    reading: false,
    hearing: true,
    seriousness: 'High',
    remarks: 'Excellent progress in chanting practice'
  },
  {
    _id: '4',
    batch: '2023-02',
    sNo: '004',
    name: 'Neetan Pr',
    dateOfBirth: '1992-11-30',
    department: 'Arts',
    profession: 'Artist',
    phoneNo: '777-888-9999',
    facilitator: 'Surya Narayan Pr',
    chanting: 64,
    reading: true,
    hearing: true,
    seriousness: 'High',
    remarks: 'Participates in all activities enthusiastically'
  },
  {
    _id: '5',
    batch: '2023-03',
    sNo: '005',
    name: 'Dhruv Pr',
    dateOfBirth: '1985-07-18',
    department: 'Business',
    profession: 'Entrepreneur',
    phoneNo: '444-333-2222',
    facilitator: 'Saroj Mukh Madhav Prji',
    chanting: 64,
    reading: true,
    hearing: true,
    seriousness: 'High',
    remarks: 'Focuses mainly on reading sessions'
  }
];

function App() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
      setIsBackendConnected(true);
      setError(null);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Backend server is not connected. Showing dummy data.');
      setMembers(dummyMembers);
      setIsBackendConnected(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isBackendConnected) {
        if (selectedMember) {
          await updateMember(selectedMember._id, formData);
        } else {
          await createMember(formData);
        }
        fetchMembers();
      } else {
        // Handle dummy data updates
        if (selectedMember) {
          setMembers(members.map(m => 
            m._id === selectedMember._id ? { ...formData, _id: m._id } : m
          ));
        } else {
          setMembers([...members, { ...formData, _id: Date.now().toString() }]);
        }
      }
      setShowForm(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
      setError('Failed to save member data.');
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      if (isBackendConnected) {
        await deleteMember(id);
        fetchMembers();
      } else {
        // Handle dummy data deletion
        setMembers(members.filter(m => m._id !== id));
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Failed to delete member.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedMember(null);
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      py: 4
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
        <Box sx={{ 
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            Sreshtha Member Management
          </Typography>
          
          {error && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {!showForm && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)}
              sx={{ mb: 2 }}
            >
              Add New Member
            </Button>
          )}

          {showForm ? (
            <MemberForm
              member={selectedMember}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <MemberList
              members={members}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App; 