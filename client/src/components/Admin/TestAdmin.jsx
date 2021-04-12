import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  List,
} from "@material-ui/core";
import {
  Category,
  People,
  ShoppingBasket,
  FileCopy,
  Equalizer,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "@material-ui/icons";
// Component Block
import CategoryComponent from "./Category/Category";
import ProductComponent from "./Product/Product";
import UserComponent from "./User/User";
import OrderComponent from "./Order/Order";
import OrderDetail from "../../components/Order/OrderDetail";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Pannel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <List>
          <Link className="text-primary" to="/admin-temp/category">
            <ListItem button key="Category">
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </Link>{" "}
          <Link to="/admin-temp/product">
            <ListItem button key="Product">
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItem>
          </Link>
          <Link className="text-primary" to="/admin-temp/user">
            <ListItem button key="User">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          </Link>
          <Link className="text-primary" to="/admin-temp/order">
            <ListItem button key="Order">
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItem>
          </Link>
          <Link className="text-primary" to="/admin-temp/chart">
            <ListItem button key="Chart">
              <ListItemIcon>
                <Equalizer />
              </ListItemIcon>
              <ListItemText primary="Chart" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/admin-temp/category" component={CategoryComponent} />
          <Route path="/admin-temp/product" component={ProductComponent} />
          <Route path="/admin-temp/user" component={UserComponent} />
          <Route path="/admin-temp/order" component={OrderComponent} />
        </Switch>
      </main>
    </div>
  );
}
