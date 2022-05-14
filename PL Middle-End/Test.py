import Scanner
import Parser
import Expr
import Interpreter

statements = ["assign int x to 10", "assign bool y to true", "create a for loop from 1 to x with increment 1", "if i mod x equals to 0", "assign y to false"]
for i in statements:
    scanned = Scanner.Scanner(i).scanTokens()
    # for i in scanned:
    #     print(i)

    parsed = Parser.Parser(scanned).parse()
    # for i in parsed:
    #     print(i)

    Interpreter.Interpreter('java').interpret(parsed)




