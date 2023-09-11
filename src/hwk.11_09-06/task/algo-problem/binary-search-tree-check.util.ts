import { TreeNode } from '../model/binary-tree-node.model';

/**
 * BST conditions:
 * All nodes in its left subtree have values less than or equal to the node's value.
 * All nodes in its right subtree have values greater than the node's value.
 * O(n)
 */
// P2.2
export function isBST<T>(
	node: TreeNode<T> | null,
	min: T = Number.NEGATIVE_INFINITY as T,
	max: T = Number.POSITIVE_INFINITY as T
): boolean {
	if (!node) {
		return true; // Empty tree is a BST
	}
	// Check if the current node's value is within the allowed range
	if (node.value <= min || node.value >= max) {
		return false;
	}
	// Recursively check the left and right subtrees
	return isBST(node.left, min, node.value) && isBST(node.right, node.value, max);
}
