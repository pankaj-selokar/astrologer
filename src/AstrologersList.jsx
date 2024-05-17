import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Paper, Select, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Button, Stack, Table } from '@mui/material';
import axios from 'axios';
import { getUser, deleteUser, getUserDetails } from './store/astrologersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AstrologersList = () => {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.users);

  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [editedAstrologer, setEditedAstrologer] = useState({
    name: '',
    gender: '',
    email: '',
    languages: [],
    specialties: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id && user) {
      setEditedAstrologer({
        name: user[0]?.name || '',
        gender: user[0]?.gender || '',
        email: user[0]?.email || '',
        languages: user[0]?.languages || '',
        specialties: user[0]?.specialties || ''
      });
    }
  }, [id, user]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/astrologers`);
      dispatch(getUser(res.data));
    };
    fetchData();
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = async (id) => {
    setId(id);
    setOpenModal(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/astrologers/${id}`);
      dispatch(getUserDetails(response.data));
      setEditedAstrologer(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAstrologer(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/astrologers`);
      return res.data;
    } catch (error) {
      console.error('Error fetching astrologer data:', error);
      throw new Error('Failed to fetch astrologers');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/astrologers/${id}`, editedAstrologer);

      if (response.status === 200) {
        console.log('Astrologer updated successfully');

        const updatedData = await fetchData();
        dispatch(getUser(updatedData));

        setOpenModal(false);
      } else {
        console.error('Failed to update astrologer');
      }
    } catch (error) {
      console.error('Error updating astrologer:', error.message);
    }
  };

  const handleDelete = (id) => {
    setId(id);
    setDeleteConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/astrologers/${id}`);

      dispatch(deleteUser({ id }));

      setDeleteConfirmationModal(false);
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting astrologer:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationModal(false);
  };

  const handleNavigate = () => {
    navigate('/registration');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="right">Languages</TableCell>
              <TableCell align="right">Specialties</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((astrologer, index) => (
              <TableRow key={astrologer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{astrologer.name}</TableCell>
                <TableCell>{astrologer.gender}</TableCell>
                <TableCell>{astrologer.email}</TableCell>
                <TableCell>{astrologer.languages}</TableCell>
                <TableCell>{astrologer.specialties}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(astrologer.id)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(astrologer.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="success" style={{ marginTop: 40 }} onClick={handleNavigate}>
        New registration
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <DialogTitle id="modal-modal-title">Edit Astrologer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editedAstrologer.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Gender"
            name="gender"
            value={editedAstrologer.gender || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={editedAstrologer.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth>
            <InputLabel id="languages-label">Languages</InputLabel>
            <Select
              labelId="languages-label"
              id="languages"
              name="languages"
              multiple
              value={Array.isArray(editedAstrologer.languages) ? editedAstrologer.languages : (editedAstrologer.languages || '').split(',')}
              onChange={handleInputChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {['English', 'Spanish', 'French', 'German'].map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField
            label="Specialties"
            name="specialties"
            value={Array.isArray(editedAstrologer.specialties ) ? editedAstrologer.specialties : (editedAstrologer.specialties || '').split(',')}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          /> */}
          <FormControl fullWidth>
        <InputLabel id="specialties-label">Specialties</InputLabel>
        <Select
          labelId="specialties-label"
          id="specialties"
          name="specialties"
          multiple
          value={Array.isArray(editedAstrologer.specialties ) ? editedAstrologer.specialties : (editedAstrologer.specialties || '').split(',')}
          onChange={handleInputChange}
          //error={!!errors.specialties} 
          //</FormControl>helperText={errors.specialties}
          input={<Input id="select-multiple-chip" />}
          required
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {['Horoscope Reading', 'Tarot Card Reading', 'Astrology Chart Analysis', 'Palmistry'].map((specialty) => (
            <MenuItem key={specialty} value={specialty}>
              {specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmationModal}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this record?"}</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AstrologersList;
