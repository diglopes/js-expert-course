const { deepStrictEqual } = require("assert")

deepStrictEqual('1' == 1, true, 'Implicitly convert string to number')
deepStrictEqual('1' === 1, false, 'Do not implicitly convert string to number')

deepStrictEqual(String(123), '123', 'Explicit convertion to string')
deepStrictEqual('' + 123, '123', 'Implicit convertion to string')

deepStrictEqual('hello' || 123, 'hello', '|| returns the first truth element')
deepStrictEqual('hello' && 123, 123, '&& returbs the last truth element')