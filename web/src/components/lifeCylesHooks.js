/* eslint-disable */
import { useEffect, useRef } from 'react'

export const componentDidMount = (handler) => {
  return useEffect(() => {
    return handler()
  }, [])
}

export const componentDidUpdate = (handler, deps) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false

      return
    }

    return handler()
  }, deps)
}
