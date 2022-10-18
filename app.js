// SELECTEURS
   const todoInput = document.querySelector(".todo_input");
    const todoButton = document.querySelector(".todo_button");
     const todoList = document.querySelector(".todo_list");
     const filterOption = document.querySelector(".filter_todo");

//ECOUTEURS
// au chargement de la page
  document.addEventListener("DOMCententLoaded", getTodos);
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deletecheck)
  filterOption.addEventListener("input", filterTodo);


//FONCTIONS
function addTodo(event){
    // stoper le chargement auto
    event.preventDefault();
    //  todo Div 
    const todoDiv = document.createElement("div");
     todoDiv.classList.add("todo");
    // create li ainsi le mettre dans ma todoDiv et recuperation de la valeur via todoInput
     const newTodo = document.createElement("li");
      newTodo.innerText = todoInput.value;
      newTodo.classList.add("todo_items");
      todoDiv.appendChild(newTodo);
     // AJOUTER LA TODO A LA LOCALSTORAGE
       saveLocalTodos(todoInput.value);

     // create  button  and check it 
       const completeButton = document.createElement("button");
        completeButton.innerHTML ='<i class="fas fa-check"></i>';
        completeButton.classList.add('complete_btn');
        todoDiv.appendChild(completeButton);

        // create button  delete content 
        const trashButton= document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash_btn');
        todoDiv.appendChild(trashButton);
        // AJOUTER NOTRE TODODIV  A TODOLIST et laisser le champ
         todoList.appendChild(todoDiv);
         todoInput.value ="";
          
      
        }
function deletecheck(e){
   const item = e.target;
   // DELETE 
   if( item.classList[0] === "trash_btn"){
     const todo = item.parentElement;
     todo.classList.add("fall");
     removeLocalTodos(todo);
     // ceci attent la fin de l'exécution de l'animation pour jouer son role via .fall
     todo.addEventListener("transitionend", function(){
       
        todo.remove();
     });
   }
   // POUR CHECK MARK
   if( item.classList[0] === "complete_btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e){
  const todos = todoList.childNodes;
    todos.forEach(function(todo)
   {
      switch(e.target.value){
        case 'all':
          todo.style.display='flex';
          break;
          case 'completed':
            // si la classeListe contient completed alors
            if(todo.classList.contains("completed") ){
              todo.style.display = 'flex';
            }else{
              todo.style.display = 'none';
            }
            break;
           case 'uncompleted':
              // si la classeListe contient completed alors qui n'a pas completed donc !qui signifie non
              if( !todo.classList.contains("completed") ){
                todo.style.display = 'flex';
              }else{
                todo.style.display = 'none';
              }
              break;
      }
   });
}

// voir le nombre des element qui existe et les stocker
function saveLocalTodos(todo){
  // checher si il y a les items existant via localStorage. 
  let todos;
  if(localStorage.getItem('todos') === false){
    todos = []; 
    localStorage.clear();

  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
    
  }
    //todos.push("todo");
   
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []; 
    localStorage.clear();

  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
    
  }
    todos.foreach(function (todo){

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
     // create li ainsi le mettre dans ma todoDiv et recuperation la valeur via todoInput
      const newTodo = document.createElement("li");
       newTodo.innerText = todo;
       newTodo.classList.add("todo_items");
       todoDiv.appendChild(newTodo);
      // create  button  and check it 
        const completeButton = document.createElement("button");
         completeButton.innerHTML ='<i class="fas fa-check"></i>';
         completeButton.classList.add('complete_btn');
         todoDiv.appendChild(completeButton);
 
         // create button  delete content 
         const trashButton= document.createElement("button");
         trashButton.innerHTML='<i class="fas fa-trash"></i>';
         trashButton.classList.add('trash_btn');
         todoDiv.appendChild(trashButton);
         // AJOUTER NOTRE TODODIV  A TODOLIST et laisser le champ
          todoList.appendChild(todoDiv);
    });
    }

function removeLocalTodos(todo){
  let todos;
    if(localStorage.getItem('todos') === null){
    todos = []; 
 
    }else{
    todos = JSON.parse(localStorage.getItem("todos"));
    }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));

}
