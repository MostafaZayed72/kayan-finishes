export const useBookingModal = () => {
  const isOpen = useState<boolean>('bookingModalOpen', () => false)
  const prefilledNote = useState<string>('bookingModalNote', () => '')

  const openBooking = (note = '') => {
    prefilledNote.value = note
    isOpen.value = true
  }

  const closeBooking = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    prefilledNote,
    openBooking,
    closeBooking,
  }
}
