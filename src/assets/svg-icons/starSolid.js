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
      fill="#239B44"
      d="M12.934.733a.634.634 0 0 1 1.178 0L17.13 8.25c.09.226.302.38.545.397l8.083.548c.57.039.803.753.364 1.12l-6.217 5.194a.634.634 0 0 0-.208.642l1.976 7.856a.634.634 0 0 1-.953.692l-6.86-4.308a.634.634 0 0 0-.675 0L6.324 24.7a.634.634 0 0 1-.952-.692l1.976-7.857a.634.634 0 0 0-.208-.641L.923 10.315a.634.634 0 0 1 .364-1.12l8.083-.548a.634.634 0 0 0 .545-.397l3.02-7.517Z"
    />
  </Svg>
)
export default SvgComponent
