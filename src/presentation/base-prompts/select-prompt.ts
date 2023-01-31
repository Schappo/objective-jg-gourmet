import { Choice, PromptOption, PromptType } from '../../types'
import { PromptsInterface } from '../interfaces/IPrompt'

import { BasePrompt } from './base-prompt'

export class SelectPrompt extends BasePrompt {
  
  readonly type: PromptType = 'select'
  
  constructor(
    private readonly message: string,
    private readonly choices: Choice[],
    prompt: PromptsInterface
  ) {
    super(prompt)
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