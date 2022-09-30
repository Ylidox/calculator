#include <cstdio>
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class ICalculator {
protected:
	double number1 = 0;
	double number2 = 0;
	string action = "";
	double result = 0;
public:
	virtual double get_number1() = 0;
	virtual double get_number2() = 0;
	virtual string get_action() = 0;
	virtual double get_result() = 0;

	virtual void set_number1(double num) = 0;
	virtual void set_number2(double num) = 0;
	virtual void set_action(string action) = 0;
	virtual void set_result(double num) = 0;

	virtual void calculate() = 0;
};

class Calculator : public ICalculator {
protected:
	double number1 = 0;
	double number2 = 0;
	string action = "";
	double result = 0;
public:
	Calculator() {}
	double get_number1() { return number1; }
	double get_number2() { return number2; }
	string get_action() { return action; }
	double get_result() { return result; }

	void set_number1(double num) {
		number1 = num;
	}
	void set_number2(double num) {
		number2 = num;
	}
	void set_action(string action) {
		this->action = action;
	}
	void set_result(double num) {
		result = num;
	}

	void calculate() {
		switch (action[0]) {
		case '+':
			set_result(get_number1() + get_number2());
			break;
		case '-':
			set_result(get_number1() - get_number2());
			break;
		case '*':
			set_result(get_number1() * get_number2());
			break;
		case '/':
			if (get_number2() == 0) {
				cout << "Zero division error!" << endl;
				set_result(0);
				break;
			}
			set_result(get_number1() / get_number2());
			break;
		}
	}
};

class IController {
private:
	Calculator calculator;
public:
	virtual double inputNumber() = 0;
	virtual string inputAction() = 0;
	virtual double get_result() = 0;
	virtual string print() = 0;
	virtual void main() = 0;
};

class Controller : public IController {
private:
	Calculator calculator;
public:
	double inputNumber() {
		double n;
		bool flag = true;
		while (flag) {
			cin >> n;
			if (!cin)
			{
				cout << "Error! Repeat input" << endl;
				cin.clear();
				cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
			}
			else {
				flag = false;
			}
		}
		return n;
	}
	string inputAction() {
		string action;
		while (true) {
			cin >> action;
			if (action == "+" || action == "-" || action == "*" || action == "/") break;
			cout << "Error entering an action! Repeat input " << endl;
		}
		return action;
	}

	double get_result() {
		return calculator.get_result();
	}
	string print() {
		return to_string(calculator.get_number1()) + " " +
			calculator.get_action() + " " +
			to_string(calculator.get_number2()) +
			" = " + to_string(get_result());
	}

	void main() {
		while (true) {
			cout << "Input the first number: ";
			double num = inputNumber();
			calculator.set_number1(num);

			cout << "Input action: ";
			string action = inputAction();
			calculator.set_action(action);

			cout << "Input the second number: ";
			num = inputNumber();
			calculator.set_number2(num);

			calculator.calculate();

			cout << print() << endl;

			cout << "Exit(y/n): ";
			string end;
			cin >> end;
			if (end == "y") break;
		}
	}
};

void testSetNumber1(double num) {
	Calculator c;
	c.set_number1(num);
	if (c.get_number1() == num) cout << "Number1 set test: success" << endl;
	else cout << "Number1 set test: !failed" << endl;
}
void testSetNumber2(double num) {
	Calculator c;
	c.set_number2(num);
	if (c.get_number2() == num) cout << "Number2 set test: success" << endl;
	else cout << "Number2 set test: !failed" << endl;
}
void testSetAction(string action) {
	Calculator c;
	c.set_action(action);
	if (c.get_action() == action) cout << "Action set test: success" << endl;
	else cout << "Action set test: !failed" << endl;
}

bool compare(double a, double b) {
	a = round( a * 1000000);
	b = round( b * 1000000);
	return a == b;
}

void testCalculate(double num1, double num2, string action, double result) {
	Calculator c;
	c.set_number1(num1);
	c.set_number2(num2);
	c.set_action(action);

	c.calculate();

	if (compare(c.get_result(), result)) {
		cout << "Calculate test: success" << endl;
	}
	else {
		cout << endl;
		cout << "Calculate test: !failed" << endl;
		cout << c.get_number1() << " " << c.get_action() << " " << c.get_number2() << " = " << c.get_result() << endl;
		cout << result << endl;
		cout << endl;
	}
}

void testInputNumber() {
	Controller c;
	double num = c.inputNumber();
	cout << "Input: " << num << endl;
}
void testInputAction() {
	Controller c;
	string action = c.inputAction();
	cout << "Input: " << action << endl;
}


int main() {
	Controller controller;
	controller.main();

	/*testSetNumber1(10.12);
	testSetNumber1(-0.13);
	testSetNumber2(10.12);
	testSetNumber2(-0.13);

	testSetAction("+");
	testSetAction("-");
	testSetAction("*");
	testSetAction("/");

	testCalculate(10, 10, "+", 20);
	testCalculate(-10.15, 10, "+", -0.15);
	testCalculate(10.15, -10.20, "+", -0.05);

	testCalculate(10, 10, "-", 0);
	testCalculate(-10.15, 10, "-", -20.15);
	testCalculate(10.15, -10.20, "-", 20.35);

	testCalculate(10, 10, "/", 1);
	testCalculate(-10.15, 0, "/", 0);
	testCalculate(30.15, -3, "/", -10.05);

	testCalculate(10, 10, "*", 100);
	testCalculate(-10.15, 10, "*", -101.5);
	testCalculate(10.5, -10.0, "*", -105);

	testInputNumber();
	testInputAction();*/
}