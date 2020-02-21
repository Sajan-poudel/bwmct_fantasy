var naam = document.getElementById("naam");
var paisa = document.getElementById("paisa");
var anka = document.getElementById("anka");
var samuha = document.getElementById("samuha");

naam.addEventListener("click", sortTable);
paisa.addEventListener("click", sortTable1);
anka.addEventListener("click", sortTable2);

function sortTable() {
    var rows;
    var switching;
    var i;
    var x;
    var y;
    var shouldSwitch;
    var names = document.getElementById("names");
    switching = true;

    while (switching) {

        switching = false;
        rows = names.getElementsByTagName("TR");
        for (i = 0; i < rows.length; i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortTable1() {
    var rows;
    var switching;
    var i;
    var x;
    var y;
    var shouldSwitch;
    var names = document.getElementById("names");
    switching = true;

    while (switching) {

        switching = false;
        rows = names.getElementsByTagName("TR");
        for (i = 0; i < rows.length; i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];

            if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


function sortTable2() {
    var rows;
    var switching;
    var i;
    var x;
    var y;
    var shouldSwitch;
    var names = document.getElementById("names");
    switching = true;

    while (switching) {

        switching = false;
        rows = names.getElementsByTagName("TR");
        for (i = 0; i < rows.length; i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];

            if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// function sortTable3() {
//     var rows;
//     var switching;
//     var i;
//     var x;
//     var y;
//     var shouldSwitch;
//     var names = document.getElementById("names");
//     switching = true;

//     while (switching) {

//         switching = false;
//         rows = names.getElementsByTagName("TR");
//         for (i = 0; i < rows.length; i++) {
//             shouldSwitch = false;

//             x = rows[i].getElementsByTagName("TD")[1];
//             y = rows[i + 1].getElementsByTagName("TD")[1];

//             if (x.innerHTML == "12 A") {
//                 x = 121;
//             } else if (x.innerHTML == "12 B") {
//                 x = 122;
//             } else {
//                 x = parseFloat(x.innerHTML);
//             }
//             if (y.innerHTML == "12 A") {
//                 y = 121;
//             } else if (y.innerHTML == "12 B") {
//                 y = 122;
//             } else {
//                 y = parseFloat(y.innerHTML);
//             }

//             if (x > y) {
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;
//         }
//     }
// }