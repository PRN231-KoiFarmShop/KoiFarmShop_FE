import React from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";

const AboutUs = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, mt: 5, backgroundColor: "#f9f9f9" }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        About Us
                    </Typography>
                </Box>
                <Box textAlign="center" mb={2}>
                    <Typography variant="body1" paragraph>
                        Welcome to our Koi Fish Store! We are passionate about providing you with the most beautiful
                        and vibrant koi fish for your ponds and aquariums.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        With years of experience in the koi industry, we pride ourselves on offering a diverse
                        selection of high-quality koi fish, sourced from reputable breeders.
                    </Typography>
                </Box>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our mission is to help you create a serene and beautiful aquatic environment.
                        We are committed to educating our customers about koi care and providing top-notch support.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AboutUs;
