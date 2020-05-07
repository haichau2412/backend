const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://DPQ:Beadspun09@qcpizza-zjroe.mongodb.net/test?',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });


  console.log(`MongoDB connected: ${conn.connection.host}`)
};

module.exports = connectDB;
