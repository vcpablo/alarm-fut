import React from 'react'
import { get } from 'lodash/fp'
import {
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import { BsBell, BsBellFill, BsStar, BsStarFill } from 'react-icons/bs'
import { HOME_TEAM, AWAY_TEAM } from '@/constants/matches'
import Avatar from '@/components/Avatar/Avatar'
import { formatDate } from '@/selectors/matchesSelector'

const MatchesListItem = ({
  competition,
  match,
  collapsed,
  onNotificationClick,
  onFavoriteClick
}) => {
  const getHomeTeamWinnerClass = (winner) => {
    const className = (winner === HOME_TEAM && ' font-weight-bold') || ''
    return 'd-flex justify-content-between w-75' + className
  }

  const getAwayTeamWinnerClass = (winner) => {
    const className = (winner === AWAY_TEAM && ' font-weight-bold') || ''
    return 'd-flex justify-content-between w-75' + className
  }

  return (
    <ListGroup.Item
      key={match._id}
      className={collapsed[competition._id] && 'd-none'}
    >
      <Row>
        <Col className="d-flex align-items-center justify-content-between">
          <div className={[getHomeTeamWinnerClass(match.score.winner)]}>
            <span>{match.homeTeam.name}</span>
            <span>{match.score.fullTime.homeTeam}</span>
          </div>
          <Avatar src={match.homeTeam.crestUrl} />
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          sm={1}
        >
          {match.status === 'SCHEDULED' && formatDate(match.utcDate)}
          {match.status === 'IN_PLAY' && (
            <>
              <div className="text-success">
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner animation="grow" size="sm" className="mr-2" />
                  Live
                </div>
              </div>
            </>
          )}
          {match.status === 'FINISHED' && (
            <span className="text-muted text-center">Finished</span>
          )}
        </Col>
        <Col className="d-flex align-items-center justify-content-between">
          <Avatar src={match.awayTeam.crestUrl} />
          <span className={getAwayTeamWinnerClass(match.score.winner)}>
            <span>{match.score.fullTime.awayTeam}</span>
            <span>{match.awayTeam.name} </span>
          </span>
        </Col>
        <Col
          sm={1}
          className="d-flex justify-content-center align-items-center p-0 border-left"
        >
          {match.status !== 'FINISHED' && (
            <>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {get('userMatch.notification', match)
                      ? 'Disable notification'
                      : 'Enable notification'}
                  </Tooltip>
                }
              >
                <Button
                  variant="link"
                  className="p-0 mr-2"
                  onClick={() => onNotificationClick(match)}
                >
                  {(get('userMatch.notification', match) && (
                    <BsBellFill size={20} className="text-success" />
                  )) || <BsBell size={20} className="text-success" />}
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {get('userMatch.favorite', match)
                      ? 'Remove from favorites'
                      : 'Add to favorites'}
                  </Tooltip>
                }
              >
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => onFavoriteClick(match)}
                >
                  {(get('userMatch.favorite', match) && (
                    <BsStarFill size={20} className="text-success" />
                  )) || <BsStar size={20} className="text-success" />}
                </Button>
              </OverlayTrigger>
            </>
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default MatchesListItem
