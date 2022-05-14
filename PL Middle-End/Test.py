import Scanner
import Parser
import Expr
import Interpreter

scanned = Scanner.Scanner("create a for loop from 2 to 4 with decrement 1").scanTokens()
# for i in scanned:
#     print(i)

parsed = Parser.Parser(scanned).parse()
# for i in parsed[0].setup.statements:
#     print(i)

Interpreter.Interpreter('java').interpret(parsed)



