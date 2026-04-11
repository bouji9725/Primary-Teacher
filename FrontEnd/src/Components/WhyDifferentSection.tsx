
import * as React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { gradients, layout } from '../theme';
import SectionContainer from './SectionContainer';

const WhyDifferentSection: React.FC = () => {
    const points = [
        'Root-cause diagnosis, not just homework help.',
        'Master’s degree in Special Needs Education (Heilpädagogik).',
        'Evidence-based strategies from psychology and pedagogy.',
        'Emotional safety and patience-first approach.',
        'Individualised plans for every child – not one fixed programme.',
        'Regular parent insights so you always know what is working.',
    ];

    return (
        <Box
            component="section"
            sx={{
                py: layout.sectionY,
                
            }}
        >
            <SectionContainer>
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 4, md: 5 },
                        borderRadius: 5,
                        background: gradients.card,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ flex: { xs: 1, md: '0 0 50%' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography
                                    variant="h3"
                                    sx={{ color: 'primary.main', fontWeight: 600 , mb: 1 }}
                                >
                                    Why This Is Different?
                                </Typography>
                            </Box>
                            <Typography variant="h2" sx={{ color: '#8C6F7F', mt: 1, mb: 4 }}>
                                We don&apos;t just make homework.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                The goal is not only completed worksheets – it&apos;s a child
                                who understands themselves, feels competent, and can learn more
                                independently.
                            </Typography>

                            <List dense>
                                {points.map((p) => (
                                    <ListItem key={p} sx={{ alignItems: 'flex-start', px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 32, mt: 0.2 }}>
                                            <CheckIcon fontSize="small" color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{ variant: 'body2' }}
                                            primary={p}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box sx={{ flex: { xs: 1, md: '0 0 50%' } }}>
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
                    </Box>
                </Paper>
            </SectionContainer>
        </Box>
    );
};

export default WhyDifferentSection;
