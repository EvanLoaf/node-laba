import { Stack } from './model/stack.model';
import { Queue } from './model/queue.model';
import { BinaryTree } from './model/binary-tree.model';
import { Graph } from './model/graph.model';
import { GraphWithWeights } from './model/graph-with-weights.model';
import { LinkedList } from './model/linked-list.model';
import { MinMaxStack } from './algo-problem/min-max-stack.model';
import { TreeNode } from './model/binary-tree-node.model';
import { isBST } from './algo-problem/binary-search-tree-check.util';
import { LinkedListNode } from './model/linked-list-node.model';
import { hasCycle } from './algo-problem/linked-list-cycle-check.util';

/**
 * P1.1 Stack Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP1.1 Stack Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const stack: Stack<number> = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.size()); // Outputs: 3
console.log(stack.pop()); // Outputs: 3
console.log(stack.peek()); // Outputs: 2
console.log(stack.size()); // Outputs: 2
stack.clear();
console.log(stack.isEmpty()); // Outputs: true

/**
 * P1.2 Queue Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP1.2 Queue Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const queue: Queue<number> = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.size()); // Outputs: 3
console.log(queue.dequeue()); // Outputs: 1
console.log(queue.peek()); // Outputs: 2
console.log(queue.size()); // Outputs: 2
queue.clear();
console.log(queue.isEmpty()); // Outputs: true

/**
 * P1.3 Binary Tree Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP1.3 Binary Tree Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const binaryTree: BinaryTree<number> = new BinaryTree<number>();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(8);
binaryTree.insert(1);
binaryTree.insert(4);

console.log('In-Order Traversal:');
binaryTree.inOrderTraversal(value => console.log(value)); // Outputs: 1, 3, 4, 5, 8
console.log('Pre-Order Traversal:');
binaryTree.preOrderTraversal(value => console.log(value)); // Outputs: 5, 3, 1, 4, 8
console.log('Post-Order Traversal:');
binaryTree.postOrderTraversal(value => console.log(value)); // Outputs: 1, 4, 3, 8, 5

/**
 * P1.4 Graph Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP1.4 Graph Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const graph1: Graph<number> = new Graph<number>();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addVertex(6);

graph1.addEdge(1, 2);
graph1.addEdge(1, 6);
graph1.addEdge(2, 3);
graph1.addEdge(2, 5);
graph1.addEdge(3, 4);

console.log('Depth-First Search:');
graph1.depthFirstSearch(1, vertex => console.log(vertex)); // Outputs: 1, 2, 3, 4, 5, 6

console.log('Breadth-First Search:');
graph1.breadthFirstSearch(1, vertex => console.log(vertex)); // Outputs: 1, 2, 6, 3, 5, 4

/**
 * P1.5 Linked List Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP1.5 Linked List Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const linkedList: LinkedList<number> = new LinkedList<number>();
linkedList.insert(1);
linkedList.insert(2);
linkedList.insert(3);
console.log('Original Linked List:');
linkedList.print(); // Outputs: 1, 2, 3

linkedList.delete(2);
console.log('Linked List after Deleting 2:');
linkedList.print(); // Outputs: 1, 3
linkedList.insert(4);
linkedList.insert(5);
console.log('Linked List after Inserting 4, 5:');
linkedList.print(); // Outputs: 1, 3, 4, 5
linkedList.delete(4);
console.log('Linked List after Deleting 2:');
linkedList.print(); // Outputs: 1, 3, 5

console.log('Search for 1:', linkedList.search(1)); // Outputs: true
console.log('Search for 2:', linkedList.search(2)); // Outputs: false
console.log('Search for 3:', linkedList.search(3)); // Outputs: true
console.log('Search for 4:', linkedList.search(4)); // Outputs: false
console.log('Search for 5:', linkedList.search(5)); // Outputs: true

/**
 * P2.1 Min/Max Stack O(1) Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP2.1 Min/Max Stack O(1) Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const minMaxStack: MinMaxStack = new MinMaxStack();
minMaxStack.push(3);
minMaxStack.push(1);
minMaxStack.push(5);
minMaxStack.push(9);
minMaxStack.push(7);

console.log('Min:', minMaxStack.getMin()); // Outputs: 1
console.log('Max:', minMaxStack.getMax()); // Outputs: 9
minMaxStack.pop();
console.log('Min after popping 7:', minMaxStack.getMin()); // Outputs: 1
console.log('Max after popping 7:', minMaxStack.getMax()); // Outputs: 9
minMaxStack.pop();
console.log('Min after popping 9:', minMaxStack.getMin()); // Outputs: 1
console.log('Max after popping 9:', minMaxStack.getMax()); // Outputs: 5
minMaxStack.pop();
minMaxStack.pop();
console.log('Min after popping 5, 1:', minMaxStack.getMin()); // Outputs: 3
console.log('Max after popping 5, 1:', minMaxStack.getMax()); // Outputs: 3

/**
 * P2.2 Binary Search Tree Validation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP2.2 Binary Search Tree Validation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const root: TreeNode<number> = new TreeNode(5);
root.left = new TreeNode(2);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(4);
root.right = new TreeNode(8);
root.right.right = new TreeNode(123);
console.log(isBST(root)); // Outputs: true
root.right.left = new TreeNode(9);
console.log(isBST(root)); // Outputs: false

/**
 * P2.3.1 BFS SPP Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP2.3.1 BFS SPP Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const bfsGraph: Graph<string> = new Graph<string>();
bfsGraph.addVertex('A');
bfsGraph.addVertex('B');
bfsGraph.addVertex('C');
bfsGraph.addVertex('D');
bfsGraph.addVertex('E');
bfsGraph.addVertex('F');
bfsGraph.addEdge('A', 'B');
bfsGraph.addEdge('A', 'C');
bfsGraph.addEdge('B', 'C');
bfsGraph.addEdge('B', 'D');
bfsGraph.addEdge('C', 'D');
bfsGraph.addEdge('D', 'E');
bfsGraph.addEdge('E', 'F');
bfsGraph.addEdge('B', 'F'); // comment out to increase the shortest path from 2 (A->B->F) to 4 (A->B->D->E->F / A->C->D->E->F)

const bfsShortestPath: number = bfsGraph.bfsSPP('A', 'F');
console.log('Shortest Path from A to D:', bfsShortestPath); // Outputs: 2

/**
 * P2.3.2 Dijkstra's Algorithm SPP Implementation with weights
 */
