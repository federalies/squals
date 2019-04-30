"use strict";
exports.__esModule = true;
var AccessPolicy = /** @class */ (function () {
    function AccessPolicy(id) {
        if (id === void 0) { id = ''; }
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        this.Version = '2012-10-17';
        this.Id = id === '' ? 'SOMEAUTOGEND POLICY NAME' : id;
        this.Statement = props;
    }
    return AccessPolicy;
}());
exports.AccessPolicy = AccessPolicy;
var AccessPolicyStatement = /** @class */ (function () {
    function AccessPolicyStatement() {
        this.Sid = '';
        this.Effect = '';
        this.Resource = [''];
        this.Principal = { AWS: '' };
        this.Action = ['s3:GetObject'];
    }
    return AccessPolicyStatement;
}());
exports.AccessPolicyStatement = AccessPolicyStatement;
