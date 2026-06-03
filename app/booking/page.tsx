import { Box } from '@mui/material'
import BookingHeader from '@/src/Components/BookingComp/BookingHeader'
import BookingWizard from '@/src/Components/BookingComp/BookingWizard'
import SectionContainer from '@/src/Components/SectionContainer'
import { layout } from '@/src/theme'

export default function BookingPage() {
  return (
    <Box
      component="main"
      sx={{
        background: 'background.default',
        pt: { xs: layout.heroTop.xs, sm: layout.heroTop.sm },
        pb: layout.pageBottom,
      }}
    >
      <SectionContainer>
        <BookingHeader />
        <BookingWizard />
      </SectionContainer>
    </Box>
  )
}
