import React from "react";
import { Container, Typography, Box, Paper, TextField, Button } from "@mui/material";

const Contact = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, mt: 5, backgroundColor: "#f9f9f9" }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Us
                    </Typography>
                </Box>
                <Box textAlign="center" mb={2}>
                    <Typography variant="body1" paragraph>
                        We're here to help! If you have any questions or inquiries about our koi fish,
                        please feel free to reach out to us using the form below.
                    </Typography>
                </Box>
                <Box component="form" noValidate autoComplete="off" mt={3}>
                    <TextField
                        label="Your Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="email"
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <Box textAlign="center" mt={3}>
                        <Button variant="contained" color="primary" type="submit">
                            Send Message
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Contact;
