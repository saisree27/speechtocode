import Scanner
import Token
import Expr

class Stmt:
    pass


class Block(Stmt):
    def __init__(self, statements):
        assert isinstance(statements, list)

        self.statements = statements

    def accept(self, visitor):
        return visitor.visitBlock(self)

    def __str__(self):
        return str(self.statements)


class Expression(Stmt):
    def __init__(self, expression):
        assert isinstance(expression, Expr.Expr)

        self.expression = expression

    def accept(self, visitor):
        return visitor.visitExpression(self)

    def __str__(self):
        return str(self.expression)


class Function(Stmt):
    def __init__(self, name, params, body, retn, visibility):
        assert isinstance(name, Token.Token)
        assert isinstance(params, list)
        assert isinstance(body, list)
        assert isinstance(retn, object)
        assert isinstance(visibility, Token.Token)

        self.name = name
        self.params = params
        self.body = body
        self.retn = retn
        self.visibility = visibility


    def accept(self, visitor):
        return visitor.visitFunction(self)

    def __str__(self):
        return str(self.name) + " " + str(self.params) + " " + str(self.body)


class If(Stmt):
    def __init__(self, condition, thenBranch, elseBranch):
        assert isinstance(condition, Expr.Expr)
        assert isinstance(thenBranch, Stmt)
        assert isinstance(elseBranch, Stmt)

        self.condition = condition
        self.thenBranch = thenBranch
        self.elseBranch = elseBranch

    def accept(self, visitor):
        return visitor.visitIf(self)

    def __str__(self):
        return "if (" + str(self.condition) + ")"


class Print(Stmt):
    def __init__(self, expression):
        assert isinstance(expression, Expr.Expr)

        self.expression = expression

    def accept(self, visitor):
        return visitor.visitPrint(self)

    def __str__(self):
        return str(self.expression)


class Return(Stmt):
    def __init__(self, keyword, value):
        assert isinstance(keyword, Token.Token)
        assert isinstance(value, Expr.Expr)

        self.keyword = keyword
        self.value = value

    def accept(self, visitor):
        return visitor.visitReturn(self)

    def __str__(self):
        return str(self.keyword) + " " + str(self.value)


class Var(Stmt):
    def __init__(self, name, initializer):
        assert isinstance(name, Token.Token)
        assert isinstance(initializer, Expr.Expr)

        self.name = name
        self.initializer = initializer

    def accept(self, visitor):
        return visitor.visitVar(self)

    def __str__(self):
        return str(self.name) + " " + str(self.initializer)


class While(Stmt):
    def __init__(self, condition, body):
        assert isinstance(condition, Expr.Expr)
        assert isinstance(body, Stmt)

        self.condition = condition
        self.body = body

    def accept(self, visitor):
        return visitor.visitWhile(self)

    def __str__(self):
        return "while (" + str(self.condition) + ")"


class For(Stmt):
    def __init__(self, setup, body):
        assert isinstance(setup, Stmt)
        assert isinstance(body, Stmt)

        self.setup = setup
        self.body = body

    def accept(self, visitor):
        return visitor.visitFor(self)

    def __str__(self):
        return str(self.setup) + " " + str(self.body)

