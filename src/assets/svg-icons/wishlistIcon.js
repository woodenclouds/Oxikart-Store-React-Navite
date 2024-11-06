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
      fill="#212121"
      fillRule="evenodd"
      d="M3.124 13.427c-1.378-4.28.455-8.767 4.565-10.09a7.345 7.345 0 0 1 5.877.605l.294.177.3-.178a7.355 7.355 0 0 1 5.577-.693l.297.089c4.111 1.323 5.952 5.812 4.569 10.107a13.904 13.904 0 0 1-3.332 5.303 38.836 38.836 0 0 1-6.71 5.221l-.257.16a.82.82 0 0 1-.853.007l-.275-.164a38.863 38.863 0 0 1-6.722-5.231 13.91 13.91 0 0 1-3.33-5.313Zm10.26-7.65-.22-.157a5.709 5.709 0 0 0-4.973-.726C5.007 5.92 3.564 9.452 4.677 12.91a12.248 12.248 0 0 0 2.925 4.665 37.188 37.188 0 0 0 6.423 4.999l-.16-.101.524-.33a37.203 37.203 0 0 0 5.143-4l.591-.56a12.24 12.24 0 0 0 2.927-4.656c1.117-3.47-.332-7.006-3.517-8.031a5.72 5.72 0 0 0-5.18.872.82.82 0 0 1-.969.01Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
