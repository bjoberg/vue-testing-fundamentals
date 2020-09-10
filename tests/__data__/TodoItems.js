import { v4 } from 'uuid';

const todoItems = [
  {
    id: v4(),
    value: 'test 1',
    isComplete: false
  },
  {
    id: v4(),
    value: 'test 2',
    isComplete: false
  },
  {
    id: v4(),
    value: 'test 3',
    isComplete: false
  },
  {
    id: v4(),
    value: 'test 4',
    isComplete: false
  }
]

export default todoItems;