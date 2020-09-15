import React, { useState } from 'react'
// import { useQuery, useMutation } from '@apollo/client'
import { useQuery, useMutation } from '../../hooks/graphQL'
import { pick, getOr, map, some, filter } from 'lodash/fp'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'

import List from '@/components/List/List'
import BulletsList from '@/components/BulletsList/BulletsList'
import SearchForm from '@/components/SearchForm/SearchForm'

import { queries, mutations } from '@/services'
import { MODES } from '@/constants/teams'
import { BsX } from 'react-icons/bs'

const Teams = ({ history }) => {
  const [mode, setMode] = useState(MODES.TEAMS)
  const [errors, setErrors] = useState()
  const [selectAreaDisabled, setSelectAreaDisabled] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const teams = pick(
    ['loading', 'error', 'data', 'refetch'],
    useQuery(queries.TEAM_QUERY, {
      path: 'teams'
    })
  )

  const areas = pick(
    ['loading', 'error', 'data', 'refetch'],
    useQuery(queries.AREA_QUERY, {
      path: 'areas'
    })
  )

  const [saveUserTeams, { loading: saveUserTeamsLoading }] = useMutation(
    mutations.SAVE_USER_TEAMS_MUTATION,
    {
      path: 'saveUserTeams'
    }
  )

  const onListItemClick = (item) => {
    const exists = some(
      (selectedItem) => selectedItem._id === item._id,
      selectedItems
    )
    if (exists) {
      setSelectedItems(
        filter((selectedItem) => selectedItem._id !== item._id, selectedItems)
      )
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const onBulletItemClick = (item) =>
    setSelectedItems(
      filter((selectedItem) => selectedItem._id !== item._id),
      selectedItems
    )

  const toggleMode = () => {
    setSelectedAreaId(null)
    setMode(mode === MODES.TEAMS ? MODES.AREAS : MODES.TEAMS)

    if (mode === MODES.AREAS) {
      teams.refetch({ name: '', area: null })
    }
  }

  const onAreaListChange = (event) => {
    const area = { _id: event.target.value }
    setSelectedAreaId(area._id)
    if (area._id) {
      setSelectAreaDisabled(true)
      setSearch('')
      teams.refetch({ name: '', area: parseInt(area._id) })
    }
  }

  const onSearchFormInput = (name) => {
    setSearch(name)
    teams.refetch({ name, area: parseInt(selectedAreaId) })
  }

  const onNextClick = async () => {
    const teams = map(({ _id }) => _id, selectedItems)
    const { errors } = await saveUserTeams({ variables: { teams } })
    if (errors) {
      setErrors(errors)
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h5>Which teams do you want to follow?</h5>
        </Col>
        <Col className="text-right">
          <Button variant="link" className="p-0" onClick={() => toggleMode()}>
            {mode === MODES.TEAMS ? 'Find by Country' : 'Find Team'}
          </Button>
        </Col>
      </Row>
      <hr />
      {selectedItems.length > 0 && (
        <Row className="mb-3">
          <Col>
            <BulletsList items={selectedItems} onClick={onBulletItemClick} />
          </Col>
        </Row>
      )}

      {mode === MODES.AREAS && (
        <>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Country</Form.Label>
                <Form.Control as="select" custom onChange={onAreaListChange}>
                  <option value={''} disabled={selectAreaDisabled}>
                    Select a country
                  </option>
                  {map(
                    (area) => (
                      <option key={area._id} value={area._id}>
                        {area.name}
                      </option>
                    ),
                    getOr([], 'data', areas)
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </>
      )}

      {(mode === MODES.TEAMS || selectedAreaId) && (
        <>
          <Card className="rounded-0">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <b>{search ? 'Search Results' : 'Suggested Teams'}</b>
              <Button className="p-0" variant="link">
                <BsX />
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <SearchForm onInput={onSearchFormInput} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <List
                    {...teams}
                    data={getOr([], 'data', teams)}
                    selectedItems={selectedItems}
                    onClick={onListItemClick}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}

      <Row className="fixed-bottom">
        <Col>
          <Button
            variant="success"
            size="block"
            className="rounded-0"
            disabled={selectedItems.length === 0 || saveUserTeamsLoading}
            onClick={onNextClick}
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Teams
