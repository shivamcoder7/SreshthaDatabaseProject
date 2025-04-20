import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const MemberList = ({ members, onEdit, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    // Filter members based on search query
    const filteredMembers = useMemo(() => {
        if (!searchQuery.trim()) return members;
        
        const query = searchQuery.toLowerCase().trim();
        
        return members.filter(member => {
            // Check all fields for a match
            return (
                member.batch?.toLowerCase().includes(query) ||
                member.sNo?.toLowerCase().includes(query) ||
                member.name?.toLowerCase().includes(query) ||
                formatDate(member.dateOfBirth).toLowerCase().includes(query) ||
                member.department?.toLowerCase().includes(query) ||
                member.profession?.toLowerCase().includes(query) ||
                member.phoneNo?.toLowerCase().includes(query) ||
                member.facilitator?.toLowerCase().includes(query) ||
                (member.chanting?.toString() || '').includes(query) ||
                (member.reading?.toString() || '').includes(query) ||
                (member.hearing?.toString() || '').includes(query) ||
                member.seriousness?.toLowerCase().includes(query) ||
                member.remarks?.toLowerCase().includes(query)
            );
        });
    }, [members, searchQuery]);

    return (
        <Box sx={{ 
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            boxSizing: 'border-box'
        }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Sreshtha Members
            </Typography>
            
            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by any field (name, batch, phone, etc.)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                    {filteredMembers.length} of {members.length} members found
                </Typography>
            </Box>
            
            <TableContainer 
                component={Paper}
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    '& .MuiTableCell-root': {
                        py: 1.5,
                        px: 2,
                        whiteSpace: 'nowrap'
                    }
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Batch</TableCell>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Profession</TableCell>
                            <TableCell>Phone No</TableCell>
                            <TableCell>Facilitator</TableCell>
                            <TableCell align="center">Chanting</TableCell>
                            <TableCell align="center">Reading</TableCell>
                            <TableCell align="center">Hearing</TableCell>
                            <TableCell>Seriousness</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMembers.map((member) => (
                            <TableRow key={member._id}>
                                <TableCell>{member.batch}</TableCell>
                                <TableCell>{member.sNo}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{formatDate(member.dateOfBirth)}</TableCell>
                                <TableCell>{member.department}</TableCell>
                                <TableCell>{member.profession}</TableCell>
                                <TableCell>{member.phoneNo}</TableCell>
                                <TableCell>{member.facilitator}</TableCell>
                                <TableCell align="center">{member.chanting || '-'}</TableCell>
                                <TableCell align="center">{member.reading || '-'}</TableCell>
                                <TableCell align="center">{member.hearing || '-'}</TableCell>
                                <TableCell>{member.seriousness}</TableCell>
                                <TableCell>{member.remarks}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => onEdit(member)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onDelete(member._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MemberList; 