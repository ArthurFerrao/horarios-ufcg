type daysMapType = {
  [key: string]: string
}
export const DAYS_MAP: daysMapType = {
  '2': 'SEG',
  '3': 'TER',
  '4': 'QUA',
  '5': 'QUI',
  '6': 'SEX',
  '7': 'SAB',
}

export const DAYS = Object.values(DAYS_MAP)

export const HORARIOS_DEFAULT: Hora[] = [
  { id: '08:00-10:00', inicio: '08:00', fim: '10:00' },
  { id: '10:00-12:00', inicio: '10:00', fim: '12:00' },
  { id: '14:00-16:00', inicio: '14:00', fim: '16:00' },
  { id: '16:00-18:00', inicio: '16:00', fim: '18:00' },
]
