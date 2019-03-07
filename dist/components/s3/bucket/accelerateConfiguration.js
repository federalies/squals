"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accelerate = function (shouldAccelate) {
    return {
        AccelerateConfiguration: {
            AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
        }
    };
};
exports.accelerate = accelerate;
