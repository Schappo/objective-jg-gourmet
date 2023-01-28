# Objective - JOGO GOURMET - Felipe Schappo

<p>this project aims to implement a game in NodeJS. It's called the Gourmet Game, it will guess what your favorite food is.</p>
<p>Initially you choose your favorite food, the game asks several questions, if by chance the game system hits what your food is the game ends, if it doesn't know you register a new category and your favorite food.</p>

<br />

## ***Requirement***
<br />
To run this project is require Node 14 o above

<br />

## Setup
<br />

After clone the project, install dependencies.

```sh
npm install 

or

yarn install
```
<br />

## Run Game

```sh
npm run dev
```


## considerations
<br/>

to implement the game I structured a binary tree for decision making. each tree node has a value that increments the questions, if the answer is yes the decision goes to the left node. If the answer is no, the decision moves to the right node.

When the answer is no in a leaf node (node without branches), two new nodes are created. A node for decision making and another for the new food to be registered. After that the game restarts.
