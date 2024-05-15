import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAstrologer } from './store/astrologersSlice';
import AstrologerForm from './AstrologerForm';
import axios from 'axios';

const RegisterAstrologerPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    languages: [],
    specialties: [],
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    console.log('File selected:', file); // Add this line
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create FormData object to send form data including file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('languages', formData.languages.join(','));
    formDataToSend.append('specialties', formData.specialties.join(','));
    // formDataToSend.append('image', formData.image);
     // Check if a file is selected before appending it
    if (formData.image) {
      formDataToSend.append('file', formData.image);
    }

    //console.log(formData);
    //dispatch(registerAstrologer(formDataToSend));
    const API_BASE_URL = 'http://localhost:5000'; 
    
      axios.post(`${API_BASE_URL}/api/astrologers/register`, formDataToSend)
      .then(res=>{})
      .catch(er=>console.log(er))     
    
  };

  return (
    <div>
      <h2>Register New Astrologer</h2>
      <AstrologerForm
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegisterAstrologerPage;
