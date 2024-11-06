import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightArrow(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.78 9.618A.62.62 0 012.25 9c0-.344.275-.623.614-.623h10.787L9.754 4.439l-.06-.07a.63.63 0 01.058-.81.607.607 0 01.868-.003l4.95 5.003.004.005a.634.634 0 01.051.06l.005.005a.63.63 0 01-.06.813l-4.95 5.002-.069.06a.607.607 0 01-.799-.062.63.63 0 01.002-.881l3.897-3.938H2.864l-.083-.005z"
        fill="#007DDC"
      />
    </Svg>
  )
}

export default RightArrow;
