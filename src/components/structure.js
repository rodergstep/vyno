import React from "react";
import { Link } from "gatsby";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FacebookIcon from "@material-ui/icons/Facebook";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SelectLanguage from "./selectLanguage";
import srcMainLogo from "../images/main-logo.png";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menu =
    props.langs[0].langKey === "uk-UA" && props.langs[0].selected === true
      ? [
          { link: "/uk-UA/", text: "Картини" },
          { link: "/uk-UA/", text: "Поезія" },
          { link: "/uk-UA/about/", text: "Про мене" }
        ]
      : [
          { link: "/en-US/", text: "Paints" },
          { link: "/en-US/", text: "Poetry" },
          { link: "/en-US/about/", text: "About me" }
        ];
  const drawer = langs => {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <img
            src={srcMainLogo}
            alt="Viktor Vynogradov"
            className="main-logo"
          />
        </Link>
        <div className="nav">
          <ul className="nav__list">
            {menu.map((item, index) => (
              <li key={item.text}>
                <Link to={item.link} className="nav__link">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <SelectLanguage langs={langs} />
          <a
            href="https://www.facebook.com/viktor.vynogradov.artist"
            target="_blank"
            className="nav__socials"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer(props.langs)}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer(props.langs)}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
