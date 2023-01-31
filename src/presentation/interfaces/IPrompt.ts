import { TreeNode } from "../../domain/tree-node"
import { PromptOptions, PromptResponse, PromptType } from "../../types"

export interface IPrompt {
  readonly name: string
  readonly type: PromptType

  configOptions(treeNode?: TreeNode): PromptOptions
  runPrompt(treeNode?: TreeNode): Promise<PromptResponse>
}

export interface PromptsInterface {
  (options: PromptOptions): Promise<Record<string, string>>
}