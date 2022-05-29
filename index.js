console.log("Here you can store your notes");
shownotes();


//event listener to add the note in storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {

    let addtxt = document.getElementById("addtxt");
    let addtitle=document.getElementById("addtitle");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title:addtitle.value,
        text:addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addtxt.value="";
    addtitle.value="";

    //console.log(notesObj);
    shownotes();

});

//function to show the notes
function shownotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
    html+=`  <div class="mx-2 my-2 notecard card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${element.title} </h5>
         <p class="card-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
    </div>
</div>`
    });
    let  notesEle=document.getElementById('notes');
    if(notesObj.length!=0){
        notesEle.innerHTML=html;
    }
    else{
        notesEle.innerHTML=`No note added yet !! Add your first note`;
    }
}
  
//function to delete a note

function deleteNote(index){
    //console.log('i am deleting',index);
    let notes=localStorage.getItem("notes");
    if(notes==null){
         notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}
//to search any note

let search=document.getElementById("searchtxt");
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
//console.log("input event fired",inputVal);
let notecards=document.getElementsByClassName('notecard');
Array.from(notecards).forEach(function(element){
    let cardtxt=element.getElementsByTagName("p")[0].innerText;
    if(cardtxt.includes(inputVal)){
        element.style.display="block";
    }
    else{
        element.style.display="none";
    }
})
})