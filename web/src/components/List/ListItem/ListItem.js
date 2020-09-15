import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { BsCheck } from 'react-icons/bs'

import './ListItem.css'

const ListItem = ({ item, onClick, isActive }) => (
  <ListGroup.Item
    key={item._id}
    action
    onClick={() => onClick(item)}
    active={isActive(item)}
    className="ListItem__item d-flex justify-content-between align-items-center mb-1 rounded-0"
  >
    <span>{item.name}</span>
    {isActive(item) && <BsCheck className="text-success font-weight-bold" />}
  </ListGroup.Item>
)

export default ListItem
