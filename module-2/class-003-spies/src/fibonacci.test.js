const assert = require("assert");
const { Fibonacci } = require("./fibonacci");
const { createSandbox } = require("sinon");

const sinon = createSandbox();
const fibo = new Fibonacci();
const spy = sinon.spy(fibo, fibo.execute.name);

; (() => {
    {
        for (const seq of fibo.execute(5)) { }
        const expectedCallCount = 6;
        assert.strictEqual(
            spy.callCount,
            expectedCallCount,
            "Fibonacci should call execute 6 times"
        );
    }

    {
        spy.resetHistory();
        for (const seq of fibo.execute(5)) { }
        const expectedParams = [3, 1, 2];
        const { args } = spy.getCall(2);
        assert.deepStrictEqual(args, expectedParams, "The third call should be with 3, 1, 2");
    }

    {
        spy.resetHistory();
        const results = [...fibo.execute(5)]; // Iterator usage
        const expectedParams = [0, 1, 1, 2, 3];
        assert.deepStrictEqual(results, expectedParams, "The results should be [0,1,1,2,3]");
    }
})()