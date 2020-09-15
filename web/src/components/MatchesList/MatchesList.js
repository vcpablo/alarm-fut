import React from 'react'
import { ListGroup } from 'react-bootstrap'
import MatchesListItem from '@/components/MatchesList/MatchesListItem/MatchesListItem'

const MatchesList = ({
  competition,
  collapsed,
  onNotificationClick,
  onFavoriteClick
}) => {
  return (
    <ListGroup variant="flush">
      {competition.matches.map((match) => (
        <MatchesListItem
          key={match._id}
          {...{
            match,
            competition,
            collapsed,
            onNotificationClick,
            onFavoriteClick
          }}
        />
      ))}
    </ListGroup>
  )
}

export default MatchesList
