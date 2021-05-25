//initialize table
var current=1;
var table=document.createElement('table');;
var thead= createTableHeader("ID", "Name", "Email");
var tbody= document.createElement("tbody");

//function to create Table
function createTable(arr) {
  document.body.style="background-color: darkkhaki;";
  table.setAttribute('id','my_table');
  table.style="font-size:x-large;border-style:solid;border-collapse:collapse;position:relative;left:30%;";
  table.appendChild(thead);
  arr.forEach((ele)=>{
    tbody.appendChild(createTableRows(ele.id,ele.name,ele.email));
  });
  tbody.style="background-color: aqua;";
  table.appendChild(tbody);
  return table;
}

//function to create table header

function createTableHeader(...columns) {
  let thead=document.createElement("thead");
  thead.style="background-color: bisque;"
  columns.forEach((column) => {
    let th = document.createElement("th");
    th.innerText = column;
    th.style="height:50px;border-style:solid;width:auto;"
    thead.appendChild(th);
  });
  return thead;
}

//function to display table data

function displayRowData(arr){
  tbody.innerHTML='';
  createTable(arr);
}


//function to create Rows

function createTableRows(...params) {
  let tr = document.createElement("tr");
  params.forEach((col) => {
    let td = document.createElement("td");
    td.innerText = col;
    td.style="height:50px;text-align:center;border-style:solid;"
    tr.appendChild(td);
  });
  return tr;
}


//function to create Buttons
function createButtons(){
  let div=document.createElement('div');
  div.style="display: flex; justify-content: center;";
  div.appendChild(createQuickNavButtons("Prev"));
  let buttons = createPaginationButtons(10);
  buttons.map((button) => {
    div.appendChild(button);
  });
  div.appendChild(createQuickNavButtons("Next"));
  document.body.append(div);
}


//function to  create Pagination Buttons

function createPaginationButtons(num) {
  let buttons = [];
  for (let i = 0; i < num; i++) {
    let button = document.createElement("button");
    button.setAttribute("id", `btn_${i + 1}`);
    button.classList.add('btn');
    button.innerText = i + 1;
    buttons.push(button);
  }
  return buttons;
}

//Function to create Prev and Next Buttons
function createQuickNavButtons(name) {
  let button = document.createElement("button");
  button.setAttribute("id", name);
  button.innerText = name;
  return button;
}

//IIFE Function to create XHR Request
(function(){
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  xhr.send();
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      let responseObj = JSON.parse(xhr.response);
      displayRowData(responseObj.slice(0,10));
      document.body.append(table);
      document.body.append(document.createElement('hr'));
      document.body.append(createButtons());
      document.querySelectorAll(".btn").forEach((item,index)=>{
        item.addEventListener('click',function(){
          current=index;
          displayRowData(responseObj.slice((index*10),(index*10)+10));
        });});
        document.querySelector('#Prev').addEventListener('click',function(){
          if(current>0){
            current--;
            displayRowData(responseObj.slice((current*10),(current*10)+10));
          }
          else
             current=1
        });
        document.querySelector('#Next').addEventListener('click',function(){
          if(current<10){
            displayRowData(responseObj.slice((current*10),(current*10)+10));
            current++;
          }
          else
            current=9;
        });
    }
  };
}());
