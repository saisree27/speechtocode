import Scanner
import Parser
import Expr
import Interpreter

scanned = Scanner.Scanner("if y lesser than 2").scanTokens()
for i in scanned:
    print(i)

parsed = Parser.Parser(scanned).parse()
for i in parsed:
    print(i)

Interpreter.Interpreter('java').interpret(parsed)




