'use client'

import * as React from 'react'
import {
  Alert,
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import BookingPackageStep from './BookingPackageStep'
import BookingTimeStep from './BookingTimeStep'
import { BookingChildInfoStep, type ChildInfoRef } from './BookingChildInfoStep'
import BookingConfirmStep from './BookingConfirmStep'
import BookingSuccess from './BookingSuccess'
import BookingTrustPanel from './BookingTrustPanel'
import type { ChildInfoInput } from '@/src/lib/schemas/booking'

const STEPS = ['Package', 'Date & Time', 'Your Details', 'Confirm']

type WizardData = {
  package: 'homework' | 'foundations' | 'special'
  dateTime: string | null
} & ChildInfoInput

export function BookingWizard() {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState<WizardData>({
    package: 'homework',
    dateTime: null,
    parentName: '',
    email: '',
    childName: '',
    childAge: '',
    needs: '',
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [stepError, setStepError] = React.useState<string | null>(null)

  const childInfoRef = React.useRef<ChildInfoRef>(null)

  const handleNext = async () => {
    setStepError(null)

    if (step === 1 && !data.dateTime) {
      setStepError('Please select a date and time before continuing.')
      return
    }

    if (step === 2) {
      const valid = await childInfoRef.current?.triggerValidation()
      if (!valid) return
      const values = childInfoRef.current!.getValues()
      setData((prev) => ({ ...prev, ...values }))
    }

    setStep((s) => s + 1)
  }

  const handleBack = () => {
    setStepError(null)
    setSubmitError(null)
    setStep((s) => s - 1)
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: data.parentName,
          email: data.email,
          childName: data.childName,
          childAge: data.childAge,
          needs: data.needs ?? '',
          package: data.package,
          dateTime: data.dateTime!,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setSubmitError(
          json.error?.message ?? 'Something went wrong. Please try again.'
        )
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError('Connection error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted && data.dateTime) {
    return (
      <BookingSuccess
        parentName={data.parentName}
        email={data.email}
        dateTime={data.dateTime}
      />
    )
  }

  return (
    <Box>
      {/* Progress stepper */}
      <Stepper
        activeStep={step}
        sx={{ mb: { xs: 4, md: 5 }, overflowX: 'auto' }}
        alternativeLabel
      >
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 4, md: 5 },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
        }}
      >
        {/* Left column: step content + navigation */}
        <Box sx={{ flex: { xs: 1, md: '0 0 calc(58.333% - 13.333px)' } }}>
          {step === 0 && (
            <BookingPackageStep
              selectedPackage={data.package}
              onChange={(val) =>
                setData((prev) => ({
                  ...prev,
                  package: val as WizardData['package'],
                }))
              }
            />
          )}

          {step === 1 && (
            <BookingTimeStep
              selectedTime={data.dateTime}
              onChange={(iso) => setData((prev) => ({ ...prev, dateTime: iso }))}
            />
          )}

          {step === 2 && (
            <BookingChildInfoStep
              ref={childInfoRef}
              defaultValues={{
                parentName: data.parentName,
                email: data.email,
                childName: data.childName,
                childAge: data.childAge,
                needs: data.needs,
              }}
            />
          )}

          {step === 3 && (
            <BookingConfirmStep
              selectedTime={data.dateTime}
              selectedPackage={data.package}
              parentName={data.parentName}
              childName={data.childName}
              childAge={data.childAge}
              submitting={submitting}
              submitError={submitError}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}

          {stepError && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {stepError}
            </Alert>
          )}

          {/* Navigation (hidden on step 3 — confirm step has its own buttons) */}
          {step < 3 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
              >
                {step === 2 ? 'Continue' : 'Next'}
              </Button>
            </Box>
          )}
        </Box>

        {/* Right column: trust panel (desktop only) */}
        <Box
          sx={{
            flex: { xs: 1, md: '0 0 calc(41.666% - 13.333px)' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          <BookingTrustPanel />
        </Box>
      </Box>

      {/* Trust panel below the form on mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
          Why book with Mrs. Isler?
        </Typography>
        <BookingTrustPanel />
      </Box>
    </Box>
  )
}

export default BookingWizard
