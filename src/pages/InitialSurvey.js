import React, { useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export default function InitialSurvey () {

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitness_goal, setFitnessGoal] = useState("");

  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [fitnessGoalError, setFitnessGoalError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state.user_id
  const { isCoach } = location.state || { isCoach: false };

  function submit () {
    let valid = true;
    if (dateOfBirth.length === 0) {
      setDateOfBirthError("Missing date of birth");
      valid = false
    } else {
      setDateOfBirthError(null);
    }

    if (gender.length === 0) {
      setGenderError("Select a value");
      valid = false
    } else {
      setGenderError(null);
    }
    
    if (height.length === 0) {
      setHeightError("Missing height.");
      valid = false
    } else if (!/^[1-9]'([0-9]|1[01])''$/.test(height)) {
      setHeightError("Incorrect Height format.");
      valid = false
    } else {
      setHeightError(null);
    }

    if (weight.length === 0) {
      setWeightError("Missing weight.");
      valid = false
    } else if (weight.length > 3) {
      setWeightError("Weight too long.");
      valid = false
    } else if (!/^[1-9][0-9]*$/.test(weight)) {
      setWeightError("Incorrect weight format.");
      valid = false
    } else {
      setWeightError(null);
    }

    if (fitness_goal.length === 0) {
      setFitnessGoalError("Missing goal.");
      valid = false
    } else if (fitness_goal.length > 1000) {
      setFitnessGoalError("Maximum 1000 characters");
      valid = false
    }  else {
      setFitnessGoalError(null);
    }

  // trigger call to the backend added here
        
        if (valid) {
          const isoDate = dateOfBirth.toISOString();
          const date_of_birth = isoDate.split('T')[0];
          const surveyData = {
            user_id,
            date_of_birth,
            gender,
            height,
            weight,
            fitness_goal
          };
    
          // Determine the endpoint based on whether the user is a coach or not
          axios.post(`${baseUrl}/api/surveys/initial-survey`, surveyData)
            .then(response => {
              console.log('Survey submitted:', response.data);
              if (isCoach) {
                navigate('/coach-survey', { state: { isCoach, user_id }});
              } else {
                navigate('/');
              }
            })
            .catch(error => {
              console.error('Survey submission error:', error.response ? error.response.data : error.message);
            });
        }
      } //ends here
    
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} align="left">
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>InitialSurvey</Typography>
        <h4>
          Date of Birth
        </h4>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            onChange={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
          />
        </LocalizationProvider>
        
        <h4>
          Gender
        </h4>
          <TextField
            required value={gender}
            onChange={(event) => setGender(event.target.value)}
            select
            sx={{width: "150px"}}
            label="Select One"
            helperText={genderError || ' '}
            error={Boolean(genderError)}
          >
            <MenuItem value={"male"}>
              Male
            </MenuItem>
            <MenuItem value={"female"}>
              Female
            </MenuItem>
            <MenuItem value={"non-binary"}>
              Non-Binary
            </MenuItem>
            <MenuItem value={"other"}>
              Other
            </MenuItem>
            <MenuItem value={"no-answer"}>
              Prefer not to say
            </MenuItem>
          </TextField>
          
          
        <h4>
          Height (ft'in'')
        </h4>
      <TextField id="inpHeight" variant="filled" error={Boolean(heightError)} helperText={heightError || ' '} required value={height} onChange={(event) => {
        setHeight(event.target.value);
      }}/>
          <h4>
            Weight (lbs)
          </h4>
          <TextField id="inpWeight" variant="filled" error={Boolean(weightError)} helperText={weightError || ' '} required value={weight} onChange={(event) => {
            setWeight(event.target.value);
          }}/>
            <h4>
              Fitness Goal
            </h4>
          <TextField id="inpFitnessGoal" variant="filled" error={Boolean(fitnessGoalError)} helperText={fitnessGoalError || ' '} required value={fitness_goal} onChange={(event) => {
            setFitnessGoal(event.target.value);
          }}/>
        <br/>
        <br/>
      <Button id="submitBtn" variant="contained" onClick={() => {
        submit();
      }}>
        Submit
      </Button>

    </Box>
  )

}