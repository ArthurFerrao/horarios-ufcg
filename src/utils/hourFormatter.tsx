export const formatHour = (hour: string) => {
  const hourSplited = hour.split(':')
  return hourSplited[0]
}

export default formatHour
