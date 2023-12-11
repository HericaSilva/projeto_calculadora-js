// selecao elemento
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button")

// funções
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        }
        // add digit to calculator screen
        addDigit(digit) {
            //check if current operation alreasdy has a dot ( permite que digite apenas 1 ponto)
            if (digit === "." && this.currentOperationText.innerText.includes(".")) {
                return;
            }
            this.currentOperation = digit;
            this.updateScreen();
        }
        // process all calculator operations
        processOperation(operation) {
            // check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
    //change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
        }
         return;
        }
            // get current and previuos value
            let operationValue;
            const previuos = +this.previousOperationText.innerText.split(" ")[0];
            const current = +this.currentOperationText.innerText;

            switch (operation) {
                case "+":
                    operationValue = previuos + current;
                    this.updateScreen(operationValue, operation, current, previuos);
                    break;

                    case "-":
                    operationValue = previuos - current;
                    this.updateScreen(operationValue, operation, current, previuos);
                    break;

                    case "/":
                    operationValue = previuos / current;
                    this.updateScreen(operationValue, operation, current, previuos);
                    break;

                    case "*":
                    operationValue = previuos * current;
                    this.updateScreen(operationValue, operation, current, previuos);
                    break;
                    
                    case "DEL":
                    this.processDelOperator();
                    break;
     
                    case "CE":
                    this.processClearCurrentOperation();
                    break;

                    case "C":
                    this.processClearOperation();
                    break;

                    case "=":
                    this.processEqualOperator();
                    break;
    
                default:
                    return;
            }

        }
        
        // change values of the calculator screen
        updateScreen(
            operationValue = null,
            operation = null,
            current = null,
            previuos = null,

        ) {
            if(operationValue === null) {
                this.currentOperationText.innerText += this.currentOperation;
            }else {
                // check if value is zero , if it is just add current value

                if(previuos === 0) {
                    operationValue = current
                }
                //add curent value to previous
                this.previousOperationText.innerText = `${operationValue} ${operation}`;
                this.currentOperationText.innerText = "";
            }
        }
            // change math operation
            changeOperation(operation) {
                const mathOperation = ["*", "/", "+", "-"]
                if(!mathOperation.includes(operation)){
                    return;
                }
                this.previousOperationText.innerText =
                    this.previousOperationText.innerText.slice(0, -1) + operation;
            }
            //delet the last digit
            processDelOperator() {
                this.currentOperationText.innerText =
                    this.currentOperationText.innerText.slice(0, -1);
            }
            // clear current operation
            processClearCurrentOperation() {
                this.currentOperationText.innerText = "";
            }
            //clear all operation
            processClearOperation() {
                this.currentOperationText.innerText = "";
                this.previousOperationText.innerText = "";

            }
            //process an operation
            processEqualOperator() {
                const operation = previousOperationText.innerHTML.split(" ")[1];

                this.processOperation(operation);
            }
    }
    
// instanciando
const calc = new Calculator(previousOperationText, currentOperationText )

//eventos
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
           
            calc.addDigit(value);
        }else {
           calc.processOperation(value);
        }
    });

});
