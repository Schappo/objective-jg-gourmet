import { EXIT } from "../const"
import { NewFoodCategoryPropsType, PromptResponse, PromptsPropsGameType } from "../types"
import { BinaryTree } from "./binary-tree"

export class Game {
  private shutdownGameControl = false

  constructor(
    private readonly decisionTree: BinaryTree,
    private readonly prompts: PromptsPropsGameType,
  ) { }

  private shutdownGame() {
    this.shutdownGameControl = true
  }

  private readonly isShutdownAnswer = (answer: PromptResponse) => typeof answer.value === 'string' && answer.value === EXIT

  async start() {
   
    while(!this.shutdownGameControl) {
      // Initial Question is always in the root node
      if(this.decisionTree.getCurrentNode().isRoot()) {
        const answer = await this.prompts.initialPrompt.runPrompt()
        // Case answer is No, the game is shutdown! 
        if(this.isShutdownAnswer(answer)) {
          this.shutdownGame()
          continue
        }
        // Null assertion is safe! The initial question is always have a left node for the Yes answer. Because the initial question is showing only if the current node is root.
        this.decisionTree.setCurrentNode(this.decisionTree.getCurrentNode().getLeft()!)
      }


      const answer = await this.prompts.infoQuestionPrompt.runPrompt(this.decisionTree.getCurrentNode())

      // User can exit the game at any time, so we need to check if the answer is the exit command
      if(this.isShutdownAnswer(answer)) {
        this.shutdownGame()
        continue
      }

      // If the answer is Yes and the current node is a leaf, the game is won!
      if(answer.value && this.decisionTree.getCurrentNode().isLeaf()) {
        this.handleGameWon()
        continue
      }

      if(answer.value && !this.decisionTree.getCurrentNode().isLeaf()) {
        // null assertion is safe because the current node is not a leaf
        this.decisionTree.setCurrentNode(this.decisionTree.getCurrentNode().getLeft()!)
        continue
      }

      if(!answer.value && this.decisionTree.getCurrentNode().hasRight()) {
        // null assertion is safe because the current node has a right node
        this.decisionTree.setCurrentNode(this.decisionTree.getCurrentNode().getRight()!)
        continue
      }
      
      if(!answer.value && !this.decisionTree.getCurrentNode().hasRight()) {

        // Show User the defeat information prompt, and enable the user continue if defeat way or exit the game
        const answer = await this.prompts.defeatInformationPrompt.runPrompt()

        // Check if the answer is the exit command
        if(this.isShutdownAnswer(answer)) {
          return this.shutdownGame()
        }
        
        await this.handleDefeatedGame()
        continue
      }

    }
  }

  private async handleGameWon(): Promise<void> {
    console.log("---------------------------------")
    console.log("Acertei de novo!")
    console.log(" ")
    this.decisionTree.setCurrentNode(this.decisionTree.getRoot())
  }

  private async handleDefeatedGame(): Promise<void> {
    const { newFood, newCategory }: PromptResponse = 
      await this.prompts.newFoodCategoryPrompt.runPrompt(this.decisionTree.getCurrentNode())
      
    this.handleNewCategoryAndFoodNodes({ newFood, newCategory })

    this.decisionTree.setCurrentNode(this.decisionTree.getRoot())
  }

  private handleNewCategoryAndFoodNodes({newCategory, newFood}: NewFoodCategoryPropsType): void {
    const newCategoryNode = this.decisionTree.getCurrentNode().createNode(newCategory)
    const newFoodNode = this.decisionTree.getCurrentNode().createNode(newFood)
    newCategoryNode.setLeft(newFoodNode)
    newCategoryNode.setRight(this.decisionTree.getCurrentNode())
    
    // Null assertion is safe because we are not in the root node
    newCategoryNode.setParent(this.decisionTree.getCurrentNode().getParent()!)
    newFoodNode.setParent(newCategoryNode)
    
    if (this.decisionTree.getCurrentNode().isRight()) {
      // Null assertion is safe because we are not in the root node
      this.decisionTree.getCurrentNode().getParent()!.setRight(newCategoryNode)
    }
    
    if(this.decisionTree.getCurrentNode().isLeft()) {
      // Null assertion is safe because we are not in the root node
      this.decisionTree.getCurrentNode().getParent()!.setLeft(newCategoryNode)
    }
    
    this.decisionTree.getCurrentNode().setParent(newCategoryNode)
  }

}