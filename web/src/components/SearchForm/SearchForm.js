import React from 'react'
import { debounce } from 'lodash'
import { Form } from 'react-bootstrap'

const SearchForm = ({ value, children, onInput }) => {
  const debouncedOnInput = debounce((value) => onInput(value), 500)
  return (
    <Form>
      <Form.Group controlId="formSearch">
        <Form.Control
          value={value}
          type="search"
          placeholder="Type to search..."
          onInput={(e) => debouncedOnInput(e.target.value)}
          className="rounded-0"
        />
        {children}
      </Form.Group>
    </Form>
  )
}

export default SearchForm
