const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const { verifyToken } = require('./middleware/auth');

dotenv.config();
const app = express();

// ✅ CORS Configuration to allow only your Flutter Web frontend
app.use(cors({
  origin: 'https://frontend-flutter-wnkb.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Optional Test POST Route
app.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'POST request received at root!',
    data: req.body
  });
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
.catch((err) => console.error(err));
