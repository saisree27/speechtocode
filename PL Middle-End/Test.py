import Scanner
import Parser
import Expr
import Interpreter
language = 'java'
# statements = ["assign int x to 10", "assign boolean y to true", "create a for loop from 1 to x with increment 1", "if i mod x equals to 0", "assign y to false", "if x mod 2 equals 0 and y equals true", "create a while loop with condition x lesser than 2", "create a public function of int return with 2 params int x, int y"]
statements = ["create a public function of returning int with 2 params int x int z "]
for i in statements:
    scanned = Scanner.Scanner(i, language).scanTokens()
    for i in scanned:
        print(i)

    parsed = Parser.Parser(scanned).parse()
    # for j in parsed:
    #     print(j)

    Interpreter.Interpreter(language).interpret(parsed)




