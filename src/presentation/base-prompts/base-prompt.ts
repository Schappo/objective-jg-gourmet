import { TreeNode } from "../../domain/tree-node"
import { PromptOptions, PromptResponse, PromptType } from "../../types"
import { IPrompt, PromptsInterface } from "../interfaces/IPrompt"

export abstract class BasePrompt implements IPrompt {
  readonly name = 'value'
  type: PromptType = 'text'
  private prompt: PromptsInterface
  
  constructor(prompt: PromptsInterface) {
    this.prompt = prompt
  }

  async runPrompt(treeNodeValue?: TreeNode): Promise<PromptResponse> {
    const options = this.configOptions(treeNodeValue)
    return await this.prompt(options)
  }

  abstract configOptions(treeNodeValue?: TreeNode): PromptOptions
}