const express = require('express');
const path = require('path');
const cities= require('./cities')
const {places, descriptors} = require('./seedHelpers');
const mongoose= require('mongoose');
const Campground = require ('../models/campground');
const dbUrl = 'mongodb://localhost:27017/yelp-camp' ;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany();
    for(let i = 0 ; i < 300 ; i++){
        const price = Math.floor(Math.random()*20) + 10
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            //My User ID
            author:'60fef52d6032dc00150479cd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry:{
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ]
            },
            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda maiores error asperiores earum? Maiores quas in ullam laboriosam ab, ducimus, quaerat alias praesentium voluptatibus sequi quia odio reprehenderit hic ipsa.',
            price,
            images:  [
                {
                        "url" : "https://res.cloudinary.com/dxsmxkdi4/image/upload/v1627325962/YelpCamp/vgqfjpurevbga9hmko9e.jpg",
                        "filename" : "YelpCamp/vgqfjpurevbga9hmko9e"
                },
                {
                        "url" : "https://res.cloudinary.com/dxsmxkdi4/image/upload/v1627325958/YelpCamp/aoo3csabfkipxejkavvd.jpg",
                        "filename" : "YelpCamp/aoo3csabfkipxejkavvd"
                }
        ],
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    db.close();
})