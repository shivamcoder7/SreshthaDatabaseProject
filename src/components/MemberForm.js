import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Divider,
    Container
} from '@mui/material';

const MemberForm = ({ member, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        batch: '',
        sNo: '',
        name: '',
        dateOfBirth: '',
        department: '',
        profession: '',
        phoneNo: '',
        facilitator: '',
        chanting: '',
        reading: '',
        hearing: '',
        seriousness: '',
        remarks: ''
    });

    useEffect(() => {
        if (member) {
            setFormData({
                batch: member.batch || '',
                sNo: member.sNo || '',
                name: member.name || '',
                dateOfBirth: member.dateOfBirth || '',
                department: member.department || '',
                profession: member.profession || '',
                phoneNo: member.phoneNo || '',
                facilitator: member.facilitator || '',
                chanting: member.chanting || '',
                reading: member.reading || '',
                hearing: member.hearing || '',
                seriousness: member.seriousness || '',
                remarks: member.remarks || ''
            });
        }
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Generate options from 1 to 64
    const numericOptions = Array.from({ length: 64 }, (_, i) => i + 1);

    return (
        <Box sx={{ 
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            boxSizing: 'border-box',
            overflow: 'auto'
        }}>
            <Paper sx={{ 
                p: 3,
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography variant="h6" gutterBottom>
                    {member ? 'Edit Member' : 'Add New Member'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ 
                    mt: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Basic Information Section */}
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                        Basic Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>

                    {/* Identification Section */}
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Identification
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Batch"
                                name="batch"
                                value={formData.batch}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="S.No"
                                name="sNo"
                                value={formData.sNo}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Professional Information Section */}
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Professional Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Profession"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Contact Information Section */}
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Contact Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Phone No"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Facilitator"
                                name="facilitator"
                                value={formData.facilitator}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Activities Section */}
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Activities & Progress
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required sx={{ minWidth: '200px' }}>
                                <InputLabel>Chanting</InputLabel>
                                <Select
                                    name="chanting"
                                    value={formData.chanting}
                                    onChange={handleChange}
                                    label="Chanting"
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {numericOptions.map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Reading"
                                name="reading"
                                value={formData.reading}
                                onChange={handleChange}
                                placeholder="Enter reading details"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Hearing"
                                name="hearing"
                                value={formData.hearing}
                                onChange={handleChange}
                                placeholder="Enter hearing details"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ minWidth: '200px' }}>
                                <InputLabel>Seriousness</InputLabel>
                                <Select
                                    name="seriousness"
                                    value={formData.seriousness}
                                    onChange={handleChange}
                                    label="Seriousness"
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Additional Information Section */}
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Additional Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Remarks"
                                name="remarks"
                                multiline
                                rows={4}
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Form Actions */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        justifyContent: 'flex-end', 
                        mt: 3,
                        position: 'sticky',
                        bottom: 0,
                        bgcolor: 'background.paper',
                        py: 2,
                        borderTop: 1,
                        borderColor: 'divider'
                    }}>
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {member ? 'Update' : 'Submit'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default MemberForm; 