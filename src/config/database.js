const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URI
    );
};



module.exports = connectDb;