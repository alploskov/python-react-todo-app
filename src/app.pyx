require('@material-ui/core/Button').to(Button)
require('@mui/material/TextField').to(TextFiled)

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
        <li style={{'fontSize': '16pt'}}>
          <p
            lang='en'
            style={{
                'margin': '0px',
                'width': '250px',
                'hyphens': 'auto'}}
          >{task}</p>
          <Button
            style={{'backgroundColor': '#66bb6a'}}
            variant="contained"
            size="small"
            onClick={_check}
          >{'✓'}</Button>
          <Button
            style={{'backgroundColor': '#f44336'}}
            variant="contained"
            size="small"
            onClick={_delete}
          >{'✗'}</Button>
        </li>
    )

def TodoList():
    state, set_state = React.useState(tasks)
    input_state, change_inp_state = React.useState(False)
    def _new():
        global tasks, task_id
        form = get_by_id('add_task')
        _name = form.value
        if _name == '':
            change_inp_state(True)
            def default_style():
                change_inp_state(False)
            setTimeout(default_style, 250)
            return ''
        form.value = ''
        task_id += 1
        tasks += [{'title': _name, 'id': task_id}]
        print(tasks)
        set_state(tasks)

    _tasks = []
    for _i in range(len(state)):
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
          <TextFiled
            variant='outlined'
            id='add_task'
            error={input_state}
            label="Task's name"
            multiline={True}
            placeholder="Placeholder"
            helperText="Task's name cannot be empty"
          ></TextFiled><br></br>
          <Button
            style={{
                'backgroundColor': (input_state and '#f44336') or '#4fc3f7'
            }}
            variant='contained'
            onClick={_new}
          >Add task</Button>
          <ul style={{'listStyle': 'none'}}>
            {_tasks}
          </ul>
        </div>
    )

def App(obj):
    return (
        <div>
          <h2>This app is written in python(<a href='https://github.com/alploskov/python-react-todo-app'>source code</a>)</h2>
          <TodoList></TodoList>
        </div>
    )

react_render(
  <App></App>,
  get_by_id('root')
)
