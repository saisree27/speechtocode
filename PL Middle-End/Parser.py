import Expr
import Stmt
from TokenTypes import TokenType
from Token import Token
import traceback
import sys
class Parser:
    def __init__(self, tokenList):
        self.current = 0
        self.tokenList = tokenList
        self.typedef = {TokenType.INT, TokenType.FLOAT, TokenType.DOUBLE, TokenType.SHORT, TokenType.LONG, TokenType.BYTE, TokenType.CHAR, TokenType.STRING, TokenType.ARRAY, TokenType.VOID, TokenType.PUBLIC, TokenType.STATIC, TokenType.PRIVATE, TokenType.BOOLEAN}

    def expression(self):
        return self.assignment()

    def parse(self) -> list:
        statements = []
        while not self.isAtEnd():
            statements.append(self.declaration())
        return statements

    def declaration(self):
        try:
            if self.match(TokenType.CLASS): return self.classDeclaration()
            if self.match(TokenType.FUN): return self.function("function")
            if self.match(TokenType.VAR): return self.varDeclaration()
            return self.statement()
        except Exception as e:
            traceback.print_exc()
            self.synchronize()
            return None


    def function(self, kind):
        name = self.consume(TokenType.IDENTIFIER, "Expect " + kind + " name.")
        self.consume(TokenType.LEFT_PAREN, "Expect '(' after " + kind + " name.")
        parameters = []
        if not self.check(TokenType.RIGHT_PAREN):
            start = True
            while start or self.match(TokenType.COMMA):
                start = False
                if len(parameters) >= 255:
                    self.error(self.peek(), "Can't have more than 255 parameters")
                parameters.append(self.consume(TokenType.IDENTIFIER, "Expect parameter name."))
        self.consume(TokenType.RIGHT_PAREN, "Expect ')' after parameters.")
        self.consume(TokenType.LEFT_BRACE, "Expect '{' before " + kind + " body.")
        body = self.block()
        return Stmt.Function(name, parameters, body)

    def classDeclaration(self):
        name = self.consume(TokenType.IDENTIFIER, "Expect class name.")
        superclass = None
        if self.match(TokenType.LESS):
            self.consume(TokenType.IDENTIFIER, "Expect class name.")
            superclass = Expr.Variable(self.previous())
        self.consume(TokenType.LEFT_BRACE, "Expect '{' before class body.")
        methods = []
        while not self.check(TokenType.RIGHT_BRACE) and not self.isAtEnd():
            methods.append(self.function("method"))
        self.consume(TokenType.RIGHT_BRACE, "Expect '}' after class body.")
        return name, superclass, methods

    def statement(self):
        if self.match(TokenType.FOR):
            return self.forStatement()
        if self.match(TokenType.IF):
            temp = self.ifStatement()
            return temp
        if self.match(TokenType.PRINT):
            return self. printStatement()
        if self.match(TokenType.RETURN):
            return self.returnStatement()
        if self.match(TokenType.WHILE):
            return self.whileStatement()
        return self.expressionStatement()

    def expressionStatement(self):
        expr = self.expression()
        return Stmt.Expression(expr)

    def ifStatement(self):
        condition = self.expression()
        thenBranch = Stmt.Block([])
        elseBranch = Stmt.Block([])
        return Stmt.If(condition, thenBranch, elseBranch)

    def assignment(self):
        if self.match(TokenType.EQUAL):
            type = None
            if (self.peek().type in self.typedef):
                type = self.advance()
            name = self.advance()
            variable = Expr.Variable(name, type)
            right = self.andOperator()
            return Expr.Assign(variable, right)
        else:
            return self.andOperator()

    def forStatement(self):
        if self.check(TokenType.NUM):
            initializer = Expr.Assign(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i'), "int"), Expr.Literal(self.peek().literal))
        elif self.check(TokenType.IDENTIFIER):
            initializer = Expr.Assign(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i'), "int"), Expr.Variable(self.peek()))
        self.advance()
        if self.check(TokenType.NUM):
            condition = Expr.Binary(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), Token(TokenType.LESS, '<', '<'), Expr.Literal(self.peek().literal))
        if self.check(TokenType.IDENTIFIER):
            condition = Expr.Binary(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), Token(TokenType.LESS, '<', '<'), Expr.Variable(self.peek()))
        self.advance()
        update = Expr.Assign(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), Expr.Binary(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), self.advance(), Expr.Literal(self.peek().literal)))
        block = Stmt.Block([initializer, condition, update])
        body = Stmt.Block([])
        forLoop = Stmt.For(block, body)
        return forLoop


    def whileStatement(self):
        condition = self.expression()
        body = Stmt.Block([])
        return Stmt.While(condition, body)

    def andOperator(self):
        expr = self.equality()
        while self.match(TokenType.AND):
            operator = self.previous()
            right = self.equality()
            expr = Expr.Logical(expr, operator, right)
        return expr

    def equality(self):
        expr = self.comparison()
        while self.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL):
            operator = self.previous()
            right = self.comparison()
            expr = Expr.Binary(expr, operator, right)
        return expr

    def comparison(self):
        expr = self.term()
        while self.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL):
            operator = self.previous()
            right = self.term()
            expr = Expr.Binary(expr, operator, right)

        return expr

    def term(self):
        expr = self.factor()

        while self.match(TokenType.MINUS, TokenType.PLUS, TokenType.MOD):
            operator = self.previous()
            right = self.factor()
            expr = Expr.Binary(expr, operator, right)
        return expr

    def factor(self):
        expr = self.unary()

        while self.match(TokenType.SLASH, TokenType.STAR):
            operator = self.previous()
            right = self.unary()
            expr = Expr.Binary(expr, operator, right)

        return expr

    def unary(self):
        if self.match(TokenType.BANG, TokenType.MINUS):
            operator = self.previous()
            right = self.unary()
            return Expr.Unary(operator, right)
        return self.call()

    def call(self):
        expr = self.primary()
        while True:
            if self.match(TokenType.LEFT_PAREN):
                expr = self.finishCall(expr)
            elif self.match(TokenType.DOT):
                name = self.consume(TokenType.IDENTIFIER, "Expect property name after '.'.")
                expr = Expr.Get(expr, name)
            else:
                break
        return expr

    def primary(self):
        if self.match(TokenType.FALSE):
            return Expr.Literal(False)
        if self.match(TokenType.TRUE):
            return Expr.Literal(True)
        if self.match(TokenType.NULL):
            return Expr.Literal(None)
        if self.match(TokenType.NUM, TokenType.STR):
            print()
            return Expr.Literal(self.previous().literal)

        if self.match(TokenType.SUPER):
            keyword = self.previous()
            self.consume(TokenType.DOT, "Expect '.' after 'super'.")
            method = self.consume(TokenType.IDENTIFIER, "Expect superclass method name.")
            return Expr.Super(keyword, method)

        if self.match(TokenType.THIS):
            return Expr.This(self.previous())

        if self.match(TokenType.IDENTIFIER):
            return Expr.Variable(self.previous())

        if self.match(TokenType.LEFT_PAREN):
            expr = self.expression()
            self.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.")
            return Expr.Grouping(expr)

        raise self.error(self.peek(), "Expect expression.")

    def consume(self, tokenType, message):
        if self.check(tokenType):
            return self.advance()

        raise self.error(self.peek(), message)

    def advance(self):
        if not self.isAtEnd():
            self.current += 1
        return self.previous()

    def match(self, *tokenTypes):
        for token in tokenTypes:
            if self.check(token):
                self.advance()
                return True
        return False

    def check(self, tokenType):
        if self.isAtEnd():
            return False
        return self.peek().type == tokenType

    def isAtEnd(self):
        return self.peek().type == TokenType.EOF

    def peek(self):
        return self.tokenList[self.current]

    def previous(self):
        return self.tokenList[self.current - 1]

    def synchronize(self):
        self.advance()
        types = [
            TokenType.CLASS,
            TokenType.FUN,
            TokenType.VAR,
            TokenType.FOR,
            TokenType.IF,
            TokenType.WHILE,
            TokenType.PRINT,
            TokenType.RETURN]

        while not self.isAtEnd():
            if self.previous().type == TokenType.SEMICOLON or self.peek().type in types:
                return

            self.advance()
