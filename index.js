function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const intToOperation = ["+", "-", "\\times", "\\div"];
const intToOperationForCalc = ["+", "-", "*", "/"];

let userCorrectAnswer = {
    "+":0,
    "-":0,
    "*":0,
    "/":0
}

let userTotalAnswer = {
    "+":0,
    "-":0,
    "*":0,
    "/":0
}

let isWholeNumber = false;
let input1, input2, operationType, answer;

function generateQuestion() {
    isWholeNumber = false;
    while (!isWholeNumber || answer < 0) {
        input1 = getRandomInt(1, 10);
        input2 = getRandomInt(1, 10);
        operationType = getRandomInt(0, 3);
        answer = eval(input1 + intToOperationForCalc[operationType] + input2);
        isWholeNumber = Number.isInteger(answer);
    }
    return { input1, input2, operationType, answer };
}

$(document).ready(() => {
    let { input1, input2, operationType, answer } = generateQuestion();

    let latexEq = `\\(${input1} ${intToOperation[operationType]} ${input2}\\)`;
    $("#mathEq").text(latexEq);
    $("#answer").text(answer);

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "mathEq"]);

    $("#submitbtn").on("click", () => {
        const userAnswer = parseInt($("#answerinput").val());
        userTotalAnswer[intToOperationForCalc[operationType]] += 1
        $("#answerinput").val("")
        if (userAnswer === answer) {  
        userCorrectAnswer[intToOperationForCalc[operationType]] += 1
            console.log("Right!");
        } else {
            console.log("WRONG!");
        }

        if (userTotalAnswer[intToOperationForCalc[operationType]] === 3) {
            const index = intToOperationForCalc.indexOf(intToOperationForCalc[operationType])
            intToOperationForCalc.splice(index, 1)
            intToOperation.splice(index, 1)
        }
        if (intToOperation.length === 0) {
            console.log("congrats");
            $(".individualStats").empty()
            return
        }
        
        $(".individualStats").empty()

        const additionStat = $('<li>',  {  
            id: "additionStat",
            text: "Addition: " + userCorrectAnswer["+"] + "/" + userTotalAnswer["+"]
        })

        const subtractionStat = $('<li>',  {  
            id: "subtractionStat",
            text: "Subtraction: " + userCorrectAnswer["-"] + "/" + userTotalAnswer["-"]
        })

        const multiplicationStat = $('<li>',  {  
            id: "multiplicationStat",
            text: "Multiplication: " + userCorrectAnswer["*"] + "/" + userTotalAnswer["*"]
        })

        const divisionStat = $('<li>',  {  
            id: "divisionStat",
            text: "Division: " + userCorrectAnswer["/"] + "/" + userTotalAnswer["/"]
        })

        additionStat.appendTo($(".individualStats"));
        subtractionStat.appendTo($(".individualStats"));
        multiplicationStat.appendTo($(".individualStats"));
        divisionStat.appendTo($(".individualStats"));


        ({ input1, input2, operationType, answer } = generateQuestion()); // Generate a new question after the answer is submitted
        latexEq = `\\(${input1} ${intToOperation[operationType]} ${input2}\\)`;
        $("#mathEq").text(latexEq);
        $("#answer").text(answer);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "mathEq"]);
        console.log("corrects", userCorrectAnswer)
        console.log("total", userTotalAnswer)



        
    });
});
