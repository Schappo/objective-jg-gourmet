import { EXIT } from "../const"
import { SelectPrompt } from "./base-prompts/select-prompt"
import { PromptsInterface } from "./interfaces/IPrompt"

export class DefeatInformationPrompt extends SelectPrompt {

  constructor(
    prompt: PromptsInterface
  ) {
    super(
      'Desisto! Respondas as perguntas abaixo para que eu possa aprender com o seu prato!', 
      [
        { title: 'Responder Perguntas!', value: true },
        { title: 'Sair!', value: EXIT },
      ],
      prompt
    )
  }
}