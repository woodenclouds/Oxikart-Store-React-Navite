import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
const ReturnIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={22}
    fill="none"
    {...props}>
    <Path
      stroke="#474747"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m15.625 8.617-8.25-4.758M19.75 14.667V7.333a1.833 1.833 0 0 0-.917-1.586l-6.416-3.666a1.833 1.833 0 0 0-1.834 0L4.167 5.747a1.833 1.833 0 0 0-.917 1.586v7.334a1.834 1.834 0 0 0 .917 1.586l6.416 3.666a1.834 1.834 0 0 0 1.834 0l6.416-3.666a1.834 1.834 0 0 0 .917-1.586Z"
    />
    <Path
      stroke="#474747"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m3.497 6.38 8.003 4.63 8.002-4.63M11.5 20.24V11"
    />
    <Rect width={11.429} height={11.429} x={13} y={10} fill="#fff" rx={5.714} />
    <Rect width={9.429} height={9.429} x={14} y={11} fill="#fff" rx={4.714} />
    <Path
      stroke="#474747"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M19.716 19.513a3.93 3.93 0 0 0 2.927-3.799 3.92 3.92 0 0 0-3.929-3.928c-2.62 0-3.928 2.184-3.928 2.184m0 0v-1.791m0 1.791h1.744"
    />
    <Path
      stroke="#474747"
      strokeDasharray="2 2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M14.786 15.714a3.93 3.93 0 0 0 3.928 3.929"
    />
  </Svg>
);
export default ReturnIcon;
