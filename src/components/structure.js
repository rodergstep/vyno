import React from "react"
import { AppConsumer } from "../utils/context"
import Aside from "./aside"
import { useCart } from "../utils/cartContext"
import { Link } from "gatsby"

const Structure = props => {
  const isCartPage =
    typeof window !== "undefined" && location.pathname.includes("cart")
  const [cart] = useCart()

  return (
    <AppConsumer>
      {context => {
        return (
          <div className={`page-wrap ${props.pageclass}`}>
            <Aside
              langsMenu={context.langsMenu}
              locale={context.locale}
              aside={context.aside}
            />
            <main className="main">{props.children}</main>
            {/* {!isCartPage && cart && cart.length > 0 && (
              <Link to={`/${context.locale}/cart`} className="cart-sticked">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cart-sticked__icon"
                  viewBox="0 0 512.001 512.001"
                >
                  <g>
                    <g>
                      <path
                        d="M484.158,325.327h-13.964v-187.4c0-4.328-3.509-7.837-7.837-7.837c-4.329,0-7.837,3.509-7.837,7.837v187.4H57.481V73.08
			h112.949v10.085c0,7.203,5.859,13.061,13.061,13.061h40.117c4.329,0,7.837-3.509,7.837-7.837c0-4.328-3.508-7.837-7.837-7.837
			h-37.506V51.722h139.794v28.831H258.09c-4.329,0-7.837,3.509-7.837,7.837s3.508,7.837,7.837,7.837h70.42
			c7.201,0,13.061-5.859,13.061-13.061V73.08h112.949v31.41c0,4.328,3.508,7.837,7.837,7.837c4.328,0,7.837-3.509,7.837-7.837
			V70.468c0-7.203-5.86-13.061-13.061-13.061H341.571V49.11c0-7.203-5.86-13.061-13.061-13.061h-37.405V13.061
			C291.105,5.859,285.246,0,278.044,0h-44.085c-7.203,0-13.061,5.859-13.061,13.061v22.988h-37.405
			c-7.202,0-13.061,5.859-13.061,13.061v8.296H54.869c-7.201,0-13.061,5.86-13.061,13.061v254.859H27.843
			c-7.305,0-13.249,5.943-13.249,13.248v28.755c0,7.305,5.943,13.248,13.249,13.248h103.906L76.093,496.054
			c-1.791,3.714-1.661,7.684,0.355,10.895c2.017,3.21,5.537,5.052,9.66,5.052h29.895c5.881,0,12.001-3.844,14.552-9.141
			l18.509-38.402h77.485v34.482c0,7.202,5.859,13.061,13.061,13.061h32.777c7.202,0,13.061-5.859,13.061-13.061v-34.482h20.706
			c4.329,0,7.837-3.509,7.837-7.837c0-4.328-3.508-7.837-7.837-7.837H156.619l7.129-14.794h184.504l7.129,14.794h-17.879
			c-4.329,0-7.837,3.509-7.837,7.837c0,4.328,3.508,7.837,7.837,7.837h25.434l18.508,38.401c2.552,5.297,8.673,9.142,14.553,9.142
			h29.895c4.123,0,7.643-1.841,9.66-5.052c2.017-3.21,2.146-7.182,0.355-10.894l-55.654-115.477h18.898
			c4.329,0,7.837-3.509,7.837-7.837c0-4.328-3.508-7.837-7.837-7.837H30.268v-4.115h123.993c4.329,0,7.837-3.509,7.837-7.837
			s-3.508-7.837-7.837-7.837H30.268V341h451.465v23.904h-51.234c-4.329,0-7.837,3.509-7.837,7.837c0,4.328,3.508,7.837,7.837,7.837
			h53.66c7.305,0,13.249-5.943,13.249-13.248v-28.755C497.406,331.27,491.463,325.327,484.158,325.327z M236.57,15.673h38.861
			v20.376h-11.593v-5.747c0-4.328-3.508-7.837-7.837-7.837c-4.329,0-7.837,3.509-7.837,7.837v5.747H236.57V15.673z M242.224,464.457
			h27.553v31.869h-27.553V464.457z M362.854,380.577v0.001l55.786,115.749h-22.469c-0.208-0.071-0.528-0.272-0.681-0.428
			l-55.58-115.321H362.854z M285.451,380.578h37.058l18.19,37.74h-55.248V380.578z M248.164,380.578v24.32
			c0,4.328,3.508,7.837,7.837,7.837c4.329,0,7.837-3.509,7.837-7.837v-24.32h5.94v37.74h-27.553v-37.74H248.164z M226.55,380.578
			v37.74h-55.248l18.19-37.74H226.55z M172.092,380.578l-55.58,115.32c-0.154,0.156-0.473,0.356-0.681,0.428H93.361l55.787-115.749
			H172.092z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M209.239,60.594c-1.463-1.452-3.479-2.288-5.539-2.288c-2.069,0-4.087,0.836-5.548,2.288
			c-1.452,1.463-2.288,3.48-2.288,5.548c0,2.058,0.837,4.075,2.288,5.538c1.462,1.452,3.479,2.299,5.548,2.299
			c2.06,0,4.075-0.846,5.539-2.299c1.462-1.463,2.298-3.479,2.298-5.538C211.537,64.073,210.701,62.057,209.239,60.594z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M313.842,60.594c-1.452-1.452-3.479-2.288-5.538-2.288s-4.086,0.836-5.538,2.288c-1.463,1.463-2.299,3.48-2.299,5.548
			c0,2.058,0.836,4.075,2.299,5.538c1.452,1.452,3.479,2.288,5.538,2.288s4.087-0.836,5.538-2.288
			c1.463-1.463,2.299-3.479,2.299-5.538C316.141,64.073,315.305,62.057,313.842,60.594z"
                      />
                    </g>
                  </g>
                </svg>
                <span className="cart-sticked__pieces">{cart.length}</span>
              </Link>
            )} */}
          </div>
        )
      }}
    </AppConsumer>
  )
}

export default Structure
