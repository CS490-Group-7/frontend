import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid } from '@mui/material';
import LinearProgress from '@mui/joy/LinearProgress';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MyCoachClient() {

    // Coach Removal Components
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
    const [removalReason, setRemovalReason] = useState('');
  
    const handleRemoveCoach = () => {
      setRemoveDialogOpen(true);
    };
  
    const handleRemoveDialogClose = () => {
      setRemoveDialogOpen(false);
      setRemovalReason('');
    };

    const handleRemoveSubmit = () => {
        // Temporary display reason
        alert("Removal Reason: " + removalReason)

        handleRemoveDialogClose();
      };

  // State for the message input
  const [messageInput, setMessageInput] = useState('');

  // State for displaying messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    // Add logic to send a message to the coach

  };

  // Function to handle "Enter" key press in the message input
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
         alert("Message was " + messageInput);
         handleSendMessage();
        }
      };

// Render coach details box
const renderCoachDetailsBox = () => (
    <Box style={{ height: '600px', position: 'relative', border: '2px solid rgba(0,0,0,0.10)', borderRadius: '15px', overflowY: 'auto' }}>
      {/* Dark blue box */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'darkblue', 
          zIndex: 1, 
        }}
      />
      {/* Circle for Coach pfp */}
      <Box
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',  
          transform: 'translateX(-50%)', 
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#ccc',
          zIndex: 2, 
        }}
      />
      {/* Coach details */}
      <Box p={2} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '80%', zIndex: 3 }}>
        {/* Replace City and Stae with coach details */}
        <Typography variant="h5" style={{fontWeight: 'bold', textAlign: 'center'}}>Coach First Name</Typography>
        <Typography variant="body1" style={{ textAlign: 'center' }}>Certified Personal Trainer</Typography>
        <br></br>
        <Typography variant="body1" style={{ textAlign: 'center' }}> City, State</Typography>
        <br></br>
        <Typography variant="body1" style={{ textAlign: 'center' }}> Stay updated with your coach</Typography>
      </Box>
      {/* Remove Coach button */}
      <Button variant="contained" style={{backgroundColor:'white', color:'red', zIndex: '4', marginTop: '90%', left: '35%'}} onClick={handleRemoveCoach}>
          Remove Coach
        </Button>
    </Box>
  );
  

  // Render message box
const renderMessageBox = () => (
    <Box style={{ height: '600px', position: 'relative', border: '2px solid rgba(0,0,0,0.10)', borderRadius: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        style={{
          background: '#f0f0f0', 
          padding: '8px',
        }}
      >
        <Typography variant="h5" style={{fontWeight: 'bold'}} >Message Your Coach:</Typography>
      </Box>
      {/* Message history */}
      <Box
        style={{
          flex: 1, 
          overflowY: 'auto', 
          background: '#fff', 
          padding: '8px',
        }}
      >
        {/* Display messages */}
      
          <Box mb={1}>
            <Typography
              variant="body1"
              component="div"
            >
              Messages go here
            </Typography>
          </Box>
       
      </Box>
      {/* Message input */}
      <TextField
        id="messageInput"
        label="Send a message..."
        variant="outlined"
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
        onKeyPress={handleEnterKeyPress}
        style={{
          background: '#f0f0f0', 
          margin: '10px',
          width: '95%',
        }}
      />
    </Box>
  );
  
  return (
    <div className="my-coach-client-page">
      <h1>My Coach</h1>
      <Grid container spacing={3}>
        {/* Coach details box */}
        <Grid item xs={5}>
          {renderCoachDetailsBox()}

      {/* Remove Coach Dialog */}
      <Dialog open={isRemoveDialogOpen} onClose={handleRemoveDialogClose}>
        <DialogTitle>Remove Coach</DialogTitle>
        <DialogContent sx={{ width: '400px'}}>
          <TextField
            label="Reason for removal"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={removalReason}
            onChange={(e) => setRemovalReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveDialogClose}>Cancel</Button>
          <Button onClick={handleRemoveSubmit} variant="contained" color="error">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

        </Grid>
        {/* Message box */}
        <Grid item xs={7}>
          {renderMessageBox()}
        </Grid>
      </Grid>
    </div>
  );
}