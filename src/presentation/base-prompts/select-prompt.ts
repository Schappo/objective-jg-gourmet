import { Choice, PromptOption, PromptType } from '../../../types'
import { IPrompt } from '../../interfaces/IPrompt'

import { BasePrompt } from './base-prompt'

export class SelectPrompt extends BasePrompt implements IPrompt  {
  
  readonly type: PromptType = 'select'
  
  constructor(
    private readonly message: string,
    private readonly choices: Choice[]
  ) {
    super()
    this.options = this.configOptions()
  }

  configOptions(): PromptOption {
    return {
      type: this.type,
      name: this.name,
      message: this.message,
      choices: this.choices
    }
  }
 
}