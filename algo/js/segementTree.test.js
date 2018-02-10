const segmentTree = require('./segementTree')
var arr = [1, 3, 5, 7, 9, 11]
var tree

describe('sum of given range', () => {
  test('initialize segement tree', () => {
    tree = segmentTree.InitSegementTree(arr, 6)
    console.log(tree)
  })

  test('sum of values in array from index 1 to 3', () => {
    let result = segmentTree.getSum(tree, 6, 1, 3)
    console.log(result)
  })

  test('set arr[1] = 10 and update corresponding tree', () => {
    segmentTree.updateTree(arr, tree, 6, 1, 10)
    let result = segmentTree.getSum(tree, 6, 1, 3)
    console.log(result)
  })
})