console.log(
	"\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP2.3.2 Dijkstra's Algorithm SPP Implementation with weights\n––––––––––––––––––––––––––––––––––––––––––––––––––"
);
const graph: GraphWithWeights<string> = new GraphWithWeights<string>();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 3);
graph.addEdge('B', 'D', 4);
graph.addEdge('C', 'D', 5);
graph.addEdge('D', 'E', 6);
graph.addEdge('E', 'F', 7);
graph.addEdge('B', 'F', 8); // comment out to increase the shortest path from 9 (A->B->F) to 18 (A->B->D->E->F)

const dijkstraShortestPath: number = graph.dijkstraSPP('A', 'F');
console.log('Shortest Path from A to D:', dijkstraShortestPath); // Outputs: 9

/**
 * P2.4 Linked List Cycle Detection Implementation
 */
console.log(
	'\n\n––––––––––––––––––––––––––––––––––––––––––––––––––\nP2.4 Linked List Cycle Detection Implementation\n––––––––––––––––––––––––––––––––––––––––––––––––––'
);
const node0: LinkedListNode<number> = new LinkedListNode(0);
let previousNode: LinkedListNode<number> = node0;
let node25: LinkedListNode<number>;
for (let i = 1; i < 50; i++) {
	const node: LinkedListNode<number> = new LinkedListNode(i);
	if (i === 25) {
		node25 = node;
	}
	if (previousNode) {
		previousNode.next = node;
	}
	previousNode = node;
}
previousNode.next = node25;

const hasCycleResultShouldBeTrue: boolean = hasCycle(node0);
console.log('Has Cycle:', hasCycleResultShouldBeTrue); // Outputs: true

previousNode.next = null;
const hasCycleResultShouldBeFalse: boolean = hasCycle(node0);
console.log('Has Cycle:', hasCycleResultShouldBeFalse); // Outputs: false
