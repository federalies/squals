"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accelerate = function (shouldAccelate) {
    return {
        AccelerateConfiguration: {
            AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
        }
    };
};
