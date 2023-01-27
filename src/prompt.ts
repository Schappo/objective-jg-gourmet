import prompts from "prompts"
import { IPrompt } from "./interfaces/IPrompt"
import { PromptOptions } from "./types"

export class Prompt implements IPrompt {

  async makeQuestion(nodeValue: string): Promise<string> {
    const { value } = await prompts(this.makeOptions('question', nodeValue))
    return value
  }

  async initialQuestion(): Promise<string> {
    const { value } = await prompts(this.makeOptions())
    return value
  }


  private makeOptions(type?: "question" | "defeat", nodeValue?: string): PromptOptions {
    const initialMsgOptions: PromptOptions = {
        type: 'select',
        name: 'value',
        message: 'Pense em um prato que você gosta!',
        choices: [
          { title: 'Continuar no Jogo!', value: true },
          { title: 'Sair!', value: false },
        ]
    }

    const questionMsgOptions: PromptOptions = {
      type: 'toggle',
      name: 'value',
      message: `O prato que você pensou é ${nodeValue}?`,
      initial: true,
      active: 'yes',
      inactive: 'no'
    }

    const defeatMsgOptions: PromptOptions = {
      type: 'text',
      name: 'value',
      message: `Qual o prato que você pensou?`,
      validate: (value: string) => value.match("[0-9]+") && value.length < 3 ? `Prato inválido. O prato deve ter pelo menos 3 letras!` : true
    }


    switch (type) {
      case "defeat":
        return defeatMsgOptions
      case "question":
        return questionMsgOptions
      default:
        return initialMsgOptions
    }
  }
}