const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

sequelize.sync()
  .then(async () => {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    const adminEmail = 'admin@codesfortomorrow.com';
    const adminPassword = 'Admin123!@#';
    const admin = await User.findOne({ where: { email: adminEmail } });

    if (!admin) {
      await User.create({
        email: adminEmail,
        password: bcrypt.hashSync(adminPassword, 10)
      });
      console.log('Admin user created');
    }

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));
