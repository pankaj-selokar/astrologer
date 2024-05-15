// AstrologerForm.js

import React from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Chip, Input } from '@mui/material';

const AstrologerForm = ({ formData, onChange, onFileChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={onChange}
        required
      />
      <TextField
        name="gender"
        label="Gender"
        value={formData.gender}
        onChange={onChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={onChange}
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
      <FormControl fullWidth>
        <InputLabel id="specialties-label">Specialties</InputLabel>
        <Select
          labelId="specialties-label"
          id="specialties"
          name="specialties"
          multiple
          value={formData.specialties}
          onChange={onChange}
          input={<Input id="select-multiple-chip" />}
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
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
       
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AstrologerForm;
