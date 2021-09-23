const express = require('express')
const crypto = require('crypto')
const morgan = require('morgan')


const app = express()
const port = 3000

const randomDigit = () => {
    return Math.floor(Math.random()*10).toString()
}

let currentPin = randomDigit() + randomDigit()  + randomDigit() + randomDigit()
console.log('Starting PIN Server on port:' + port);
console.log('The secret pin for login is:' + currentPin);


app.use(express.json());
app.use(morgan('tiny'));

// Map of api tokens (strings) to if they are active or not (boolean)
const tokens = {}
const generateAPIToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, function(err, buffer) {
            if (err) {
                reject(err)
            }
            const token = buffer.toString('hex');
            tokens[token] = true
            resolve(token)
        });
    })
}

const isTokenValid = (token) => !!tokens[token];

const logout = (token) => {
    tokens[token] = false;
}

const getTokenFromHeader = (req) => req.header('Authorization');

// If auth token is invalid sends error and returns true,
// else returns false if token is valid
const sendErrorIfAuthHeaderInvalid = (req, res) => {
    const header = getTokenFromHeader(req);

    if (!header) {
        console.log('Token is missing in authorization header!');
        res.status(401)
        res.send({
           error: 'TOKEN_MISSING',
           message: 'You must provide the token in the Authorization header.'
        })
        return true
    }

    if (!isTokenValid(header)) {
        console.log(`Token ${header} is invalid.`);
        res.status(401)
        res.send({
            error: 'BAD_TOKEN',
            message: 'Token you provided is not authorized.'
        })
        return true
    }
    console.log(`Token ${header} is valid`);
    return false
}

const getPinIfValid = (field) => (req, res) => {
    const pin = req.body[field];
    if (typeof pin !== "string") {
        res.status(400)
        res.json({
            error: 'INVALID_REQUEST',
            message: `Must provide a 4 digit pin as a string via field ${field}`,
        })
        return false
    } else if (pin.length != 4) {
        res.status(400)
        res.json({
            error: 'INVALID_REQUEST',
            message: "Pin must be 4 digits long exactly"
        })
        return false
    }
    return pin
}

const getLoginPinIfValid = getPinIfValid('pin')
const getNewPinIfValid = getPinIfValid('newPin')

app.post('/login', async (req, res) => {
    const pin = getLoginPinIfValid(req, res);

    if (!pin) {
        console.log('Invalid pin on login endpoint')
        return
    }

    if (pin === currentPin)  {
        // Login is successful
        try {
            console.log(`Pin ${pin} matched! Generating token`);
            const newToken = await generateAPIToken();
            console.log(`Returning token: ${newToken}`);
            return res.json({
                token: newToken,
            })
        } catch (e) {
            console.error('An unexpected error occurred!', e)
            res.status(500)
            return res.json({
                error: 'SERVER_ERROR',
                stackTrace: e,
            })
        }
    } else {
        console.log(`Pin ${pin} does not match ${currentPin}`);
        res.status(403)
        return res.json({
            error: 'INCORRECT_PIN',
        })
    }
});

app.post('/logout', (req, res) => {
    if (!sendErrorIfAuthHeaderInvalid(req, res)) {
        const token = getTokenFromHeader(req);
        logout(token)
        res.send({'message': 'You have been logged out, the token is no longer valid.'})
    }
});


app.post('/changePin', (req, res) => {
    if (!sendErrorIfAuthHeaderInvalid(req, res)) {
        const pin = getNewPinIfValid(req, res);
        if (!pin) {
            console.log('Invalid pin on changePin endpoint')
            return
        }
        if (pin === currentPin) {
            console.log('Pin is same as current pin')
            res.status(400);
            return res.send({
                error: 'PIN_UNCHANGED',
                message: 'You must provide a pin that is different from the current pin.'
            })
        }
       console.log(`Change pin request from old pin ${currentPin} to new pin ${pin}.`)
       currentPin = pin;
       res.send({
           message: 'Pin changed successfully!',
       })
    }
});

app.listen(port, () => {
    console.log(`Pin code server started at http://localhost:${port}`)
})