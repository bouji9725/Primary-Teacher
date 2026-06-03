'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppointmentsList } from './AppointmentsList'
import { BlockSlotForm } from './BlockSlotForm'
import { BlockedSlotsList } from './BlockedSlotsList'
import { gradients } from '@/src/theme'

export function AdminPanel() {
  const [tab, setTab] = React.useState(0)
  const [blockedRefreshKey, setBlockedRefreshKey] = React.useState(0)
  const [signOutOpen, setSignOutOpen] = React.useState(false)

  const handleSignOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.reload()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: gradients.bgmain,
        p: { xs: 2, md: 4 },
        pt: { xs: 10, md: 12 },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Admin Panel
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => setSignOutOpen(true)}
            size="small"
          >
            Sign out
          </Button>
        </Box>

        <Paper elevation={2} sx={{ borderRadius: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            <Tab label="Upcoming Appointments" />
            <Tab label="Manage Availability" />
          </Tabs>

          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {tab === 0 && (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  All upcoming sessions, ordered by date.
                </Typography>
                <AppointmentsList />
              </>
            )}

            {tab === 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3,
                }}
              >
                {/* Left: block form */}
                <Box sx={{ flex: 1 }}>
                  <BlockSlotForm
                    onCreated={() => setBlockedRefreshKey((k) => k + 1)}
                  />
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: 'none', md: 'block' } }}
                />

                {/* Right: existing blocks */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                    Active Blocks
                  </Typography>
                  <BlockedSlotsList refreshKey={blockedRefreshKey} />
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      <Dialog open={signOutOpen} onClose={() => setSignOutOpen(false)}>
        <DialogTitle>Sign out?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will need to enter your password to access the admin panel again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignOutOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleSignOut}>
            Sign out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
