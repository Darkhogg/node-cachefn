const debug = require('debug')('cachedFunction');
const ms = require('ms');

module.exports = function cacheFunction (func, timeout = Number.POSITIVE_INFINITY) {
    const millis = ms(timeout);
    const funcId = 1 + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    let cacheTime = Number.NEGATIVE_INFINITY;
    let cacheProm = undefined;

    const resultFunc = function () {
        const now = Date.now();

        if (now >= cacheTime) {
            cacheTime = now + timeout;
            cacheProm = resultFunc.exec();
            debug('[%s] caching until:', funcId, cacheTime);
        }

        return cacheProm;
    };

    resultFunc.clear = function () {
        debug('[%s] clear cache', funcId);
        cacheTime = Number.NEGATIVE_INFINITY;
    };

    resultFunc.exec = function () {
        debug('[%s] run original function: %s', funcId, func.name || '<anonymous>');
        return Promise.resolve(func());
    };

    return resultFunc;
};
