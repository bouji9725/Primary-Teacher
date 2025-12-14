
import * as React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { gradients } from '../theme';
import WhyDifferentSection from '../Components/WhyDifferentSection';

const QualificationsSection: React.FC = () => {
  return (
    <Box>
    <WhyDifferentSection/>
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ mt: 4}}  maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch', flexDirection: { xs: 'column', md: 'column' } }}>
          <Box sx={{ textAlign: 'center', flex: { xs: 1, md: '0 0 calc(41.666% - 8px)' } }}>
            <Typography
              variant="overline"
              sx={{ color: 'background.default', fontWeight: 600 }}
            >
              Expert Qualifications You Can Trust
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
              Not just “good with kids”, but professionally trained.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You get a combination of classroom experience and specialised
              training in special needs education – so your child receives
              support that is both warm and highly skilled.
            </Typography>
          </Box>
      
          <Box sx={{ flex: { xs: 1, md: '0 0 calc(58.333% - 8px)' } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 9 }}>
              <Box>
               
                <Paper
                  elevation={2}
                  sx={{ background: gradients.herosecondary, p: 3, borderRadius: 4, height: '100%' }}
                >
                  <Typography variant="subtitle2" color="primary.main">
                    M.Ed. in Heilpädagogik
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                    Special Needs Education
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Master&apos;s degree focused on learning difficulties,
                    inclusion, and evidence-based support strategies.
                  </Typography>
                </Paper>
              </Box>
              <Box>
                <Paper
                  elevation={2}
                  sx={{ background: gradients.herosecondary, p: 3, borderRadius: 4, height: '100%' }}
                >
                  <Typography variant="subtitle2" color="primary.main">
                    10+ years experience
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                    Primary & Special Schools
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Many years working with ADHD, Dyslexia, Autism, IF, DaZ and
                    children who have experienced bullying or anxiety.
                  </Typography>
                </Paper>
              </Box>
              <Box>
                <Paper
                  elevation={2}
                  sx={{ background: gradients.herosecondary,p: 3, borderRadius: 4, height: '100%' }}
                >
                  <Typography variant="subtitle2" color="primary.main">
                    Parent-friendly
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                    Clear communication
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Short summaries after blocks of sessions so you always know
                    what we are working on and what is changing.
                  </Typography>
                </Paper>
              </Box>
              <Box>
                <Paper
                  elevation={2}
                  sx={{ background: gradients.herosecondary,p: 3, borderRadius: 4, height: '100%' }}
                >
                  <Typography variant="subtitle2" color="primary.main">
                    Child-centred
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                    Motivation & self-esteem
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Methods that make children feel competent and safe, not
                    ashamed or “behind”.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
        
      </Container>
      
    </Box>
    
    </Box>
  );
};

export default QualificationsSection;
