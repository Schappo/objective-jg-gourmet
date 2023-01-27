export class TreeNode {
  constructor(
    private value: string,
    private left?: TreeNode,
    private right?: TreeNode, 
  ) { }

  getValue() {
    return this.value
  }

  getLeft() {
    return this.left
  }

  getRight() {
    return this.right
  }

  isLeaf() {
    return !this.left && !this.right
  }

  hasLeft() {
    return !!this.left
  }

  hasRight() {
    return !!this.right
  }

  addNode(node: TreeNode) {
    let newNode: TreeNode
    if(this.isLeaf()) {
      this.left = node
    } else {
      this.right = node
    }
  }
}