import prompt from "prompts"
import { EXIT, INITIAL_STEP } from "./const"
import { BinaryTree } from "./domain/binary-tree"
import { TreeNode } from "./domain/tree-node"
import { InfoQuestionPrompt } from "./presentation/info-question-prompt"
import { InitialPrompt } from "./presentation/initial-prompt"
import { NewFoodCategoryPrompt } from "./presentation/new-food-prompt"
import { PromptResponse } from "./types"

const makeInitialTree = (): BinaryTree => {
  const initialNode = new TreeNode(INITIAL_STEP)
  
  const binaryTree = new BinaryTree(initialNode)

  const nodeMassa = new TreeNode('massa')
  nodeMassa.setParent(initialNode)
  initialNode.setLeft(nodeMassa)

  const nodeLasanha = new TreeNode('lasanha')
  nodeLasanha.setParent(nodeMassa)
  nodeMassa.setLeft(nodeLasanha)

  const nodeBolo = new TreeNode('bolo de chocolate')
  nodeBolo.setParent(nodeMassa)
  nodeMassa.setRight(nodeBolo)

  return binaryTree
}

const initialPrompt = new InitialPrompt(prompt)
const infoQuestionPrompt = new InfoQuestionPrompt(prompt)
const newFoodPrompt = new NewFoodCategoryPrompt(prompt)

const bootstrap = async () => {
  const restartGame = false
  let shutdownGame = false

  const decisionTree = makeInitialTree()
  
  while(!shutdownGame) {
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let currentNode = decisionTree.getRoot()!
    
    while(!restartGame) {
      
      if(currentNode.isRoot()) {
        const answer = await initialPrompt.runPrompt()
        if(!answer.value) {
          shutdownGame = true
          break
        }
        
        // Eslint error! In my logical isLeaf() is false ate least left node must exist!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentNode = currentNode.getLeft()!
      }
  
      const answer = await infoQuestionPrompt.runPrompt(currentNode)
  
      if(typeof(answer.value) === 'string' && answer.value === EXIT) {
        shutdownGame = true
        break
      }
      
      if(answer.value) {
        if(currentNode.isLeaf()) {
          console.log("Acertei de novo!")
          currentNode = decisionTree.getRoot()
        } else {
          // Eslint error! If isLeaf() is false ate least left node must exist!
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          currentNode = currentNode.getLeft()!
        }
      } else {
        if(currentNode.hasRight()) {
          // Eslint error! If hasRight() is true we have right node!
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          currentNode = currentNode.getRight()!
        } else {
  
          const answers: PromptResponse = await newFoodPrompt.runPrompt(currentNode)
          const parentNode = currentNode.getParent()!
      
          const newNodeValue = new TreeNode(answers.newNodeValue)
          const newFood = new TreeNode(answers.newFood)
          newFood.setParent(newNodeValue)
          newNodeValue.setParent(parentNode)
          newNodeValue.setLeft(newFood)
          newNodeValue.setRight(currentNode)
          
          if (currentNode.isRight()) {
            parentNode.setRight(newNodeValue)
          }

          if(currentNode.isLeft()) {
            parentNode.setLeft(newNodeValue)
          }
          
          currentNode.setParent(newNodeValue)
          
          currentNode = decisionTree.getRoot()
        }
      }
  
    }
  }
}

bootstrap()