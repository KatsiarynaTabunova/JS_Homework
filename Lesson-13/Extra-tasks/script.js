var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}],
        },
        object3: {},
    },
    method: function () {
        alert('Hello');
    },
};

var obj1 = {
    string: 'Vasya',
    num: 40,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}],
        },
        object3: {},
    },
    method: function () {
        alert('Hi!');
    },
};

//1
function deepClone(initialObj) {
    var clonedObj = {};
    for (var key in initialObj) {
        if (typeof initialObj[key] == 'function') {
            var func = initialObj[key];
            clonedObj[key] = func.clone();
        } else if (Array.isArray(initialObj[key])) {
            var array = initialObj[key];
            var clonArr = [];
            clonedObj[key] = clonArr;
            for (var i = 0; i < array.length; i++) {
                if (isObject(array[i])) {
                    clonArr[i] = deepClone(array[i]);
                } else {
                    clonArr[i] = array[i];
                }
            }
        } else if (isObject(initialObj[key])) {
            clonedObj[key] = deepClone(initialObj[key]);
        } else {
            clonedObj[key] = initialObj[key];
        }
    }
    return clonedObj;
}

Function.prototype.clone = function () {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

function isObject(obj) {
    if (typeof obj === 'object' && obj !== null) {
        return true;
    }
    return false;
}
var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);

//2
function deepEqual(initialObj, obj1) {
    for (var key in initialObj) {
        var result;
        if (typeof initialObj[key] == 'function') {
            result =
                obj1.hasOwnProperty(key) &&
                initialObj[key].toString() === obj1[key].toString();
        } else if (Array.isArray(initialObj[key])) {
            var array = initialObj[key];

            for (var i = 0; i < array.length; i++) {
                if (isObject(array[i])) {
                    result = deepEqual(array[i], obj1[key][i]);
                } else {
                    result = array[i] === obj1[key][i];
                }
            }
        } else if (isObject(initialObj[key])) {
            result = deepEqual(array, obj1[key]);
        } else {
            result = initialObj[key] == obj1[key];
        }
        if (!result) return false;
    }
    return true;
}

function isObject(obj) {
    if (typeof obj === 'object' && obj !== null) {
        return true;
    }
    return false;
}

var equalObj = deepEqual(initialObj, obj1);

console.log(initialObj);
console.log(equalObj);
