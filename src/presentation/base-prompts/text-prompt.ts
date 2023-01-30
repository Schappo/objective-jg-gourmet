import { PromptOption, PromptOptionValidate, PromptType } from '../../types'
import { IPrompt } from '../interfaces/IPrompt'
import { BasePrompt } from './base-prompt'

export class TextPrompt extends BasePrompt implements IPrompt  {
  
  readonly type: PromptType = 'text'

  constructor(
    private readonly message: string,
    private readonly validate: PromptOptionValidate,
  ) {
    super()
    this.options = this.configOptions()
  }

  configOptions(): PromptOption {
    return {
      type: this.type,
      name: this.name,
      message: this.message,
      validate: this.validate
    }
  }
 
}