"use strict";
exports.__esModule = true;
var deep_equal_1 = require("deep-equal");
exports.getPath = function (keyPath, dataToCheck, delim) {
    if (delim === void 0) { delim = '.'; }
    var temp = dataToCheck;
    if (keyPath.includes(delim)) {
        keyPath.split(delim).forEach(function (key) {
            if (Object.keys(temp).length > 0 && key in temp) {
                temp = temp[key];
            }
            else {
                temp = undefined;
            }
        });
    }
    else {
        return dataToCheck[keyPath];
    }
    return temp;
};
exports.setIntersection = function (a, b) {
    // count Up the Overlap
    var empty = [];
    var objKeys = new Set(a);
    var probe = new Set(b);
    var overlap = new Set(empty);
    probe.forEach(function (v) {
        if (objKeys.has(v)) {
            overlap.add(v);
        }
    });
    return Array.from(overlap.keys());
};
function verifyIntersection(i, expIntersectSize, operator, operatorFn) {
    var keys = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        keys[_i - 4] = arguments[_i];
    }
    var _operatorFn;
    var elemLeft = exports.setIntersection(Object.keys(i), keys);
    if (!operatorFn) {
        switch (operator) {
            case '==':
                _operatorFn = function (a, b) { return a === b; };
                break;
            case '!==':
                _operatorFn = function (a, b) { return a !== b; };
                break;
            case '<':
                _operatorFn = function (a, b) { return a < b; };
                break;
            case '>':
                _operatorFn = function (a, b) { return a > b; };
                break;
            case '<=':
                _operatorFn = function (a, b) { return a <= b; };
                break;
            case '>=':
                _operatorFn = function (a, b) { return a >= b; };
                break;
            default:
                _operatorFn = function (a, b) { return a === b; };
        }
    }
    else {
        _operatorFn = operatorFn;
    }
    // Math.min becuause you might compose a HasTwoKeys()
    // but then not verify that the end-caller actuall passes
    // in two keys to check against
    if (!_operatorFn(elemLeft.length, Math.min(expIntersectSize, keys.length))) {
        throw new Error("An object was supposed to have " + expIntersectSize + " key(s) from the list " + keys + ". But input:" + i + " has these problem keys:" + elemLeft);
    }
    return i;
}
exports.verifyIntersection = verifyIntersection;
// #region verify Key Sets
exports.verifyAny = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 1, '>=', undefined].concat(keys));
    };
};
exports.verifyAll = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, keys.length, '==', undefined].concat(keys));
    };
};
exports.verifyOnlyOne = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 1, '==', undefined].concat(keys));
    };
};
exports.verifyXor = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 1, '==', undefined].concat(keys));
    };
}; // alias
exports.verifyHasTwo = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 2, '==', undefined].concat(keys));
    };
}; // alias
exports.verifyHasAtLeastTwo = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 2, '>=', undefined].concat(keys));
    };
}; // alias
exports.verifyHasAtLeastOne = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, 1, '>=', undefined].concat(keys));
    };
}; // alias
exports.verifyHasAtLeastN = function (n) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return function (input) {
        return verifyIntersection.apply(void 0, [input, n, '>=', undefined].concat(keys));
    };
}; // alias
// #endregion
// #region verify conditionals
function verifyIfThen(_if, _then, _else) {
    return function (input) {
        if (_if(input)) {
            _then(input);
        }
        else {
            if (_else)
                _else(input);
        }
        return input;
    };
}
exports.verifyIfThen = verifyIfThen;
exports.ifCondition = function (keyPath, fnOp, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return fnOp(exports.getPath(keyPath, i, delim));
    };
};
exports.ifType = function (keyPath, isType, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return typeof exports.getPath(keyPath, i, delim) === isType;
    };
};
exports.ifHas = function (keyPath, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return !!(exports.getPath(keyPath, i, delim) && true);
    };
};
exports.ifPathEq = function (keyPath, expected, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return deep_equal_1["default"](exports.getPath(keyPath, i, delim), expected);
    };
};
exports.ifPathType = function (keyPath, expected, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return typeof exports.getPath(keyPath, i, delim) === expected;
    };
};
exports.has = function (keyPath, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        if (!exports.getPath(keyPath, i, delim)) {
            throw new Error("based on the prior condition, \"" + keyPath + "\" is expected in " + JSON.stringify(i, null, 2));
        }
        return i;
    };
};
exports.verifyStringStructData = function (keyPath, transformFn, s, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        return s(transformFn(exports.getPath(keyPath, i, delim)));
    };
};
exports.multipleOf = function (n) { return function (input) {
    if (Number(input) % n !== 0) {
        throw new Error("Expecting memSize:MB to be multiple of 64 - got::" + n);
    }
    return input;
}; };
exports.stringNotEqual = function (keyPath, s, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (input) {
        if (exports.getPath(keyPath, input, delim) === s) {
            throw new Error("input::" + {
                keyPath: keyPath,
                input: input,
                result: exports.getPath(keyPath, input, delim)
            } + " should not be equal to :: " + s);
        }
        return input;
    };
};
exports.pathEq = function (keyPath, expected, delim) {
    if (delim === void 0) { delim = '.'; }
    return function (i) {
        if (!deep_equal_1["default"](exports.getPath(keyPath, i, delim), expected)) {
            throw new Error("based on the prior condition, parth::\"" + keyPath + "\" was expected to equal " + JSON.stringify(expected, null, 2) + " - but instead there was: " + JSON.stringify(exports.getPath(keyPath, i, delim), null, 2));
        }
        return i;
    };
};
exports.verifySyntax = function (pathToSource, compilationFunc) { return function (input) {
    var schema = compilationFunc(exports.getPath(pathToSource, input));
    if (!schema) {
        throw new Error('the schema is invlalid');
    }
    return input;
}; };
// #endregion
