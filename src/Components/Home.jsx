import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory} from "../Redux/Slice/productsSlice";
import { addItem } from "../Redux/Slice/cartSlice";
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";

 const HomePage = () => {
  const { category } = useParams();
  const { items, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByCategory(category || "electronics"));
  }, [dispatch, category]);

  if (status === "loading") return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;

  return (
    <>
    <Typography variant="h4" style={{ margin: "20px", textAlign: "center", fontWeight: "bold" }} gutterBottom>
      {category ? category[0].toUpperCase() + category.slice(1) : "All"}
    </Typography>
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {items.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain" }}
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>{product.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => dispatch(addItem(product))}
              >
                Add to Cart
              </Button>
              <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  View Item
                </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default HomePage;