# Basic
- [Basic](#basic)
    - [Sort](#sort)
        - [Insertion Sort](#insertion-sort)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
        - [Bubble Sort](#bubble-sort)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
        - [Merge Sort](#merge-sort)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
        - [Quick Sort](#quick-sort)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
    - [Datastructure](#datastructure)
        - [Binary Tree](#binary-tree)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
            - [연결 리스트를 이용한 노드 구성](#%EC%97%B0%EA%B2%B0-%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%85%B8%EB%93%9C-%EA%B5%AC%EC%84%B1)
            - [간단한 이진 트리 구성성](#%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%9D%B4%EC%A7%84-%ED%8A%B8%EB%A6%AC-%EA%B5%AC%EC%84%B1%EC%84%B1)
        - [Level Order Tree Traversal (Breadth Frist Traversal for the tree)](#level-order-tree-traversal-breadth-frist-traversal-for-the-tree)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
        - [Breadth First Traversal or BFS for a Graph](#breadth-first-traversal-or-bfs-for-a-graph)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
        - [Depth First Traversal or DFS for a Graph](#depth-first-traversal-or-dfs-for-a-graph)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해설](#%ED%95%B4%EC%84%A4)
        - [XOR Linked List](#xor-linked-list)
            - [원문](#%EC%9B%90%EB%AC%B8)
            - [해석](#%ED%95%B4%EC%84%9D)
    - [Interview](#interview)
        - [면접전 읽어야할 자료구조](#%EB%A9%B4%EC%A0%91%EC%A0%84-%EC%9D%BD%EC%96%B4%EC%95%BC%ED%95%A0-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)
        - [면접전 읽어야할 데이터베이스](#%EB%A9%B4%EC%A0%91%EC%A0%84-%EC%9D%BD%EC%96%B4%EC%95%BC%ED%95%A0-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)
        - [면접전 읽어야할 운영체제](#%EB%A9%B4%EC%A0%91%EC%A0%84-%EC%9D%BD%EC%96%B4%EC%95%BC%ED%95%A0-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C)
## Sort
### Insertion Sort
#### 원문
The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.

1) The subarray which is already sorted.
2) Remaining subarray which is unsorted.

In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.
From https://www.geeksforgeeks.org/selection-sort/
#### 해석
정렬되지 않은 부분에서 가장 작은 값을 시작위치에 정렬시킨다. 이 알고리즘은 두 가지 하위 배열로 이루어진다.

1. 이미 정렬된 배열
2. 정렬되지 않은 배열

반복을 통해 정렬되지 않은 배열에서 최소값을 정렬된 배열로 이동시킨다.
```javascript
const insertionSort = (arr) => {
    for (let i=1; i<arr.length; i++) {
        let key = arr[i]
        let j = i-1
        while (j >= 0 && key < arr[j]) {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

let arr = [64, 25, 12, 22, 1]
insertionSort(arr)
console.log(arr)
```

```javascript
const insertionSort = (arr, len) => {
    if (len <= 1) {
        return
    }

    insertionSort(arr, len-1)

    let last = arr[len-1]
    let j = len-2
    while (j>=0 && arr[j]>last) {
        arr[j+1] = arr[j]
        j--
    }
    arr[j+1] = last
}

let arr = [64, 25, 12, 22, 1]
insertionSort(arr, arr.length)
console.log(arr)
```
### Bubble Sort
#### 원문
Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.
From https://www.geeksforgeeks.org/bubble-sort/
#### 해석 
가장 간단한 정렬 알고리즘이다. 반복적으로 순서가 엇갈린 값들을 바꾸면서 정렬시킨다.
```javascript
const bubbleSort = (arr) => {
    let maxLen = arr.length
    for (let i=0; i<maxLen; i++) {
        for (let j=0; j<maxLen-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr
}

let arr = []
for (let i=0; i<10000; i++) {
    arr = arr.concat(Math.floor(Math.random() * 255) + 1)
}
console.time('bubbleSort')
console.log(bubbleSort(arr))
console.timeEnd('bubbleSort')
```
### Merge Sort
#### 원문
Like QuickSort, Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.
#### 해석
분배와 정복 알고리즘이다. 배열을 반으로 나누고 또 다시 반으로 나눈다. 그 정렬된 반쪽을 합친다.
merge(arr, l, m, r) 함수는 arr[l..m] 과 arr[m+1..r] 정렬됨으로 간주하고 두개의 배열을 합병한다.
```javascript
const merge = (arr, left, middle, right) => {
    let sizeOfLeft= middle - left + 1
    let sizeOfRight = right - middle

    let leftNode = new Array(sizeOfLeft).fill(0)
    let rightNode = new Array(sizeOfRight).fill(0)
    
    for (let i=0; i<sizeOfLeft; i++) {
        leftNode[i] = arr[left + i]
    }

    for (let j=0; j<sizeOfRight; j++) {
        rightNode[j] = arr[middle + 1 + j]
    }

    let i = 0
    let j = 0
    let k = left
    
    while (i < sizeOfLeft && j < sizeOfRight) {
        if (leftNode[i] <= rightNode[j]) {
            arr[k] = leftNode[i]
            i++
        } else {
            arr[k] = rightNode[j]
            j++
        }
        k++
    }

    while (i < n1) {
        arr[k] = leftNode[i]
        i++
        k++
    }

    while (j < n2) {
        arr[k] = rightNode[j]
        j++
        k++
    }
}

const mergeSort = (arr, left, right) => {
    if (left < right) {
        let middle = Math.floor((left + right)/2)
        mergeSort(arr, left, middle)
        mergeSort(arr, middle + 1, right)
        merge(arr, left, middle, right)
    }
}

let arr = []
for (let i=0; i<5; i++) {
    arr = arr.concat(Math.floor(Math.random() * 255) + 1)
}
console.time('mergeSort')
mergeSort(arr, 0, arr.length - 1)
console.log(arr)
console.timeEnd('mergeSort')
```
### Quick Sort
#### 원문
Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.

Always pick first element as pivot.
Always pick last element as pivot (implemented below)
Pick a random element as pivot.
Pick median as pivot.
The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.
From https://www.geeksforgeeks.org/quick-sort/
#### 해석
병합 정렬과 마찬가지로 분배와 정복 알고리즘으로 통한다. 피봇 요소를 하나 선택하고 피봇 주위를 분할한다. 피봇을 정하는 방법에 따라 다양한 퀵정렬이 있다.

1. 첫번째 요소를 피벗으로 선택
2. 마지막 요소를 피벗으로 선택 
3. 특정 요소를 피벗으로 선택
4. 중앙 요소를 피벗으로 선택

퀵정렬에 가장 중요한 부분은 partition() 함수다. 분할의 대상은 배열과 배열 안의 피벗이다. 
정렬된 배열에 적절한 위치에 피벗을 두고 피벗보다 작은 값을 피벗 이전에 피벗 보다 큰 값을 이후에 둔다.
이 과정은 선형적인 시간 복잡도를 갖는다.

```javascript
const quickSort = ([n, ...nums], isDesc) =>
    isNaN(n)
        ? []
        : [
            ...quickSort(nums.filter(x => (isDesc ? x > n : x <= n )), isDesc),
            n,
            ...quickSort(nums.filter(x => (!isDesc ? x > n : x <= n )), isDesc)
        ]
let arr = []
for (let i=0; i<10000; i++) {
    arr = arr.concat(Math.floor(Math.random() * 255) + 1)
}
console.time('quickSort')
console.log(quickSort(arr, true))
console.timeEnd('quickSort')
```
## Datastructure
### Binary Tree
#### 원문 
**Trees**: Unlike Arrays, Linked Lists, Stack and queues, which are linear data structures, trees are hierarchical data structures.

**Tree Vocabulary**: The topmost node is called root of the tree. The elements that are directly under an element are called its children. The element directly above something is called its parent. For example, a is a child of f and f is the parent of a. Finally, elements with no children are called leaves.

**Reason**:
1. One reason to use tress might be because you want to store information that naturally forms a hierarchy
2. Trees provide moderate access/search
3. Trees provide moderate insertion/deletion
4. Like Linked Lists and unlike Arrays, Trees, don`t have an upper limit on number of nodes as nodes are linked using pointers

**Main applications of trees include**
1. Manipulate hierarchical data.
2. Make information easy to search (see tree traversal).
3. Manipulate sorted lists of data.
4. As a workflow for compositing digital images for visual effects.
5. Router algorithms
6. Form of a multi-stage decision-making (see business chess).

**properties**
1. the maximum number of nodes at level i of a binary tree is 2<sup>i-1</sup>
2. Maximum number of nodes in a binary tree of height 'h' is 2<sup>h-1</sup>
3. In a Binary Tree with N nodes, minimum possible height or minimum number of levels is Log<sub>2</sub>(N+1) + 1
4. A Binary Tree with L leaves has at least Log<sub>2</sub>L + 1 levels 
5. In Binary tree, number of leaf nodes is always one more than nodes with two children

#### 해석
**트리**: 배열, 연결 리스트, 스택, 큐 처럼 선형 구조의 자료구조가 아닌 수직 계층형태의 자료구조다.

**트리 관련어구**: 가장 상위의 노드를 루트라 부른다. 해당 노드의 바로 아래의 노드를 자식 노드라 칭하고 바로 위의 노드는 부모 노드라 칭한다.

**사용 이유**:
1. 자료를 저장함에 있어 수직 계층 구조가 필요할 때
2. 적절한 접근과 검색이 가능하다.(연결 리스트보다 빠르고 배열보다는 느리다.)
3. 적절한 삽입, 삭제가 가능하다.(배열 보다 빠르고 비정렬형 링크드리스트 보다는 느리다.)
4. 연결 리스트 처럼 노드들이 연결됨으로 노드 수에 제한을 받지 않는다.

**특성**:
1. 이진 트리의 레벨 i에서 노드의 최대수는 2<sup>i-1</sup>과 같다.
2. 높이 h의 이진 트리에서 노드의 최대 수는 2<sup>h-1</sup>과 같다.
3. N개의 노드를 갖는 이진 트리에서는 최소한 Log<sub>2</sub>(N+1) + 1의 높이를 갖는다.
4. L개의 단말 노드를 갖는 이진트리에서는 최소한 Log<sub>2</sub>L + 1의 높이를 갖는다.
5. 이진 트리에서는 단말 노드를 제외한 노드 중 2개의 자식을 갖는 노드들의 수에 1을 더하면 단말 노드의 수와 같다.

**tip**: 이진트리는 이진법과 연관성이 깊다. Log<sub>2</sub>10 - 1은 이진법으로 치면
십진수 10을 표현하려면
최소한 4개의 이진수가 필요하다. 더 주의할 것은 레벨 혹은 높이의 시작을 0으로 보는가 1로 보는가에 따라 보정값 -1, +1의 차이가 생길 수 있다.

#### 연결 리스트를 이용한 노드 구성
```javascript
class Node {
    constructor(item) {
        this.meta = {
            key: item,
            left: null,
            right: null
        }
    }
}
```

#### 간단한 이진 트리 구성성
```javascript
class Node {
    constructor(item) {
        this.meta = {
            key: item,
            left: null,
            right: null
        }
    }
}

const root = new Node(1)
root.meta.left = new Node(2)
root.meta.right = new Node(3)
root.meta.left.meta.left = new Node(4)
console.log(root.meta.left.meta.left.meta.key)
```
### Level Order Tree Traversal (Breadth Frist Traversal for the tree)
#### 원문
Level order traversal of a tree is breadth first traversal for the tree
#### 해석
트리에서 계층 순위 조회는 폭 우선 조회와 같다.
```javascript 
class Node {
    constructor(data) {
        this.data = data 
        this.left = null
        this.right = null
    }
}

const traverse = (node) => {
    if (!node) {
        return
    }

    let queue = []
    queue.push(node)
    
    while(queue.length > 0) {
        console.log(queue[0].data)
        let node = queue.shift()

        if (node.left) {
            queue.push(node.left)
        }

        if (node.right) {
            queue.push(node.right)
        }
    }
}

node = new Node(1)
node.left = new Node(2)
node.right = new Node(3)
node.left.left = new Node(4)
node.left.right = new Node(5)
traverse(node)
```
### Breadth First Traversal or BFS for a Graph
#### 원문
Breadth First Traversal for a graph is similar to Breadth First Traversal of a tree.
The only catch here is, unlike trees, graphs may contain cycles, so we may come to the same node again. 
To avoid processing a node more than once, we use a boolean visited array. For simplicity,
it is assumed that all vertices are reachable from the starting vertex.
From https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
#### 해석
그래프에서의 BFT는 트리에서의 BFT와 유사하다.
트리와 다른 점은 그래프는 원형 구조를 갖는 다는 점이다. 이는 다시 같은 노드로 회귀할 수 있다는 의미다. 이러한 회귀를 막기 위해 부울대수 배열을 이용해 방문록을 만들 수 있다.
이는 시작점에서 모든 점들이 연결됨을 가정한다.
**tip** 폭 우선 탐색은 깊이 우선 탐색과 달리 같은 레벨을 먼저 조회 함으로 큐를 사용한 스케쥴링이 필요하다.
```javascript
class Graph {
    constructor() {
        this.graph = new Map()
    }

    addEdge(u, v) {
        if (!this.graph.get(u)) {
            this.graph.set(u, [v])
        } else {
            this.graph.get(u).push(v)
        }
    }
    
    bfs(s) {
        let visited = new Array(this.graph.size).fill(false)
        let queue = []
        queue.push(s)
        visited[s] = true

        while (queue.length > 0) {
            let cursor = queue.shift()
            console.log(cursor)

            for (let item of this.graph.get(cursor)) {
                if (visited[item] === false) {
                    queue.push(item)
                    visited[item] = true
                }
            }
        }
    }
}

let g = new Graph()
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 2)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(3, 3)
console.log(g.graph)
g.bfs(2)
```
### Depth First Traversal or DFS for a Graph
#### 원문
Depth First Traversal for a graph is similar to Depth First Traversal of a tree.
The only catch here is, unlike trees, graphs may contain cycles, so we may come to the
same node again. To avoid processing a node more than once, we use a boolean visited array.
#### 해설
그래프의 깊이 우선 탐색은 트리에서의 깊이 우선 탐색과 유사하다.
이 장에서는 트리와 달리 그래프는 원형 구조에서 오는 중복 탐색 문제를 해결하는 부분을 다룬다.
**tip** 깊이 우선 탐색은 정복 알고리즘의 특성이 작용하여 리프 노드를 먼저 탐색함으로 재귀를 사용한다.
```javascript
class Graph {
    constructor() {
        this.graph = new Map()
    }

    addEdge(u, v) {
        if (this.graph.get(u)) {
            this.graph.get(u).push(v)
        } else {
            this.graph.set(u, [v])
        }
    }
    
    dfs(value) {
        const visit = (v, q) => {
            q[v] = true
            console.log(v)
            
            for (let item of this.graph.get(v)) {
                if (q[item] === false) {
                    visit(item, q)
                }
            
            }
       }
        let visited = new Array(this.graph.size).fill(false)
        visit(value, visited)
    }
}

g = new Graph()
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 2)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(3, 3)
g.dfs(2)
```
### XOR Linked List
#### 원문
An ordinary Doubly Linked List requires space for two address fields to store the addresses of previous and next nodes.
A memory effcient version of Doubly Linked List can be created using only one space for address field with every node.
this memory efficient Doubly Linked List is called XOR Linked or Memory Efficeint as the list uses bitwise XOR operation to
save space for one address. In the XOR linked list, instead of storing actual memory, every node stores the XOR of addresses of previous and next nodes.
#### 해석
본래 양방향 연결 리스트는 주소를 저장할 변수가 두개 필요하다. 하지만 메모리 최적화된 양방향 연결 리스트는 하나의 변수로 노드를 구성 할 수 있다.
이진 연산을 통해 이를 구현함으로 XOR 연결 리스트라 불린다.
```javascript
console.log(1 ^ 4 ^ 1)
console.log(1 ^ 4 ^ 4)
```

## Interview
### 면접전 읽어야할 자료구조
**What is a Data Structure?**

A data structures is a way of organizing the data so that the data can be used efficiently.
Different kinds of data structures are suited to different kinds of applications, and some are highly specialized to specific tasks. For example.
B-trees are particularly well-suited for implementation of databases, while compiler implementations usually use hash tables to look up identifiers.

✏️ **해석** 

자료 구조는 데이터를 조작함에 있어 효율적인 방법입니다.
다양한 종류의 데이터 구조가 다양한 요구에 의해 사용됩니다. 예로 들면 
밸런스 트리는 데이터베이스에 주로 사용되고 컴파일러의 경우 해쉬 테이블을 주로 사용합니다.

**How is an Array different from Linked List**
* The size of the arrays is fixed. Linked Lists are Dynamic in size.
* Inserting and deleting a new element in an array of elements is expensive, whereas both insertion and deletion can easily be done in Linked Lists
* Random access is not allowed in Linked Lists.
* Extra memory space for a pointer is require is required with each element of the Linked list.
* Arrays have better cache locality that can make a pretty big difference in performance.

✏️ **해석**
* 배열의 경우 고정 크기를 갖고 연결 리스트의 경우 동적인 크기를 갖습니다.
* 삽입과 삭제에 있어 배열은 연결 리스트보다 고비용이 요구됩니다.
* 연결 리스트에서는 랜덤 엑세스가 불가능합니다.
* 연결 리스트의 경우 다른 노드를 참조하기 위한 추가 공간이 필요합니다.
* 배열은 캐쉬 지역성 효율이 연결 리스트보다 뛰어납니다.

**Which data structures are used for BFS and DFS of a graph?**
* Queue is used for BFS
* Stack is used for DFS. DFS can also be implemented using recursion

✏️ **해석**
* 큐는 BFS 그래프 구조에서 사용됩니다. [Breadth First Traversal or BFS for a Graph](#breadth-first-traversal-or-bfs-for-a-graph)
* 스택은 DFS 그래프 구조에서 사용됩니다. DFS는 또한 재귀를 통해 구현될 수 있습니다. [Depth First Traversal or DFS for a Graph](#depth-first-traversal-or-dfs-for-a-graph)

**Can doubly linked be implemented using a single pointer variable in every node?**

Doubly linked list can be implemented using a single pointer. For example XOR Linked List 

✏️ **해석**

양방향 연결 리스트는 하나의 포인터로 구현될 수 있으며 그 예로 XOR 연결 리스트가 있다.

**How to implement a stack using queue?**

A stack can be implemented using two queues. Let stack to be implemented be 's' and queues used to implement be 'q1' and 'q2'. Stack 's' can be implemented in two ways:
* Method 1 (By making push operation costly)
* Method 2 (By making pop operation costly)

✏️ **해석**

두 개의 큐를 이용해 구현할 수 있으며 두 가지 방법 있다.
* 새로운 값이 push 될 때, 비어있는 큐에 새로운 값을 넣고 pop이 될 큐로 교체한다.
* pop시에 마지막 요소를 제외하고 모든 요소를 다른 큐에 옮긴다.
    
**Which Data Structures be used for implementioning LRU cache?**

We use two data structures to implement an LRU Cache.
1. Queue: which is implemented using a doubly linked list. The maximum size of the queue will be equal to the total number of frames available. The most recently used pages will be near front end and least recently pages will be near rear end.
2. Hash with page number as key and address of the corresponding queue

✏️ **해석**
    
두 가지의 자료구조를 사용합니다.
1. 큐: 양방향 연결 리스트로 구현된 큐를 통해 구현되며 큐의 최대 크기는 캐쉬의 크기를 뜻합니다.  
2. 해쉬: 페이지 수를 키로 노드의 주소를 값으로 사용합니다.
### 면접전 읽어야할 데이터베이스
**What are super, primary, candidate and foreign keys?**

A superkey is a set of attributes of a relation schema upon which all attributes of the schema are functionally dependent.
No two rows can have the same value of super key attributes.
A Candidate key is minimal superkey, i.e no proper subset of candidate key attributes can be a superkey
A Primary key is one of the candidate keys. one of the candidate keys is selected as most important and becomes the primary key.
there cannot be more that one primary keys in a table.
Foreign key is a field in one table that uniquely identifies a row of another table

✏️ **해석**

슈퍼키는 함수 종속 성을 갖는 관계 스키마의 속성들의 집합이다. 두 행이 같은 슈퍼키 값을 갖을 수 없다.
후보키는 최소화된 슈퍼키로 후보키에 속하는 속성들은 슈퍼키가 될 수 있다.
기본키는 후보키 중에 선택된 하나를 뜻한다. 하나의 테이블에는 하나의 기본키가 있다.
외래키는 다른 테이블의 특정 하나의 행을 지정하는 필드를 뜻한다.

**What is the diffrence between primary key and unique constraints?**

Primary key cannot have NULL value, the unique constraints can have NULL values.
there is only one primary key in a table, but there can be multiple unique constraints. 

✏️ **해석**

    기본키는 NULL 값을 갖지 않지만 단일 제약조건의 경우 NULL 값을 허용 할 수 있다.
    기본키는 테이블 당 하나로 지정되지만 단일 제약조건은 복수로 지정할 수 있다.

**What is database normalization?**

It is a process of analyzing the given relation schemas based on their functional dependencies
and primary keys to achieve the following desirable properties
1) Minimizing Redundancy
2) Minimizing the Insertion, Deletion and Update anomalies
Relation schemas that do not meet the properties are decomposed into smaller relation schemas
that could meet desirable properties. 

✏️ **해석**

함수 종속성을 기반으로 하여 릴레이션 스키마를 분석하는 과정을 뜻하며 기본키가 다음의 특성을 이루게한다.
1. 여분의 데이터를 최소화
2. 삽입, 삭제, 변경 행위의 이상 작동을 최소화
관계 스키마가 위 특성을 이행하지 못한다면 더 작은 관계 스키마로 분할하여 특성을 이행한다.

**What is the difference between having and where clause?**

HAVING is used to specify a condition for a group or an aggregate function used in select statement.
the WHERE clause selects before grouping. the having clause selects rows after grouping, unlike HAVING clause,
the WHERE clause cannot contain aggregate functions.

✏️ **해석**

HAVING은 그룹 조건에서 사용된다. 그룹 이후 행을 선택하는 조건을 만든다. WHERE의 경우에는 그룹 조건 이전에 사용되며
그룹 조건을 포함하지 않고 전체 행을 대상으로 한다.

**What is a view in SQL? How to create one**

A view is a virtual table based on the result-set of an SQL statement. We can create using create view syntax

✏️ **해석**

뷰는 SQL 문에서 생성되는 가상의 테이블이다. 뷰 생성 문을 이용해 생성 할 수 있다.

**What are the uses of veiw?**
1. Views can represent a subset of the data contained in a table. consequently, a view can limit the degree of exposure of the underlying tables to the outer world
2. Views can join and simplify multiple tables into a single virtual table
3. Views can act as aggregated tables, where the database engine aggregates data and presents the calculated results as part of the data
4. Views can hide the complexity of data
5. Views take very little space to store. the database contains only the definition of a view, not a copy of all the data
6. Depending on the SQL engine used, views can provide extra security

✏️ **해석**
1. 테이블의 부분 집합을 나타낼 수 있다. 고로 기본이 되는 테이블의 노출 수준을 조절 할 수 있다.
2. 여러 테이블을 조인하여 하나의 테이블로 만들 수 있다.
3. 테이블의 집계를 위해 사용될 수 있다.
4. 데이터의 복잡도를 숨길 수 있다. 
5. 뷰는 매우 적은 공간을 사용하는데, 이는 뷰의 정의만을 정의 할 뿐, 모든 데이터를 복사하는 것이 아니기 때문이다.
6. SQL 엔진의 종류에 따라 별도의 보안 설정을 할 수 있다.

**What is a Trigger**

A Trigger is a code that associated with insert, update or delete operation.
the executed automatically whenever the associated query is executed on a table.
Triggers can be useful to maintain integiry in database.

✏️ **해석**

삽입, 삭제, 변경과 연관된 작업이다. 연관된 쿼리가 작동하면 자동적으로 실행된다.
데이터베이스의 무결성을 관리하는데 유용하다.

**What is a stored procedure?**

A stored procedure is like a function that contains a set of operations compiled together.
it contains a set of operations that are commonly used in an application to do some common database tasks.

✏️ **해석**

컴파일된 명령어들 이 포함된 함수와 같이 작용한다. 어플리케이션에서 사용되는 일반적인 명령들을 포함하며 명령은 데이터베이스에 관련되어있다.

**What is a transaction? What are ACID properties?**

A database transaction is a set of database operations that must be treated as whole, means either all operations are executed or none of them
an example can be bank transaction from one account to another account. Either both debit and credit operations must be executed or none of them
ACID(Atomicity, Consitency, Isolation, Durability) is a set of properties that guarantee that database transactions are processed reliably.

✏️ **해석**

전체적으로 이루어지는 모든 데이터베이스 작업을 뜻한다. 작업은 실행되거나 혹은 아무것도 안하거나 모두를 포함한다.
예를 들어 은행 계좌 시스템에서 데빗 카드나 신용 카드가 사용되거나 사용되지 않음을 뜻한다.
ACID(원자성, 일관성, 독립성, 지속성)은 트랜잭션의 신뢰도를 결정짓는 특성이다.

**What are indexes**

A database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and
the use of more storage space to maintain the extra copy of data.
data can be stored only in one order on disk. To support faster access according to different values, faster search like binary search for different values
is desired, For this purpose, indexes are created on tables. These indexs need extra space on disk, but they allow faster search according to different frequently
searched values.

✏️ **해석**

인덱스는 추가적인 쓰기 비용과 별도의 저장 공간을 사용하여 테이블에서의 검색 속도를 향상시키는 자료구조이다.
데이터는 하나의 순서로 디스크에 저장되며 다른 값으로 빠른 검색을 위해서는 이진 검색과 같은 자료구조가 필요합니다. 이를 위해
인덱스는 테이블에 생성되며 별도의 저장 공간을 요구합니다. 대신 빈번히 검색되는 다른 값들을 빠르게 검색 할 수 있습니다. 

**What are clustered and non-clustered indexes?**

Clustered indexes is the index according to which data is physically stored on disk.
therefore, only one clustered index can be created on a given database table.
Non-clustered indexes don`t define physical of data, but logical ordering. typically, a tree is created whose leaf point to disk records.
B-tree or B+ tree are used for this purpos.

✏️ **해석**

군집된 인덱스는 디스크에 물리적으로 저작된 인덱스를 뜻한다. 그러므로 테이블 당 하나의 군집된 인덱스를 갖을 수 있다.
비군집 인덱스는 물리적으로는 저장되지 않지만 논리적인 순서를 갖는다. 일반적으로 단말 노드가 디스크 리코드를 가르키는 트리가 만들어진다.
B-tree, B+ tree 구조가 이에 사용된다. 
### 면접전 읽어야할 운영체제 
**What is a process and process table? What are different states of process**   

A process is an instance of program in execution. For example a Web Browser is a process, a shell (or command prompt) is a process.
The operating system is responsible for managing all the processes that are running on a computer and allocated each process a certain amount of time to use the processor. In addition, the operating system also allocates various other resources that processes will need such as computer memory or disks. To keep track of the state of all the processes, the operating system maintains a table known as the process table. Inside this table, every process is listed along with the resources the processes is using and the current state of the process.
Processes can be in one of three states: running, ready, or waiting. The running state means that the process has all the resources it need for execution and it has been given permission by the operating system to use the processor. Only one process can be in the running state at any given time. The remaining processes are either in a waiting state (i.e., waiting for some external event to occur such as user input or a disk access) or a ready state (i.e., waiting for permission to use the processor). In a real operating system, the waiting and ready states are implemented as queues which hold the processes in these states. The animation below shows a simple representation of the life cycle of a process

✏️ **해석**

실행 중인 프로그램의 인스턴스, 운영체제는 이 프로세스에 대한 관리 권한을 갖고 있다는데, 프로세스들의 상태를 관리하기 위해 프로세스 테이블을 이용한다.
프로세스는 실행중, 준비, 대기 세가지 상태를 갖는다. 운영체제가 허용한 프로세스 만이 실행될 수 있으며 이외 프로세스는 대기 상태를 유지한다.

**What is a Thread? What are the differences between process and thread**

A thread is a single sequence stream within in a process. Because threads have some of the properties of processes, they are sometimes called lightweight processes. Threads are popular way to improve application through parallelism. For example, in a browser, multiple tabs can be different threads. MS word uses multiple threads, one thread to format the text, other thread to process inputs, etc.
A thread has its own program counter (PC), a register set, and a stack space. Threads are not independent of one other like processes as a result threads shares with other threads their code section, data section and OS resources like open files and signals.

✏️ **해석**

프로세스안의 하나의 흐름. 프로세스의 특성을 갖고 있기에 경량 프로세스라고도 부른다. 스레드만의 PC, 레지스터, 스택 공간을 소유한다. 프로세스 안의 스레드들은
메모리를 공유할 수 있다.

**What is deadlock?**

Deadlock is a situation when two or more processes wait for each other to finish and none of them ever finish.  Consider an example when two trains are coming toward each other on same track and there is only one track, none of the trains can move once they are in front of each other.  Similar situation occurs in operating systems when there are two or more processes hold some resources and wait for resources held by other(s).

✏️ **해석**

프로세스가 끝나기를 기다리는 동안 프로세스는 끝나지 않고 다른 프로세스는 대기 상태로 머무르는 현상.
주로 상호배제, 자원 독점의 문제로 발생한다.