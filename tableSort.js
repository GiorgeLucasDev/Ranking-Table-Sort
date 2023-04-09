var input = document.querySelector('#search');
var table = document.querySelector('table');
var rows = table.getElementsByTagName("tr");
var tableData = [];
var headerSort = {
    position: false,
    team: false,
    classes: false,
    points: false,
    note: false,
};

// Adiciona os dados da tabela em um array com objetos
for(let rowIndex = 1; rowIndex < rows.length; rowIndex++){
    var cells = rows[rowIndex].querySelectorAll('td');
    let cellValues = [];

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++){
        
        cellValues[cellIndex] = cells[cellIndex].innerHTML;
    }
    tableData.push(new tableObject(parseInt(cellValues[0]),cellValues[1],cellValues[2],cellValues[3],parseFloat(cellValues[4].replace(',', '.')),parseFloat(cellValues[5].replace(',', '.'))));
}

// cria um objeto que corresponde a cada linha da tabela
function tableObject(position, logoElement, team, classes, points, note, isVisible = true){
    this.position = position;
    this.logoElement = logoElement;
    this.team = team;
    this.classes = classes;
    this.points = points;
    this.note = note;
    this.isVisible = isVisible;
}

var positionTH = document.querySelector('#position');

positionTH.addEventListener('click', () => {
    filterTable('position', headerSort.position);
    headerSort.position = !headerSort.position;
});

var teamTH = document.querySelector('#team');


teamTH.addEventListener('click', () => {
    filterTable('team', headerSort.team);
    headerSort.team = !headerSort.team;
});

var classesTH = document.querySelector('#classes');


classesTH.addEventListener('click', () => {
    filterTable('classes', headerSort.classes);
    headerSort.classes = !headerSort.classes;
});

var pointsTH = document.querySelector('#points');

pointsTH.addEventListener('click', () => {
    filterTable('points', headerSort.points);
    headerSort.points = !headerSort.points;
});

var noteTH = document.querySelector('#notes');

noteTH.addEventListener('click', () => {
    filterTable('note', headerSort.note);
    headerSort.note = !headerSort.note;
});

function reloadTable(){
    // Seleciona todas as linhas da tabela
    const currentRows = table.getElementsByTagName("tr");

    // Remove todas as linhas da tabela, exceto a primeira linha (cabeçalho)
    for(let i = rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }


    for(let dataIndex = 0; dataIndex < tableData.length; dataIndex++){
        let row = table.insertRow(-1);
        
        if(row){
            if(tableData[dataIndex].isVisible === false){
                row.style.display = 'none';
            }else{
                row.style.display = '';
            }
        }

        let position = row.insertCell(0);
        position.innerHTML = tableData[dataIndex].position;

        let logoE = row.insertCell(1);
        logoE.innerHTML = tableData[dataIndex].logoElement;  

        let team = row.insertCell(2);
        team.innerHTML = tableData[dataIndex].team;

        let classes = row.insertCell(3);
        classes.innerHTML = tableData[dataIndex].classes;

        let points = row.insertCell(4);
        points.innerHTML = tableData[dataIndex].points;

        let note = row.insertCell(5);
        note.innerHTML = tableData[dataIndex].note;
    }
}

// código para filtrar 

function filterTable(field, inverse){
    tableData.sort(sort_by(field, inverse));
    reloadTable();
}


function filterInput() {
    let filter = input.value.toUpperCase();
  
    for (let row of tableData) {
      let team = row.team;
      if (team.toUpperCase().indexOf(filter) > -1) { // se tiver nas cell
        row.isVisible = true;
      }else{
        row.isVisible = false;
      }
      
    }
  }


input.addEventListener('keyup', function(event) {
   filterInput();
   reloadTable();

});

// código para classificar 
const sort_by = (field, reverse, primer) => {
    let key;
    
    if (primer) {
      key = function(object) {
        return primer(object[field]);
      };
    } else {
      key = function(object) {
        return object[field]; // retorna o atributo do objeto
      };
    }
    

    if (reverse) {
        reverse = -1;
    } else {
        reverse = 1;
    }
      

  return function (a, b) {
    a = key(a);
    b = key(b);
    return reverse * ((a > b) - (b > a));
    /* 
    a função deve retornar:

    1- Um número negativo se a vem antes de b
    2- Zero se a e b são considerados iguais em termos de ordem de classificação
    3- Um número positivo se a vem depois de b
    */

  };
};



