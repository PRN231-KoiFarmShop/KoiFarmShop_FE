import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Policy = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, mt: 5, backgroundColor: "#f9f9f9" }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Store Policies
                    </Typography>
                </Box>

                <Typography variant="h6" gutterBottom>
                    Return Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    We want you to be satisfied with your purchase! If you are not completely satisfied,
                    you can return your koi fish within 14 days for a full refund or exchange.
                    Please ensure the fish are returned in a safe and healthy condition.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Shipping Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    We offer shipping to various locations. Please allow 3-5 business days for processing
                    and delivery. All shipments are carefully packaged to ensure the safe arrival of your koi fish.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    Your privacy is important to us. We collect personal information solely for the purpose
                    of fulfilling your orders and providing you with a better shopping experience.
                    We will never share your information with third parties without your consent.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Customer Service
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or concerns regarding our policies, please feel free to contact
                    us at our support email: support@koistore.com. We are here to assist you!
                </Typography>
            </Paper>
        </Container>
    );
};

export default Policy;
