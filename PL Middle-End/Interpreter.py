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
        return expr.value


    def visitFor(self, stmt):
        if self.lang == "python":
            print('for i in range({}, {}, {})'.format(stmt.setup.statements[0].value, stmt.setup.statements[1].right, stmt.setup.statements[2].value.right))
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
            if type(expr.value) == bool:
                print(expr.variable, ";", sep = "")
            print(expr, ";", sep = "")

    def visitVariable(self, expr):
        print(expr, end = "")

    def visitBinary(self, expr):
        print(expr)

    def visitWhile(self, expr):
        print(expr,"{}")





