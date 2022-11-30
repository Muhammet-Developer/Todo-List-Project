// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm evenet listeler
    form.addEventListener("submit", addTodo);
    // document.addEventListener("DOMContentLoaded",addTodoToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos)
}
function clearAllTodos(e){
    if(confirm("tümünü silmek istediğinize emin misiniz")){
        // todoList.innerHTML = ""; //yavaş 
        while (todoList.firstElementChild != null){ // buda temizlik yapıyor
            todoList.removeChild(todoList.firstElementChild);
        }
        //arayüzden todoları kaldırma
    }

}
function filterTodos(e){
   const filterValue = e.target.value.toLowerCase();
   const listItems = document.querySelectorAll(".list-group-item");
   listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase();
    if(text.indexOf(filter.value)=== -1){
        listItem.setAttribute("style","display : none !important");
    }
    else{
        listItem.setAttribute("style","display : block");
    }
   })
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success", "todos silindi")
    }

}

function addTodo(e){
    const newTodo = todoInput.value.trim(); // burda kullanıcının girdiği yazıyı biz çektik

    if (newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz");
    }
    else{
        // addTodoStorage(newTodo)
        showAlert("success","Todo başarıyla eklendi")
        addTodoToUI(newTodo);
    }

    todoInput.value=""; // bir değişken girdikten sonra sıfırlaması
    e.preventDefault();//varsayılan eylemini yürütmesini durdurur. Bunu en aşağıda kullanırsak daha güvenli olur
}



// type=danger message=yazdığımız mesaj 23satır
function showAlert(type,message){
 /* <div class="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                      </div> */
const alert = document.createElement("div");
alert.className = `alert alert-${type}`; //typemiz danger ya ondan
alert.textContent = message;

    firstCardBody.appendChild(alert); // burda aldığımız hata mesajını ekrana yazdırdık. firstcardbody nin içine alerti çhild olarak ekle
    //setTimeout
    setTimeout(function(){
        alert.remove(); //1 saniye çağırdın geri kapat
        
    }, 1000) // 1 saniye sonra çağır 
}




function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek

    // <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>

   
    const listItem = document.createElement("li"); // li oluşturduk
    const link = document.createElement("a"); // linin içinde bulunan a tagini oluşturduk
    link.href = "#"; // a nın içinde bulunan href oluşturuldu
    link.className = "delete-item"; //a nın içinde bulunan classname oluşturuldu
    link.innerHTML = "<i class = 'fa fa-remove'></i>" // a nın içinde bulunan html kodu oluşturuldu
    listItem.className = "list-group-item d-flex justify-content-between";
    

    //TextNode ekleme. Todo 1 işlemini yaptık
    listItem.appendChild(document.createTextNode(newTodo));
    // listItemin çocuğu olduğu için appenChild kullandık 
    
    listItem.appendChild(link);
    
    //Todo List'e List Item'ı ekleme, yani li tagini ul nin içine alıcaz
    todoList.appendChild(listItem);
    //ul    .son çocuk olarak  li'yi ekle

}


