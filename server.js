const app = require("./app");
const PORT = process.env.PORT || 9000;

// Listen
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
