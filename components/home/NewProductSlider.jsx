import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import {apiUrl} from "../../config";
import Product from "../shop/Product";

const NewProductSlider = () => {
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
          setProductList(response.data.appData.rows);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <div className="product-slide">
      <div className="container">
        <div
          className="section-title new"
          style={{
            marginBottom: "1.875em",
            overflow: "hidden",
            // border: "1px solid #000000",
          }}
        >
          <div style={{ width: "50%", float: "left" }}>
            <h2>New Arival</h2>
          </div>
          <div
            className="text-right"
            style={{ width: "50%", float: "left", marginTop: "25px" }}
          >
            <Link href="shop?category=all" className="btn -transparent -underline">
              View all product
            </Link>
          </div>
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

export default NewProductSlider;
