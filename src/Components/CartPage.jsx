import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../Redux/Slice/cartSlice";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, IconButton, Button, Box 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrement = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  return (
    <Box style={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => handleDecrement(item.id, item.quantity)} size="small" color="primary">
                      <RemoveIcon />
                    </IconButton>
                    <Typography style={{ margin: "0 8px" }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleIncrement(item.id, item.quantity)} size="small" color="primary">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => dispatch(removeItem(item.id))} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" style={{ textAlign: "right", marginTop: "20px" }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: "20px" }} 
        fullWidth 
        disabled={cart.length === 0}
      >
        Checkout
      </Button>
    </Box>
  );
};
