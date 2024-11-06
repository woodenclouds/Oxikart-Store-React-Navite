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
      fill="#F5B528"
      d="M12.842 16.947A7.546 7.546 0 1 0 6.947 3.053a7.546 7.546 0 0 0 5.895 13.894Z"
    />
    <Path
      fill="#F5B528"
      d="M9.837 17.533c4.175 0 7.585-3.373 7.617-7.534.033-4.16-3.325-7.533-7.5-7.533-4.174 0-7.585 3.373-7.617 7.533-.032 4.161 3.326 7.534 7.5 7.534Z"
    />
    <Path
      fill="#F7D320"
      d="M9.624 17.533c4.174 0 7.585-3.373 7.617-7.534.032-4.16-3.326-7.533-7.5-7.533-4.175 0-7.585 3.373-7.617 7.533-.033 4.161 3.325 7.534 7.5 7.534Z"
    />
    <Path
      fill="#EB8904"
      d="M9.63 16.322c3.502 0 6.364-2.83 6.39-6.322.028-3.49-2.79-6.321-6.292-6.321-3.503 0-6.364 2.83-6.391 6.321-.027 3.492 2.79 6.322 6.293 6.322Z"
    />
    <Path
      fill="#F5B528"
      d="M15.537 10.015a5.878 5.878 0 0 0-5.856-5.872 5.83 5.83 0 0 0-5.855 5.833 5.878 5.878 0 0 0 5.855 5.872 5.83 5.83 0 0 0 5.856-5.833Z"
    />
    <Path
      fill="#EB8904"
      d="M12.472 6.706H6.945l-.05.05v1.009h2.312a1.084 1.084 0 0 1 .95.552H6.896v1.056h3.263a1.084 1.084 0 0 1-.951.56H6.895v.795l3.817 3.447.023.023h1.577l-3.547-3.2h.45a2.16 2.16 0 0 0 2.08-1.618h1.186V8.317h-1.194a2.185 2.185 0 0 0-.226-.561h1.418l-.007-1.05Z"
    />
    <Path fill="#EB8904" d="M12.307 13.915v.279h-1.579v-.28" />
    <Path
      fill="#FFF8D4"
      d="M12.472 6.423H6.945l-.05.05V7.48h2.312a1.088 1.088 0 0 1 .95.56H6.896v1.058h3.263a1.089 1.089 0 0 1-.951.568H6.895v.795l3.817 3.434.023.023h1.577l-3.547-3.204h.45a2.163 2.163 0 0 0 2.08-1.616h1.186V8.04h-1.194a2.203 2.203 0 0 0-.226-.559h1.418l-.007-1.057Z"
    />
  </Svg>
)
export default SvgComponent
