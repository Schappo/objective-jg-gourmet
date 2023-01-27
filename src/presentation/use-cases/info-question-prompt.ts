import { EXIT } from '../../const'
import { Choice, PromptOptions } from '../../types'
import { IPrompt } from "../interfaces/IPrompt"
import { BasePrompt } from './base-prompts/base-prompt'

export class InfoQuestionPrompt extends BasePrompt implements IPrompt  {
  
  readonly type = 'select'
  
  private readonly choices: Choice[] = [
    { title: 'Sim', value: true },
    { title: 'Não', value: false },
    { title: 'Sair', value: EXIT },
  ]
  
  constructor(
    private readonly treeNodeValue: string,
  ) {
    super()
    this.options = this.configOptions()
  }

  configOptions(): PromptOptions {
    return {
      type: this.type,
      name: this.name,
      message: `O prato que você pensou é ${this.treeNodeValue}?`,
      choices: this.choices
    }
  }
 
}