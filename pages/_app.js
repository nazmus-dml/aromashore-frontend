import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import App from "next/app";
import Router from "next/router";
import { AppStore } from "../store/AppStore";
import "../styles/Home.module.css";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({
  Component,
  pageProps: { userInfo, ...pageProps },
}) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(userInfo);
  // const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      let loadCart = JSON.parse(localStorage.getItem("cart"));
      setCart(loadCart);
    }
  }, []);

  const saveCartToLocalStorage = (cart) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const add_TO_CART = ({ product, unit }) => {
    // console.log(product, unit);
    // console.log('old cart',cart);
    if (product.productproperties.length > 0) {
      let copyCart = [...cart];
      const findCartItem = copyCart.find((item) => product.id === item.id);
      // console.log('copyCart', findCartItem);
      if (findCartItem) {
        const foundIndex = copyCart.findIndex(
          (item) => findCartItem.id == item.id
        );
        let findUnit = findCartItem.units.find((item) => unit.id == item.id);
        if (findUnit) {
          let findUnitIndex = findCartItem.units.findIndex(
            (item) => unit.id == item.id
          );
          findCartItem.units[findUnitIndex] = {
            ...findUnit,
            qty: findUnit.qty + unit.qty,
          };
          copyCart[foundIndex] = {
            ...findCartItem,
          };
        } else {
          copyCart[foundIndex] = {
            ...findCartItem,
            units: [...findCartItem.units, unit],
          };
        }
      } else {
        copyCart = [...copyCart, { ...product, units: [unit] }];
      }
      console.log(copyCart);
      saveCartToLocalStorage(copyCart);
    }
  };

  const delete_ITEM_FROM_CART = ({ product, unit }) => {
    let copyCart = [...cart];
    const findCartItem = copyCart.find((item) => product.id == item.id);
    if (findCartItem) {
      const foundIndex = copyCart.findIndex(
        (item) => findCartItem.id == item.id
      );
      let findUnit = findCartItem.units.find((item) => unit.id == item.id);
      if (findUnit) {
        if (findCartItem.units.length > 1) {
          const filteredUnits = findCartItem.units.filter(
            (item) => unit.id !== item.id
          );
          findCartItem.units = filteredUnits;
          copyCart[foundIndex] = {
            ...findCartItem,
          };
        } else {
          const filteredCart = copyCart.filter(
            (item) => item.id !== product.id
          );
          copyCart = [...filteredCart];
          localStorage.removeItem("cart");
        }
      } else {
        console.log("Else Unit");
      }
    }
    saveCartToLocalStorage(copyCart);
  };

  const increment_TO_CART_ITEM = ({ product, unit }) => {
    let copyCart = [...cart];
    const findCartItem = copyCart.find((item) => product.id == item.id);
    if (findCartItem) {
      const foundIndex = copyCart.findIndex(
        (item) => findCartItem.id == item.id
      );
      const findUnit = findCartItem.units.find((item) => unit.id == item.id);
      if (findUnit) {
        let findUnitIndex = findCartItem.units.findIndex(
          (item) => unit.id == item.id
        );
        findCartItem.units[findUnitIndex] = {
          ...findUnit,
          qty: unit.qty,
        };
        copyCart[foundIndex] = {
          ...findCartItem,
        };
      } else {
        copyCart[foundIndex] = {
          ...findCartItem,
        };
      }
    }
    saveCartToLocalStorage(copyCart);
  };

  const decrement_TO_CART_ITEM = ({ product, unit }) => {
    let copyCart = [...cart];
    const findCartItem = copyCart.find((item) => product.id == item.id);
    if (findCartItem) {
      const foundIndex = copyCart.findIndex(
        (item) => findCartItem.id == item.id
      );
      const findUnit = findCartItem.units.find((item) => unit.id == item.id);
      if (findUnit) {
        const findUnitIndex = findCartItem.units.findIndex(
          (item) => unit.id == item.id
        );
        findCartItem.units[findUnitIndex] = {
          ...findUnit,
          qty: unit.qty,
        };
        copyCart[foundIndex] = {
          ...findCartItem,
        };
      } else {
        copyCart[foundIndex] = {
          ...findCartItem,
        };
      }
    }
    saveCartToLocalStorage(copyCart);
  };

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

  const setUSER = useCallback((user) => {
    Cookies.set("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("user");
    setUser(null);
    Router.push('/');
    // setCompanyInfo(null);
    // window.location = "/";
  }, []);

  const value = {
    cart,
    add_TO_CART,
    delete_ITEM_FROM_CART,
    increment_TO_CART_ITEM,
    decrement_TO_CART_ITEM,
    clearCart,
    user,
    setUSER,
    // companyInfo,
    logout,
  };

  return (
    <AppStore.Provider value={value}>
      <Component {...pageProps} />
    </AppStore.Provider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context) => {
  console.log("_APP -- getServerSideProps", context);
  const pageProps = await App.getInitialProps(context);
  let userInfo = null;
  try {
    userInfo = context.ctx.req?.cookies?.user
      ? JSON.parse(context.ctx.req?.cookies?.user)
      : null;

    return {
      pageProps: { userInfo, ...pageProps },
    };
  } catch (error) {
    console.log("eTTTrror", error);
    return {
      pageProps: {
        userInfo, pageProps
      },
    };
  }
};
