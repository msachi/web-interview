export const formatTitle = title => {
  if (title === 'gp') return 'GP'
  return title.charAt(0).toUpperCase() + title.slice(1)
}

export const getConsultantTypes = availableSlots => {
  const consultants = availableSlots.reduce(
    (acc, curr) => acc.concat(curr.consultantType),
    []
  )
  return [...new Set(consultants)]
}

export const getAppointmentTimes = (availableSlots, selectedConsultantType) => {
  return availableSlots
    .filter(slot => slot.consultantType.includes(selectedConsultantType))
    .map(slot => slot.time)
}

export const getAppointmentTypes = (
  availableSlots,
  selectedAppointmentTime
) => {
  if (!selectedAppointmentTime) return ['video', 'audio']
  return availableSlots
    .find(slot => slot.time === selectedAppointmentTime)
    .appointmentType.sort((a, b) => b.localeCompare(a))
}
