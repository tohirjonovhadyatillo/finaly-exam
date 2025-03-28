import { useState, useEffect } from "react";
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
            prevIndex == 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Mijozlar fikrlari
            </h2>

            <div className="relative flex items-center justify-center">
                <button onClick={prevSlide} className="absolute left-0 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300">
                    <MdKeyboardArrowLeft size={30} />
                </button>

                <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg text-center max-w-md mx-auto transition-all duration-500">
                    <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-blue-500 transform hover:scale-110 transition duration-300"
                    />
                    <p className="text-gray-700 italic text-lg">
                        <FaQuoteLeft className="inline text-blue-500 mr-2" />
                        {testimonials[currentIndex].text}
                        <FaQuoteRight className="inline text-blue-500 ml-2" />
                    </p>
                    <h3 className="font-semibold text-xl mt-4 text-gray-900">
                        {testimonials[currentIndex].name}
                    </h3>
                </div>

                <button onClick={nextSlide} className="absolute right-0 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300">
                    <MdKeyboardArrowRight size={30} />
                </button>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full transition duration-300 ${
                            index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
