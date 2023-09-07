const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        const dbParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }

        console.log('DB params:', dbParams);
        await mongoose.connect('mongodb+srv://jadahego:WMNOupvbGnSdfAUJ@micluster.oyyhvvz.mongodb.net/jafeddb', dbParams);

        console.log('base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }



}


module.exports = {
    dbConnection
}