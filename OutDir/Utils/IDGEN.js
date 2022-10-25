"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (len) {
    var arr = [];
    var poss = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (var i = 0; i < len + 1; i++) {
        arr.push(poss.charAt(Math.round(Math.random() * poss.length)));
    }
    return arr.join('');
});
//# sourceMappingURL=IDGEN.js.map