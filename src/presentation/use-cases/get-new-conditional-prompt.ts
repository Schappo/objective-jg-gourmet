import { PromptOptions, PromptType } from "../../types"
import { IPrompt } from "../interfaces/IPrompt"
import { BasePrompt } from "./base-prompts/base-prompt"


export class GetNewConditionalPrompt extends BasePrompt implements IPrompt  {
  
  readonly type: PromptType = 'text'

  constructor(
    private readonly newFood: string,
    private readonly treeNodeValue: string,
  ) {
    super()
    this.options = this.configOptions()
  }

  configOptions(): PromptOptions {
    return {
      type: this.type,
      name: this.name,
      message: `Complete a frase! \n ${this.newFood} é _______ mas ${this.treeNodeValue} não!`,
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  }
}
