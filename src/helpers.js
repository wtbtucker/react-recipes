export function curry (fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }
    };
};