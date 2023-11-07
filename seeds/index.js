const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DATABASE CONNECTED")
})
    .catch(err => {
        console.log("ERROR")
        console.log(err)
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '63f48386b28aa6305c27de08',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde a esse temporibus est cum ducimus perferendis necessitatibus, ratione impedit quasi.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhu2mqjyh/image/upload/v1677053587/YelpCamp/tttlc5hl8szv09uuac6f.jpg',
                    filename: 'YelpCamp/tttlc5hl8szv09uuac6f'
                },
                {
                    url: 'https://res.cloudinary.com/dhu2mqjyh/image/upload/v1677053588/YelpCamp/meh9ok8rqbytks6utmeu.jpg',
                    filename: 'YelpCamp/meh9ok8rqbytks6utmeu'
                }
            ],
        })
        await camp.save();
    }
}

seedDB();