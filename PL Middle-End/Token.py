class Token:
    def __init__(self, _type, lexeme, literal):
        self.type = _type
        self.lexeme = lexeme
        self.literal = literal

    def __str__(self):
        # return str(self.lexeme)
        return str(self.type) + " " + str(self.lexeme) + " " + str(self.literal)

