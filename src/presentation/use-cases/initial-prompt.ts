import { SelectPrompt } from "./base-prompts/select-prompt"

export class InitialPrompt extends SelectPrompt {

  constructor() {
    super(
      'Pense em um prato que você gosta!', 
      [
        { title: 'Continuar no Jogo!', value: true },
        { title: 'Sair!', value: false },
      ]
    )
  }
}