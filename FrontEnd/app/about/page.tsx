'use client';

import * as React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { gradients } from '@/src/theme';
import WhyDifferentSection from '@/src/Components/WhyDifferentSection';

const qualificationCards = [
  {
    label: 'M.Ed. in Heilpädagogik',
    title: 'Special Needs Education',
    body: "Master's degree focused on learning difficulties, inclusion, and evidence-based support strategies.",
  },
  {
    label: '10+ years experience',
    title: 'Primary & Special Schools',
    body: 'Many years working with ADHD, Dyslexia, Autism, IF, DaZ and children who have experienced bullying or anxiety.',
  },
  {
    label: 'Parent-friendly',
    title: 'Clear communication',
    body: 'Short summaries after blocks of sessions so you always know what we are working on and what is changing.',
  },
  {
    label: 'Child-centred',
    title: 'Motivation & self-esteem',
    body: 'Methods that make children feel competent and safe, not ashamed or "behind".',
  },
];

export default function AboutPage() {
  return (
    <Box>
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          background: 'background.default',
        }}
      >
        <WhyDifferentSection />

        <Container sx={{ mt: 4 }} maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch', flexDirection: { xs: 'column', md: 'column' } }}>
            <Box sx={{ textAlign: 'center', flex: { xs: 1, md: '0 0 calc(41.666% - 8px)' } }}>
              <Typography
                variant="h2"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Expert Qualifications You Can Trust
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
                Not just &quot;good with kids&quot;, but professionally trained.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You get a combination of classroom experience and specialised
                training in special needs education – so your child receives
                support that is both warm and highly skilled.
              </Typography>
            </Box>

            <Box sx={{ flex: { xs: 1, md: '0 0 calc(58.333% - 8px)' } }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 9 }}>
                {qualificationCards.map((card) => (
                  <Box key={card.title}>
                    <Paper
                      elevation={2}
                      sx={{ background: gradients.bgmain, p: 3, borderRadius: 4, height: '100%' }}
                    >
                      <Typography variant="subtitle2" color="primary.main">
                        {card.label}
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.body}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
