import React, { useState, useEffect } from "react";
import Product from "../shop/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import {apiUrl} from "../../config";

const FeaturedProductSlider = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post(apiUrl + "/web/getall/product", {
        pageSize: 20,
        pageNo: 0,
      })
      .then((response) => {
        console.log(response);
        if (response.data.appStatus) {
          const featuredProductList = response.data.appData.rows.filter(
            (product) => {
              return product.productdetail.featured > 0;
            }
          );
          setProductList(featuredProductList);
          setIsLoading(false);
        }
      });
  }, []);
  
  return (
    <div className="product-slide">
      <div className="container">
        <div
          className="section-title featured"
          style={{
            marginBottom: "1.875em",
            overflow: "hidden",
            // border: "1px solid #000000",
          }}
        >
          <div style={{ width: "50%", float: "left" }}>
            <h2>Featured Products</h2>
          </div>
          {/* <div
            className="text-right"
            style={{ width: "50%", float: "left", marginTop: "25px" }}
          >
            <a
              className="btn -transparent -underline"
              href="shop-fullwidth-4col.html"
            >
              View all product
            </a>
          </div> */}
        </div>
        <div className="product-slider">
          <div className="product-slide__wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
            >
              {isLoading ? (
                <div className="col-12 text-center">
                  <i className="fa fa-spinner fa-spin me-2"></i>Loading New
                  Products...
                </div>
              ) : (
                productList.map((product, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="product-slide__item">
                        <Product product={product} />
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSlider;
