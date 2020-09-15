import React, { useState } from 'react'
import { get } from 'lodash/fp'
import { useQuery, useMutation } from '../../hooks/graphQL'
import { queries, mutations } from '@/services'
import CompetitionMatchesCard from '@/components/CompetitionMatchesCard/CompetitionMatchesCard'
import { Row, Col } from 'react-bootstrap'
import { formatDate } from '@/utils/application'
const currentDate = new Date()

const CurrentDateMatches = () => {
  const [collapsed, setCollapsed] = useState({})

  const dateFrom = formatDate(currentDate)
  const dateTo = new Date(currentDate)
  dateTo.setDate(currentDate.getDate() + 1)

  const { loading, error, data, refetch } = useQuery(
    queries.USER_MATCHES_QUERY,
    {
      path: 'userMatches',
      variables: { dateFrom, dateTo: formatDate(dateTo) }
    }
  )

  const [saveUserMatch] = useMutation(mutations.SAVE_USER_MATCH_MUTATION, {
    path: 'saveUserMatch',
    unique: true
  })

  const toggleMatchNotification = async ({ _id, userMatch }) => {
    await saveUserMatch({
      variables: {
        match: parseInt(_id),
        ...userMatch,
        notification: !get('notification', userMatch)
      }
    })
    await refetch({ dateFrom: '2020-09-10', dateTo: '2020-09-11' })
  }

  const toggleMatchFavorite = async ({ _id, userMatch }) => {
    await saveUserMatch({
      variables: {
        match: parseInt(_id),
        ...userMatch,
        favorite: !get('favorite', userMatch)
      }
    })
    await refetch({ dateFrom: '2020-09-10', dateTo: '2020-09-11' })
  }

  const toggleCollapsed = (competition) => {
    setCollapsed({
      ...collapsed,
      [competition._id]: !collapsed[competition._id]
    })
  }

  return (
    <>
      <Row>
        <Col>
          <h5>Today's matches</h5>
        </Col>
      </Row>
      <CompetitionMatchesCard
        {...{
          loading,
          error,
          data,
          collapsed,
          onNotificationClick: toggleMatchNotification,
          onFavoriteClick: toggleMatchFavorite
        }}
        setCollapsed={toggleCollapsed}
      />
    </>
  )
}

export default CurrentDateMatches
