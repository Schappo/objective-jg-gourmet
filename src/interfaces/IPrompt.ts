
export interface IPrompt {
  initialQuestion(): Promise<string>
  makeQuestion(nodeValue: string): Promise<string>
}
