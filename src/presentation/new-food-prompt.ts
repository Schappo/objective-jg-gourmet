import { TreeNode } from "../domain/tree-node"
import { PromptOptions, PromptType } from "../types"
import { BasePrompt } from "./base-prompts/base-prompt"
import { PromptsInterface } from './interfaces/IPrompt'

export class NewFoodCategoryPrompt extends BasePrompt {
  
  readonly type: PromptType = 'text'

  constructor(
    prompt: PromptsInterface
  ) {
    super(prompt)
  }

  configOptions(treeNode: TreeNode): PromptOptions {
    return [
      {
        type: this.type,
        name: 'newFood',
        message:  "Qual prato você pensou?",
        validate: (newFood: string) => newFood.match("[0-9]+") || newFood.length < 3 ? `Prato inválido. O prato deve ter pelo menos 3 letras!` : true
      },
      {
        type: this.type,
        name: 'newCategory',
        message: (prev) => `Complete a frase! \n ${prev} é _______ mas ${treeNode.getValue()} não!`,
        validate: (newCategory: string) => newCategory.match("[0-9]+") || newCategory.length < 3 ? `Condição inválida. A condição deve ter pelo menos 3 letras!` : true
      }
    ]
  }
}
