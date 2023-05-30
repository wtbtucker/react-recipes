const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }
    };
};

const postData = async (url='', data={}) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response)
    })
}

export { curry, postData }