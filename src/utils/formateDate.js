import dayjs from 'dayjs'

export const readableDate = (dateStr) => {
  return dayjs(dateStr).format('YYYY/MM/DD')
}
