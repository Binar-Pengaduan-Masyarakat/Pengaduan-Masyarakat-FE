const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const userRoutes = require('./routes/userRoutes');
const institutionRoutes = require('./routes/institutionRoutes'); // Import institution routes
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Use user routes
app.use('/users', userRoutes);

// Ensure the uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));


// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from frontend
};
app.use(cors(corsOptions));

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Profile App');
});

// Use user routes for endpoints starting with /users
app.use('/users', userRoutes);

// Use institution routes for endpoints starting with /institutions
app.use('/institutions', institutionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
