import React, { useState, useEffect } from "react"
import { TweenLite, Power1 } from "gsap"

const Tilt = props => {
  const [tilt] = useState(true)
  const [scrollerStyle, setScrollerStyle] = useState("")
  let refScroller = React.createRef()

  const initTransform = {
    translateX: 0,
    translateY: 0,
    translateZ: "500px",
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  }
  const tiltRotation = {
    rotateX: 1, // a relative rotation of -1deg to 1deg on the x-axis
    rotateY: -3, // a relative rotation of -3deg to 3deg on the y-axis
  }
  let win = {}
  useEffect(() => {
    win = { width: window.innerWidth, height: window.innerHeight }
    animate()
  })

  const getMousePos = e => {
    var posx = 0
    var posy = 0
    if (!e) var e = window.event
    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft
      posy =
        e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    return {
      x: posx,
      y: posy,
    }
  }

  const applyRoomTransform = transform => {
    setScrollerStyle(
      `translate3d(${transform.translateX}, ${transform.translateY}, ${transform.translateZ}) rotate3d(1,0,0,${transform.rotateX}) rotate3d(0,1,0,${transform.rotateY}) rotate3d(0,0,1,${transform.rotateZ})`
    )
  }

  const move = ev => {
    ev.persist()
    requestAnimationFrame(() => {
      if (!tilt) return false
      var mousepos = getMousePos(ev),
        // transform values
        rotX = tiltRotation.rotateX
          ? initTransform.rotateX -
            (((2 * tiltRotation.rotateX) / win.height) * mousepos.y -
              tiltRotation.rotateX)
          : 0,
        rotY = tiltRotation.rotateY
          ? initTransform.rotateY -
            (((2 * tiltRotation.rotateY) / win.width) * mousepos.x -
              tiltRotation.rotateY)
          : 0

      // apply transform
      applyRoomTransform({
        translateX: initTransform.translateX,
        translateY: initTransform.translateY,
        translateZ: initTransform.translateZ,
        rotateX: rotX + "deg",
        rotateY: rotY + "deg",
        rotateZ: initTransform.rotateZ,
      })
    })
  }
  const animate = () => {
    TweenLite.to(refScroller, 0.6, {
      transform: "translateZ(500px)",
      delay: 0.6,
      ease: Power1.easeInOut,
    })
  }

  return (
    <div className="scroller-wrap" onMouseMove={move}>
      <div
        className="scroller"
        ref={n => (refScroller = n)}
        style={{ transform: scrollerStyle }}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Tilt
