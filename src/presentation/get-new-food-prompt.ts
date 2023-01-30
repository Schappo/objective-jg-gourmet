import prompts from 'prompts'
import { PromptOptions, PromptType } from "../types"
import { BasePrompt } from "./base-prompts/base-prompt"

export class GetNewFoodPrompt extends BasePrompt {
  
  readonly type: PromptType = 'text'

  constructor(
    private readonly treeNodeValue: string,
  ) {
    super()
    this.options = this.configOptions()
  }

  async runPrompt(): Promise<string | boolean | Record<string, string>> {
    return await prompts(this.options)
  }

  configOptions(): PromptOptions {
    return [
      {
        type: this.type,
        name: 'newFood',
        message:  "Qual prato você pensou?",
        validate: (newFood: string) => newFood.match("[0-9]+") || newFood.length < 3 ? `Prato inválido. O prato deve ter pelo menos 3 letras!` : true
      },
      {
        type: this.type,
        name: 'newNodeValue',
        message: (prev) => `Complete a frase! \n ${prev} é _______ mas ${this.treeNodeValue} não!`,
        validate: (newNodeValue: string) => newNodeValue.match("[0-9]+") || newNodeValue.length < 3 ? `Condição inválida. A condição deve ter pelo menos 3 letras!` : true
      }
    ]
  }
}
