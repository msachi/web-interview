export const getUserInitials = (userInfo, error) => {
  if (error) return '??'

  const { firstName, lastName } = userInfo
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
}
