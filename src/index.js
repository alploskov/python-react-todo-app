import React from 'react';
import ReactDOM from 'react-dom';


let todos = [{"title": "Первый пункт","id": 1,}, {"title": "Второй пункт","id": 2,}, {"title": "Третий пункт","id": 3,}];
let num_todos = todos.length;
function TodoItem(obj) {
    let state = React.useState(2);
    function _delete() {
        state[1](0, );
    }
    function _check() {
        state[1](1, );
    }
    let task = "";
    if (state[0] == 2) {
        task = obj.title;
    } else if (state[0] == 1) {
        task = (
            <del>
                {obj.title}
            </del>
        );
    } else {
        
        function it(todo) {
            return todo.id != obj.index;
        }
        todos = todos.filter(it);
        console.log(todos, );
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
    let state = React.useState(todos);
    function _new() {
        
        let form = document.getElementById("add_task", );
        let _name = form.value;
        form.value = "";
        num_todos = num_todos + 1;
        todos = todos.concat([{"title": _name,"id": num_todos,}]);
        console.log(todos, );
        state[1](todos, );
    }
    let _todos = [];
    for (let _i = 0;_i < todos.length; _i += 1) {
        _todos.push((
            <TodoItem index={todos[(_i<0)?(todos.length+_i):(_i)].id} title={todos[(_i<0)?(todos.length+_i):(_i)].title} key={todos[(_i<0)?(todos.length+_i):(_i)].id}>
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
                Добавить задачу
            </button>
            <ul>
                {_todos}
            </ul>
        </div>
    );
}
function App(obj) {
    return (
        <div id="main">
            <h1>
                Здраствуйте, это React приложение написанное на python
            </h1>
            <TodoList>
            </TodoList>
        </div>
    );
}
ReactDOM.render((
    <App>
    </App>
), document.getElementById("root", ));
