"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

type Props = {
    steps: string[]
}

const Slider: React.FC<Props> = ({ steps }) => {
    return (
        <Swiper
            className='h-32 w-full md:w-[80vw]'
            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
            spaceBetween={30}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            navigation
            a11y={{
                enabled: true,
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}',
            }}
            mousewheel
            loop
        >
            {steps.map((step, index) => (
                <SwiperSlide
                    key={step}
                    className={`
                        flex 
                        items-center 
                        justify-center
                        text-center 
                        bg-orange-100 dark:bg-slate-700 
                        rounded-md
                    `}
                >
                    <p>{`${index + 1}. ${step}`}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
