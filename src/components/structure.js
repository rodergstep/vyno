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
            { link: "/en-US/about/", text: "About me" },
          ]
        : [
            { link: "/uk-UA/", text: "Головна" },
            { link: "/uk-UA/gallery/", text: "Картини" },
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
              {/* <svg
                viewBox="-110 1 511 511.99996"
                xmlns="http://www.w3.org/2000/svg"
                className="nav__socials-icon"
              >
                <path d="m180 512h-81.992188c-13.695312 0-24.835937-11.140625-24.835937-24.835938v-184.9375h-47.835937c-13.695313 0-24.835938-11.144531-24.835938-24.835937v-79.246094c0-13.695312 11.140625-24.835937 24.835938-24.835937h47.835937v-39.683594c0-39.347656 12.355469-72.824219 35.726563-96.804688 23.476562-24.089843 56.285156-36.820312 94.878906-36.820312l62.53125.101562c13.671875.023438 24.792968 11.164063 24.792968 24.835938v73.578125c0 13.695313-11.136718 24.835937-24.828124 24.835937l-42.101563.015626c-12.839844 0-16.109375 2.574218-16.808594 3.363281-1.152343 1.308593-2.523437 5.007812-2.523437 15.222656v31.351563h58.269531c4.386719 0 8.636719 1.082031 12.289063 3.121093 7.878906 4.402344 12.777343 12.726563 12.777343 21.722657l-.03125 79.246093c0 13.6875-11.140625 24.828125-24.835937 24.828125h-58.46875v184.941406c0 13.695313-11.144532 24.835938-24.839844 24.835938zm-76.8125-30.015625h71.632812v-193.195313c0-9.144531 7.441407-16.582031 16.582032-16.582031h66.726562l.027344-68.882812h-66.757812c-9.140626 0-16.578126-7.4375-16.578126-16.582031v-44.789063c0-11.726563 1.191407-25.0625 10.042969-35.085937 10.695313-12.117188 27.550781-13.515626 39.300781-13.515626l36.921876-.015624v-63.226563l-57.332032-.09375c-62.023437 0-100.566406 39.703125-100.566406 103.609375v53.117188c0 9.140624-7.4375 16.582031-16.578125 16.582031h-56.09375v68.882812h56.09375c9.140625 0 16.578125 7.4375 16.578125 16.582031zm163.0625-451.867187h.003906zm0 0" />
              </svg> */}

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
