import { EXIT } from '../const'
import { TreeNode } from '../domain/tree-node'
import { Choice, PromptOption } from '../types'
import { BasePrompt } from './base-prompts/base-prompt'
import { PromptsInterface } from './interfaces/IPrompt'

export class InfoQuestionPrompt extends BasePrompt {
  
  readonly type = 'select'
  
  private readonly choices: Choice[] = [
    { title: 'Sim', value: true },
    { title: 'Não', value: false },
    { title: 'Sair', value: EXIT },
  ]
  
  constructor(
    prompt: PromptsInterface
  ) {
    super(prompt)
  }

  configOptions(treeNode: TreeNode): PromptOption {
    return {
      type: this.type,
      name: this.name,
      message: `O prato que você pensou é ${treeNode.getValue()}?`,
      choices: this.choices
    }
  }
 
}