import { TreeNode } from "./tree-node"

export class BinaryTree {
  private root: TreeNode | null

  constructor() {
    this.root = null 
  }

  setRoot(node: TreeNode) {
    this.root = node
  }

  getRoot(): TreeNode | null {
    return this.root
  }

  returnToRoot(node: TreeNode) {
    let current = node
    while (current.parent !== null) {
        current = current.parent
    }
    return current
  }

}