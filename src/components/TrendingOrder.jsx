import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Dummy data for the cards
const cardData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  image: 'https://themes.pixelstrap.net/zomo/landing/backend/assets/images/dashboard/product/4.jpg',
  title: 'Poultry Palace',
  price: '$15.00',
  description: 'Healthy Foods are nutrient-Dense Foods',
  sales: 200,
  rating: 4.5,
  discount: 'Top Of Them Year',
}));

function TrendingOrder() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="trending-orders">
      <div className="trnding-title">
        <h5>Trending orders</h5>
        <a href="media.html" className="text-white">
          View All
          <i className="ri-arrow-right-s-line"></i>
        </a>
      </div>

      <Slider {...settings}>
        {cardData.map((card) => (
          <div key={card.id} className='p-2'>
            <div
              className="card-body trending-items"
              style={{
                textAlign: 'center',
                transition: 'all .4s ease-in-out',
                background: '#fff',
                borderRadius: '18px',
              }}
            >
              <img
                className="img-fluid product-img"
                src={card.image}
                alt=""
                style={{ transition: 'all .4s ease-in-out', borderRadius: '4px' }}
              />
              <div style={{ marginTop: '15px' }}>
                <h5
                  style={{
                    fontSize: 'calc(18px + (20 - 18) * ((100vw - 320px) / (1920 - 320)))',
                    color: '#333',
                    fontWeight: '500',
                    marginBottom: '8px',
                  }}
                >
                  {card.title}
                </h5>
                <h6
                  style={{
                    fontSize: 'calc(15px + (18 - 15) * ((100vw - 320px) / (1920 - 320)))',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '10px',
                  }}
                >
                  {card.price}
                </h6>
              </div>
              <p style={{ textAlign: 'left', margin: 'auto', color: '#666', marginBottom: '8px' }}>
                {card.description}
              </p>
              <ul
                className="rating"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderTop: '1px dashed rgba(0,0,0,0.6)',
                }}
              >
                <li style={{ width: '100%' }}>
                  <h6 style={{ fontWeight: '400', color: '#333' }}>
                    {card.sales}
                    <span style={{ fontWeight: '600' }}>Sale</span>
                  </h6>
                </li>
                <li>
                  <p style={{ textAlign: 'right', marginBottom: '0', color: '#333' }}>
                    <i className="ri-star-fill" style={{ color: '#f39c12' }}></i>
                    {card.rating}
                  </p>
                </li>
              </ul>
              <div className="marquee-box">
                <ul
                  className="marquee-discount"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    transition: '0.4s ease',
                  }}
                >
                  {Array.from({ length: 1 }).map((_, index) => (
                    <li
                      className="discount-info"
                      key={index}
                      style={{ color: '#333', fontWeight: '500' }}
                    >
                      <img
                        src="./assets/images/dashboard/round.gif"
                        alt=""
                        style={{ width: '40px' }}
                      />
                      {card.discount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TrendingOrder;
