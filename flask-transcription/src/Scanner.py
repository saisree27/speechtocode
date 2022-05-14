from TokenTypes import TokenType
from Token import Token

class Scanner:
    def __init__(self, source, language):
        self.source = source.split(" ")
        self.language = language
        self.tokens = []
        self.start = 0
        self.current = 0
        self.tokenStrings = {
            'subtract': lambda c: TokenType.MINUS,
            'add': lambda c: TokenType.PLUS,
            'times': lambda c: TokenType.STAR,
            'divide': lambda c: TokenType.SLASH,
            'not equals': lambda c: TokenType.BANG_EQUAL,
            'equals': lambda c: TokenType.EQUAL_EQUAL,
            'lesser': lambda c: TokenType.LESS_EQUAL if self.peek() == "equals" else TokenType.LESS,
            'greater': lambda c: TokenType.GREATER_EQUAL if self.peek() == "equals" else TokenType.GREATER,
            'and': lambda c: TokenType.AND,
            'class': lambda c: TokenType.CLASS,
            'else': lambda c: TokenType.ELSE,
            'false': lambda c: TokenType.FALSE,
            'for': lambda c: TokenType.FOR,
            'function': lambda c: TokenType.FUN,
            'if': lambda c: TokenType.IF,
            'null': lambda c: TokenType.NULL,
            'or': lambda c: TokenType.OR,
            'print': lambda c: TokenType.PRINT,
            'return': lambda c: TokenType.RETURN,
            'super': lambda c: TokenType.SUPER,
            'this': lambda c: TokenType.THIS,
            'true': lambda c: TokenType.TRUE,
            'var': lambda c: TokenType.VAR,
            'while': lambda c: TokenType.WHILE,
            'assign': lambda c: TokenType.EQUAL,
            'this': lambda c: TokenType.THIS,
            'else if': lambda c: TokenType.ELSE_IF,
            'int': lambda c: TokenType.INT,
            'float': lambda c: TokenType.FLOAT,
            'double': lambda c: TokenType.DOUBLE,
            'short': lambda c: TokenType.SHORT,
            'long': lambda c: TokenType.LONG,
            'byte': lambda c: TokenType.BYTE,
            'boolean': lambda c: TokenType.BOOLEAN,
            'char': lambda c: TokenType.CHAR,
            'string': lambda c: TokenType.STRING,
            'array': lambda c: TokenType.ARRAY,
            'void': lambda c: TokenType.VOID,
            'public': lambda c: TokenType.PUBLIC,
            'private': lambda c: TokenType.PRIVATE,
            'increment': lambda c: TokenType.PLUS,
            'decrement': lambda c: TokenType.MINUS,
            'plus': lambda c: TokenType.PLUS,
            'mod': lambda c: TokenType.MOD,
            'call': lambda c: TokenType.CALL,
            'multiply': lambda c: TokenType.STAR,
            'incrementing': lambda c: TokenType.PLUS,
            'integer': lambda c: TokenType.INT,
            'boolean': lambda c: TokenType.BOOLEAN
        }
        self.ignore = {"to", "from", "create", "a", "loop", "with", 'than', 'condition', 'of', 'returning', 'parameters', 'parameter', 'named', 'type', 'called', 'an', 'by', 'that', 'is', 'always', 'value'}
        self.remap = {
            "decrement": '-',
            'increment': '+',
            'incrementing': '+',
            "lesser": "<",
            "greater": ">",
            "greater equals": ">=",
            "lesser equals": "<=",
            "mod": "%",
            "equals": "==",
            "and": '&&' if self.language == 'java' else 'and',
            "or": '||' if self.language == 'java' else 'or',
            "times": "*"
        }

    def scanTokens(self):
        listCopy = []
        for i in range(len(self.source)):
            if self.source[i] not in self.ignore:
                listCopy.append(self.source[i])
        self.source = listCopy


        while not self.isAtEnd():
            self.start = self.current
            self.scanToken()
        self.tokens.append(Token(TokenType.EOF, '', None))
        return self.tokens

    def scanToken(self):
        c = self.advance()
        if c in self.tokenStrings:
            c = self.tokenStrings[c](c)
            if c == TokenType.GREATER_EQUAL or c == TokenType.LESS_EQUAL:
                self.advance()
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
        if self.source[self.current-1].isalpha():
            self.addToken(TokenType.IDENTIFIER)

    def peekPrevious(self):
        if self.isAtEnd():
            return '\0'
        return self.source[self.current-1]

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
        if tokenType == TokenType.GREATER_EQUAL or tokenType == TokenType.LESS_EQUAL:
            text = " ".join(self.source[self.current-2:self.current])
        else:
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


