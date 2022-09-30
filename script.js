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
		}
		else this.numbers[this.pointer] += "" + symb;

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

		});
	}
}

let controller = new Controller();
let interface = new Interface();
interface.listen(controller);

