import { v4 } from 'uuid';

const todos = [
  "Clean your room",
  "Do the dishes",
  "Make food",
  "Workout",
  "Call your Mom",
  "Feed the dog",
  "Get groceries",
  "Read the news",
  "Finish unit tests",
  "Do homework"
];

/**
 * Get a new todo with the provided value.
 * 
 * @param {String} value 
 * @returns {{id: String, value: String, isComplete: Boolean}} new todo item
 */
const getNewTodo = (value = "") => {
  const id = v4();
  const isComplete = false;
  return { id, value, isComplete }
}

/**
 * Get a list of random todo items.
 * 
 * @param {Number} numTodos number of random todos to return
 * @returns {[{id: String, value: String, isComplete: Boolean}]} list of todo items
 */
const getRandomTodos = async (numTodos = 5) => {
  const items = [];
  for (let i = 0; i < numTodos; i++) {
    const value = todos[Math.floor(Math.random() * todos.length)];
    items.push(getNewTodo(value))
  }
  await new Promise((cb) => setTimeout(cb, 2000))
  return items
}

export { getNewTodo, getRandomTodos };