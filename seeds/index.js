
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("database connected:");
})

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '64a47031b294cdaf028d0b32',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto libero inventore, consequatur harum, itaque sunt fugiat assumenda delectus odit quam dicta fugit possimus est optio dolores eum, provident laboriosam eos?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/djxomm4es/image/upload/v1690486784/Yelp%20Camp/y4pvj5rvsfkapusqux6c.jpg',
                    filename: 'Yelp Camp/y4pvj5rvsfkapusqux6c'
                },
                {
                    url: 'https://res.cloudinary.com/djxomm4es/image/upload/v1690486784/Yelp%20Camp/ioykjofiaq62mgzaenvz.jpg',
                    filename: 'Yelp Camp/ioykjofiaq62mgzaenvz'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});