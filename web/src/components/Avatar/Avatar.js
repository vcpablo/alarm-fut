import React from 'react'
import './Avatar.css'

const Avatar = ({ src }) => (
  <div className="mr-2 Avatar" style={{ backgroundImage: `url(${src})` }} />
)

export default Avatar
