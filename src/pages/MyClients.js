import React, { useState, useEffect } from 'react';
import { Button, Grid, Card, CardContent, CardActions, Typography, AppBar, Toolbar, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export default function MyClient() {
    const location = useLocation();
    const { user_id } = location.state || { user_id: false };

    const [currentClients, setCurrentClients] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.post(`${baseUrl}/api/coach/get-current-clients`, {userId: user_id})
          .then((response) => {
            setCurrentClients(response.data);
          })
          .catch((error) => {
            setErrorMessage(error.data ? error.data.message : 'Error reaching server');
        });
      }, [user_id])

    const navigate = useNavigate();
    const handleNavigate = (refresh) => {
        if(refresh){
            window.location.reload();
        }else{
            navigate("./requests", { state: location.state })
        }
    }

    return (
        <div className="my-clients-page">
            <h1>My Clients</h1>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => handleNavigate(true)} sx={{ marginRight: '10px', color: 'black'}} variant='contained'>Current Clients</Button>
                    <Button color="inherit" onClick={() => handleNavigate(false)} >Client Requests</Button>
                </Toolbar>
            </AppBar>
            <div id="current-clients">
                <h2>Your current clients:</h2>
                {currentClients.length === 0 && (
                    <p>No results</p>
                )}
                {currentClients.map((client) => (
                    <Link href={`my-clients/${client.client_id}`} sx={{ textDecoration: 'none'}}>
                        <Card key={client.id} sx={{ maxWidth: 345, marginBottom: 2, marginTop: 3, }}>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ color: 'purple'}}>
                                    {client.first_name} {client.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click for client details
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}