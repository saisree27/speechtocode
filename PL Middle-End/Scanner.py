from TokenTypes import TokenType

class Scanner:
    def __init__(self, source):
        self.source = source
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
            'nil': TokenType.NIL,
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
            'private': TokenType.PRIVATE
        }

    def scanTokens(self):
        while not self.isAtEnd():
            self.start = self.current
            self.scanToken()
        self.tokens.append(Token(TokenType.EOF, '', None, self.line))
        return self.tokens


    def scanToken(self):
        c = self.advance()
        if c in self.tokenStrings:
            c = self.tokenStrings[c](c)
            if c is not None:
                self.addToken(c)
        elif c.isdigit():
            self.number()
        elif c.isalpha():
            self.identifier()
        elif c == "/":
            self.slash()
        elif c == "\"":
            self.string()


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
        text = self.source[self.start:self.current]
        self.tokens.append(Token(tokenType, text, literal, self.line))

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
