import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TimeIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.667 8A6.67 6.67 0 018 14.667 6.67 6.67 0 011.333 8 6.67 6.67 0 018 1.333 6.67 6.67 0 0114.667 8z"
        stroke="#474747"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.474 10.12L8.407 8.887c-.36-.214-.653-.727-.653-1.147V5.006"
        stroke="#474747"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default TimeIcon
