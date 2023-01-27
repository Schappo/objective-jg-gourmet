import { PromptOptions, PromptType } from "../../types"

export interface IPrompt2 {
  initialQuestion(): Promise<string>
  makeQuestion(nodeValue: string): Promise<string>
}

export interface IPrompt {
  readonly name: string
  readonly type: PromptType

  configOptions(): PromptOptions
  runPrompt(): Promise<string | boolean>
}