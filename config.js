let config = {
  dbUrl: `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbUrl}/?retryWrites=true&w=majority`,
};

module.exports = config;
