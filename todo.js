// TÜM ELEMNTLERİ SEÇMEK

const form = document.querySelector("#todoAddForm");
const addInput =document.querySelector("#todoName");
const todoList =document.querySelector(".list-group");
const firstCardBody =document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clearButton =document.querySelector("#clearButton");
const todoSearch = document.querySelector("#todoSearch");

let todos=[];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",todoRemove)
    clearButton.addEventListener("click", allTodosRemove)
    todoSearch.addEventListener("keyup",filter)
    
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    });
 }

function addTodo(e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen değeri boş bırakmayınız.")
    }else{
     // Arayüze ekleme
    // Tekrar kontrolü
    if (!todoAgain(inputText)) {
        addTodoUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo Eklendi")
    } else {
        showAlert("danger","Aynı değer zaten mevcut")
    }
    }

    // Storage ekleme
    e.preventDefault();
}

function addTodoUI(newTodo){
    const li=document.createElement("li");
    const a=document.createElement("a");
    const i=document.createElement("i");
    i.className="fa fa-remove";
    a.className="delete-item";
    a.href="#";
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    a.addEventListener("click",todoRemove)

    addInput.value="";
}

function todoAgain(checkText){
    if(!checkText) return false;
    const items = document.querySelectorAll('.list-group-item');
    for(let i=0;i<items.length;i++){
        if(items[i].textContent.trim().toLowerCase() === checkText.trim().toLowerCase()){
            return true;
        }
    }
    return false;
}


function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function checkTodosFromStorage(){
       if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}


function showAlert(type,message){
    const div=document.createElement("div");
    div.className=`alert alert-${type} mt-3`;
    div.textContent=message;
    div.style.borderRadius="10px"

    firstCardBody.appendChild(div);    

    setTimeout(function(){
        div.remove();
    },1500)
}

function todoRemove(e){
    if(e.target.className==="fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo başarıyla silindi.")
        e.stopPropagation();
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function allTodosRemove(){
    const allTodo=document.querySelectorAll(".list-group-item");
    if(allTodo.length>0){
        allTodo.forEach(function(todo){
            todo.remove();
        });

    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success", "Tüm Todolar başarıyla temizlendi.");
    }else{
        showAlert("warning","Silmek için en az bir todo olmalıdır.")
    }
}

function filter(e){
    const filterValue=e.target.value.toLowerCase().trim();
    const todoList=document.querySelectorAll(".list-group-item");


    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display: block")
            }else{
                todo.setAttribute("style","display: none !important")
            }
        })
    }else{
        showAlert("danger","Filtreleme yapmak için en az bir todo olmalıdır!")
    }
}


