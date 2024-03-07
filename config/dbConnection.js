const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING||"mongodb+srv://amalkrstackup:amalkrstackup@projectcluster0.g0x7i3h.mongodb.net/todo-test-1?retryWrites=true&w=majority");
    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDb }