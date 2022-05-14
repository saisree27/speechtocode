from TokenTypes import TokenType
from Token import Token

class Scanner:
    def __init__(self, source):
        self.source = source.split(" ")
        self.tokens = []
        self.start = 0
        self.current = 0
        self.tokenStrings = {
            'subtract': TokenType.MINUS,
            'add': TokenType.PLUS,
            'mutliply': TokenType.STAR,
            'divide': TokenType.SLASH,
            'not equals': TokenType.BANG_EQUAL,
            'equals': TokenType.EQUAL_EQUAL,
            'lesser': TokenType.LESS,
            'lesser equals': TokenType.LESS_EQUAL,
            'greater': TokenType.GREATER,
            'greater equals': TokenType.GREATER_EQUAL,
            'and': TokenType.AND,
            'class': TokenType.CLASS,
            'else': TokenType.ELSE,
            'false': TokenType.FALSE,
            'for': TokenType.FOR,
            'fun': TokenType.FUN,
            'if': TokenType.IF,
            'null': TokenType.NULL,
            'or': TokenType.OR,
            'print': TokenType.PRINT,
            'return': TokenType.RETURN,
            'super': TokenType.SUPER,
            'this': TokenType.THIS,
            'true': TokenType.TRUE,
            'var': TokenType.VAR,
            'while': TokenType.WHILE,
            'assign': TokenType.EQUAL,
            'this': TokenType.THIS,
            'else if': TokenType.ELSE_IF,
            'int': TokenType.INT,
            'float': TokenType.FLOAT,
            'double': TokenType.DOUBLE,
            'short': TokenType.SHORT,
            'long': TokenType.LONG,
            'byte': TokenType.BYTE,
            'char': TokenType.CHAR,
            'string': TokenType.STRING,
            'array': TokenType.ARRAY,
            'void': TokenType.VOID,
            'public': TokenType.PUBLIC,
            'private': TokenType.PRIVATE,
            'increment': TokenType.PLUS,
            'decrement': TokenType.MINUS,
            'plus': TokenType.PLUS,
        }
        self.ignore = {"to", "from", "create", "a", "loop", "with", 'than'}
        self.remap = {
            "decrement": '-',
            'increment': '+',
            "lesser": "<",
            "greater": ">",
            "greater equals": ">=",
            "lesser equals": "<="
        }

    def scanTokens(self):
        while not self.isAtEnd():
            self.start = self.current
            self.scanToken()
        self.tokens.append(Token(TokenType.EOF, '', None))
        return self.tokens

    def scanToken(self):
        c = self.advance()
        if c in self.tokenStrings:
            c = self.tokenStrings[c]
            if c is not None:
                self.addToken(c)
        elif self.isDigit(c):
            self.number()
        elif c.isalpha() and c not in self.ignore:
            self.identifier()


    def number(self):
        if self.isDigit(self.source[self.current-1]):
            if "." in self.source[self.current-1]:
                self.addToken(TokenType.NUM, float(self.source[self.current-1]))
            else:
                self.addToken(TokenType.NUM, int(self.source[self.current-1]))

    def identifier(self):
        if self.peek().isalpha():
            self.addToken(TokenType.IDENTIFIER)

    def peek(self):
        if self.isAtEnd():
            return '\0'
        return self.source[self.current]

    def peekNext(self):
        if (self.current + 1) >= len(self.source):
            return '\0'
        return self.source[self.current + 1]

    def isAtEnd(self):
        return (self.current >= len(self.source))

    def advance(self):
        self.current += 1
        return self.source[self.current-1]

    def addToken(self, tokenType, literal=None):
        text = self.source[self.current-1]
        if text in self.remap:
            text = self.remap[text]
        self.tokens.append(Token(tokenType, text, literal))

    def match(self, expected):
        if self.isAtEnd():
            return False
        elif self.source[self.current] != expected:
            return False
        self.current += 1
        return True

    def matchNext(self, expected):
        if self.isAtEnd():
            return False
        elif self.source[self.current+1] != expected:
            return False
        self.current += 1
        return True

    def isDigit(self, x):
        try:
            float(x)
            return True
        except ValueError:
            return False


