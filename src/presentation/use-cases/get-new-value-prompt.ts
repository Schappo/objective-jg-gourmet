import { TextPrompt } from "./base-prompts/text-prompt"

export class GetNewValuePrompt extends TextPrompt  {
  constructor() {
    super(
      "Qual prato você pensou?",
      (value: string) => value.match("[0-9]+") && value.length < 3 ? `Prato inválido. O prato deve ter pelo menos 3 letras!` : true
    )
  }
}