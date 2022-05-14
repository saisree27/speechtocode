import Expr
import Stmt
from TokenType import TokenType
class Parser:
    def __init__(self, tokenList):
            self.current = 0
            self.tokenList = tokenList

    def parse(self) -> list:
        statements = []
        while not self.isAtEnd():
            statements.append(self.declaration())
        return statements
