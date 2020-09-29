
class Calculator{
    constructor(){
        // grab all buttons
        this.buttons = document.querySelectorAll('button');
        this.equation = document.querySelector('.equation');
        this.answer = document.querySelector('.answer');
        this.operatorButtons = document.querySelectorAll('.operators');
        this.percentButton = document.querySelector('.percent');
        this.changeButton = document.querySelector('.sign-change');
        this.equalsButton = document.querySelector('.equals');
        this.decimalButton = document.querySelector('.decimal');
        this.clearButton = document.querySelector('.clear');
        this.num1 = new String();
        this.num2 = new String();
        this.operation = new Function();
        this.operator = false;
    }
    init(){

        // disable equals button until an actual equation is inputted
        this.equalsButton.classList.add('disabled');
        // disable other buttons until a number is inputted
        this.operatorButtons.forEach(button => {
            button.classList.add('disabled');
        });
        this.percentButton.classList.add('disabled');
        this.changeButton.classList.add('disabled');

        this.buttons.forEach(button => {

            if(button.classList.contains('number')){
                button.addEventListener('click', () => {
                    this.number(button);
                });
            } else if (button.classList.contains('operators')){
                button.addEventListener('click', () => {
                    this.operatorButton(button);
                });
            } else if (button.classList.contains('sign-change')){
                button.addEventListener('click', () => {
                    this.signChange();
                });
            } else if (button.classList.contains('percent')){
                button.addEventListener('click', () => {
                    this.percent();
                });
            } else if (button.classList.contains('decimal')){
                button.addEventListener('click', () => {
                    this.decimal(button);
                });
            } else if (button.classList.contains('clear')){
                button.addEventListener('click', () => {
                    this.clear(button);
                });
            } else {
                button.addEventListener('click', () => {
                    this.equals();
                });
            }    
        });
    }
    number(button){
        // needs to be set for each how labourious
        this.clearButton.innerText = "C";

        // disable other buttons until a number is inputted
        this.operatorButtons.forEach(button => {
            button.classList.remove('disabled');
        });
        this.percentButton.classList.remove('disabled');
        this.changeButton.classList.remove('disabled');

        if(this.operator === false){

            // if no operator has been selected add to num1 string
            this.num1 += button.innerText;
            this.equation.innerText += button.innerText;

            // disable equals button as num2 = empty string
            this.equalsButton.classList.add('disabled');

        } else {

            // if operator has been selected add to num2 string
            this.num2 += button.innerText;
            this.equation.innerText += button.innerText;

            // enable equals button now!
            this.equalsButton.classList.remove('disabled');

        }
    }
    operatorButton(button){

        // disable other buttons until a number is inputted
        this.operatorButtons.forEach(button => {
            button.classList.add('disabled');
        });
        this.percentButton.classList.add('disabled');
        this.changeButton.classList.add('disabled');

        if(this.operator === false){

            // catch for percentages
            if(this.equation.innerText.includes('%')){
                this.equation.innerText = this.answer.innerText;
            }

            // assign the operating function
            this.assignment(button);

            // disable equals button as num2 = empty string
            this.equalsButton.classList.add('disabled');

        } else {

            // call the calculate function on the previous operator
            const answer = this.calculate(this.operation);
            this.answer.innerText = answer(this.num1)(this.num2);

            // set the equation and num1 to this new value and wipe num2
            this.equation.innerText = this.answer.innerText;
            this.num1 = this.answer.innerText;
            this.num2 = "";

            // flip operator as it will be flipped again in this.assignment() call
            this.operator = !this.operator;
            
            // disable equals button as num2 = empty string
            this.equalsButton.classList.add('disabled');
            
            // assign operating function
            this.assignment(button);

        }
    }
    signChange(){
        // needs to be set for each how labourious
        this.clearButton.innerText = "C";

        if(this.operator === false){
            this.num1 = parseFloat(this.num1)*-1;
            this.equation.innerText = this.num1;
        } else {
            // this isn't very nice but works flips num2's value
            if (parseFloat(this.num2) > 0){
                const eqPart1 = this.equation.innerText.slice(0, this.num1.length +1);
                this.num2 = parseFloat(this.num2)*-1;
                this.equation.innerText = `${eqPart1}${this.num2}`;
            } else {
                const eqPart1 = this.equation.innerText.slice(0, this.num1.length +1);
                this.num2 = parseFloat(this.num2)*-1;
                this.equation.innerText = `${eqPart1}${this.num2}`;
            }
        }
    }
    percent(){

        if(this.operator === false){
            this.answer.innerText = parseFloat(this.num1)/100;
            this.equation.innerText += '%';
            this.num1 = this.answer.innerText;

        } else {
            // call the calculate function on the previous operator then /100
            const answer = this.calculate(this.operation);
            this.answer.innerText = answer(this.num1)(this.num2);

            // set the equation and num1 to this new value and wipe num2
            this.equation.innerText = this.answer.innerText;
            this.num1 = this.answer.innerText;
            this.num2 = "";

            // flip operator as it will be flipped again in this.assignment() call
            this.operator = !this.operator;
            
            // disable equals button as num2 = empty string
            this.equalsButton.classList.add('disabled');

            // now divide by 100
            this.answer.innerText = parseFloat(this.num1)/100;
            this.equation.innerText += '%';
            this.num1 = this.answer.innerText;
        }
    }
    decimal(button){
        // needs to be set for each how labourious
        this.clearButton.innerText = "C";

        if(this.operator === false){
            if(this.num1.length){
                this.num1 += button.innerText;
                this.equation.innerText += button.innerText;
                button.classList.add('disabled');
            } else {
                this.num1 += '0.';
                this.equation.innerText += '0.';
                button.classList.add('disabled');
            }

        } else {
            if(this.num2.length){
                this.num2 += button.innerText;
                this.equation.innerText += button.innerText;
                button.classList.add('disabled');
            } else {
                this.num2 += '0.';
                this.equation.innerText += '0.';
                button.classList.add('disabled');
            }
        }
    }
    clear(button){
        // disable other buttons until a number is inputted
        this.operatorButtons.forEach(button => {
            button.classList.add('disabled');
        });
        this.percentButton.classList.add('disabled');
        this.changeButton.classList.add('disabled');
        this.decimalButton.classList.remove('disabled');

        this.answer.innerText = "";
        this.equation.innerText = "";
        this.num1 = "";
        this.num2 = "";
        button.innerText = "AC";

        this.operator = false;
    }
    equals(){
        // run calculation
        const answer = this.calculate(this.operation);
        this.answer.innerText = answer(this.num1)(this.num2);
        this.equation.innerText = this.answer.innerText;
        this.num1 = this.answer.innerText;
        this.num2 = "";

        this.operator = false;

        // catch for decimal use - if answer has decimal disallow
        if(this.num1.includes('.')){
            this.decimalButton.classList.add('disabled');
        } else {
            this.decimalButton.classList.remove('disabled');
        }
        
    }
    assignment(operator){
        if (operator.classList.contains('divide')){
            this.operation = this.divide;
            this.equation.innerText += '/';
        } else if (operator.classList.contains('multiply')){
            this.operation = this.multiply;
            this.equation.innerText += '*';
        } else if (operator.classList.contains('minus')){
            this.operation = this.minus;
            this.equation.innerText += '-';
        } else {
            this.operation = this.sum;
            this.equation.innerText += '+';
        }
        this.operator = !this.operator;

        // enable decimal button again
        this.decimalButton.classList.remove('disabled');
    }
    calculate(operation){
        // curry function
        return function (num1) {
            return function (num2) {
                return operation(num1, num2);
            };
        };
    }
    sum(num1, num2){
        return parseFloat(num1) + parseFloat(num2);
    }
    minus(num1, num2){
        return parseFloat(num1) - parseFloat(num2);
    }
    multiply(num1, num2){
        return parseFloat(num1) * parseFloat(num2);
    }
    divide(num1, num2){
        return parseFloat(num1) / parseFloat(num2);
    }
}

const calculator = new Calculator();
calculator.init();





