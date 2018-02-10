const errInvalidInput = "Invalid Input";
const getMid = (start, end) => Math.floor(start + (end - start)/2);
const rangeSum = (tree, start, end, queryStart, queryEnd, index) => {
    if (queryStart <= start && queryEnd >= end) {
        return tree[index];
    }

    if (end < queryStart || start > queryEnd) {
        return 0;
    }

    let mid = getMid(start, end);
    return rangeSum(tree, start, mid, queryStart, queryEnd, 2*index+1) +
        rangeSum(tree, mid+1, end, queryStart, queryEnd, 2*index+2);
}

const updateValue = (tree, start, end, cursor, diff, index) => {
   if (cursor < start || cursor > end) {
       return;
   } 

   tree[index] = tree[index] + diff;
   if (end != start) {
       let mid = getMid(start, end);
       updateValue(tree, start, mid, cursor, diff, 2*index + 1);
       updateValue(tree, mid+1, end, cursor, diff, 2*index + 2);
   }
}

const updateTree = (arr, tree, n, cursor, newVal) => {
    if (cursor < 0 || cursor > n-1) {
        throw errInvalidInput;
    }
    
    let diff = newVal - arr[cursor];
    arr[cursor] = newVal;
    updateValue(tree, 0, n-1, cursor, diff, 0);
}

const getSum = (tree, n, queryStart, queryEnd) => {
    if (queryStart < 0 || queryEnd > n-1 || queryStart > queryEnd) {
        throw errInvalidInput;
    }
    
    return rangeSum(tree, 0, n-1, queryStart, queryEnd, 0);
}

/*
Segment Tree 구성
Post-order 방식으로 생성해난간다.
index 변수는 현재 삽입되는 인덱스 값이며 재귀적 호출을 통해 자식 노드의 값을 더 한다.
자식 노드들은 index*2 + 1 값이 왼쪽 자식이 되고 index*2 + 2의 값이 오른쪽 자식이된다.(배열을 이용한 이진 트리에서)
start 와 end의 값이 같음은 단말 노드를 찾았음을 의미한다.
*/
const constructSegementTree = (arr, start, end, tree, index) => {
    if (start == end) {
        tree[index] = arr[start];
        return arr[start];
    }

    let mid = getMid(start, end);
    tree[index] = constructSegementTree(arr, start, mid, tree, index*2+1) +
        constructSegementTree(arr, mid+1, end, tree, index*2+2);
    return tree[index];
}

/*
Segment Tree를 구성하기 위한 공간 할당 부분
포화 이진 트리의 성질로 2*2^h-1 = 전체 노드의 수를 이용해 공간할당.
트리의 높이는 log2 n과 같음으로 2*2^log2n - 1이 필요한 총 공간의 수다.(n은 단말 노드의 수)
*/
const InitSegementTree = (arr, n) => {
    let height = Math.ceil(Math.log2(n));
    let maxSize = 2*Math.pow(2, height) - 1;
    let tree = new Array(maxSize);

    constructSegementTree(arr, 0, n-1, tree, 0);
    return tree;
}

module.exports = {
    InitSegementTree,
    getSum,
    updateTree
}

