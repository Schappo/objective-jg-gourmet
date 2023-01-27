import { EXIT } from "./const"
import { GetNewConditionalPrompt } from "./presentation/use-cases/get-new-conditional-prompt"
import { GetNewValuePrompt } from "./presentation/use-cases/get-new-value-prompt"
import { InfoQuestionPrompt } from "./presentation/use-cases/info-question-prompt"
import { InitialPrompt } from "./presentation/use-cases/initial-prompt"
import { TreeNode } from "./tree-node"

const bootstrap = async () => {
  let shutDown = false

  const userIsReady = await new InitialPrompt().runPrompt()

  if(!userIsReady) shutDown = true

  let treeNode = new TreeNode(
    "massa", 
    new TreeNode(
      "Lasagna?",
      new TreeNode("Lasanha Bolonhesa?"),
      new TreeNode("Lasanha de Frango?")
    ), 
    new TreeNode(
      "Bolo de Chocolate?", 
      new TreeNode("Bolo de Chocolate com Morango?"),
      new TreeNode("Bolo de Chocolate com Caramelo?")
  ))

  while(!shutDown && userIsReady) {
    console.log('treeNode?.getValue()', treeNode?.getValue())

    const response = await new InfoQuestionPrompt(treeNode.getValue()).runPrompt()

    if(typeof(response) === 'string' && response === EXIT) shutDown = true
    
    if(response) {
      if(treeNode.isLeaf()) {
        console.log("Acertei de novo!")
        shutDown = true
      } else {
        // Eslint error! If isLeaf() is false ate least one of the nodes must exist!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        treeNode = treeNode.getLeft()!
      }
    } else {
      if(treeNode.hasRight()) {
        // Eslint error! If isLeaf() is false ate least one of the nodes must exist!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        treeNode = treeNode.getRight()!
      } else {
        const newFood = await new GetNewValuePrompt().runPrompt().toString()
        const newNodeValue = await new GetNewConditionalPrompt(newFood, treeNode.getValue()).runPrompt().toString()

        treeNode.addNode(new TreeNode(newNodeValue, new TreeNode(newFood)))

      }
    }

  }
}

bootstrap()