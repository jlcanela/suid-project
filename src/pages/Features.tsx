import { Box, Typography } from "@suid/material";

function Features() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Features Page
      </Typography>
      <Typography variant="body1">
        Here are some amazing features of our application.
      </Typography>
    </Box>
  );
}

export default Features;
