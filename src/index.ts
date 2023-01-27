import { Prompt } from "./prompt"
import { TreeNode } from "./tree-node"

const bootstrap = async () => {
  let restart = false
  
  const prompt = new Prompt()

  const userIsReady = await prompt.initialQuestion()

  if(!userIsReady) restart = true

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

  while(!restart && userIsReady) {
    console.log('treeNode?.getValue()', treeNode?.getValue())

    const response = await prompt.makeQuestion(treeNode.getValue())

    if(response === 'exit') restart = true
    
    if(response) {
      console.log('treeNode.isLeaf()', treeNode.isLeaf())
      console.log('response', response)
      if(treeNode.isLeaf()) {
        console.log("Acertei de novo!")
        restart = true
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
      }
    }

  }
}

bootstrap()