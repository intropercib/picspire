import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate= useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Box>
                <Typography variant="h1" component="div" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Sorry, the page you are looking for does not exist.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoBack}
                 sx={{
                    backgroundColor: (theme) => theme.palette.background.primary,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.contrastText,
                    },
                  }}
                  >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
}

export default ErrorPage;
