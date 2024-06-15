import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { usePagination, DOTS } from "./usePagination";
import { AppContext, LOAD_PROODUCTS } from "../../store/Store";
import {apiUrl} from "../../config";
import axios from "axios";

function ProductPagination() {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const query = router.query;
  const [currentPage, setCurrentPage] = useState(0);
  const totalCount = state.totalCount;
  const [pageSize] = useState(8);
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage,
  });
  const handleChangePage = async (pageNo) => {
    setCurrentPage(pageNo);
    try {
      if (query.category) {
        const { data: categoryProducts } = await axios.post(
          apiUrl + "/web/getall/categorywise/product",
          {
            pageSize,
            pageNo: pageNo - 1,
            categoryId: query.category,
          }
        );
        return dispatch({
          type: LOAD_PROODUCTS,
          payload: categoryProducts.appData,
        });
      }
      if (query.brands) {
        const { data: brandProducts } = await axios.post(
          apiUrl + "/web/getall/brandwise/product",
          {
            pageSize,
            pageNo: pageNo - 1,
            brands: query.brands.split(","),
          }
        );
        return dispatch({
          type: LOAD_PROODUCTS,
          payload: brandProducts.appData,
        });
      }
      if (!query.brands && !query.category) {
        const { data: productsData } = await axios.post(
          apiUrl + "/web/getall/product",
          {
            pageSize,
            pageNo: pageNo - 1,
          }
        );
        dispatch({
          type: LOAD_PROODUCTS,
          payload: productsData.appData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (paginationRange.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  let dots = "..";
  return (
    <ul className="paginator">
      <li
        className={"page-item " + (currentPage === 0 ? "disabled" : "")}
        onClick={() => {
          handleChangePage(currentPage - 1);
        }}
      >
        <button className="page-link1">
          <i className="far fa-angle-left"></i>
        </button>
      </li>
      {paginationRange.map((item) => {
        if (item === DOTS) {
          dots = dots + ".";
          return (
            <li key={dots} className="page-item dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={item}
            onClick={() => {
              handleChangePage(item);
            }}
            className={"page-item " + (item === currentPage ? "active" : "")}
          >
            <button className="page-link"> {item}</button>
          </li>
        );
      })}
      <li
        className={"page-item " + (currentPage === lastPage ? "disabled" : "")}
        onClick={() => {
          handleChangePage(currentPage + 1);
        }}
      >
        <button className="page-link1">
          <i className="far fa-angle-right"></i>
        </button>
      </li>
    </ul>
  );
}
export default ProductPagination;
