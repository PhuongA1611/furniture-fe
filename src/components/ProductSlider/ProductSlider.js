import React from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ProductCard } from '..'
import "swiper/css/navigation";

const ProductSlider = (props) => {
    const { listProduct } = props

    return (
        <>
            {
                listProduct && (<div className='product-slider'>
                    <Swiper
                        loop={true}
                        slidesPerView={2}
                        spaceBetween={24}
                        breakpoints={{
                            480: {
                                slidesPerView: 3,
                            },
                            991: {
                                slidesPerView: 4,
                            },
                        }}
                        modules={[Navigation]}
                        navigation={true}
                        className="main-slider"
                    >
                        {
                            listProduct.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard item={item} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>)
            }
        </>
    )
}

export default ProductSlider
