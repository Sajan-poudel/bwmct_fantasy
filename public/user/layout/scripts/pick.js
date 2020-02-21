const tableBodys = document.getElementById('names').children;
const cards = document.getElementsByClassName('card');
const imgUrl = "user/images/demo/";
const priceInfos = document.getElementById('price');
const saveButton = document.getElementById('save');

let counter = 0;
let oneTimeComplition = false;
let isRemovedButtonPressed = false;
let currentPrice = 100;

let indexSelection = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let selected = [];


//loop through all the tablerows
for (let i = 0; i < tableBodys.length; i++) {
    tableBodys[i].addEventListener('click', () => {
        counter = getReleventIndex(indexSelection);
        //check if the card is in the array
        if (counter >= 0) {

            //check if card is already selected
            if (cards[counter].children[4].children[0].innerText === "None") {

                let selectedName = tableBodys[i].children[0].innerText;
                let selectedTeam = tableBodys[i].children[1].innerText;
                let selectedPrice = tableBodys[i].children[3].innerText;

                selectedData = { name: selectedName, team: selectedTeam, price: selectedPrice };

                let isAlreadyPresent = false;
                //check if the player is already selected;
                if (selected.length > 0) {
                    var isRepeated = false;
                    for (let i = 0; i < selected.length; i++) {
                        if (JSON.stringify(selected[i]) == JSON.stringify(selectedData)) {
                            //player is already repeated
                            alert("Player " + selectedName + " already exist");
                            isRepeated = true;
                            break;
                        }
                    }

                    //If the data is not repeted			
                    if (!isRepeated) {
                        //add player
                        cards[counter].children[4].children[0].innerText = selectedName;
                        cards[counter].children[4].children[1].innerText = selectedPrice;
                        cards[counter].children[0].src = imgUrl + 'avatarp.png';
                        indexSelection[counter] = 1;
                        //decrease the budget and show red if the budget is negative
                        currentPrice -= parseInt(selectedPrice.replace('m', ''));
                        if (currentPrice < 0) {
                            priceInfos.style.color = "red";
                        } else {
                            priceInfos.style.color = "white";
                        }
                        priceInfos.innerText = "Budget " + currentPrice + 'm';
                        selected.push(selectedData);
                    }
                } else {
                    //add player
                    cards[counter].children[4].children[0].innerText = selectedName;
                    cards[counter].children[4].children[1].innerText = selectedPrice;
                    cards[counter].children[0].src = imgUrl + 'avatarp.png';
                    indexSelection[counter] = 1;

                    //decrease the budget and show red if the budget is negative
                    currentPrice -= parseInt(selectedPrice.replace('m', ''));
                    if (currentPrice < 0) {
                        priceInfos.style.color = "red";
                    } else {
                        priceInfos.style.color = "white";
                    }
                    priceInfos.innerText = "Budget " + currentPrice + 'm';


                    selected.push(selectedData);
                }

            } else {
                alert("Player is already selected");
            }

            //All players are selected
        } else {
            alert("All players are selected, if you want to add new player then remove then add");
        }

    });
}


for (let i = 0; i < cards.length; i++) {
    //remove the selected players from the list
    cards[i].children[3].children[1].addEventListener('click', () => {

        //remove that data in the selected array	
        let name = cards[i].children[4].children[0].innerText;
        let price = cards[i].children[4].children[1].innerText;

        let removeIndex = removeElementFromJsonArr(selected, name, price);

        if (removeIndex > -1) {
            selected.splice(removeIndex, 1);
        }

        //make our selectiov arry of that inde be zero
        indexSelection[i] = 0;

        //increase the budget
        currentPrice += parseInt(price.replace('m', ''));
        if (currentPrice < 0) {
            priceInfos.style.color = "red";
        } else {
            priceInfos.style.color = "white";
        }
        priceInfos.innerText = "Budget " + currentPrice + 'm';

        //remove selected data from the array
        cards[i].children[4].children[0].innerText = "None";
        cards[i].children[4].children[1].innerText = "XXXX";
        cards[i].children[0].src = imgUrl + 'profile.jpg';
    });
    //});
}

//Click the save button
saveButton.addEventListener('click', () => {
    if (selected.length < cards.length) {
        //all players are not selected
        alert("Please select all players including the substitution");
    } else if (currentPrice < 0) {
        //budget
        alert("Your team selection is out of budget. Exchage some players");
    } else if (!AvoidPlayerSubmission(selected)) {
        alert("You can select only four players from one team")
    } else {
        //send the post data
        makePostReq(selected, "post");
    }
});


//functions:-

//functin get the least card index whic is not selected
function getReleventIndex(arrayOfINdexs) {
    for (let i = 0; i < arrayOfINdexs.length; i++) {
        if (arrayOfINdexs[i] === 0) {
            return i;
        }
    }
    return -1;
}

//fuction removeFrom the index
function removeElementFromJsonArr(josnArray, name, price) {
    for (let i = 0; i < josnArray.length; i++) {
        if (josnArray[i].name === name && josnArray[i].price === price) {
            return i;
        }
    }
    return -1;
}

//send the post request
function makePostReq(params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    for (var key in params) {

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key].name);

        form.appendChild(hiddenField);

    }
    console.log(form.innerHTML);
    document.body.appendChild(form);
    console.log(form.innerHTML);
    form.submit();
}

//Check if more playerFromSingTeamSelected`
function AvoidPlayerSubmission(obj) {
    var team8 = 0;
    var team9 = 0;
    var team10 = 0;
    var team11 = 0;
    var team12 = 0;
    var team121 = 0;

    for (let i = 0; i < obj.length; i++) {
        console.log(obj[i].name + "  " + obj[i].team); //access 1ts objects a value
        var add = true;
        if (obj[i].team == "8") {
            team8 += 1;
            if (team8 == 4) {
                add = false;
                break;
            }
        }

        if (obj[i].team == "9") {
            team9 += 1;
            if (team9 == 4) {
                add = false;
                break;
            }
        }

        if (obj[i].team == "10") {
            team10 += 1;
            if (team10 == 4) {
                add = false;
                break;
            }
        }

        if (obj[i].team == "11") {
            team11 += 1;
            if (team11 == 4) {
                add = false;
                break;
            }
        }

        if (obj[i].team == "12A") {
            team12 += 1;
            if (team12 == 4) {
                add = false;
                break;
            }
        }

        if (obj[i].team == "12B") {
            team121 += 1;
            if (team121 == 4) {
                add = false;
                break;
            }
        }



    }
    return add;

}