
// console.log("welcome to magic notes app.");
shownotes();

//if user adds a note,add it to local storage//
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtext = document.getElementById("addtext");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addtitle.value,
        text: addtext.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addtext.value = " ";
    addtitle.value = " ";
    // console.log(notesObj);
    shownotes();

});

//function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    } else {

        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `

<div class=" notecard my-2 mx-2 card" style="width: 18rem;">

  <div class="card-body">
    <h5 class="card-title"> ${element.title} </h5>
    <p class="card-text"> ${element.text} </p>
    <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete note </button>
  </div>
</div>`;
    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

    } else {
        notesElm.innerHTML = `Nothing to show! use "Add a Note" section above to add notes.`;
    }
}

//function to delete a note

function deletenote(index) {
    // console.log(`i am deleting `,index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById(`searchtext`);
search.addEventListener("input", function () {

    let inputval = search.value.toLowerCase();
    // console.log('input event fired!' ,inputval);

    let notecards = document.getElementsByClassName('notecard')
    Array.from(notecards).forEach(function (element) {
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        if (cardtext.includes(inputval)) {
            element.style.sdisplay = "block";

        } else {
            element.style.display = "none";
        }
        // console.log(cardtext);
    });
});