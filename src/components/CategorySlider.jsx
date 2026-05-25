import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import { initializeAOS } from '../assets/Animation/initializeAOS';
import { Link } from 'react-router-dom';
import { axiosClients } from '../Apis/api';

const CategorySlider = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllCategories');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    initializeAOS();
  }, []);
  
  return (
    <div className="card" data-aos="fade">
      <div className="card-header bg-white border-0">
        <h5>Menu category</h5>
      </div>
      <div className="card-body">
        <div className="categories-section">
          <div className="theme-arrow">
            <Swiper
              modules={[Navigation, Autoplay]} // Import modules
              spaceBetween={10} // Space between slides
              loop={true} // Enable infinite loop mode
              navigation={{ // Add navigation buttons
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              autoplay={{ // Configure autoplay
                delay: 2000, // 2 seconds delay
                disableOnInteraction: false // Allow autoplay to continue after user interactions
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1, // 1 slide for mobile screens
                },
                640: {
                  slidesPerView: 2, // 2 slides for slightly larger screens
                },
                768: {
                  slidesPerView: 3, // 3 slides for tablet screens
                },
                1024: {
                  slidesPerView: 4, // 4 slides for small desktops
                },
                1200: {
                  slidesPerView: 5, // 5 slides for large desktops
                },
              }}
              className="categories-slider categories-style"
            >
              {data?.map((data,index) => (
                <SwiperSlide key={data.category_id} >
                  <Link to="category.html" className="food-categories" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className=''>
                    <img
                      
                      className="img-fluid categories-img  rounded-3" 
                      style={{ aspectRatio: '1/1' }}
                      src={data.category_url}
                      alt="Category Image"
                    />
                    </div>
                    <h6 className="dark-text">{data.category_name}</h6>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="swiper-button-next categories-next"
              tabIndex={0}
              role="button"
              aria-label="Next slide"
            />

            <div
              className="swiper-button-prev categories-prev"
              tabIndex={0}
              role="button"
              aria-label="Previous slide"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
