
import { PromptOption, PromptType } from '../../../types'
import { IPrompt } from '../../interfaces/IPrompt'
import { BasePrompt } from './base-prompt'

export class TogglePrompt extends BasePrompt implements IPrompt  {
  
  readonly type: PromptType = 'toggle'

  constructor(
    private readonly message: string,
  ) {
    super()
    this.options = this.configOptions()
  }

  configOptions(): PromptOption {
    return {
      type: this.type,
      name: this.name,
      message: this.message,
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  }
 
}