class Interpreter:
    def __init__(self, lang):
        self.lang = lang
        self.done = False

    def interpret(self, statements):
        try:
            for statement in statements:
                if not self.done:
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
        string = "default"

        if self.lang == "python":
            string = 'for i in range({}, {}, {}):'.format(stmt.setup.statements[0].value, stmt.setup.statements[1].right, stmt.setup.statements[2].value.right)
        elif self.lang == "java":
            string = 'for (int i = {}; {}; {}) {{}}'.format(stmt.setup.statements[0].value, stmt.setup.statements[1], stmt.setup.statements[2])
        elif self.lang == "javascript":
            string = 'for (var i = {}; {}; {}) {{}}'.format(stmt.setup.statements[0].value, stmt.setup.statements[1], stmt.setup.statements[2])

        self.done = True
        print(string)
        return string

    def visitIf(self, stmt):
        if self.lang == "python":
            string = "if " + stmt.__str__() + ":"
            print(string)
            return string
        else:
            # both java and javascript have same syntax
            string = "if (" + stmt.__str__() + ") {}"
            print(string)
            return string

    def visitAssign(self, expr):
        if self.lang == "python":
            return expr.variable.name.__str__() + " = " + str(expr.value)
        elif self.lang == "java":
            return expr.__str__() + ";"
        elif self.lang == "javascript":
            return "var " + expr.variable.name.__str__() + " = " + str(expr.value)

    def visitVariable(self, expr):
        string = expr.__str__()
        return string

    def visitBinary(self, expr):
        string = self.evaluate(expr.left)
        if string[-1] == ";":
            string = string[:-1]
        string += expr.operator.__str__() + self.evaluate(expr.right)
        return string

    def visitWhile(self, stmt):
        string = None
        if self.lang == "java" or self.lang == "javascript":
            string ="while (" + stmt.__str__() + ") {}"
        if self.lang == "python":
            string = "while " + stmt.__str__() + ":"
        print(string)
        return string

    def visitFunction(self, expr):
        if self.lang == "java":
            string = "{} static {} {}(".format(expr.visibility, expr.retn, expr.name)
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
        if self.lang == "javascript":
            string = "function {}(".format(expr.name)
            for i in expr.params:
                string += i.name.__str__() + ", "
            if len(expr.params) > 0:
                string = string[:-2]
            string += ") {}"
            print(string)
            return string

    def visitReturn(self, stmt):
        string = None
        if self.lang == "java" or self.lang == "javascript":
            value = self.evaluate(stmt.value)
            if value.__str__()[-1]==";":
                string = "return " + value.__str__()[:-1] + ";"
            else:
                string = "return " + value.__str__() + ";"
            print(string)
            return string
        elif self.lang == "python":
            value = self.evaluate(stmt.value)
            string = "return " + value.__str__()
            print(string)
            return string

    def visitCall(self, expr):
        string = expr.name.__str__() + "("
        for i in expr.arguments:
            string += i.__str__() + ", "
        string = string[:-2]
        string += ")"
        if self.lang == "python":
            return string 
        elif self.lang == "java" or self.lang == "javascript":
            return string+";";

    def visitPrint(self, stmt):
        value = self.evaluate(stmt.expression)
        if self.lang == "java":
            if str(value)[-1] == ";":
                value = str(value)[:-1]
            print("System.out.println({})".format(value) + ";")
            return "System.out.println({})".format(value) + ";"
        elif self.lang == "python":
            print("print({})".format(value))
            return "print({})".format(value)
        else:
            if str(value)[-1] == ";":
                value = str(value)[:-1]
            print("console.log({})".format(value) + ";")
            return "console.log({});".format(value)




