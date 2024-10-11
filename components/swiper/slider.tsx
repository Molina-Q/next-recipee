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
            className='h-28'
            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1000 }}
            centeredSlides
            navigation
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
                        bg-slate-700 
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
