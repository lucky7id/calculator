function Calculator () {
    this.stream = [];
    this.ops = {
        '+': 'add',
        '-': 'subtract',
        '/': 'divide',
        '*': 'multiply'
    };
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

    this.stream.push({
        left: cleanExp[0],
        op: cleanExp[1],
        right: cleanExp[2]
    });
};

Calculator.prototype.parseStream = function() {
    var self = this;

    this.stream.map(function(op){
        return self[op](op.left, op.right);
    });
};
