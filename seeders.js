const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './env/.env.dev' });

const Catway = require('./models/catways');
const Reservation = require('./models/reservations');
const User = require('./models/users');

const catways = require('./Fichiers/catways.json');
const reservations = require('./Fichiers/reservations.json');

const importData = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO);
        console.log('Connecté à MongoDB');

        await Catway.deleteMany();
        await Reservation.deleteMany();
        await User.deleteMany();

        await Catway.insertMany(catways);
        console.log('Catways importés');

        await Reservation.insertMany(reservations);
        console.log('Réservations importées');

        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.insertMany([{
            name: 'Admin',
            email: 'admin@port-russell.fr',
            password: hashedPassword
        }]);
        console.log('Utilisateur admin créé');

        console.log('Données importées avec succès !');
        process.exit(0);
    } catch (err) {
        console.error('Erreur :', err.message);
        process.exit(1);
    }
};

importData();