const getDateMonth = function(date) {
  return new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(date)
}

const formatDate = function(date) {
  const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(
    date
  )
  const month = getDateMonth(date)
  const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)

  return `${year}-${month}-${day}`
}

module.exports = { formatDate, getDateMonth }
