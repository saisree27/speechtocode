import Scanner
import Token

class Expr:
    pass


class Assign(Expr):
    def __init__(self, variable, value):
        assert isinstance(variable, Expr)
        assert isinstance(value, Expr)

        self.variable = variable
        self.value = value

    def accept(self, visitor):
        return visitor.visitAssign(self)

    def __str__(self):
        return str(self.variable) + " = " + str(self.value)


class Chain(Expr):
    def __init__(self, left, right):
        assert isinstance(left, Expr)
        assert isinstance(right, Expr)

        self.left = left
        self.right = right

    def accept(self, visitor):
        return visitor.visitChain(self)

    def __str__(self):
        return str(self.left) + " " + str(self.right)


class Unary(Expr):
    def __init__(self, operator, right):
        assert isinstance(operator, Token.Token)
        assert isinstance(right, Expr)

        self.operator = operator
        self.right = right

    def accept(self, visitor):
        return visitor.visitUnary(self)

    def __str__(self):
        return str(self.operator) + " " + str(self.right)


class Binary(Expr):
    def __init__(self, left, operator, right):
        assert isinstance(left, Expr)
        assert isinstance(operator, Token.Token)
        assert isinstance(right, Expr)

        self.left = left
        self.operator = operator
        self.right = right

    def accept(self, visitor):
        return visitor.visitBinary(self)

    def __str__(self):
        return str(self.left) + " " + str(self.operator) + " " + str(self.right)


class Logical(Expr):
    def __init__(self, left, operator, right):
        assert isinstance(left, Expr)
        assert isinstance(operator, Token.Token)
        assert isinstance(right, Expr)

        self.left = left
        self.operator = operator
        self.right = right

    def accept(self, visitor):
        return visitor.visitLogical(self)

    def __str__(self):
        return str(self.left) + " " + str(self.operator) + " " + str(self.right)


class Grouping(Expr):
    def __init__(self, expression):
        assert isinstance(expression, Expr)

        self.expression = expression

    def accept(self, visitor):
        return visitor.visitGrouping(self)

    def __str__(self):
        return str(self.expression)


class Literal(Expr):
    def __init__(self, value):
        assert isinstance(value, object)

        self.value = value

    def accept(self, visitor):
        return visitor.visitLiteral(self)

    def __str__(self):
        return str(self.value)


class Variable(Expr):
    def __init__(self, name, type = None):

        self.name = name
        self.type = type

    def accept(self, visitor):
        return visitor.visitVariable(self)

    def __str__(self):
        if self.type != None:
            return str(self.type) + " " + str(self.name)
        else:
            return str(self.name)


class Call(Expr):
    def __init__(self, callee, parent, arguments):
        assert isinstance(callee, Expr)
        assert isinstance(parent, Token.Token)
        assert isinstance(arguments, list)

        self.callee = callee
        self.parent = parent
        self.arguments = arguments

    def accept(self, visitor):
        return visitor.visitCall(self)

    def __str__(self):
        return str(self.callee) + " " + str(self.parent) + " " + str(self.arguments)

