import React from 'react'
import { pipe, map, toLower } from 'lodash/fp'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { BsCaretRightFill, BsCaretDownFill } from 'react-icons/bs'
import { groupMatchesByCompetition } from '@/selectors/matchesSelector'
import withState from '@/components/withState'
import Avatar from '@/components/Avatar/Avatar'
import MatchesList from '@/components/MatchesList/MatchesList'

import { AREA_ENSIGN_REMOTE_URL_PREFIX } from '@/constants/areas'

const CompetitionMatchesCard = ({
  data: matches,
  collapsed,
  setCollapsed,
  onNotificationClick,
  onFavoriteClick
}) => {
  const getAreaEnsignUrl = (area) => {
    return (
      area.ensignUrl ||
      `${AREA_ENSIGN_REMOTE_URL_PREFIX}${toLower(area.code)}.svg`
    )
  }

  return pipe(
    groupMatchesByCompetition,
    map((competition) => (
      <Card key={competition._id} className="mb-3">
        <Card.Header>
          <Row className="w-100">
            <Col className="d-flex align-center-items">
              <Avatar src={getAreaEnsignUrl(competition.area)} />
              <div className="d-flex align-items-center">
                <span>{competition.name}</span>
                <span className="text-muted ml-2">
                  ({competition.area.countryCode})
                </span>
              </div>
            </Col>
            <Col className="d-flex align-items-center justify-content-end text-muted">
              <Button
                variant="link"
                className="p-0"
                onClick={() => setCollapsed(competition)}
              >
                {competition.group}
                {collapsed[competition._id] ? (
                  <BsCaretRightFill />
                ) : (
                  <BsCaretDownFill />
                )}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <MatchesList
          {...{
            competition,
            collapsed,
            onNotificationClick,
            onFavoriteClick
          }}
        />
      </Card>
    ))
  )(matches)
}

export default withState(CompetitionMatchesCard)
