// src/Components/UnifiedCard.tsx
import * as React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { gradients } from '../theme';

type CardVariant = 'package' | 'step' | 'qualification';

interface UnifiedCardProps {
  variant: CardVariant;
  title: string;
  body: string;
  subtitle?: string;
  label?: string;
  icon?: React.ReactNode;
}

/**
 * UnifiedCard: A single reusable card component for all card types in the app
 * Supports three variants: package, step, and qualification
 */
const UnifiedCard: React.FC<UnifiedCardProps> = ({
  variant,
  title,
  body,
  subtitle,
  label,
  icon,
}) => {
  // Define styles based on variant
  const getCardStyles = (): SxProps<Theme> => {
    switch (variant) {
      case 'package':
        return {
          background: gradients.bgmain,
          p: { xs: 2.5, md: 3 },
          borderRadius: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        };
      case 'step':
        return {
          background: gradients.card,
          p: { xs: 2.5, md: 3 },
          borderRadius: 4,
          flex: 1,
          minWidth: { md: 0 },
        };
      case 'qualification':
        return {
          background: gradients.bgsecondary,
          p: 3,
          borderRadius: 4,
          height: '100%',
        };
      default:
        return {};
    }
  };

  // Render package variant with icon, subtitle, and title
  if (variant === 'package') {
    return (
      <Box>
        <Paper elevation={3} sx={getCardStyles()}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {icon && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </Box>
            )}
            <Box>
              {subtitle && (
                <Typography variant="subtitle2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
              <Typography variant="h5" color="primary.main">
                {title}
              </Typography>
            </Box>
          </Stack>

          <Typography textAlign="center" variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Render step variant with title and body
  if (variant === 'step') {
    return (
      <Paper elevation={3} sx={getCardStyles()}>
        <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </Paper>
    );
  }

  // Render qualification variant with label, title, and body
  if (variant === 'qualification') {
    return (
      <Paper elevation={2} sx={getCardStyles()}>
        {label && (
          <Typography variant="subtitle2" color="primary.main">
            {label}
          </Typography>
        )}
        <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </Paper>
    );
  }

  return null;
};

export default UnifiedCard;
