// AstrologerForm.js

import React, { useState } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Chip, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AstrologerForm = ({ formData, onChange, onFileChange, onSubmit }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleNavigate = () => {
    navigate('/');
  }
  // const validateForm = () => {
  //   const newErrors = {};
  //   // Check for empty fields
  //   if (!formData.name) newErrors.name = 'Name is required';
  //   if (!formData.gender) newErrors.gender = 'Gender is required';
  //   if (!formData.email) newErrors.email = 'Email is required';
  //   if (!formData.languages.length) newErrors.languages = 'Select at least one language';
  //   if (!formData.specialties.length) newErrors.specialties = 'Select at least one specialty';
  //   // Add validation for image upload if needed (optional)
  //   setErrors(newErrors); // Update errors state
  //   return Object.keys(newErrors).length === 0; // Return true if no errors
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent default form submission

  //   if (validateForm()) {
  //     onSubmit(); // Submit form if no errors
  //   }
  // };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={onChange}
        error={!!errors.name} 
        helperText={errors.name}
        required
      />
      <TextField
        name="gender"
        label="Gender"
        value={formData.gender}
        onChange={onChange}
        error={!!errors.gender} 
        helperText={errors.gender}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={!!errors.email} 
        helperText={errors.email}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="languages-label">Languages</InputLabel>
        <Select
          labelId="languages-label"
          id="languages"
          name="languages"
          multiple
          value={formData.languages}
          onChange={onChange}
          error={!!errors.languages} 
          helperText={errors.languages}
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
          {['English', 'Spanish', 'French', 'German'].map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="specialties-label">Specialties</InputLabel>
        <Select
          labelId="specialties-label"
          id="specialties"
          name="specialties"
          multiple
          value={formData.specialties}
          onChange={onChange}
          error={!!errors.specialties} 
          helperText={errors.specialties}
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
      <div style={{marginTop:5}}>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
       
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" sx={{marginRight:5}}>
          Upload Image
        </Button>
      </label>
      <Button style={{marginRight:40}} type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button onClick={handleNavigate} type="submit" variant="contained" color="primary">
        Home
      </Button>
      </div>
    </form>
  );
};

export default AstrologerForm;
