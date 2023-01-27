
export type PromptType = "toggle" | "text" | "select"

export type PromptOption = {
  type: PromptType
  name: string
  message?: string | ((prev: any, value: any, prompt: any) => string)
  initial?: boolean
  active?: string
  inactive?: string
  choices?: Choice[]
  validate?: PromptOptionValidate
}

export type PromptOptions = PromptOption | PromptOption[]

export type Choice = {
  title: string
  value: boolean | string
}

export type PromptOptionValidate = (value: string) => boolean | string
