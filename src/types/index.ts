
export type PromptType = "toggle" | "text" | "select"

export type PromptOptions = {
  type: PromptType
  name: string
  message?: string
  initial?: boolean
  active?: string
  inactive?: string
  choices?: Choice[]
  validate?: PromptOptionsValidate
}

export type Choice = {
  title: string
  value: boolean | string
}

export type PromptOptionsValidate = (value: string) => boolean | string
