import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const SelectLanguage = props => {
  console.log(props)
  return (
    <div className="swith-language">
      {props.langs.map((lang, i) => (
        <AniLink to={`/${lang}`} key={lang} selected={`/${props.locale}`}>
          {lang === "uk-UA" ? "укр" : lang === "en-US" ? "eng" : lang}
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
