import { TreeNode } from "../domain/tree-node"
import { DefeatInformationPrompt } from "../presentation/defeat-information-prompt"
import { InfoQuestionPrompt } from "../presentation/info-question-prompt"
import { InitialPrompt } from "../presentation/initial-prompt"
import { NewFoodCategoryPrompt } from "../presentation/new-food-prompt"

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

export type PromptResponse = Record<string, any>

export type ConfigTreeNode = {
  parent?: TreeNode
  left?: TreeNode
  right?: TreeNode
}

export type NewFoodCategoryPropsType = {
  newFood: string
  newCategory: string
} 

export type PromptsPropsGameType = {
  initialPrompt: InitialPrompt,
  infoQuestionPrompt: InfoQuestionPrompt,
  newFoodCategoryPrompt: NewFoodCategoryPrompt,
  defeatInformationPrompt: DefeatInformationPrompt,
}
