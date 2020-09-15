import { find } from 'lodash/fp'
import { routes } from './Routes'

export const findRouteName = (url) => {
  return find((route) => route.path === url, routes)
}

export const getPaths = (pathname) => {
  const paths = ['/']

  if (pathname === '/') return paths

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`
    paths.push(currPath)
    return currPath
  })

  return paths
}
