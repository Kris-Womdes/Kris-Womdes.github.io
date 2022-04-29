document.querySelector("input").addEventListener("keydown", function (e) { if (e.keyCode === 13) { calc(this.value); } });
function calc(string) {
    let array = new Array();
    let part = "";
    for (let i = 0; i < string.length - 1; i++) {
        if (!isNaN(string[i])) {
            part += string[i];
            if (isNaN(string[i + 1])) {
                array.push(part);
                part = "";
            }
        }
        else {
            array.push(string[i]);
        }
    }
    if (part == "") {
        array.push(string[string.length - 1]);
    }
    else {
        part += string[string.length - 1];
        array.push(part);
    }


    let oldArray;
    do {
        do {
            oldArray = array.slice();
            exponentiation();
            console.log(array);

        }
        while (!arraysAreEqual(array, oldArray));

        do {
            oldArray = array.slice();
            easyOperation("*");
            console.log(array);
            easyOperation("/");
            console.log(array);

        }
        while (!arraysAreEqual(array, oldArray));

        do {
            oldArray = array.slice();
            easyOperation("+");
            console.log(array);
            easyOperation("-");
            console.log(array);
            removeParentheses();
            console.log(array);

        }
        while (!arraysAreEqual(array, oldArray));
    }
    while (!arraysAreEqual(array, oldArray));


    alert(array);






    function easyOperation(symbol) {
        let miniResult;
        for (let i = 1; i < array.length - 1; i++) {
            if (!isNaN(array[i - 1]) && array[i] == symbol && !isNaN(array[i + 1])) {
                switch (symbol) {
                    case "*":
                        {
                            miniResult = array[i - 1] * array[i + 1];
                            break;
                        }
                    case "/":
                        {
                            miniResult = array[i - 1] / array[i + 1];
                            break;
                        }
                    case "+":
                        {
                            miniResult = Number(array[i - 1]) + Number(array[i + 1]);
                            break;
                        }
                    case "-":
                        {
                            miniResult = array[i - 1] - array[i + 1];
                            break;
                        }
                }
                array.splice(i - 1, 3, miniResult);
            }
        }
    }



    function removeParentheses() {
        for (let i = 1; i < array.length - 1; i++) {
            if (array[i - 1] == "(" && !isNaN(array[i]) && array[i + 1] == ")") {
                array.splice(i - 1, 3, array[i]);
            }
        }

        for (let i = 1; i < array.length - 2; i++) {
            if (array[i - 1] == "(" && array[i] == "-" && !isNaN(array[i + 1]) && array[i + 2] == ")") {
                array.splice(i - 1, 4, array[i] + array[i + 1]);
            }
        }
    }



    function exponentiation() {
        let miniResult;
        for (let i = 0; i < array.length - 2; i++) {
            if (!isNaN(array[i]) && array[i + 1] == "^" && !isNaN(array[i + 2])) {
                miniResult = Math.pow(array[i], array[i + 2]);
                array.splice(i, 3, miniResult);
            }
        }
    }



    function arraysAreEqual(array1, array2) {
        if (array1.length == array2.length) {
            let result = true;
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] != array2[i]) {
                    result = false;
                    break;
                }
            }
            return result;
        }
        else {
            return false;
        }
    }
}