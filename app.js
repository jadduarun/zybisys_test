let add = document.getElementById("add");
let titleInputBox = document.getElementById("title");
let contentTextBox = document.getElementById("content");
let lists = document.getElementById("lists");
let arr=[];

if(add.innerText === "Add"){
add.addEventListener("click", (event) => {
    event.preventDefault();
    addList();
    titleInputBox.value = "";
    contentTextBox.value = "";
    console.log(arr)
})
}
 if(add.innerText === "Update"){
    console.log("hi");
    add.addEventListener("click", (event) => {
        event.preventDefault();
        add.innerText == "Add";
    })
 }

function addList(){
    let titleInput = document.getElementById("title").value;
    let contentText = document.getElementById("content").value;

    if(titleInput === ""){
        alert("Please Write a Title")
    }
    else if(contentText === ""){
        alert("Please Write a Content")
    }
    else{
        arr.push({
                    title: titleInput,
                    content: contentText
                })
        let lists = document.getElementById("lists");
        let oneList = document.createElement("li");
        oneList.setAttribute("id", "oneList");
        let editBtn = document.createElement("button");
        editBtn.setAttribute("id", "edit");
        let delBtn = document.createElement("button");
        delBtn.setAttribute("id", "delete");
        oneList.innerText =  titleInput;
        editBtn.innerText = "Edit";
        delBtn.innerText = "Delete";
        lists.appendChild(oneList);
        oneList.appendChild(editBtn);
        oneList.appendChild(delBtn);
    }

    let edit = document.querySelectorAll("#edit");
    for(let i=0; i<edit.length; i++) {
    edit[i].addEventListener("click", (event) => {
        add.innerText = "Update";
        event.preventDefault();
        for(let x of arr){
            titleInputBox.value = x.title;
            contentTextBox.value = x.content;
        }
        console.log(arr)
    })
}

    let allDel = document.querySelectorAll("#delete");
    for(let i=0;i<allDel.length;i++) {
        allDel[i].addEventListener("click", (event) => {
            console.log("hi")
            event.preventDefault();
            for(let x of arr){
                arr.splice(arr.indexOf(x), 1); 
                allDel[i].parentNode.remove();              
                console.log(arr)
            }
        })
    }
}

