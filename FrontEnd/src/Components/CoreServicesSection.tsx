import * as React from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { gradients } from '../theme';

const services = [
  {
    title: 'Math Tutoring',
    body: 'From basic number sense to fractions and word problems – we build understanding, not just tricks.',
  },
  {
    title: 'Reading & Writing',
    body: 'Support for decoding, comprehension, spelling and written expression using evidence-based methods.',
  },
  {
    title: 'Special Needs Support',
    body: 'ADHD, Dyslexia, Autism, DaZ, slow processing – your child learns with someone trained in Heilpädagogik.',
  },
  {
    title: 'Homework Support',
    body: 'Structured sessions that help your child finish homework calmly and more independently.',
  },
];

const CoreServicesSection: React.FC = () => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ color: 'primary.main', fontWeight: 600 }}
        >
          Our Core Services
        </Typography>

        <Typography variant="h3" sx={{  mt: 1, mb: 4 }}>
          Each session is designed to help your child feel capable and proud.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 8 }}>
          {services.map((service) => (
            <Box key={service.title}>
              <Paper
                elevation={2}
                sx={{
                  background: gradients.bgmain,
                  p: 3,
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                   "&:hover": { boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)' }
                  
                }}
              >
                <Stack spacing={0.5}>
                  
                  <Typography variant="body2" textAlign = "center"  color="primary.main">{service.title} </Typography>
                </Stack>
                <Typography variant="body2" >
                  {service.body}
                </Typography>
              </Paper>
            </Box>
          ))}
          
        </Box>
        
      </Container>
      
    </Box>
    
  );
};

export default CoreServicesSection;
