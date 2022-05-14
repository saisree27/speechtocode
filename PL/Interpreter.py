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
            string = 'for i in range({}, {}, {}): '.format(stmt.setup.statements[0].value, stmt.setup.statements[1].right, stmt.setup.statements[2].value.right)
        elif self.lang == "java":
            string = 'for (int i = {}; {}; {}) {{}} '.format(stmt.setup.statements[0].value, stmt.setup.statements[1], stmt.setup.statements[2])
        print(string)
        return string

    def visitIf(self, stmt):
        if self.lang == "python":
            string = stmt.__str__() + ": "
            print(string)
            return string
        else:
            string = stmt.__str__() + "{} "
            print(string)
            return string

    def visitAssign(self, expr):
        if self.lang == "python":
            return expr.__str__() + ""
        elif self.lang == "java":
            return expr.__str__() + "; "

    def visitVariable(self, expr):
        string = expr.__str__() + ""
        return string

    def visitBinary(self, expr):
        string = expr.__str__() + ""
        return string

    def visitWhile(self, expr):
        string = expr.__str__() + "{} "
        return string

    def visitFunction(self, expr):
        if self.lang == "java":
            string = "{} {} {}(".format(expr.visibility, expr.retn, expr.name)
            for i in expr.params:
                string += i.type.__str__() + " " + i.name.__str__() + ", "
            if len(expr.params) > 0:
                string = string[:-2]
            string += ") {}"
            print(string)
            return string
        if self.lang == "python":
            string = "def {}(".format(expr.name)
            for i in expr.params:
                string += i.name.__str__() + ", "
            if len(expr.params) > 0:
                string = string[:-2]
            string += "):"
            print(string)
            return string

    def visitReturn(self,expr):
        if self.lang == "java":
            print(expr.__str__() + "; ")
            return expr.__str__() + "; "
        elif self.lang == "python":
            print(expr.__str__() + "")
            return expr.__str__() + ""

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
            return "System.out.Println({})".format(value) + ""
        else:
            return "print({})".format(value) + "\n"





