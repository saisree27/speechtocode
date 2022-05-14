import Scanner
import Parser
import Expr
import Interpreter
language = 'python'
# statements = ["create a public function prime returning int with 1 parameter int x", "create a for loop from 1 to x with increment 1", "if x mod i equals to 0", "return false", "return true", "print call function prime with parameter 10"]
# statements = ["create a public function factorial returning int with 1 parameter int x", "assign y to 1", "create a for loop from 1 to x with increment 1", "assign y to y times i", "return y"]
# statements = ["create a public function death returning int with 0 parameters", "create a while loop with condition true", "print 1"]
# statements = ["create a public function multiple returning int with 2 parameters int x int y", "return x times y"]
for i in statements:
    scanned = Scanner.Scanner(i, language).scanTokens()
    # for i in scanned:
    #     print(i)

    parsed = Parser.Parser(scanned, language).parse()
    # for j in parsed:
    #     print(j)

    Interpreter.Interpreter(language).interpret(parsed)




