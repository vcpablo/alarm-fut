export const getAppKey = (key) => `${process.env.REACT_APP_CODE}__${key}`

export const formatDate = (date) => {
  const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(
    date
  )
  const month = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(
    date
  )
  const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)

  return `${year}-${month}-${day}`
}
