import prompts from "prompts"
import { PromptOptions } from "../../../types"

export class BasePrompt {
  
  readonly name = 'value'
  options: PromptOptions = {} as PromptOptions
  
  async runPrompt(): Promise<string | boolean> {
    const { value } = await prompts(this.options)
    return value
  }
}