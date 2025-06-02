const server = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
