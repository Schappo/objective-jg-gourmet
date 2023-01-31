import { ConfigTreeNode } from "../types"

export class TreeNode {
  private value: string
  private left: TreeNode | undefined
  private right: TreeNode | undefined
  private parent: TreeNode | undefined

  constructor(value: string, configTreeNode?: ConfigTreeNode) {
      this.value = value
      this.left = configTreeNode?.left
      this.right = configTreeNode?.right
      this.parent = configTreeNode?.parent
  }

  getValue(): string {
    return this.value
  }

  getLeft(): TreeNode | undefined {
    return this.left
  }

  setLeft(node: TreeNode): void {
    this.left = node
  }

  setRight(node: TreeNode): void {
    this.right = node
  }

  getRight(): TreeNode | undefined {
    return this.right
  }

  getParent(): TreeNode | undefined {
    return this.parent
  }

  isRoot(): boolean {
    return !this.parent
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

  createNode(value: string): TreeNode {
    const node = new TreeNode(value)
    return node
  }
    
}