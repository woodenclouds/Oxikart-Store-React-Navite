import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = ({props, width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M4.5.775 5.558 3.82l3.222.066-2.568 1.947.933 3.084L4.5 7.076l-2.645 1.84.933-3.084L.22 3.885l3.222-.066L4.5.775Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .775h9v8H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
