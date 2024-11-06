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
      stroke="#007DDC"
      strokeWidth={1.5}
      d="M8.454 21.084v-3.251c0-.83.678-1.502 1.514-1.502h3.055c.402 0 .787.158 1.07.44.284.281.444.663.444 1.062v3.25a1.29 1.29 0 0 0 .378.922c.245.245.578.383.926.383h2.084a3.678 3.678 0 0 0 2.598-1.063 3.625 3.625 0 0 0 1.076-2.575V9.49c0-.782-.348-1.522-.951-2.023l-7.092-5.623a3.293 3.293 0 0 0-4.198.076l-6.93 5.547a2.63 2.63 0 0 0-1.027 2.022v9.251c0 2.015 1.645 3.648 3.674 3.648h2.037c.722 0 1.308-.578 1.314-1.295l.028-.01Z"
    />
  </Svg>
)
export default SvgComponent
