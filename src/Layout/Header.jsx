import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../Redux/Slice/categoriesSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories?.items || []);
  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar>
        {/* Menu Button */}
        <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          MyStore
        </Typography>

        {/* Navigation Buttons */}
        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      {/* Drawer for Categories */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List style={{ width: "250px" }}>
          <Typography variant="h6" style={{ margin: "16px", fontWeight: "bold" }}>
            Categories
          </Typography>
          {categories.map((category) => (
            <ListItem
              button
              key={category}
              onClick={() => {
                navigate(`/category/${category}`);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};
