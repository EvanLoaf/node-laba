import { TreeNode } from './binary-tree-node.model';

/**
 * Usages: Efficient Search, Sorting, DB indices, etc
 */
// P1.3
export class BinaryTree<T> {
	root: TreeNode<T> | null;

	constructor() {
		this.root = null;
	}

	// Insert a new node into the binary tree
	public insert(value: T): void {
		const newNode: TreeNode<T> = new TreeNode(value);
		if (!this.root) {
			this.root = newNode;
		} else {
			this.insertNode(this.root, newNode);
		}
	}

	private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
		if (newNode.value < node.value) {
			if (!node.left) {
				node.left = newNode;
			} else {
				this.insertNode(node.left, newNode);
			}
		} else {
			if (!node.right) {
				node.right = newNode;
			} else {
				this.insertNode(node.right, newNode);
			}
		}
	}

	// Search for a node with a specific value in the binary tree
	public search(value: T): TreeNode<T> | null {
		return this.searchNode(this.root, value);
	}

	private searchNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
		if (!node) {
			return null; // Node not found
		}

		if (value === node.value) {
			return node; // Node found
		} else if (value < node.value) {
			return this.searchNode(node.left, value);
		} else {
			return this.searchNode(node.right, value);
		}
	}

	// In-order traversal of the binary tree
	// Traverse the left subtree in-order
	// Visit the current node
	// Traverse the right subtree in-order
	public inOrderTraversal(callback: (value: T) => void): void {
		this.inOrderTraversalNode(this.root, callback);
	}

	private inOrderTraversalNode(node: TreeNode<T> | null, callback: (value: T) => void): void {
		if (node) {
			this.inOrderTraversalNode(node.left, callback);
			callback(node.value);
			this.inOrderTraversalNode(node.right, callback);
		}
	}

	// Pre-order traversal of the binary tree
	// Visit the current node
	// Traverse the left subtree pre-order
	// Traverse the right subtree pre-order
	public preOrderTraversal(callback: (value: T) => void): void {
		this.preOrderTraversalNode(this.root, callback);
	}

	private preOrderTraversalNode(node: TreeNode<T> | null, callback: (value: T) => void): void {
		if (node) {
			callback(node.value);
			this.preOrderTraversalNode(node.left, callback);
			this.preOrderTraversalNode(node.right, callback);
		}
	}

	// Post-order traversal of the binary tree
	// Traverse the left subtree post-order
	// Traverse the right subtree post-order
	// Visit the current node
	public postOrderTraversal(callback: (value: T) => void): void {
		this.postOrderTraversalNode(this.root, callback);
	}

	private postOrderTraversalNode(node: TreeNode<T> | null, callback: (value: T) => void): void {
		if (node) {
			this.postOrderTraversalNode(node.left, callback);
			this.postOrderTraversalNode(node.right, callback);
			callback(node.value);
		}
	}
}
