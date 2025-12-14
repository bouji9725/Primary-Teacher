
import * as React from 'react';
import {
  Box,
  Button,
  Container,
  //Paper,
  Stack,
  Typography,
} from '@mui/material';
import { gradients } from '../theme.ts';
import ParentProblemsSection from '../Components/ParentProblemSection.tsx';
import Services from '../Components/CoreServicesSection.tsx';


const HeroSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        background: gradients.hero,
        pt: { xs: 12, sm: 14, md: 16 },
        pb: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: {
            xs: '100%',
            sm: '640px',
            md: '860px',
            lg: '1180px',
            xl: '1420px',
          },
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, sm: 6 },
            alignItems: 'center',
          }}
        >
          {/* LEFT: text */}
          <Box sx={{ flex: { xs: 1, md: '0 0 calc(50% - 12px)' } }}>
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 1.5,
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                }}
              >
                Mrs. Isler · Special Needs Teacher (M.Ed.)
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '2rem',
                    sm: '2.4rem',
                    md: '2.8rem',
                    lg: '3.2rem',
                    xl: '3.6rem',
                  },
                  lineHeight: 1.1,
                }}
              >
                Every child can learn and thrive when it feels heard and understood.
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.05rem' },
                  maxWidth: 520,
                }}
              >
                1-to-1 online tutoring & learning therapy that fixes the root causes of
                learning problems – not just the symptoms.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ pt: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    py: { xs: 1.2, sm: 1.4 },
                    px: { xs: 2.4, sm: 3 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Book a free call
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  sx={{
                    borderWidth: 2,
                    py: { xs: 1.2, sm: 1.4 },
                    px: { xs: 2.4, sm: 3 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Start learning checkup
                </Button>
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                Grades 1–6 · ADHD · Dyslexia · Autism · IF · DaZ · anxiety & more
              </Typography>
            </Stack>
          </Box>

          {/* RIGHT: portrait */}
          <Box
            component="img"
            src="https://img.freepik.com/premium-photo/cartoon-illustration-teacher-classroom-with-group-children-generative-ai_1034064-9017.jpg?w=2000"
            alt="Child in online tutoring session"
            sx={{
              width: '100%',
              borderRadius: 4,
              boxShadow: 6,
              objectFit: 'cover',
              maxHeight: 360,
            }}
          />
        </Box>

        {/*ParentProblemSection*/}

    
        <ParentProblemsSection />

        {/* Services Section */}
        <Services />
          

      </Container>
    </Box>
  );
};

export default HeroSection;
