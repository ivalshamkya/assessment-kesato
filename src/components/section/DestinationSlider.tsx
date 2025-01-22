import { Destination } from '@/types/destination';
import { useState } from 'react';
import DestinationNavigation from '../ui/destination/DestinationNavigation';
import DestinationCard from '../ui/destination/DestinationCard';

const DestinationSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const destinations: Destination[] = [
    {
      id: 1,
      name: 'RAJA AMPAT',
      price: 3852,
      imageUrl: 'https://s3-alpha-sig.figma.com/img/e150/6c48/587a3eb629d592f9b90a411b61eb620d?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q6xrz1vRxEBnUHGdTxWgqhs8Y3Vm0uPsZ71ujcL3rqOWzPMyG4AiOA3S5gNubrg~CzDz98-K~4SbVTgbMUq-UYDJ5dvZAQUa2hwRO~bSoatPtTVxongYDhy~f4uBopOyoL~-8tMTt3bjdpWOKZV8VW-LAnM4rNOijcAtU5WO3~a9fGZ1OZsdKAM9g56IoVQQs5-AcRJONkkIJTO~QdNhiAcZXX8Z33PyoCK6q42sALCFmoeAk~89rYnzOf5jWXQBBxjD-1fCJm1yfcG~mVnaQC7CZN2IMTdW3nRyJftB77wbqPmP86YMBgVmnSJc0~bIMmq8bO8VrNLSr0frJWyX4A__'
    },
    {
      id: 2,
      name: 'KOMODO ISLANDS',
      price: 3852,
      imageUrl: 'https://s3-alpha-sig.figma.com/img/bbac/3e5b/337d8af8d3cbc8265a3b1cb597746d04?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eTaVf24Z0X~PUEno4vDPytbpwj4Ms9zEDakzMQnjaGAjHpFsrCvQeINsf-OQaX1RXlW496OPTtGCUUvaK78pzdGeUpmUEXYB~-tCXodrCpXIJrIQAsNBSgdx824Uw6j1nd~nT7YBNiYKXhpSKjFw6zhTwLle-6WhFtwK~yPrcyrnlEVtboGwIKs5mfZnn24A4mMR6W~67wLI-obCrVZ0d7SA647EaW4oAuwwWWFTu4hM73cxGmGXopYttH1JfaoICG73pDSpd0HpPH1-7-jWb-WkPJwTJGT2zhN~Ha~WEKnxw1OOKJPYrORga~ZdqqPXZox2lVhK2at3wILVQldM5Q__'
    },
    {
      id: 3,
      name: 'BANDA SEA',
      price: 3852,
      imageUrl: 'https://s3-alpha-sig.figma.com/img/46b6/5328/ab64cbc874664aa0613cae55486bfe2f?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T8qfvF9VuWUtK6ak0l4QqQ0m~ZMpoTQaoRHFsbmnQqgtivWAXFZxPg7oVr8fyXUYusVnUFYBoSEVlevScwbZVI3MRLY9KNAtl6cxiVXasrGrjvEDxEYot95Bu4~0HjGUQO0NC9Jnfl7Nm4H4XCj1qVv8r-c0EbsMtU5axkoJ4-OBmKIgV5qI58wvgo1HGLJL~5Nqqc6ntwG4ARTdKvR2oood6OgJHHCrkAkBbQnTQxFrcHsW4A01Jc4PGIhLUCvTbhE8UOBPr7xHtRiUrCTjERp3wEI4Fuidv6qqBSNCaL2cD1NhUZRjYi1EjSpMg10NTj3T4BiTj3Uq2XZjXDGFbw__'
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full h-screen bg-black">
      {/* Title */}
      <div className="absolute top-32 left-32 z-50">
        <h1 className="text-white text-6xl font-light tracking-[0.2em] uppercase">
          Destinations
        </h1>
      </div>

       {/* Navigation Buttons */}
       <div className="absolute bottom-24 left-24 z-50 flex space-x-4">
        <DestinationNavigation direction="prev" onClick={goToPrevious} />
        <DestinationNavigation direction="next" onClick={goToNext} />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-50 bg-[#B5A268]/20">
        <div 
          className="h-full bg-[#B5A268] transition-all duration-500"
          style={{ 
            width: `${((currentIndex + 1) / destinations.length) * 100}%` 
          }}
        />
      </div>

      
      <div className="absolute inset-0 flex items-center">
        <div className="w-full flex justify-center gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`w-1/3 max-w-[600px] transition-all duration-500 ${
                index === currentIndex 
                  ? 'opacity-100' 
                  : 'opacity-30 hover:opacity-50'
              }`}
            >
              <DestinationCard 
                destination={destination} 
                isActive={index === currentIndex} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSlider;