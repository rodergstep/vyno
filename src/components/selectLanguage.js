import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const SelectLanguage = props => {
  return (
    <div className="swith-language">
      {props.langs.map((lang, i) => (
        <AniLink
          to={`/${lang.link}`}
          key={lang.langKey}
          className={lang.selected ? "selected" : ""}
        >
          {lang.langKey === "uk-UA"
            ? "укр"
            : lang.langKey === "en-US"
            ? "eng"
            : lang.langKey}
          {i !== props.langs.length - 1 ? <span>/</span> : null}
        </AniLink>
      ))}
    </div>
  )
}

SelectLanguage.propTypes = {
  langs: PropTypes.array,
}

export default SelectLanguage
