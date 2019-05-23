import TodoData from './todo-data';

// TODO: Use beforeEach to reset db, allowing tests to be more exclusive
// beforeEach(
//   () =>
//     (TodoData.todos = [
//       {
//         id: 1,
//         text: 'Finish coding exercise',
//         isCompleted: true
//       }
//     ])
// );

test('should find all todos', async () => {
  const todos = await TodoData.findAll();
  expect(todos.length).toBe(1);
});

test('should create new todo', async () => {
  const text = 'testing text';
  const todo = await TodoData.create({ text, isCompleted: false });
  expect(todo.text).toBe(text);
});

test('should be able to remove todos', async () => {
  await TodoData.delete(2);
  const todos = await TodoData.findAll();
  expect(todos.length).toBe(1);
});

test('should be able to update todos', async () => {
  const text = 'updated testing text';
  const todo = await TodoData.update(1, { text, isCompleted: true });
  expect(todo.text).toBe(text);
  expect(todo.isCompleted).toBe(true);
});
