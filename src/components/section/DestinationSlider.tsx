import { IDestination } from '@/types/destination';
import { useEffect, useState } from 'react';
import DestinationNavigation from '../ui/destination/DestinationNavigation';
import DestinationCard from '../ui/destination/DestinationCard';
import { getDestination } from '@/app/api/destination/destination';

const DestinationSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDestinations(await getDestination());
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    };

    fetchData();
  }, []);

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const getVisibleDestinations = () => {
    if (destinations.length === 0) return [];
    
    const indices = [];
    const totalItems = destinations.length;
    
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % totalItems);
    }
    
    return indices;
  };

  const getCardStyles = (arrayIndex: number) => {
    const baseWidth = 70;
    const offsetX = arrayIndex * 32;
    const baseOpacity = 1 - (arrayIndex * 0.15);
    const zIndex = 10 - arrayIndex;

    return {
      left: `${offsetX}%`,
      width: `${baseWidth}%`,
      opacity: baseOpacity,
      zIndex: zIndex,
    };
  };

  return (
    <section className="relative w-full min-h-svh bg-[#232323] overflow-hidden">
      <div className="absolute left-8 md:left-16 lg:left-32 z-20 h-full flex flex-col">
        <div className="mt-16 md:mt-24 lg:mt-32">
          <div className="w-12 h-[1px] bg-[#B5A268] mb-4" />
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-light tracking-[0.2em] uppercase">
            Destinations
          </h1>
        </div>

        <div className="mt-auto mb-24 flex space-x-4">
          <button 
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border border-[#B5A268] flex items-center justify-center
              text-[#B5A268] hover:bg-[#B5A268] hover:text-white transition-colors"
            aria-label="Previous destination"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              className="w-5 h-5 transform rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={goToNext}
            className="w-12 h-12 rounded-full border border-[#B5A268] flex items-center justify-center
              text-[#B5A268] hover:bg-[#B5A268] hover:text-white transition-colors"
            aria-label="Next destination"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 z-10">
        <div className="w-full h-full bg-[#B5A268]/20" />
        <div 
          className="absolute top-0 left-0 h-full bg-[#B5A268] transition-all duration-500"
          style={{ 
            width: `${((currentIndex + 1) / destinations.length) * 100}%` 
          }}
        />
      </div>

      <div 
        className="absolute right-0 top-0 h-full w-[85%] md:w-[88%] lg:w-[90%]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full">
          {destinations.length > 0 && getVisibleDestinations().map((index, arrayIndex) => {
            const styles = getCardStyles(arrayIndex);
            
            return (
              <div
                key={destinations[index].id}
                className="absolute top-0 h-full transition-all duration-700 ease-out"
                style={{
                  left: styles.left,
                  width: styles.width,
                  opacity: styles.opacity,
                  zIndex: styles.zIndex,
                }}
              >
                <DestinationCard 
                  destination={destinations[index]} 
                  isActive={index === currentIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationSlider;