let add = document.getElementById("add");
let titleInputBox = document.getElementById("title");
let contentTextBox = document.getElementById("content");
let lists = document.getElementById("lists");
let j=0;
let localstorageKey = "Titles"

add.addEventListener("click", (event) => {
    let date = new Date();
    let time =date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if(add.innerText === "Add"){
        event.preventDefault();
        let titleInput = document.getElementById("title").value;
        let contentText = document.getElementById("content").value;
    
        if(titleInput === ""){
            alert("Please Write a Title")
        }
        else if(contentText === ""){
            alert("Please Write a Content")
        }
        else{
            localStorage.setItem(localstorageKey,
                JSON.stringify([...JSON.parse(localStorage.getItem(localstorageKey) || "[]"),
                { title:titleInput , content: contentText, createdTime:time,updateTime:time},
            ])
            );
            addList();
        }
    }
    if(add.innerText === "Update"){
        event.preventDefault();
        let titleInput = document.getElementById("title").value;
        let contentText = document.getElementById("content").value;

        if(titleInput === ""){
            alert("Please Write a Title")
        }
        else if(contentText === ""){
            alert("Please Write a Content")
        }
        else{
            add.innerText="Add";
            const fetchedTitle = [...JSON.parse(localStorage.getItem(localstorageKey))];

            fetchedTitle[j].title = titleInput;
            fetchedTitle[j].content = contentText;
            fetchedTitle[j].updateTime = time;

            localStorage.setItem(localstorageKey,JSON.stringify(fetchedTitle))
            addList();
        }
    }
    titleInputBox.value = "";
    contentTextBox.value = "";
})

document.addEventListener("DOMContentLoaded", addList())

function addList(){
    let lists = document.getElementById("lists");
    let popup_title = document.getElementById("popup_title");
    let popup_content = document.getElementById("popup_content");
    let popup = document.getElementById("popup")
    let popupbg = document.getElementById("popupbg");
    
    lists.innerHTML = "";
    const fetchedTitle = [...JSON.parse(localStorage.getItem(localstorageKey))];

    fetchedTitle.forEach(item => {
        let div = document.createElement("div");
        div.setAttribute("id", "liDiv");
        let oneList = document.createElement("li");
        oneList.setAttribute("id", "oneList");
        let editBtn = document.createElement("button");
        editBtn.setAttribute("id", "edit");
        let createTime = document.createElement("p");
        createTime.setAttribute("id", "create_time");
        let updateTime = document.createElement("p");
        updateTime.setAttribute("id", "update_time");
        let delBtn = document.createElement("button");
        delBtn.setAttribute("id", "delete");
        oneList.innerText =  item.title;
        createTime.innerText = item.createdTime;
        updateTime.innerText = item.updateTime;

        oneList.addEventListener("click", (event)=>{
            event.preventDefault();
            popup.style.display = "block";
            popupbg.style.display = "block";
            popup_title.innerText = item.title;
            popup_content.innerText = item.content;
        })

        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", (event) => {
            add.innerText = "Update";
            event.preventDefault();
            popup.style.display = "none";
            popupbg.style.display = "none";
            titleInputBox.value = item.title;
            contentTextBox.value = item.content;
            j=fetchedTitle.indexOf(item);
        })

        delBtn.innerText = "Delete";
        delBtn.addEventListener("click", (event) => {
            event.preventDefault();
            popup.style.display = "none";
            popupbg.style.display = "none";
            titleInputBox.value = "";
            contentTextBox.value = "";
            oneList.parentNode.remove();
            add.innerText="Add";
            const fetchedTitle = [...JSON.parse(localStorage.getItem(localstorageKey))];

            fetchedTitle.forEach((item)=>{
                if(item.title === oneList.innerText){
                    fetchedTitle.splice(fetchedTitle.indexOf(item),1)
                }
            })

            localStorage.setItem(localstorageKey,JSON.stringify(fetchedTitle));
            addList();

        })

        lists.appendChild(div);
        div.appendChild(oneList);
        div.appendChild(editBtn);
        div.appendChild(delBtn);
        div.appendChild(createTime);
        div.appendChild(updateTime);
    })
}

let popupbg = document.getElementById("popupbg");
let popup = document.getElementById("popup")
popupbg.addEventListener("click", () => {
    popup.style.display = "none";
    popupbg.style.display = "none";
})