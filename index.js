const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const medicalAidRoutes = require('./routes/medicalAidRoutes');
app.use('/api/medicalaid', medicalAidRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server started on port \$PORT\`));
