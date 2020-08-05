import React from "react"
import { Formik } from "formik"
import { useIntl } from "react-intl"

const OrderForm = props => {
  const intl = useIntl()
  return (
    <div>
      <h4>Залиште Ваші дані, щоб ми могли зв'язатися з вами</h4>
      <Formik
        initialValues={{ email: "", fullname: "" }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = "Required"
            errors.fullname = "Required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address"
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.sendOrder(values)
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <input
                type="text"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
                placeholder={intl.formatMessage({ id: "yourName" })}
              />
              {errors.fullname && touched.fullname && errors.fullname}
            </div>
            <div className="form__field">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={intl.formatMessage({ id: "yourEmail" })}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div className="form__footer">
              <button
                type="submit"
                className="btn primary"
                disabled={isSubmitting || (!touched.fullname && !touched.email)}
              >
                Замовити картини
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default OrderForm
