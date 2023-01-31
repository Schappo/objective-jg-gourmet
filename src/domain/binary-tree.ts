import { TreeNode } from "./tree-node"

export class BinaryTree {
  private root: TreeNode
  private currentNode: TreeNode

  constructor(treeNode: TreeNode) {
    this.root = treeNode 
    this.currentNode = this.root
  }

  getRoot(): TreeNode {
    return this.root
  }

  getCurrentNode(): TreeNode {
    return this.currentNode
  }

  setCurrentNode(node: TreeNode): void {
    this.currentNode = node
  }
}