import Scanner
import Parser
import Expr
import Interpreter

class Interpreter:
    def __init__(self, lang):
        self.lang = lang

    def interpret(self, statements):
        try:
            for statement in statements:
                value = self.execute(statement)
            return value
        except RuntimeError as error:
            raise RuntimeError(error, str(error))

    def evaluate(self, expr):
        return expr.accept(self)

    def execute(self, stmt):
        if stmt != None:
            return stmt.accept(self)

    def visitExpression(self, stmt):
        return self.evaluate(stmt.expression)

    def visitLiteral(self, expr):
        if self.lang == "python":
            if expr.value == "false" or expr.value == "true":
                return expr.value.capitalize()
        return expr.value


    def visitFor(self, stmt):
        if self.lang == "python":
            print('for i in range({}, {}, {}): '.format(stmt.setup.statements[0].value, stmt.setup.statements[1].right, stmt.setup.statements[2].value.right))
        elif self.lang == "java":
            print('for (int i = {}; {}; {}) {{}}'.format(stmt.setup.statements[0].value, stmt.setup.statements[1], stmt.setup.statements[2]))

    def visitIf(self, stmt):
        if self.lang == "python":
            print(stmt, ":", sep="")
        else:
            print(stmt, "{}", sep="")

    def visitAssign(self, expr):
        if self.lang == "python":
            print(expr)
        elif self.lang == "java":
            print(expr, ";", sep = "")

    def visitVariable(self, expr):
        print(expr, end = "")

    def visitBinary(self, expr):
        print(expr)

    def visitWhile(self, expr):
        print(expr,"{}")

    def visitFunction(self, expr):
        if self.lang == "java":
            string = "{} {} {}(".format(expr.visibility, expr.retn, expr.name)
            for i in expr.params:
                string += i.type.__str__() + " " + i.name.__str__() + ", "
            if len(expr.params) > 0:
                string = string[:-2]
            string += ") {}"
            print(string)
        if self.lang == "python":
            string = "def {}(".format(expr.name)
            for i in expr.params:
                string += i.name.__str__() + ", "
            if len(expr.params) > 0:
                string = string[:-2]
            string += "):"
            print(string)

    def visitReturn(self,expr):
        if self.lang == "java":
            print(expr,";",sep="")
        elif self.lang == "python":
            print(expr)

    def visitCall(self, expr):
        string = expr.name.__str__() + "("
        for i in expr.arguments:
            string += i.__str__()
        string += ")"
        if self.lang == "python":
            return string
        elif self.lang == "java":
            return string+";";

    def visitPrint(self, stmt):
        value = self.evaluate(stmt.expression)
        if self.lang == "java":
            if str(value)[-1] == ";":
                value = str(value)[:-1]
            print("System.out.Println({})".format(value))
        else:
            print("print({})".format(value))





