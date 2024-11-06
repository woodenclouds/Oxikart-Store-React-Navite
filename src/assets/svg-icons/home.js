import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props, width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke="#474747"
      strokeWidth={1.5}
      d="M8.454 21.084v-3.251c0-.83.678-1.502 1.513-1.502h3.056c.401 0 .786.158 1.07.44.284.281.443.663.443 1.062v3.25a1.29 1.29 0 0 0 .379.922c.245.245.578.383.925.383h2.085a3.678 3.678 0 0 0 2.598-1.063 3.625 3.625 0 0 0 1.076-2.575V9.49c0-.782-.348-1.522-.952-2.023l-7.091-5.623a3.293 3.293 0 0 0-4.198.076l-6.93 5.547a2.63 2.63 0 0 0-1.027 2.022v9.251c0 2.015 1.645 3.648 3.674 3.648h2.037c.722 0 1.308-.578 1.313-1.295l.029-.01Z"
    />
  </Svg>
)
export default SvgComponent
