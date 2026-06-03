'use client'

import * as React from 'react'
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EventBusyIcon from '@mui/icons-material/EventBusy'

type BlockedSlot = {
  id: string
  type: 'SLOT' | 'DAY' | 'RANGE'
  date: string | null
  time: string | null
  startDate: string | null
  endDate: string | null
  reason: string | null
  createdAt: string
}

interface Props {
  refreshKey: number
}

function formatBlockLabel(slot: BlockedSlot): string {
  if (slot.type === 'SLOT') return `${slot.date} at ${slot.time}`
  if (slot.type === 'DAY') return `All day — ${slot.date}`
  if (slot.type === 'RANGE') {
    const start = slot.startDate?.split('T')[0]
    const end = slot.endDate?.split('T')[0]
    return `${start} → ${end}`
  }
  return 'Unknown'
}

const typeColors: Record<string, 'error' | 'warning' | 'info'> = {
  SLOT: 'warning',
  DAY: 'error',
  RANGE: 'info',
}

export function BlockedSlotsList({ refreshKey }: Props) {
  const [slots, setSlots] = React.useState<BlockedSlot[]>([])
  const [loading, setLoading] = React.useState(true)
  const [deleting, setDeleting] = React.useState<string | null>(null)

  const load = React.useCallback(() => {
    setLoading(true)
    fetch('/api/admin/blocked-slots')
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    load()
  }, [load, refreshKey])

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await fetch(`/api/admin/blocked-slots/${id}`, { method: 'DELETE' })
      setSlots((prev) => prev.filter((s) => s.id !== id))
    } catch {
      // silently fail — list will be stale but refresh will fix it
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  if (slots.length === 0) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          color: 'text.secondary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <EventBusyIcon sx={{ fontSize: 40, opacity: 0.3 }} />
        <Typography variant="body2">No time blocks. All slots are open.</Typography>
      </Box>
    )
  }

  return (
    <List dense disablePadding>
      {slots.map((slot) => (
        <ListItem
          key={slot.id}
          divider
          secondaryAction={
            <Tooltip title="Remove block">
              <span>
                <IconButton
                  edge="end"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(slot.id)}
                  disabled={deleting === slot.id}
                  aria-label="Delete block"
                >
                  {deleting === slot.id ? (
                    <CircularProgress size={16} />
                  ) : (
                    <DeleteOutlineIcon fontSize="small" />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          }
        >
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={slot.type}
                  size="small"
                  color={typeColors[slot.type]}
                  variant="outlined"
                />
                <Typography variant="body2">{formatBlockLabel(slot)}</Typography>
              </Box>
            }
            secondary={slot.reason ?? undefined}
          />
        </ListItem>
      ))}
    </List>
  )
}
