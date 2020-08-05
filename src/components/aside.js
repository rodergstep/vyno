import React, { useState } from "react"
import Img from "gatsby-image"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import SelectLanguage from "./selectLanguage"

const Aside = ({ langsMenu, locale, aside }) => {
  const [asideClassName, toggleAside] = useState(false)
  const menu =
    locale === "en-US"
      ? [
          { link: "/en-US/", text: "Main" },
          { link: "/en-US/gallery/", text: "Paints" },
          { link: "/en-US/poetry/", text: "Poetry" },
          { link: "/en-US/about/", text: "About the author" },
        ]
      : [
          { link: "/uk-UA/", text: "Головна" },
          { link: "/uk-UA/gallery/", text: "Картини" },
          { link: "/uk-UA/poetry/", text: "Поезія" },
          { link: "/uk-UA/about/", text: "Про автора" },
        ]
  return (
    <aside className={`aside ${asideClassName ? "is-open" : ""}`}>
      <div className="topbar">
        <AniLink fade to={`/${locale}/`} className="topbar__logoname">
          <h2>{aside && aside.author_name}</h2>
        </AniLink>
        <button
          className="btn transparent btn--nav-toggler"
          onClick={() => toggleAside(!asideClassName)}
        >
          <MenuIcon />
        </button>
      </div>
      <div className="aside__inner">
        <button
          className="btn transparent btn--nav-toggler"
          onClick={() => toggleAside(!asideClassName)}
        >
          <CloseIcon />
        </button>
        <AniLink fade to={`/${locale}/`} className="aside__header">
          <figure>
            {aside && aside.avatar && (
              <Img
                fluid={[{ ...aside.avatar.fluid }]}
                className="main-logo"
                fadeIn
              />
            )}
          </figure>
          <figcaption className="author">
            {aside && aside.author_name}
          </figcaption>
        </AniLink>

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
        </div>
        <div className="aside__footer">
          <SelectLanguage langs={langsMenu} locale={locale} />
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
    </aside>
  )
}
export default Aside
