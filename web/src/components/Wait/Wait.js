import React from 'react'

const Wait = ({ text, loading }) => (
  <>{(loading && <span>Wait...</span>) || text}</>
)

export default Wait
