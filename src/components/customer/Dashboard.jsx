import React from "react";
import Navbar from "../customer/Navbar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Import images dynamically
import carAd1 from "../../assets/carad1.jpg";
import carAd2 from "../../assets/carad2.jpg";
import carAd3 from "../../assets/carad3.jpg";
import car1 from "../../assets/car1.png";
import showroom from "../../assets/showroom.jpg";
import carImage from "../../assets/car.jpg";

const images = [
  { 
    src: carAd1, 
    alt: "Luxury car ad",
    title: "Premium Collection",
    subtitle: "Experience luxury redefined"
  },
  { 
    src: carAd2, 
    alt: "Sleek black car",
    title: "Sport Edition",
    subtitle: "Thrilling performance awaits"
  },
  { 
    src: carAd3, 
    alt: "Sporty convertible",
    title: "Open Top Freedom",
    subtitle: "Feel the wind in your hair"
  },
  { 
    src: car1, 
    alt: "Classic car showcase",
    title: "Timeless Classics",
    subtitle: "Vintage elegance never fades"
  },
  { 
    src: showroom, 
    alt: "Modern car showroom",
    title: "Visit Our Showrooms",
    subtitle: "See our collection in person"
  },
];

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-70 transition z-10 text-white"
    onClick={onClick}
    aria-label="Next Slide"
  >
    <FiChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-70 transition z-10 text-white"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <FiChevronLeft size={24} />
  </button>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="mt-6 max-w-full mx-auto mb-10 px-4">
        {/* Hero Slider Section */}
        <div className="w-full -mt-10 overflow-hidden rounded-xl shadow-2xl">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[500px] object-cover"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col items-center justify-end pb-16 px-8">
                  <motion.h2 
                    className="text-white text-4xl md:text-5xl font-extrabold text-center mb-2 drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {image.title}
                  </motion.h2>
                  <motion.p 
                    className="text-white text-xl md:text-2xl text-center mb-6 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {image.subtitle}
                  </motion.p>
                  <motion.button
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/customer/cars")}
                  >
                    Explore Now
                  </motion.button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Search Section */}
      <motion.div 
        className="text-center mt-16 mb-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-bold text-3xl md:text-4xl text-[#363843] mb-4">
          Find the Perfect Car for You <span className="text-primary">🔎</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Search by brand, model, price range, or location to find your dream car from our extensive collection.
        </p>
{/*         
        <div className="mt-8 max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for cars, brands, or showrooms..."
            className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition">
            Search
          </button>
        </div> */}
      </motion.div>

      {/* Navigation Cards */}
      <motion.div
        id="cars-section"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 mb-20 px-5 lg:px-0 max-w-screen-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          onClick={() => navigate("/customer/cars")}
          className="relative border p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#1a1d24] to-[#2d3748] cursor-pointer hover:shadow-2xl transition-all group overflow-hidden"
          whileHover={{ y: -10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          <img
            src={carImage}
            alt="Cars"
            className="w-full h-64 object-cover mb-4 rounded-lg group-hover:scale-105 transition-transform"
            loading="lazy"
          />
          <div className="relative z-20">
            <div className="flex items-center mb-2">
              <FiSearch className="text-primary mr-2 text-xl" />
              <h2 className="text-2xl text-white font-bold">Browse Cars</h2>
            </div>
            <p className="text-gray-300 mb-4">Find your ideal car by name, model, or specifications.</p>
            <button className="text-primary font-medium flex items-center group-hover:underline">
              Explore cars <FiChevronRight className="ml-1" />
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          onClick={() => navigate("/customer/showrooms")}
          className="relative border p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#1a1d24] to-[#2d3748] cursor-pointer hover:shadow-2xl transition-all group overflow-hidden"
          whileHover={{ y: -10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          <img
            src={showroom}
            alt="Showrooms"
            className="w-full h-64 object-cover mb-4 rounded-lg group-hover:scale-105 transition-transform"
            loading="lazy"
          />
          <div className="relative z-20">
            <div className="flex items-center mb-2">
              <FiMapPin className="text-primary mr-2 text-xl" />
              <h2 className="text-2xl text-white font-bold">Find Showrooms</h2>
            </div>
            <p className="text-gray-300 mb-4">Search by showroom name, location, or available inventory.</p>
            <button className="text-primary font-medium flex items-center group-hover:underline">
              View showrooms <FiChevronRight className="ml-1" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Featured Brands Section */}
      <motion.div 
        className="py-12 bg-gray-50 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['BMW', 'Mercedes', 'Audi', 'Honda', 'Toyota', 'Nissan'].map((brand, index) => (
              <motion.div
                key={brand}
                className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-xl font-semibold text-gray-700">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Us Section */}
<motion.div 
  className="py-16 bg-white"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-screen-xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Our Dealership</h2>
      <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Your trusted partner in finding the perfect car for your lifestyle and needs.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src={showroom} 
          alt="Our showroom" 
          className="rounded-xl shadow-xl w-full h-auto object-cover"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
        <p className="text-gray-600 mb-4">
          Founded in 2024, we've grown from a small local dealership to one of the most trusted names in the automotive industry. 
          Our mission is to make car renting simple, transparent, and enjoyable.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Why Choose Us</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-gray-600">Diffrent Showrooms available</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-gray-600">Over 500+ Cars in our inventory</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-gray-600">Knowledgeable and Friendly Website</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-gray-600">Competitive pricing with no hidden fees</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span className="text-gray-600">Rent a car by cars only and also with your own choice showrooms</span>
          </li>
        </ul>

        <button 
          className="mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all"
          onClick={() => navigate("/customer/cars")}
        >
          Book a Car
        </button>
      </motion.div>
    </div>
 {/* Stats Section */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {[
        { number: "10+", label: "Years Experience" },
        { number: "500+", label: "Happy Customers" },
        { number: "50+", label: "Brands Available" },
        { number: "24/7", label: "Customer Support" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="bg-gray-50 p-6 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>

<Footer />

    </>
  );
};

export default UserDashboard;
