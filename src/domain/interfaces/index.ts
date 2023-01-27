import { TreeNode } from "../tree-node"

export interface ITreeNode {
  readonly value?: string,
  
  getValue(): string | undefined
  getLeft(): TreeNode | undefined
  getRight(): TreeNode | undefined
  isLeaf(): boolean
  hasLeft(): boolean
  hasRight(): boolean
  addNode(node: TreeNode): void
}