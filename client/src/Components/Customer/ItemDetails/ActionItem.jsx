import { useState,useEffect } from "react";

import { Button, Box, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

import axios from "axios";
// import { url } from "../../../service/api";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px 20px",
  border: "1px solid #f0f0f0",
  width: "95%",
});

const StyledButton = styled(Button)`
  width: 46%;
  border-radius: 2px;
  height: 50px;
  color: #fff;
`;

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const { id } = product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  const handleCheckout = () => {
    axios
      .post(`https://flippy-store.vercel.app/stripe/create-checkout-session`, {
        cartItems: [{ ...product, quantity: 1 }], // Modify to send product as cartItems
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <LeftContainer>
      <Image src={product.detailUrl} />
      <br />
      <StyledButton
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton
        style={{ background: "#fb641b" }}
        variant="contained"
        onClick={() => handleCheckout()}
      >
        <Flash /> Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
