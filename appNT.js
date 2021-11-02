let noteCards = document.querySelector('.noteCards');
showNotes();
let addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', function (e) {

    addTxt = document.querySelector('.addTxt');
    addTitle = document.querySelector('.addTitle');

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }
    titlesArr.push(addTitle.value);
    localStorage.setItem('titles', JSON.stringify(titlesArr));
    addTitle.value = "";

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }
    notesArr.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }

    notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }
    let html = "";
    notesArr.forEach(function (element, index) {
        html += `
                <div class="noteCards">
                <h4 class="nthead">${titlesArr[index]}</h4>
                <div class="para"><p>${element}</p></div>
                <div class="noteEnd">
                <button class="delbtn" id="${index}" onclick="delFunc(this.id)" class="delBtn"><i class="fas fa-trash"></i></button>
                <button class="star imp" id="${index - 6000}" onclick="markImp(this.id)"><i class="fas fa-star"></i></button>
                </div>
                </div>
        `
    });

    let note = document.querySelector('.note');
    note.innerHTML = html;
    
    let mark1=localStorage.getItem('imp');
    if(mark1==null)
    mark2=[];
    else
    mark2=JSON.parse(mark1);
    mark2.forEach(function(element,index){
        let i2=String(index-6000);
        if(element==1)
        document.getElementById(i2).classList.toggle('imp');
    })
}

function delFunc(index) {
    
    let mark = localStorage.getItem('imp');
    if (mark == null) {
        impArr = [];
    }
    else {
        impArr = JSON.parse(mark);
    }

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }
    titlesArr.splice(index, 1);
    notesArr.splice(index, 1);
    impArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    localStorage.setItem('titles', JSON.stringify(titlesArr));
    localStorage.setItem('imp', JSON.stringify(impArr));
    showNotes();
}

container = document.querySelector('.container');
let create = document.querySelector(".create");
create.addEventListener('click', function () {
    container.classList.toggle('hide');
})

let search = document.querySelector('.search');
search.addEventListener('input', function () {
    let card = document.getElementsByClassName('noteCards');
    let val = search.value;
    Array.from(card).forEach(function (element) {
        let txt1 = element.getElementsByClassName('nthead')[0].innerText.toLowerCase();
        let txt2 = element.getElementsByClassName('para')[0].innerText.toLowerCase();
        if (txt1.includes(val.toLowerCase()) || txt2.includes(val.toLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});

searchBtn = document.getElementsByClassName('searchBtn')[0];
searchBtn.addEventListener('click', () => {
    search.classList.toggle('v-search');
});
let i1, impArr;

function markImp(index1) {
    let mark = localStorage.getItem('imp');
    if (mark == null) {
        impArr = [];
    }
    else {
        impArr = JSON.parse(mark);
    }
    i1 = Number(index1) + 6000;
    document.getElementById(index1).classList.toggle('imp');
    if (impArr[i1] == undefined || impArr[i1] == 0 || impArr[i1] == null) 
        impArr[i1] = 1;
    else
        impArr[i1] = 0;
    localStorage.setItem('imp', JSON.stringify(impArr));
}

function seeStarFunc(){
    let back=document.querySelector('.back');
    back.style.display="block";
    let cards=document.getElementsByClassName('noteCards');
    let mark=localStorage.getItem('imp');
    if(mark==null)
    {
        impArr=[];
    }
    else{
        impArr=JSON.parse(mark);
    }

    Array.from(cards).forEach(function(element,index){
        if(impArr[index]==1)
        {
            element.style.display='block';
        }
        else
        element.style.display="none";
    });
}

function backFunc(){
    location.reload();
}