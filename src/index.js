import React from 'react';
import ReactDOM from 'react-dom';


import Button from "@material-ui/core/Button";
import TextFiled from "@mui/material/TextField";
let tasks = [{"title": "First task","id": 1,}, {"title": "Second task","id": 2,}, {"title": "Third task","id": 3,}];
let task_id = tasks.length;
function TodoItem(obj) {
    let [state, set_state] = React.useState(1)
    function _delete() {
        if (window.confirm("Are you sure?")) {
            set_state(-(1));
        } 
    }
    function _check() {
        set_state(!(state));
    }
    let task = "";
    if (state == 1) {
        task = obj.title;
    } else if (state == 0) {
        task = (
            <del>
                {obj.title}
            </del>
        );
    } else if (state == -(1)) {
        
        function it(todo) {
            return todo.id != obj.index;
        }
        tasks = tasks.filter(it);
        console.log(tasks);
        return "";
    } 
    return (
        <li style={{"fontSize": "16pt",}}>
            <p lang="en" style={{"margin": "0px","width": "250px","hyphens": "auto",}}>
                {task}
            </p>
            <Button style={{"backgroundColor": "#66bb6a",}} variant="contained" size="small" onClick={_check}>
                ✓
            </Button>
            <Button style={{"backgroundColor": "#f44336",}} variant="contained" size="small" onClick={_delete}>
                ✗
            </Button>
        </li>
    );
}
function TodoList() {
    let [state, set_state] = React.useState(tasks)
    let [input_state, change_inp_state] = React.useState(false)
    function _new() {
        
        let form = document.getElementById("add_task");
        let _name = form.value;
        if (_name == "") {
            change_inp_state(true);
            function default_style() {
                change_inp_state(false);
            }
            setTimeout(default_style, 250);
            return "";
        } 
        form.value = "";
        task_id = task_id + 1;
        tasks = tasks.concat([{"title": _name,"id": task_id,}]);
        console.log(tasks);
        set_state(tasks);
    }
    let _tasks = [];
    for (let _i = 0;_i < state.length; _i += 1) {
        _tasks.push((
            <TodoItem index={tasks[(_i<0)?(tasks.length+_i):(_i)].id} title={tasks[(_i<0)?(tasks.length+_i):(_i)].title} key={tasks[(_i<0)?(tasks.length+_i):(_i)].id}>
            </TodoItem>
        ));
    }
    return (
        <div>
            <div id="msg">
            </div>
            <TextFiled variant="outlined" id="add_task" error={input_state} label="Task's name" multiline={true} placeholder="Placeholder" helperText={"Task's name cannot be empty"}>
            </TextFiled>
            <br>
            </br>
            <Button style={{"backgroundColor": (input_state && "#f44336") || "#4fc3f7",}} variant="contained" onClick={_new}>
                {"Add task"}
            </Button>
            <ul style={{"listStyle": "none",}}>
                {_tasks}
            </ul>
        </div>
    );
}
function App(obj) {
    return (
        <div>
            <h2>
                {"This app is written in python("}
                <a href="https://github.com/alploskov/python-react-todo-app">
                    {"source code"}
                </a>
                {")"}
            </h2>
            <TodoList>
            </TodoList>
        </div>
    );
}
ReactDOM.render((
    <App>
    </App>
), document.getElementById("root"));
