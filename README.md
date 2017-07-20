`cachefn`
=========

Decorate `async` (Promise.returning) functions with an expiring cache so costly
operations don't need to be run all the time.

## API

### `cachedFunction(func, timeout = Infinity)`

Returns a `CachedFunction` that will call `func` once until the cache expires.
`timeout` is the timeout in milliseconds until the cache expires.


### `CachedFunction()`

Returns a promise with the last value returned by the original function, unless
the cache has expired, in which case it calls the function and returns a
promise to the result.

### `CachedFunction#exec()`

Run the original function, ignoring any cache.  Calling it will store the
result on the cache, overriding any previous result and timeout.

### `CachedFunction#clear()`

Clear the cache.  The next time the function is run, it will call the original
function no matter what.
