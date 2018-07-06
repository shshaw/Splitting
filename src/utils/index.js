import { setProperty } from '../utils/dom'

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param {*} s
 * @param {*} key
 * @param {*} splits
 */
export function index (element, key, splits) {
  setProperty(element, key + '-total', splits.length)
  splits.forEach(function (s, i) {
    setProperty(s, key + '-index', i)
  })
  return splits
}
