tasks = [
    {'title': 'First task', 'id': 1},
    {'title': 'Second task', 'id': 2},
    {'title': 'Third task', 'id': 3}
]

task_id = len(tasks)
def TodoItem(obj):
    state, set_state = React.useState(1)
    def _delete():
        if window.confirm('Are you sure?'):
            set_state(-1)
    def _check():
        set_state(not state)
    task = ''
    if state == 1:
        task = obj.title
    elif state == 0:
        task = <del>{obj.title}</del>
    elif state == -1:
        global tasks
        def it(todo):
            return todo.id != obj.index
        tasks = filter(it, tasks)
        print(tasks)
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
    state, set_state = React.useState(tasks)
    def _new():
        global tasks, task_id
        form = get_by_id('add_task')
        _name = form.value
        if _name == '':
            form.style.border = '2px solid red'
            get_by_id('msg') <= 'Task\'s name cannot be empty'
            def default_style():
                form.style.border = ''
            setTimeout(default_style, 150)
            return ''
        get_by_id('msg') <= ''
        form.value = ''
        task_id += 1
        tasks += [{'title': _name, 'id': task_id}]
        print(tasks)
        set_state(tasks)

    _tasks = []
    for _i in range(len(tasks)):
        _tasks.append(
            <TodoItem
              index={tasks[_i].id}
              title={tasks[_i].title}
              key={tasks[_i].id}
            ></TodoItem>
        )
    return (
        <div>
          <div id='msg'></div>
          <input id='add_task' placeholder='name'></input><br></br>
          <button onClick={_new}>Add task</button>
          <ul>
            {_tasks}
          </ul>
        </div>
    )

def App(obj):
    return (
        <div id='main'>
          <h1>This app is written in python(<a href='https://github.com/alploskov/python-react-todo-app'>source code</a>)</h1>
          <TodoList></TodoList>
        </div>
    )

react_render(
  <App></App>,
  get_by_id('root')
)
