function _contains(a, b) {
    return [...a].every(value => b.includes(value));
}

function _eq(a, b) {
    return ((a.length === b.length) && _contains(a, b));
}

function _validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function _validatePhone(phone) {
    var re = /^[+]?\d{2}\ ?\d{3}\ ?\d{3}\ ?\d{2}\ ?\d{2}$/;
    return re.test(phone);
};

Object.values = obj => Object.keys(obj).map(key => obj[key]);

function dataValidator(route) {
    return (req, res, next) => {
        Object.setPrototypeOf(req.body, {});
        if (req.path.startsWith(route)) {
            let data = req.body;
            const fields = [
                'client-name',
                'client-email',
                'receiver-name',
                'receiver-email',
                'subject',
                'description'
            ];
            if (data.hasOwnProperty('submit')) {
                delete data.submit;
            };

            if (_eq(Object.keys(data), fields) && (Object.values(data).indexOf('') === -1)) {
                const emails = [data['client-email'], data['receiver-email']];

                if (!emails.every(_validateEmail)) {
                    return res.status(400).json({
                        error: 'Invalid email or phone'
                    });
                }
            }
            else {
                return res.status(400).json({
                    error: 'All fields are required'
                });
            }
        }
        next();
    }
}

module.exports = dataValidator;
