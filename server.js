
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},
{
    collection: 'user'
});

const User = mongoose.model('user', userSchema);

const connectionDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/user-auth')
        console.log('mongoDB connected succesffully')
    } catch (error) {
        console.log('error in db connection', error)
    }
}


app.post('/register', async(request, response) => {
    const {username, email, password} = request.body

    const existedUser = await User.findOne({email})
    console.log({existedUser})

    try {
        if (existedUser){
            response.status(400).send('user already exists.')
        }else {
            await User.create({
                username, password, email
            })

            response.status(200).send('Registered Successfully')
        }
    } catch (error) {
        console.log('error in register', error)
        response.status(500).send('Internal Server Error: ' + error);
    }


})


// login

app.post('/login', async(request, response) => {
    const {email, password} = request.body 

    try {
        const existedUser = await User.findOne({email})
        if (!existedUser){
            response.status(400).send('User not exist')
        }else if (existedUser.password !== password){
            response.status(400).send('Incorrect password')
        }else {
            const payload = {
                email,
            }

            jwt.sign(payload, 'login-sec-key', (err, token) => {
                if (err) throw err;
                return response.json({token, msg: 'Login Successfull.'})
            })
        }
    } catch (error) {
        console.log('error in login', error)
        response.status(500).send('Internal server error')
    }
})

// AUth

// AUth
const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(400).send('Invalid token');
    }

    const jwtToken = authHeader.split(' ')[1];
    jwt.verify(jwtToken, 'login-sec-key', (err, payload) => {
        if (err) {
            return response.status(401).send('Unauthorized');
        }
        request.email = payload.email;
        next();
    });
};

//get profile
app.get('/dashboard', authenticateToken, async (request, response) => {
    const email = request.email; // Corrected

    try {
        const data = await User.findOne({ email });
        console.log({ data });
        response.send({data: {username: data.username, email: data.email}});
    } catch (error) {
        console.error('Error getting profile:', error);
        response.status(500).send('Internal server error');
    }
});



connectionDB()
app.listen(4000, () => {
    console.log("server is running at 4000")
})