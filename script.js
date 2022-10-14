class Calculator{
	constructor(){}
	sum(a, b){
		return +a + +b;
	}
	substract(a, b){
		return +a - +b;
	}
	multiply(a, b){
		return +a * +b;
	}
	divide(a, b){
		if(b == 0){
			alert("Division by zero error!");
			return 0;
		}
		return +a / +b;
	}
}

class Controller{
	constructor(){
		this.numbers = [0, 0];
		this.action = "";
		this.pointer = 0;
		this.fraction = false;
		this.result = 0;
		this.secondNumberIsZero = 0;
	}
	getOutput(){
		if(this.result) return this.result;

		let [a, b] = this.numbers;
		if(this.action == ""){
			return a + "";
		}else if(b === 0 && !this.secondNumberIsZero){
			return a + " " + this.action;
		}else 
			return a + " " + this.action + " " + b;
	}
	calculate(){
		switch(this.action){
		case "+":
			return (new Calculator).sum(...this.numbers);
		case "-":
			return (new Calculator).substract(...this.numbers);
		case "*":
			return (new Calculator).multiply(...this.numbers);
		case "/":
			return (new Calculator).divide(...this.numbers);
		}
	}
	changeNumber(symb){
		let number = this.numbers[this.pointer];

		if(symb == "0" && this.pointer == 1) this.secondNumberIsZero = true;
		// if(typeof(number) == 'string') this.numbers[this.pointer] += "" + symb;
		// if(symb != "0") this.numbers[this.pointer] = +this.numbers[this.pointer];
		if(symb == "0"){
			if(typeof(number) == 'string') this.numbers[this.pointer] += "" + symb;
			else if(this.numbers[this.pointer] !== 0) this.numbers[this.pointer] += "" + symb;
		}
		else{
			this.numbers[this.pointer] += "" + symb;
		} 

		if(symb != '0') this.numbers[this.pointer] = +this.numbers[this.pointer];
	}
	processingServiceSymbols(symb){
		switch(symb){
		case "+":
		case "-":
		case "*":
		case "/":
			if(this.result){
				this.numbers[0] = this.result;
				this.result = 0;
			}
			if(this.fraction && this.pointer == 0) this.fraction = false;

			this.action = symb;
			this.pointer = 1;

			this.numbers[0] = +this.numbers[0];
			break;
		case "clear":
			this.numbers = [0, 0];
			this.action = "";
			this.pointer = 0;
			this.fraction = false;
			this.result = 0;
			this.secondNumberIsZero = false;
			break;
		case "signChange":
			if(this.result){
				this.numbers[0] = this.result;
				this.result = 0;
			}
			this.numbers[this.pointer] *= -1;
			break;
		case "point":
			let number = this.numbers[this.pointer];
			if(Math.floor(number) == number){
				this.fraction = !this.fraction;
				if(this.fraction){
					this.numbers[this.pointer] += ".";
				}else{
					this.numbers[this.pointer] = +number;
				}
			}
			break;
		case "equality":
			if(this.action != ""){
				this.result = this.calculate();

				this.numbers = [0, 0];
				this.action = "";
				this.pointer = 0;
				this.fraction = false;
				this.secondNumberIsZero = false;
			} 
			break;
		}
	}
	setSymbol(type, symb){
		
		switch(type){
		case "number":
			this.result = 0;
			this.changeNumber(symb);
			break;
		case "stuff":
			this.processingServiceSymbols(symb);
			break;
		}
	}
}

class Interface{
	constructor(){
		this.numbers = document.getElementsByClassName("number");
		this.staff = document.getElementsByClassName("staff");
		this.input = document.querySelector("input");
	}
	listen(controller){
		for(let item of this.numbers){
			item.onclick = () => {
				controller.setSymbol("number", item.id);
				this.input.value = controller.getOutput();
			}
		}

		for(let item of this.staff){
			item.onclick = () => {
				controller.setSymbol("stuff", item.id);
				this.input.value = controller.getOutput();
			}
		}

		addEventListener('keypress', (event) => {
			//event.stopPropagation();
			//event.preventDefault();
			switch(event.key){
			case "0": case "1":
			case "2": case "3":
			case "4": case "5":
			case "6": case "7":
			case "8": case "9":
				controller.setSymbol("number", event.key);
				this.input.value = controller.getOutput();
				break;
			case "c": case "C":
				controller.setSymbol("stuff", "clear");
				this.input.value = controller.getOutput();
				break;
			case "+": case "-":
			case "*": case "/":
				controller.setSymbol("stuff", event.key);
				this.input.value = controller.getOutput();
				break;
			case " ":
				controller.setSymbol("stuff", "signChange");
				this.input.value = controller.getOutput();
				break;
			case ".":
				controller.setSymbol("stuff", "point");
				this.input.value = controller.getOutput();
				break;
			case "Enter":
				controller.setSymbol("stuff", "equality");
				this.input.value = controller.getOutput();
				break;
			}
			for(let item of this.numbers){
				item.blur();
			}
	
			for(let item of this.staff){
				item.blur();
			}
		});
	}
}

let controller = new Controller();
let interface = new Interface();
interface.listen(controller);

let input = (markup) => {
	let controller = new Controller();

	for(let i = 0; i < markup.length; i++){
		switch(markup[i]){
			case "0": case "1":
			case "2": case "3":
			case "4": case "5":
			case "6": case "7":
			case "8": case "9":
				controller.setSymbol("number", markup[i]);
				break;
			case "c":
				controller.setSymbol("stuff", "clear");
				break;
			case "+": case "-":
			case "*": case "/":
				controller.setSymbol("stuff", markup[i]);
				break;
			case "s":
				controller.setSymbol("stuff", "signChange");
				break;
			case ".":
				controller.setSymbol("stuff", "point");
				break;
			case "=":
				controller.setSymbol("stuff", "equality");
				break;
		}
	}

	return controller;
}

let compare = (a, b) => {
	if(typeof(a) != typeof(b)) return false;
	if(typeof(a) == 'number'){
		a *= 1000000;
		b *= 1000000;
		return (Math.round(a) == Math.round(b));
	}
	else return a === b;
}

let testCalculate = (markup, result) => {
	let controller = input(markup);

	if(compare( controller.result, result)){
		console.log("success", markup, result);
	}
	else console.log("FAILED", markup, result, controller);
}

let testInput = (markup, num, action) => {
	let [a, b] = num;
	let controller = input(markup);
	

	let [n1, n2] = controller.numbers;
	if(a === n1 && b === n2 && action === controller.action){
		console.log("success", markup, num, action);
	}else{
		console.log("FAILED", controller, markup, num, action);
	}
}

/*testInput("1200.12s-.0002", [-1200.12, 0.0002], "-");
testInput("......12+.0000", [12, "0.0000"], "+");
testInput("12.2+.....000012", [12.2, 0.000012], "+");
testInput("0000012.002+00000012.3", [12.002, 12.3], "+");
testInput("12c.02-12.1", [0.02, 12.1], "-");
testInput("12.1+0.1c2.2+2", [2.2, 2], "+");
testInput("12.2+0.2sss", [12.2, -0.2], "+");

testCalculate("12.1s+12.2=", 0.1);
testCalculate(".1+.2=", 0.3);
testCalculate(".0000+.0000", 0);
testCalculate("12.1-1s2.2=", 24.3);
testCalculate("12/0=", 0);
testCalculate("21/3=", 7);
testCalculate("12.1*2s=", -24.2);
testCalculate("12.1*0.00000=", 0);*/
