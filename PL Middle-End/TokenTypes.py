from enum import Enum
TokenType = Enum('TokenType', [
    # Single-character tokens.
    "MINUS","PLUS", "SEMICOLON","SLASH", "STAR",
    # One or two character tokens.
    "BANG","BANG_EQUAL","EQUAL","EQUAL_EQUAL","GREATER","GREATER_EQUAL","LESS","LESS_EQUAL",
    # Literals
    "IDENTIFIER","STRING","NUMBER",
    # Keywords
    "AND","CLASS","ELSE","FALSE","FUN","FOR","IF","NULL","OR","PRINT","RETURN","SUPER","THIS","TRUE","VAR","WHILE","EOF"])
