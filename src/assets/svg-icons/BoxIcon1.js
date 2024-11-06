import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function BoxIcon1(props) {
  return (
    <Svg
      width={26}
      height={24}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        stroke="#007DDC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
        stroke="#007DDC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        width={10.2857}
        height={10.2857}
        rx={5.14286}
        transform="matrix(-1 0 0 1 25.714 12)"
        fill="#F3F7FA"
      />
      <Path
        d="M19.479 21.287a4.287 4.287 0 01-3.193-4.144 4.276 4.276 0 014.286-4.286c2.858 0 4.285 2.383 4.285 2.383m0 0v-1.954m0 1.954h-1.902"
        stroke="#007DDC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.857 17.143a4.287 4.287 0 01-4.285 4.286"
        stroke="#007DDC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
    </Svg>
  )
}

export default BoxIcon1;
