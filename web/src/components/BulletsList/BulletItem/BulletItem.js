import React from 'react'
import Button from 'react-bootstrap/Button'
import { BsX } from 'react-icons/bs'

const BulletItem = ({ item, onClick }) => (
  <div
    key={item._id}
    className="d-flex align-items-center border px-2 py-2 mr-2"
  >
    <span>{item.name}</span>

    <Button variant="link" className="ml-2 p-0" onClick={() => onClick(item)}>
      <BsX />
    </Button>
  </div>
)

export default BulletItem
