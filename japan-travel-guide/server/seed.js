// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Place = require('./models/Place');
// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     await Place.insertMany([
//       {
//         name: "Mount Fuji",
//         description: "Japan's tallest mountain and iconic landmark.",
//         image: "https://example.com/fuji.jpg"
//       },
//       {
//         name: "Kyoto Temples",
//         description: "Ancient shrines with traditional Japanese architecture.",
//         image: "https://example.com/kyoto.jpg"
//       }
//     ]);
//     console.log("Data seeded!");
//     process.exit();
//   })
//   .catch(err => console.log(err));


// require("dotenv").config();
// const mongoose = require("mongoose");
// const Place = require("./models/Place");
// const Food = require("./models/Food");
// const Festival = require("./models/Festival");

// async function seed() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(" MongoDB connected successfully!");

//     // Clear old data
//     await Place.deleteMany({});
//     await Food.deleteMany({});
//     await Festival.deleteMany({});

//     // Insert sample data
//     await Place.insertMany([
//       { name: "Mount Fuji", description: "Iconic snow-capped mountain." },
//       { name: "Kyoto", description: "Ancient temples and shrines." }
//     ]);

//     await Food.insertMany([
//       { name: "Sushi", description: "Vinegared rice with fish/vegetables." },
//       { name: "Ramen", description: "Noodles in rich broth." }
//     ]);

//     await Festival.insertMany([
//       { name: "Hanami", description: "Cherry blossom viewing." },
//       { name: "Gion Matsuri", description: "Kyoto’s grand summer festival." }
//     ]);

//     console.log("🌸 Sample data inserted successfully!");
//     process.exit(0); // exit cleanly
//   } catch (err) {
//     console.error(" Error seeding data:", err.message);
//     process.exit(1);
//   }
// }

// seed();


// require("dotenv").config();
// const mongoose = require("mongoose");
// const Food = require("./models/Food"); // ✅ Import model, not schema

// async function seedData() {
//   try {
//     // await mongoose.connect(process.env.MONGO_URI, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // });
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB connected successfully!");

//     // only works on models
//     await Food.deleteMany({});
//     console.log("Old data cleared!");

//     const foods = [
//       { name: "Sushi", description: "Delicious Japanese sushi", price: 500, category: "Japanese" },
//       { name: "Ramen", description: "Hot and tasty ramen", price: 300, category: "Japanese" }
//     ];

//     await Food.insertMany(foods);
//     console.log("Data seeded!");
//   } catch (err) {
//     console.error("Error seeding data:", err.message);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedData();



// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import Place from "./models/Place.js";
// import Food from "./models/Food.js";
// import Festival from "./models/Festival.js";

// dotenv.config();

// const run = async () => {
//   await mongoose.connect(process.env.MONGODB_URI);
//   await Promise.all([Place.deleteMany({}), Food.deleteMany({}), Festival.deleteMany({})]);

//   await Place.insertMany([
//     { name: "Tokyo", region: "Tokyo", blurb: "Neon skylines & shrines", photo: "https://source.unsplash.com/800x600/?tokyo" },
//     { name: "Kyoto", region: "Kyoto", blurb: "Temples & tea houses", photo: "https://source.unsplash.com/800x600/?kyoto" },
//   ]);

//   await Food.insertMany([
//     { name: "Sushi", desc: "Rice with seafood", img: "https://source.unsplash.com/800x600/?sushi" },
//     { name: "Ramen", desc: "Noodle soup", img: "https://source.unsplash.com/800x600/?ramen" },
//   ]);

//   await Festival.insertMany([
//     { name: "Gion Matsuri", season: "July", note: "Kyoto’s float parade", city: "Kyoto" },
//     { name: "Sapporo Snow Festival", season: "Feb", note: "Ice sculptures", city: "Sapporo" },
//   ]);

//   console.log(" Seeded data");
//   process.exit(0);
// };

// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });


// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import Place from "./models/Place.js";
// import Food from "./models/Food.js";
// import Festival from "./models/Festival.js";

// const run = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(" MongoDB connected successfully!");

//     await Promise.all([
//       Place.deleteMany({}),
//       Food.deleteMany({}),
//       Festival.deleteMany({})
//     ]);
//     console.log("🧹 Old data cleared!");

//     await Place.insertMany([
//       { name: "Tokyo", region: "Tokyo", blurb: "Neon skylines & shrines", photo: "https://source.unsplash.com/800x600/?tokyo" },
//       { name: "Kyoto", region: "Kyoto", blurb: "Temples & tea houses", photo: "https://source.unsplash.com/800x600/?kyoto" },
//     ]);

//     await Food.insertMany([
//       { name: "Sushi", desc: "Rice with seafood", img: "https://source.unsplash.com/800x600/?sushi" },
//       { name: "Ramen", desc: "Noodle soup", img: "https://source.unsplash.com/800x600/?ramen" },
//     ]);

//     await Festival.insertMany([
//       { name: "Gion Matsuri", season: "July", note: "Kyoto’s float parade", city: "Kyoto" },
//       { name: "Sapporo Snow Festival", season: "Feb", note: "Ice sculptures", city: "Sapporo" },
//     ]);

//     console.log(" Data seeded!");
//     process.exit(0);
//   } catch (err) {
//     console.error(" Error seeding data:", err.message);
//     process.exit(1);
//   }
// };

// run();



import mongoose from "mongoose";
import dotenv from "dotenv";

// Import models
import Place from "./models/Place.js";
import Food from "./models/Food.js";
import Festival from "./models/Festival.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB connected, seeding data...");

    // Clear old data
    await Promise.all([
      Place.deleteMany({}),
      Food.deleteMany({}),
      Festival.deleteMany({})
    ]);
    console.log(" Old data cleared");

    // Insert sample Places
    await Place.insertMany([
      {
        name: "Kyoto",
        description: "Historic temples and gardens",
        image: "/images/kyoto.jpg",
      },
      {
        name: "Tokyo",
        description: "Modern city with traditional shrines",
        image: "/images/tokyo.jpg",
      },
    ]);

    // Insert sample Foods
    await Food.insertMany([
      {
        name: "Sushi",
        description: "Fresh seafood with rice",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop",
      },
      {
        name: "Ramen",
        description: "Japanese noodle soup",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop",
      },
    ]);

    // Insert sample Festivals
    await Festival.insertMany([
      {
        name: "Gion Matsuri",
        description: "Kyoto’s float parade",
        month: "July",
        image: "/images/festival-gion.jpg",
      },
      {
        name: "Sapporo Snow Festival",
        description: "Ice sculptures and winter celebration",
        month: "February",
        image: "/images/festival-sapporo.jpg",
      },
    ]);

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  }
};

run();
