console.log('script has been executed');

const inputTable = document.getElementById('inputTable');

for (let i = 0; i < 3; i++) {

    let row = document.createElement('tr');
    let SN = document.createElement('td');
    let playeName = document.createElement('td');
    let price = document.createElement('td');

    SN.innerText = i + 1;
    playeName.innerHTML = "<input type='text' class='form-control' placeholder='Player name' required='false' name='name'>";
    price.innerHTML = "<input type='text' class='form-control' placeholder='Player price' required='false' name='price'>";

    row.appendChild(SN);
    row.appendChild(playeName);
    row.appendChild(price);

    inputTable.appendChild(row);
}