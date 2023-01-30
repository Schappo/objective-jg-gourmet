import prompts from "prompts"
import { PromptOptions, PromptType } from "../../types"
import { IPrompt } from "../interfaces/IPrompt"

export abstract class BasePrompt implements IPrompt {
  readonly name = 'value'
  type: PromptType = 'text'
  options: PromptOptions = this.configOptions()
  
  async runPrompt(): Promise<string | Record<string, string> | boolean> {
    const { value } = await prompts(this.options)
    return value
  }

  abstract configOptions(): PromptOptions
}