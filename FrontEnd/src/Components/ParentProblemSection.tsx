// src/Components/ParentProblemsSection.tsx
import * as React from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { gradients } from '../theme';

const ParentProblemsSection: React.FC = () => {
  const cards = [
    {
      title: 'Unstructured Homework Time',
      subtitle: 'Stressful evenings',
      body: 'Your child struggles alone, needs constant reminders, and homework takes forever – with tears and arguments.',
      step: '01',
    },
    {
      title: 'Weak Foundational Skills',
      subtitle: 'Reading · Writing · Math',
      body: 'Gaps in basic skills grow every year, so your child feels “behind” and loses confidence in class.',
      step: '02',
    },
    {
      title: 'Special Needs Support',
      subtitle: 'ADHD · Dyslexia · Autism',
      body: 'It’s hard to find someone who truly understands diagnoses and can adapt lessons to how your child thinks.',
      step: '03',
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h2"
          sx={{ color: 'primary.main', textAlign: 'center',  fontWeight: 600 }}
        >
          We Solve Real Problems for Parents
        </Typography>

        <Typography variant="h3" sx={{ textAlign: 'center', mt: 1, mb: 4, maxWidth: 520, mx: 'auto' }}>
          You don&apos;t need to be the teacher and the parent at the same
          time.
        </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 8 }}>
          {cards.map((card) => (
            <Box key={card.title}>
              <Paper
                elevation={3}
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
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {card.step}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ textTransform: 'uppercase', fontSize: 11 }}
                    >
                      {card.subtitle}
                    </Typography>
                    <Typography variant="body1">{card.title}</Typography>
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  {card.body}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ParentProblemsSection;
