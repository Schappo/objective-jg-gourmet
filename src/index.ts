import prompt from "prompts"
import { INITIAL_STEP } from "./const"
import { BinaryTree } from "./domain/binary-tree"
import { Game } from "./domain/game"
import { TreeNode } from "./domain/tree-node"
import { DefeatInformationPrompt } from "./presentation/defeat-information-prompt"
import { InfoQuestionPrompt } from "./presentation/info-question-prompt"
import { InitialPrompt } from "./presentation/initial-prompt"
import { NewFoodCategoryPrompt } from "./presentation/new-food-prompt"
import { PromptsPropsGameType } from "./types"

const makeInitialNode = (): TreeNode => {
  // Create initial nodes tree
  const initialNode = new TreeNode(INITIAL_STEP)
  const nodeMassa = new TreeNode('massa')
  const nodeLasagna = new TreeNode('lasagna')
  const nodeBolo = new TreeNode('bolo de chocolate')
  
  // Set left node for initialNode
  initialNode.setLeft(nodeMassa)

  // Set parent and branch nodes for each nodeMassa
  nodeMassa.setParent(initialNode)
  nodeMassa.setLeft(nodeLasagna)
  nodeMassa.setRight(nodeBolo)
  
  // Set parent for each nodeLasagna and nodeBolo, both are leaf nodes
  nodeLasagna.setParent(nodeMassa)
  nodeBolo.setParent(nodeMassa)

  return initialNode
}

const initialPrompt = new InitialPrompt(prompt)
const infoQuestionPrompt = new InfoQuestionPrompt(prompt)
const newFoodCategoryPrompt = new NewFoodCategoryPrompt(prompt)
const defeatInformationPrompt = new DefeatInformationPrompt(prompt)
const initialNode = makeInitialNode()
const decisionTree = new BinaryTree(initialNode)

const promptPropsGame: PromptsPropsGameType = {
  initialPrompt,
  infoQuestionPrompt,
  newFoodCategoryPrompt,
  defeatInformationPrompt,
} 

const gourmetGame = new Game(decisionTree, promptPropsGame)

gourmetGame.start()
