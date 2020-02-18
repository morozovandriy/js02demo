var generateButtonElem = document.querySelector('#generateButton');
var generatedBlockElem = document.querySelector('#generatedBlock');
var rowsElem = document.querySelector('#rows');
var colsElem = document.querySelector('#cols');
loadData();

function generateTable(rowsCount, columnsCount)
{
    var tableElem = document.createElement('table');
    for(var i = 0; i < rowsCount; i++)
    {
        var trElem = document.createElement('tr');
        for(var j = 0; j < columnsCount; j++)
        {
            var tdElem = document.createElement('td');
            trElem.appendChild(tdElem);
        }
        tableElem.appendChild(trElem);
    }
    return tableElem;
}

function saveData()
{
    var rowsCount = +rowsElem.value;
    var colsCount = +colsElem.value;
    var tableElem = document.querySelector('#generatedBlock table');
    localStorage.setItem('rowsCount', rowsCount);
    localStorage.setItem('colsCount', colsCount);
    var str = '';
    var arr = [];
    for(var i = 0; i < rowsCount; i++)
        for(var j = 0; j < colsCount; j++)
        {
            if (tableElem.rows[i].cells[j].classList.contains('highlight'))
            {
                arr.push(1);
            } else
                arr.push(0);
        }
    localStorage.setItem('matrix', arr);
}

function loadData()
{
    rowsElem.value = localStorage.getItem('rowsCount');
    colsElem.value = localStorage.getItem('colsCount');
    generatedBlockElem.appendChild(generateTable(+rowsElem.value, +colsElem.value));
    var arr = localStorage.getItem('matrix').split(',');
    var tableElem = document.querySelector('#generatedBlock table');
    var rowsCount = +rowsElem.value;
    var colsCount = +colsElem.value;
    var k = 0;
    for(var i = 0; i < rowsCount; i++)
        for(var j = 0; j < colsCount; j++)
        {
            if (arr[k] == 1)
            {
                tableElem.rows[i].cells[j].classList.add('highlight');
            }
            k++;
        }
}

generateButtonElem.addEventListener('click', function(event)
{
    generatedBlockElem.innerHTML = '';
    generatedBlockElem.appendChild(generateTable(+rowsElem.value, +colsElem.value));
    saveData();
    event.preventDefault();
});
generatedBlockElem.addEventListener('click', function(event)
{
    if (event.target.tagName == 'TD') {
        event.target.classList.toggle('highlight');
        saveData();
    }
});
document.body.addEventListener('click', function(event)
{
    if (event.target.classList.contains('minmax'))
    {
        event.target.parentNode.parentNode.nextElementSibling.classList.toggle('hidden');
    }
});
