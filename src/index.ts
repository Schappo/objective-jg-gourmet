import { EXIT, INITIAL_STEP } from "./const"
import { BinaryTree } from "./domain/binary-tree"
import { TreeNode } from "./domain/tree-node"
import { GetNewFoodPrompt } from "./presentation/use-cases/get-new-food-prompt"
import { InfoQuestionPrompt } from "./presentation/use-cases/info-question-prompt"
import { InitialPrompt } from "./presentation/use-cases/initial-prompt"

const makeInitialTree = () => {
  const binaryTree = new BinaryTree()

  const initialNode = new TreeNode(INITIAL_STEP)
  binaryTree.setRoot(initialNode)

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

const bootstrap = async () => {
  const restartGame = false
  let shutdownGame = false

  const decisionTree = makeInitialTree()
  
  while(!shutdownGame) {
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let currentNode = decisionTree.getRoot()!
    
    while(!restartGame) {
      
      if(currentNode.getValue() === INITIAL_STEP) {
        const resp = await new InitialPrompt().runPrompt()
        if(!resp) {
          shutdownGame = true
          break
        }
        
        // Eslint error! In my logical isLeaf() is false ate least left node must exist!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentNode = currentNode.getLeft()!
      }
  
      const response = await new InfoQuestionPrompt(currentNode.getValue()).runPrompt()
  
      if(typeof(response) === 'string' && response === EXIT) {
        shutdownGame = true
        break
      }
      
      if(response) {
        if(currentNode.isLeaf()) {
          console.log("Acertei de novo!")
          currentNode = decisionTree.returnToRoot(currentNode)
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
  
          const resp: any = await new GetNewFoodPrompt(currentNode.getValue()).runPrompt()
          const parentNode = currentNode.getParent()!
          
          
          const newNodeValue = new TreeNode(resp.newNodeValue)
          const newFood = new TreeNode(resp.newFood)
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
          
          currentNode = decisionTree.returnToRoot(currentNode)
        }
      }
  
    }
  }
}

bootstrap()