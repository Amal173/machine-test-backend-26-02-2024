const mongoose = require('mongoose');
const user = require('./models/userModels')
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://amalkrstackup:amalkrstackup@projectcluster0.g0x7i3h.mongodb.net/todo-test-1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Mongo connected");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
const password = "password";


const seedDB = async () => {
    await user.deleteMany({});
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.insertMany([
        {
            username: "Amal",
            email: "amalkr2001@gmail.com",
            password: hashedPassword,
            role: "Admin",
            phonenumber:"12345678901"
        }
    ]);
}
seedDB().then(() => {
    mongoose.connection.close();
})









