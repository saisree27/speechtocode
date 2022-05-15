import Scanner
import Parser
import Interpreter
language = 'java'
# statements = ["create a public type function called prime returning an int with 2 parameters of type int called x and type float called y", "create a for loop from 1 to x incrementing by 1", "if x mod i equals to 0", "return false", "return true", "print a call to function prime with parameter 10"]
# statements = ["create a public function factorial returning int with 1 parameter int x", "assign y to 1", "create a for loop from 1 to x with increment 1", "assign y to y times i", "return y"]
statements = ["create a public function death returning int with 0 parameters", "create a while loop with condition that x is greater than equals to 1", "print 1", "if x equals to 1", "print a call to a function called prime with a parameter of value 10", "create a public function factorial returning int with 1 parameter int x"]
statements = ["create a public function factorial returning int with 1 parameter of type int called number", "assign y to 1", "create a for loop from 1 to x with increment 1", "assign y to y times i", "return y"]
# statements = ["create a public function death returning int with 0 parameters", "create a while loop with condition that x is greater than equals to 1", "print 1", "if x equals to 1", "print a call to a function called prime with a parameter of value 10"]
# statements = ["create a public function multiple returning int with 2 parameters int x int y", "return x times y"]
for i in statements:
    scanned = Scanner.Scanner(i, language).scanTokens()
    for i in scanned:
        print(i)

    parsed = Parser.Parser(scanned, language).parse()
    # for j in parsed:
    #     print(j)

    Interpreter.Interpreter(language).interpret(parsed)




