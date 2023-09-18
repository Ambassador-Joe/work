import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import mainImage from "./main.jpeg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  

  return (
    <Box style={{
      backgroundImage: `url(${mainImage})`, // Use the imported image
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      height: '100vh',
     
    
    }}>
     
     
      <Box
        width="100%"
        backgroundColor={theme.palette.primary[500]}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ALCON
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.grey[100]}
      >
        
        <Form />
      </Box>
    </Box>
    
  );
};

export default LoginPage;
