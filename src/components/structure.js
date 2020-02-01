import React, { useState, useRef, useEffect } from "react"
import { TimelineMax, TweenLite, TimelineLite, Power1, Power2 } from "gsap"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import FacebookIcon from "@material-ui/icons/Facebook"
import { AppConsumer } from "../utils/context"
import SelectLanguage from "./selectLanguage"
import srcMainLogo from "../images/main-logo.jpg"

const Structure = props => {
  const langs = props.data.site.siteMetadata.languages.langs

  const Header = (langs, locale) => {
    const menu =
      locale === "en-US"
        ? [
            { link: "/en-US/", text: "Main" },
            { link: "/en-US/gallery/", text: "Paints" },
            { link: "/en-US/poetry/", text: "Poetry" },
            { link: "/en-US/about/", text: "About me" },
          ]
        : [
            { link: "/uk-UA/", text: "Головна" },
            { link: "/uk-UA/gallery/", text: "Картини" },
            { link: "/uk-UA/poetry/", text: "Поезія" },
            { link: "/uk-UA/about/", text: "Про мене" },
          ]
    return (
      <header className="header">
        <div className="header__inner">
          {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton> */}
          {/* <AniLink fade to={`/${props.locale}/`}>
            <img
              src={srcMainLogo}
              alt="Viktor Vynogradov"
              className="main-logo"
            />
          </AniLink>*/}
          <div className="nav">
            <ul className="nav__list">
              {menu.map((item, index) => (
                <li key={item.text}>
                  <AniLink fade to={item.link} className="nav__link">
                    {item.text}
                  </AniLink>
                </li>
              ))}
            </ul>
            <SelectLanguage langs={langs} locale={locale} />
            <a
              href="https://www.facebook.com/viktor.vynogradov.artist"
              target="_blank"
              className="nav__socials"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="nav__socials-icon"
                viewBox="0 0 32 32"
              >
                <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
              </svg>
            </a>
          </div>
        </div>
      </header>
    )
  }

  return (
    <AppConsumer>
      {context => {
        return (
          <div className={`page-wrap ${props.pageclass}`}>
            {Header(langs, context.locale)}
            <main className="main">{props.children}</main>
          </div>
        )
      }}
    </AppConsumer>
  )
}

export default Structure
