import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        {
            name: 'Sarah Connor',
            role: 'CTO @ Skynet',
            text: 'Gaurav delivers critical updates with zero downtime. His code architecture is future-proof and incredibly robust.',
            rating: 5,
        },
        {
            name: 'John Stark',
            role: 'Product Lead @ Winterfell',
            text: 'The UI/UX design feels intuitive yet powerful. Working with Gaurav was like unlocking a cheat code for our frontend.',
            rating: 5,
        },
        {
            name: 'Ellen Ripley',
            role: 'Engineer @ Nostromo',
            text: 'Exceptional problem solver. He navigated complex backend integrations with ease. Highly recommended for any mission.',
            rating: 5,
        },
    ];

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <SectionWrapper id="reviews" className="py-20 relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1a4d2e 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-display mb-2">ARCADE REVIEWS</h2>
                    <p className="text-retro-dark/60 font-body">Player Feedback</p>
                </div>

                <div className="bg-white border-3 border-retro-dark rounded-xl p-8 md:p-12 shadow-retro-lg relative min-h-[300px] flex flex-col items-center justify-center">

                    {/* Dialogue Arrow */}
                    <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-retro-dark"></div>
                    <div className="absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-white"></div>

                    <MessageSquare className="w-12 h-12 text-retro-teal mb-6 opacity-20 absolute top-8 left-8" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center max-w-2xl z-10"
                        >
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-retro-yellow text-retro-dark" />
                                ))}
                            </div>

                            <blockquote className="text-xl md:text-2xl font-display leading-relaxed mb-8 text-deep-green">
                                "{reviews[currentIndex].text}"
                            </blockquote>

                            <div className="flex flex-col items-center">
                                <div className="font-bold text-lg">{reviews[currentIndex].name}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">{reviews[currentIndex].role}</div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevReview}
                        aria-label="Previous review"
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-cream border-2 border-retro-dark rounded-lg hover:bg-retro-orange hover:text-white transition-colors shadow-retro-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextReview}
                        aria-label="Next review"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-cream border-2 border-retro-dark rounded-lg hover:bg-retro-orange hover:text-white transition-colors shadow-retro-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Indicators */}
                    <div className="absolute bottom-4 flex gap-2">
                        {reviews.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full border border-retro-dark transition-all ${i === currentIndex ? 'bg-retro-dark w-4' : 'bg-transparent'}`}
                            ></div>
                        ))}
                    </div>

                </div>
            </div>

        </SectionWrapper>
    );
};

export default Reviews;
