import mongoose from "mongoose";
import dotenv from "dotenv";
import Trip from "./models/Trip.js";

dotenv.config();

const trips = [
  {
    name: "Goa Beach Getaway",
    location: "Goa",
    price: 14999,
    duration: "4 Days / 3 Nights",
    description: "Enjoy the golden beaches, vibrant nightlife, Portuguese heritage, and fresh seafood in India's party capital.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    maxGroupSize: 20,
  },
  {
    name: "Manali Mountain Escape",
    location: "Manali, Himachal Pradesh",
    price: 12999,
    duration: "5 Days / 4 Nights",
    description: "Snow-capped peaks, adventure sports, Rohtang Pass and the serene Solang Valley await you in this Himalayan paradise.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    maxGroupSize: 15,
  },
  {
    name: "Kashmir Paradise Tour",
    location: "Srinagar, Kashmir",
    price: 19999,
    duration: "6 Days / 5 Nights",
    description: "Dal Lake houseboat stay, Mughal gardens, Gulmarg snow and the breathtaking beauty of heaven on earth.",
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800",
    maxGroupSize: 12,
  },
  {
    name: "Kedarnath Spiritual Journey",
    location: "Kedarnath, Uttarakhand",
    price: 29999,
    duration: "7 Days / 6 Nights",
    description: "Trek to one of the holiest Shiva temples in the Himalayas. A divine experience surrounded by majestic peaks.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    maxGroupSize: 10,
  },
  {
    name: "Jaipur Royal Heritage",
    location: "Jaipur, Rajasthan",
    price: 12999,
    duration: "4 Days / 3 Nights",
    description: "Explore the Pink City — Amber Fort, Hawa Mahal, City Palace, and the colourful bazaars of Rajasthan.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    maxGroupSize: 25,
  },
  {
    name: "Mumbai City of Dreams",
    location: "Mumbai, Maharashtra",
    price: 16999,
    duration: "4 Days / 3 Nights",
    description: "Gateway of India, Marine Drive, Bollywood tours, street food and the electric energy of India's financial capital.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
    maxGroupSize: 20,
  },
  {
    name: "Somnath Pilgrimage",
    location: "Somnath, Gujarat",
    price: 19999,
    duration: "5 Days / 4 Nights",
    description: "Visit the sacred Somnath temple on the Arabian Sea coast, one of the 12 Jyotirlinga shrines of Lord Shiva.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    maxGroupSize: 15,
  },
  {
    name: "South India Temple Tour",
    location: "Rameshwaram & Madurai",
    price: 24999,
    duration: "7 Days / 6 Nights",
    description: "Discover the majestic Dravidian temples of Rameshwaram, Madurai Meenakshi Amman and the backwaters of Kerala.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    maxGroupSize: 18,
  },
  {
    name: "Delhi Heritage Walk",
    location: "New Delhi",
    price: 13999,
    duration: "3 Days / 2 Nights",
    description: "Red Fort, Qutub Minar, India Gate, Chandni Chowk street food — experience the history and chaos of India's capital.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    maxGroupSize: 25,
  },
  {
    name: "Ladakh Adventure Expedition",
    location: "Leh, Ladakh",
    price: 34999,
    duration: "8 Days / 7 Nights",
    description: "Pangong Lake, Nubra Valley, Khardung La pass and Buddhist monasteries — the ultimate adventure in the land of high passes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    maxGroupSize: 10,
  },
  {
    name: "Kerala Backwaters Retreat",
    location: "Alleppey, Kerala",
    price: 22999,
    duration: "5 Days / 4 Nights",
    description: "Houseboat cruise through the serene backwaters, Kathakali dance, Ayurvedic spa and lush green landscapes of God's own country.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    maxGroupSize: 12,
  },
  {
    name: "Agra Taj Mahal Tour",
    location: "Agra, Uttar Pradesh",
    price: 9999,
    duration: "2 Days / 1 Night",
    description: "Witness the wonder of the world — the Taj Mahal at sunrise, Agra Fort and the Mughal architecture that takes your breath away.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    maxGroupSize: 30,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Trip.deleteMany({});
    console.log("🗑️  Old trips cleared");

    await Trip.insertMany(trips);
    console.log(`🚀 ${trips.length} trips added successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedDB();
