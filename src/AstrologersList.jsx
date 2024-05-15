import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Button, Modal, Stack } from 'react-bootstrap';
import axios from 'axios';
import { getUser,deleteUser,getUserDetails } from './store/astrologersSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AstrologersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const user = useSelector(state => state?.user);
//const user = userState ? userState.user : null;
console.log(user);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState();
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [editedAstrologer, setEditedAstrologer] = useState({
    name: '',
    gender: '',
    email: '',
    language: '',
    specialization: ''
  });

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
        //console.log(response.data);
        dispatch(getUserDetails(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
      }
  };

  

  const handleInputChange = (e) => {
    setEditedAstrologer({
      ...editedAstrologer,
      [e.target.name]: e.target.value
    });
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

  const handleSaveChanges = async (id) => {
    try {
      // Send PUT request to update astrologer
      const response = await axios.put(`http://localhost:5000/api/astrologers/${id}`, editedAstrologer);
      
      // Check if request was successful
      if (response.status === 200) {
        console.log('Astrologer updated successfully');
        
        const updatedData = await fetchData();
        //setData(updatedData);
  
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
    console.log(`Deleting astrologer with ID ${id}`);
  };
  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/astrologers/${id}`);

      // Update the local state after successful deletion
      // const updatedUsers = users.filter(astrologer => astrologer.id !== editedAstrologer.id);
      dispatch(deleteUser({id}));

      // Hide the delete confirmation modal
      setDeleteConfirmationModal(false);

      console.log(`Deleted astrologer with ID ${editedAstrologer.id}`);
    }
    catch (error) {
      console.error('Error deleting astrologer:', error);
    }
  };
  const cancelDelete = () => {
    // Hide delete confirmation modal
    setDeleteConfirmationModal(false);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Languages</th>
            <th>Specialties</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((astrologer) => (
            <tr key={astrologer.id}>
              <td>{astrologer.id}</td>
              <td>{astrologer.name}</td>
              <td>{astrologer.gender}</td>
              <td>{astrologer.email}</td>
              <td>{astrologer.languages}</td>
              <td>{astrologer.specialties}</td>
              <td><button onClick={()=>handleEdit(astrologer.id)}>Edit</button></td>
              <td><button onClick={()=>handleDelete(astrologer.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={openModal}
        onHide={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>Edit Astrologer</h2>
            <TextField
              label="Name"
              name="name"
              value={user?.name || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Gender"
              name="gender"
              value={user?.gender || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              name="email"
              value={user?.email || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Language"
              name="language"
              value={user?.language || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Specialization"
              name="specialization"
              value={user?.specialization || ''}
              onChange={handleInputChange}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={()=>handleSaveChanges(id)}>Save Changes</Button>
            </Stack>
          </div>
        </Box>
      </Modal>

      <Dialog
        open={deleteConfirmationModal}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this record?"}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={()=>confirmDelete(id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AstrologersList;
