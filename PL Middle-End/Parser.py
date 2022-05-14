import Expr
import Stmt
from TokenTypes import TokenType
from Token import Token
class Parser:
    def __init__(self, tokenList):
        self.current = 0
        self.tokenList = tokenList

    def expression(self):
        return self.assignment()

    def parse(self) -> list:
        statements = []
        while not self.isAtEnd():
            statements.append(self.declaration())
        print(statements)
        return statements

    def declaration(self):
        try:
            if self.match(TokenType.CLASS): return self.classDeclaration()
            if self.match(TokenType.FUN): return self.function("function")
            if self.match(TokenType.VAR): return self.varDeclaration()
            return self.statement()
        except Exception as e:
            self.synchronize()
            return None

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

    def forStatement(self):
        self.consume(TokenType.NUM, "Expected Range!")
        initializer = Expr.Assign(Token(TokenType.IDENTIFIER, 'i', 'i'), Expr.Literal(self.previous().literal))
        self.consume(TokenType.NUM, "Expected Range!")
        condition = Expr.Binary(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), Token(TokenType.LESS, '<', '<'), Expr.Literal(self.previous().literal))
        update = Expr.Assign(Token(TokenType.IDENTIFIER, 'i', 'i'), Expr.Binary(Expr.Variable(Token(TokenType.IDENTIFIER, 'i', 'i')), self.advance(), Expr.Literal(self.peek().literal)))
        block = Stmt.Block([initializer, condition, update])
        body = Stmt.Block([])
        forLoop = Stmt.For(block, body)
        return forLoop

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
