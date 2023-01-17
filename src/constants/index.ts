type daysMapType = {
  [key: string]: string
}
export const DAYS_MAP: daysMapType = {
  '2': 'SEG',
  '3': 'TER',
  '4': 'QUA',
  '5': 'QUI',
  '6': 'SEX',
}

export const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX']

export const HORARIOS_DEFAULT: hora[] = [
  { inicio: '08:00', fim: '10:00' },
  { inicio: '10:00', fim: '12:00' },
  { inicio: '14:00', fim: '16:00' },
  { inicio: '16:00', fim: '18:00' },
]
