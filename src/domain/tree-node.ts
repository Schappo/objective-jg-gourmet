export class TreeNode {
  value: string
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null

  constructor(value: string) {
      this.value = value
      this.left = null
      this.right = null
      this.parent = null
  }

  getValue(): string {
    return this.value
  }

  getLeft(): TreeNode | null {
    return this.left
  }

  setLeft(node: TreeNode): void {
    this.left = node
  }

  setRight(node: TreeNode): void {
    this.right = node
  }

  getRight(): TreeNode | null {
    return this.right
  }

  getParent(): TreeNode | null {
    return this.parent
  }

  setParent(node: TreeNode): void {
    this.parent = node
  }

  isLeaf(): boolean {
    return !this.left && !this.right
  }

  isLeft(): boolean {
    return this.getParent()?.getLeft() === this
  }

  isRight(): boolean {
    return this.getParent()?.getRight() === this
  }

  hasLeft(): boolean {
    return !!this.left
  }

  hasRight(): boolean {
    return !!this.right
  }
    
}