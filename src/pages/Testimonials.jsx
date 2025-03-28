import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const testimonials = [
    {
        name: "Abdulloh X.",
        text: "Galereyadagi rasmlar juda sifatli! Yuklab olish juda oson.",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        name: "Dilrabo A.",
        text: "Saytdagi rasm sifati va tezligi juda yoqdi. Raxmat!",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "Shahboz T.",
        text: "Doimiy mijozingizman! Galereyadagi rasmlar ajoyib.",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        name: "Maftuna K.",
        text: "Sayt juda qulay! O‘zimga yoqqan rasmlarni osongina yuklab oldim.",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        name: "Rustam B.",
        text: "Yuqori aniqlikdagi rasmlar topish qiyin edi, lekin bu saytda barchasi bor!",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        name: "Zuhra N.",
        text: "Sayt interfeysi juda chiroyli va ishlatish oson. Har doim shu yerdan foydalanaman!",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800">
                Mijozlar fikrlari
            </h2>

            <div className="relative flex flex-col items-center">
                <div className="hidden md:flex md:justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <MdKeyboardArrowLeft size={30} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <MdKeyboardArrowRight size={30} />
                    </button>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-xs md:max-w-md mx-auto transition-all duration-500">
                    <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full mb-3 md:mb-4 border-4 border-blue-500 transform hover:scale-110 transition duration-300"
                    />
                    <p className="text-gray-700 italic text-sm md:text-lg">
                        <FaQuoteLeft className="inline text-blue-500 mr-2" />
                        {testimonials[currentIndex].text}
                        <FaQuoteRight className="inline text-blue-500 ml-2" />
                    </p>
                    <h3 className="font-semibold text-lg md:text-xl mt-2 md:mt-4 text-gray-900">
                        {testimonials[currentIndex].name}
                    </h3>
                </div>
                <div className="flex md:hidden justify-center space-x-4 mt-6">
                    <button
                        onClick={prevSlide}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <MdKeyboardArrowLeft size={30} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <MdKeyboardArrowRight size={30} />
                    </button>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                    {testimonials.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition duration-300 ${
                                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                            }`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
