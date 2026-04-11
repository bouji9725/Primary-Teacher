'use client';

import * as React from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    Paper,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SectionContainer from '@/src/Components/SectionContainer';
import PackageCard from '@/src/Components/PackageCard';
import { gradients } from '@/src/theme';

// Shared title typography sizing for section headings
const SECTION_TITLE_SX = {
    fontSize: {
        xs: '1.7rem',
        sm: '1.9rem',
        md: '2.1rem',
    },
} as const;

// Data for package cards
const packageCards = [
    {
        title: 'Homework Rescue',
        subtitle: '1× per week · 50 min',
        body: 'Structured weekly support to stop evening battles and help your child finish homework calmly.',
        icon: <AccessTimeIcon fontSize="medium" />,
    },
    {
        title: 'Foundation Booster',
        subtitle: '2× per week · 50 min',
        body: 'Intensive help to close gaps in reading, writing or maths so your child can follow lessons again.',
        icon: <SchoolIcon fontSize="medium" />,
    },
    {
        title: 'Special Needs Focus',
        subtitle: 'ADHD · Dyslexia · Autism',
        body: 'Sessions designed with special needs methods: clear structure, movement breaks and visual support.',
        icon: <PsychologyIcon fontSize="medium" />,
    },
    {
        title: 'Confidence & Motivation',
        subtitle: 'Short-term coaching block',
        body: 'For children who feel "stupid" or anxious. We work on self-esteem, strategies and small wins.',
        icon: <FavoriteIcon fontSize="medium" />,
    },
];

// Data for "How it works" steps
const howItWorks = [
    {
        title: '1. Free call',
        body: 'We talk about your child, your questions and what you already tried.',
    },
    {
        title: '2. Learning checkup',
        body: 'We analyse strengths, difficulties and what is blocking learning.',
    },
    {
        title: '3. Personalised plan',
        body: 'You choose a package that fits your child and your family rhythm.',
    },
    {
        title: '4. Ongoing sessions',
        body: 'Regular online sessions + short feedback so you see progress.',
    },
];

export default function PackagesPage() {
    return (
        <Box
            component="main"
            sx={{
                bgcolor: 'background.default',
                pt: { xs: 12, sm: 14 },
                pb: { xs: 8, sm: 10, md: 12 },
            }}
        >
            {/* Total: Why different + packages grid */}
            <Box component="section" sx={{ mb: { xs: 8, md: 10 } }}>
                <SectionContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 4, md: 5 },
                            alignItems: 'stretch',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                    >
                        {/* LEFTSide: Why these packages are different */}
                        <Box sx={{ flex: { xs: 1, md: '0 0 calc(41.666% - 13.333px)' } }}>
                            <Box
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 4,
                                    background: gradients.bgmain,
                                    boxShadow: 4,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{ color: 'primary.main', fontWeight: 600 }}
                                >
                                    Why these packages are different
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        ...SECTION_TITLE_SX,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Built by a Special Needs teacher, not a generic tutor.
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    Every package combines classic tutoring with methods from
                                    special needs education (Heilpädagogik): clear structure,
                                    adapted materials and a strong focus on how your child thinks
                                    and feels.
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Instead of "just doing homework together", we look at the root
                                    causes: attention, memory, language, self-confidence and past
                                    experiences with school. That&apos;s what makes change
                                    sustainable.
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    With a Master&apos;s degree in Special Needs Education and
                                    many years in primary and special schools, these packages are
                                    designed for children who need more than standard tutoring.
                                </Typography>
                            </Box>
                        </Box>

                        {/* RIGHT: 2×2 packages grid */}
                        <Box sx={{ flex: { xs:  1, md: '0 0 calc(58.333% - 13.333px)' } }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 8,
                                    alignItems: 'stretch',
                                }}
                            >
                                {packageCards.map((pkg) => (
                                    <PackageCard
                                        key={pkg.title}
                                        title={pkg.title}
                                        subtitle={pkg.subtitle}
                                        body={pkg.body}
                                        icon={pkg.icon}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </SectionContainer>
            </Box>

            {/* MIDDLE: How it works – boxes with arrows */}
            <Box
                component="section"
                sx={{
                    py: { xs: 6, md: 8 },
                    bgcolor: '#background.default',
                }}
            >
                <SectionContainer>
                    <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="overline"
                        sx={{ color: 'primary.main', fontWeight: 600 , fontSize: { xs: '0.9rem', sm: '3rem' }}}
                    >
                        How it works
                    </Typography>
                    
                    <Typography
                        variant="h2"
                        sx={{ 
                            mt: 1,
                            mb: { xs: 4, md: 5 },
                            ...SECTION_TITLE_SX,
                        }}
                    >
                        From first call to stable routine in four steps. From first call to visible progress – everything is transparent
              and designed to feel safe for your child.
                    </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 8 }}>
          {howItWorks.map((step) => (
            <Box key={step.title}>
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
                  
                  <Typography variant="body2" textAlign = "center"  color="primary.main">{step.title} </Typography>
                </Stack>
                <Typography variant="body2" >
                  {step.body}
                </Typography>
              </Paper>
            </Box>
          ))}
                    </Box>
                </SectionContainer>
            </Box>

            {/* BOTTOM: Book now CTA */}
            <Box component="section" sx={{ mt: { xs: 6, md: 8 } }}>
                <SectionContainer>
                    <Box
                        sx={{
                            textAlign: 'center',
                            maxWidth: 620,
                            mx: 'auto',
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                mb: 2,
                                fontSize: {
                                    xs: '1.8rem',
                                    sm: '2rem',
                                },
                            }}
                        >
                            Ready to choose a package?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Book a free call to find out which package fits your child best,
                            or go directly to the booking page to reserve a time.
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                href="/Booking"
                                sx={{
                                    py: { xs: 1.2, sm: 1.4 },
                                    px: { xs: 2.6, sm: 3.2 },
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                }}
                            >
                                Book now
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                color="secondary"
                                href="/Booking"
                                sx={{
                                    py: { xs: 1.2, sm: 1.4 },
                                    px: { xs: 2.4, sm: 3 },
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                    borderWidth: 2,
                                }}
                            >
                                Free info call
                            </Button>
                        </Stack>
                    </Box>
                </SectionContainer>
            </Box>
        </Box>
    );
}
