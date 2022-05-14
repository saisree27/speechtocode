import Scanner
import Parser
import Expr
import Interpreter
language = 'java'
statements = ["create a public function isprime of returning int with 1 parameter int x", "create a for loop from 1 to x with increment 1", "if x mod i equals to 0", "return false", "return true"]
# statements = ["create a while loop with condition x lesser than 2", "create a public function of int return with 2 params int x int y", "create a public function bruh of returning int with 2 params int x float z", "if x mod 2 equals 0 and y equals true"]
for i in statements:
    scanned = Scanner.Scanner(i, language).scanTokens()
    # for i in scanned:
    #     print(i)

    parsed = Parser.Parser(scanned).parse()
    # for j in parsed:
    #     print(j)

    Interpreter.Interpreter(language).interpret(parsed)




