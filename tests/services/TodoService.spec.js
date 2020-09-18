import { validate } from 'uuid'

import { getNewTodo, getRandomTodos, todos } from '../../src/services/TodoService';

describe('getNewTodo', () => {
  describe('when value input is not provided', () => {
    let actualTodo;

    beforeEach(() => {
      actualTodo = getNewTodo();
    })

    test('should return new todo with valid uuid as id', () => {
      expect(validate(actualTodo.id)).toEqual(true)
    })

    test('should return new todo with empty string as value', () => {
      expect(actualTodo.value).toEqual('')
    })

    test('should return new todo as not completed', () => {
      expect(actualTodo.isComplete).toEqual(false)
    })
  })

  describe('when value input is provided', () => {
    let actualTodo;
    const value = 'Test todo';

    beforeEach(() => {
      actualTodo = getNewTodo(value);
    })

    test('should return new todo with valid uuid as id', () => {
      expect(validate(actualTodo.id)).toEqual(true)
    })

    test('should return new todo with empty string as value', () => {
      expect(actualTodo.value).toEqual(value)
    })

    test('should return new todo as not completed', () => {
      expect(actualTodo.isComplete).toEqual(false)
    })
  })
})

describe('getRandomTodos', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('when numTodos is not provided', () => {
    let actualTodoList;
    const defaultNumTodos = 5;

    beforeEach(async () => {
      getRandomTodos().then((data) => {
        actualTodoList = data
      })
      jest.runAllTimers()
    })

    test(`should return ${defaultNumTodos} todos`, () => {
      expect(Array.isArray(actualTodoList)).toEqual(true)
      expect(actualTodoList.length).toEqual(defaultNumTodos)
    })

    test('should return todos that are in the todo list', () => {
      actualTodoList.forEach(todoItem => {
        const item = todos.find((el) => el === todoItem.value)
        expect(item).not.toBeUndefined()
      })
    })
  })

  describe('when numTodos is provided as valid number', () => {
    let actualTodoList;
    const numTodos = 3;

    beforeEach(async () => {
      getRandomTodos(numTodos).then((data) => {
        actualTodoList = data
      })
      jest.runAllTimers()
    })

    test(`should return ${numTodos} todos`, () => {
      expect(Array.isArray(actualTodoList)).toEqual(true)
      expect(actualTodoList.length).toEqual(numTodos)
    })

    test('should return todos that are in the todo list', () => {
      actualTodoList.forEach(todoItem => {
        const item = todos.find((el) => el === todoItem.value)
        expect(item).not.toBeUndefined()
      })
    })
  })

  describe('when numTodos is provided as not a valid number', () => {
    let actualTodoList;

    beforeEach(async () => {
      actualTodoList = await getRandomTodos("invalid")
    })

    test('should return empty array', () => {
      expect(Array.isArray(actualTodoList)).toEqual(true)
      expect(actualTodoList.length).toEqual(0)
    })
  })
})