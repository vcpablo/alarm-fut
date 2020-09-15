import React from 'react'
import { some, map } from 'lodash/fp'
import { ListGroup } from 'react-bootstrap'
import ListItem from './ListItem/ListItem'

import withState from '@/components/withState'

const List = ({ data, selectedItems, onClick }) => {
  const isActive = (item) =>
    some((selectedItem) => selectedItem._id === item._id, selectedItems)

  return (
    <ListGroup>
      {map(
        (item) => (
          <ListItem
            key={item._id}
            item={item}
            onClick={onClick}
            isActive={isActive}
          />
        ),
        data
      )}
    </ListGroup>
  )
}

export default withState(List)
