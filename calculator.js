function Calculator () {
    this.stream = [];

    this.ops = {
        '+': 'add',
        '-': 'subtract',
        '/': 'divide',
        '*': 'multiply'
    };

    this.regs = {
        'divide': /(\d+\s*\/\s*\d+)/,
        'multiply': /(\d+\s*\*\s*\d+)/,
        'add': /(\d+\s*\+\s*\d+)/,
        'subtract': /(\d+\s*\-\s*\d+)/,
        'expr': /(\d+\s*[\*|\+|\/|\-]\s*\d+)/,
        'op': /(\+|\-|\*|\/)/
    };

    this.currentOp = undefined;
}

Calculator.prototype.add = function (a, b) {
    return parseInt(a, 10) + parseInt(b, 10);
};

Calculator.prototype.subtract = function(a, b) {
    return parseInt(a, 10) - parseInt(b, 10);
};

Calculator.prototype.multiply = function(a, b) {
    return parseInt(a, 10) * parseInt(b, 10);
};

Calculator.prototype.divide = function(a, b) {
    return parseInt(a, 10) / parseInt(b, 10);
};

//take a string such as 1 + 2, clean, and create an Obj
Calculator.prototype.lexExp = function(input) {
    var cleanExp = input.replace(/\s/g, '').split(this.regs.op);
    //var op = this.ops[this.regs.op.exec(input)[0]];

    return {
        left: cleanExp[0],
        op: cleanExp[1],
        right: cleanExp[2]
    };
};

Calculator.prototype.parseStream = function(input) {
    var self = this;
    var copy = input;

    //while there is still math to do
    while (this.regs.expr.test(copy)) {
        var op = this.regs.expr.exec(copy)[0];
        var lexed = this.lexExp(op);
        copy = copy.replace(op, this[this.ops[lexed.op]](lexed.left, lexed.right));
    }

    return copy;
};

Calculator.prototype.processInput = function(input) {
    this.currentOp = input;

    this.result(this.parseStream(this.solveComplex()));
};

//solve any division or multiplication first
//so the string can be parsed linearly
Calculator.prototype.solveComplex = function() {
    var result = this.currentOp;
    var hasDivision = this.currentOp.indexOf('/') !== -1;
    var hasMulti = this.currentOp.indexOf('*') !== -1;

    if (hasMulti) {
        result = this.solveMD(result, 'multiply');
    }

    if (hasDivision) {
        result = this.solveMD(result, 'divide');
    }

    return result;
};

Calculator.prototype.solveMD = function(input, type) {
    var str = input;
    var reg = this.regs[type];
    var eq = this[type];

    while (reg.test(str)) {
        var lexed = this.lexExp(reg.exec(str)[0]);

        str = str.replace(reg, eq(lexed.left, lexed.right));
    }

    return str;
};

Calculator.prototype.result = function(input) {
    console.log(input);
};


//test run
var calc = new Calculator();
calc.processInput('1 + 4 / 2');
