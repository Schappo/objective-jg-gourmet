import { EXIT } from "../const"
import { SelectPrompt } from "./base-prompts/select-prompt"
import { PromptsInterface } from "./interfaces/IPrompt"

export class InitialPrompt extends SelectPrompt {

  constructor(
    prompt: PromptsInterface
  ) {
    super(
      'Pense em um prato que você gosta!', 
      [
        { title: 'Continuar no Jogo!', value: true },
        { title: 'Sair!', value: EXIT },
      ],
      prompt
    )
  }
}