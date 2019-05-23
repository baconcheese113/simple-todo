let todosCreated = 1;
let todos = [
  {
    id: 1,
    text: 'Finish coding exercise',
    isCompleted: true
  }
];

export default class TodoData {
  static create(todo) {
    return new Promise((resolve) => {
      todosCreated += 1;
      todo.id = todosCreated;
      todos.push(todo);
      resolve(todo);
    });
  }

  static findAll() {
    return new Promise((resolve) => resolve(todos));
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const todoIndex = todos.findIndex((todo) => todo.id.toString() === id.toString());
      if (todoIndex < 0 || todoIndex >= todos.length) return reject();
      todos.splice(todoIndex, 1);
      resolve();
    });
  }

  static update(id, newTodo) {
    return new Promise((resolve, reject) => {
      const todoIndex = todos.findIndex((todo) => todo.id.toString() === id.toString());
      if (todoIndex < 0 || todoIndex >= todos.length) return reject();
      // Could use spread instead for larger object, potential unintended side effects
      // Could also create instance first if this was hitting a db
      // Maybe even loop through newTodo's keys and set based on what's defined. Probably need to whitelist okay keys to set this way
      if (newTodo.isCompleted !== undefined) todos[todoIndex].isCompleted = newTodo.isCompleted;
      if (newTodo.text !== undefined) todos[todoIndex].text = newTodo.text;
      resolve(todos[todoIndex]);
    });
  }
}
