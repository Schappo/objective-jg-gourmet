import prompt from "prompts"
import { INITIAL_STEP } from "./const"
import { BinaryTree } from "./domain/binary-tree"
import { Game } from "./domain/game"
import { TreeNode } from "./domain/tree-node"
import { DefeatInformationPrompt } from "./presentation/defeat-information-prompt"
import { InfoQuestionPrompt } from "./presentation/info-question-prompt"
import { InitialPrompt } from "./presentation/initial-prompt"
import { NewFoodCategoryPrompt } from "./presentation/new-food-prompt"

const makeInitialTree = (): BinaryTree => {
  // Create initial nodes tree
  const initialNode = new TreeNode(INITIAL_STEP)
  const nodeMassa = new TreeNode('massa')
  const nodeLasagna = new TreeNode('lasagna')
  const nodeBolo = new TreeNode('bolo de chocolate')
  
  // Set left node for initialNode
  initialNode.setLeft(nodeMassa)
  
  // Create binary tree passing initialNode as root
  const binaryTree = new BinaryTree(initialNode)

  // Set parent and branch nodes for each nodeMassa
  nodeMassa.setParent(initialNode)
  nodeMassa.setLeft(nodeLasagna)
  nodeMassa.setRight(nodeBolo)
  
  // Set parent for each nodeLasagna and nodeBolo, both are leaf nodes
  nodeLasagna.setParent(nodeMassa)
  nodeBolo.setParent(nodeMassa)

  return binaryTree
}

const initialPrompt = new InitialPrompt(prompt)
const infoQuestionPrompt = new InfoQuestionPrompt(prompt)
const newFoodCategoryPrompt = new NewFoodCategoryPrompt(prompt)
const defeatInformationPrompt = new DefeatInformationPrompt(prompt)
const decisionTree = makeInitialTree()

const gourmetGame = new Game(decisionTree,
  {
    initialPrompt,
    infoQuestionPrompt,
    newFoodCategoryPrompt,
    defeatInformationPrompt,
  }
)

gourmetGame.start()
