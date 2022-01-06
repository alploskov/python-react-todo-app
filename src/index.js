import React from 'react';
import ReactDOM from 'react-dom';


let tasks = [{"title": "First task","id": 1,}, {"title": "Second task","id": 2,}, {"title": "Third task","id": 3,}];
let task_id = tasks.length;
function TodoItem(obj) {
    let [state, set_state] = React.useState(2)
    function _delete() {
        set_state(0);
    }
    function _check() {
        set_state(1);
    }
    let task = "";
    if (state == 2) {
        task = obj.title;
    } else if (state == 1) {
        task = (
            <del>
                {obj.title}
            </del>
        );
    } else {
        
        function it(todo) {
            return todo.id != obj.index;
        }
        tasks = tasks.filter(it);
        console.log(tasks);
        return "";
    }
    return (
        <li id={"ti" + obj.index}>
            {task}
            <br>
            </br>
            <button onClick={_check}>
                ✓
            </button>
            <button onClick={_delete}>
                ✗
            </button>
        </li>
    );
}
function TodoList() {
    let [state, set_state] = React.useState(tasks)
    function _new() {
        
        let form = document.getElementById("add_task");
        let _name = form.value;
        form.value = "";
        task_id = task_id + 1;
        tasks = tasks.concat([{"title": _name,"id": task_id,}]);
        console.log(tasks);
        set_state(tasks);
    }
    let _tasks = [];
    for (let _i = 0;_i < tasks.length; _i += 1) {
        _tasks.push((
            <TodoItem index={tasks[(_i<0)?(tasks.length+_i):(_i)].id} title={tasks[(_i<0)?(tasks.length+_i):(_i)].title} key={tasks[(_i<0)?(tasks.length+_i):(_i)].id}>
            </TodoItem>
        ));
    }
    return (
        <div>
            <input id="add_task">
            </input>
            <br>
            </br>
            <button onClick={_new}>
                {"Add task"}
            </button>
            <ul>
                {_tasks}
            </ul>
        </div>
    );
}
function App(obj) {
    return (
        <div id="main">
            <h1>
                {"This app is written in python("}
                <a href="https://github.com/alploskov/python-react-todo-app">
                    {"source code"}
                </a>
                {")"}
            </h1>
            <TodoList>
            </TodoList>
        </div>
    );
}
ReactDOM.render((
    <App>
    </App>
), document.getElementById("root"));
