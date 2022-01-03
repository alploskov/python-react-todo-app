todos = [
    {'title': 'First task', 'id': 1},
    {'title': 'Second task', 'id': 2},
    {'title': 'Third task', 'id': 3}
]

def TodoItem(obj):
    state = React.useState(2)
    def _delete():
        state[1](0)
    def _check():
        state[1](1)
    task = ''
    if state[0] == 2:
        task = obj.title
    elif state[0] == 1:
        task = <del>{obj.title}</del>
    else:
        global todos
        def it(todo):
            return todo.id != obj.index
        todos = filter(it, todos)
        print(todos)
        return ''
    return (
        <li id={'ti'+obj.index}>
          {task}
          <br></br>
          <button onClick={_check}>{'✓'}</button>
          <button onClick={_delete}>{'✗'}</button>
        </li>
    )

def TodoList():
    state = React.useState(todos)
    def _new():
        global todos, num_todos
        form = get_by_id('add_task')
        _name = form.value
        form.value = ''
        todos += [{'title': _name, 'id': len(todos) + 1}]
        print(todos)
        state[1](todos)

    _todos = []
    for _i in range(len(todos)):
        _todos.append(
            <TodoItem
              index={todos[_i].id}
              title={todos[_i].title}
              key={todos[_i].id}
            ></TodoItem>
        )
    return (
        <div>
          <input id='add_task'></input><br></br>
          <button onClick={_new}>{'Add task'}</button>
          <ul>
            {_todos}
          </ul>
        </div>
    )

def App(obj):
    return (
        <div id='main'>
          <h1><a href='https://github.com/alploskov/python-todo-react'>Source code</a></h1>
          <TodoList></TodoList>
        </div>
    )

react_render(
  <App></App>,
  get_by_id('root')
)
