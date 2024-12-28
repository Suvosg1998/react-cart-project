import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../Redux/Slice/productDetailsSlice";
import { addItem } from "../Redux/Slice/cartSlice";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <CircularProgress />;
  if (status === "failed") return <Typography variant="h6">Failed to load product details.</Typography>;

  return (
    product && (
      <Container maxWidth="md" style={{ marginTop: "10px" }}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            sx={{ objectFit: "contain" }}
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6" color="text.secondary">
              {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h5">${product.price}</Typography>
            <Button variant="contained" color="primary" onClick={() => dispatch(addItem(product))}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Container>
    )
  );
};

export default ProductDetails;
