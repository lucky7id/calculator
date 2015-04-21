function Calculator () {
    this.stream = [];

    this.ops = {
        '+': 'add',
        '-': 'subtract',
        '/': 'divide',
        '*': 'multiply'
    };

    this.regs = {
        'divide': /(\d\s*\/\s*\d)/,
        'multiply': /(\d\s*\*\s*\d)/,
        'add': /(\d\s*\+\s*\d)/,
        subtract: /(\d\s*\-\s*\d)/
    };

    this.currentOp = undefined;
}

Calculator.prototype.add = function (a, b) {
    return a + b;
};

Calculator.prototype.subtract = function(a, b) {
    return a - b;
};

Calculator.prototype.multiply = function(a, b) {
    return a * b;
};

Calculator.prototype.divide = function(a, b) {
    return a / b;
};

//take a string such as 1 + 2, clean, and create an Obj
Calculator.prototype.lexExp = function(input) {
    var cleanExp = input.replace(/\w/g, '').split('');

    return {
        left: cleanExp[0],
        op: cleanExp[1],
        right: cleanExp[2]
    };
};

Calculator.prototype.parseStream = function() {
    var self = this;

    this.stream.map(function(op){
        return self[op](op.left, op.right);
    });
};

Calculator.prototype.processInput = function(input) {
    var currentOp = input;

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

    while (reg.test(input)) {
        var lexed = this.lexExp(reg.exec(input)[0]);
        str = str.replace(reg, eq(lexed.left, lexed.right));
    }
};

Calculator.prototype.result = function(input) {
    console.log(input);
};

