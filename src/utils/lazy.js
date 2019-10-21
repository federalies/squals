"use strict";
var _a;
exports.__esModule = true;
var lodash_es_1 = require("lodash-es");
exports.lazy = function () {
    var composedTransitions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        composedTransitions[_i] = arguments[_i];
    }
    var _composedSteps = composedTransitions;
    return {
        _composedSteps: _composedSteps,
        // a change in function types creates a new dataStateCheckPoint
        map: function () {
            var f = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                f[_i] = arguments[_i];
            }
            return exports.lazy.apply(void 0, _composedSteps.concat(f.map(function (fn) { return ({ type: 'mapper', fn: fn }); })));
        },
        flatMap: function () {
            var f = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                f[_i] = arguments[_i];
            }
            return exports.lazy.apply(void 0, _composedSteps.concat(f.map(function (fn) { return ({ type: 'flatmapper', fn: fn }); })));
        },
        filter: function () {
            var f = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                f[_i] = arguments[_i];
            }
            return exports.lazy.apply(void 0, _composedSteps.concat(f.map(function (fn) { return ({ type: 'filter', fn: fn }); })));
        },
        reduce: function () {
            var f = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                f[_i] = arguments[_i];
            }
            return exports.lazy.apply(void 0, _composedSteps.concat(f.map(function (fn) { return ({ type: 'reducer', fn: fn }); })));
        },
        sort: function (fn) {
            return exports.lazy.apply(void 0, _composedSteps.concat({ type: 'sorter', fn: fn }));
        },
        // concat: (...d: IannotatedLazyTransforms[]) => {
        //   const n = [..._composedSteps, ...d]
        //   return lazy(...n)
        // },
        // // ejectors
        eval: function (dataIn) {
            // forced ordering???
            // mappers
            // filter
            // reduce | sort
            // sort
            console.log({ _composedSteps: _composedSteps });
            // merge and apply mappers
            //
            // can reducers by merged and applied?
            var _flist = _composedSteps.map(function (f) { return f.fn; });
            //   const ret =
            return lodash_es_1.flow(_flist)(dataIn);
        },
        inspect: function () { return ({
            _composedSteps: _composedSteps
        }); }
    };
};
var r = (_a = exports.lazy()
    .map((function (elem) { return elem + 3; }), (function (elem) { return elem + 2; }), (function (elem) { return elem * 2; }), (function (elem) { return elem + 4; }), (function (elem) { return elem * 3; }), (function (elem) { return elem / 6; }))).reduce.apply(_a, [function (p, c) { return p + c; }, 0]);
console.log({ r: r.inspect() });
// #endregion interfaces
