import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BackIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}>
    <Path
      fill="#333335"
      fillRule="evenodd"
      d="M21.983 13.892a.895.895 0 0 0 .766-.891c0-.497-.397-.9-.886-.9H6.28l5.63-5.69.085-.1a.91.91 0 0 0-.083-1.171.877.877 0 0 0-1.254-.003l-7.15 7.226-.005.007a.903.903 0 0 0-.074.087l-.007.007a.91.91 0 0 0 .086 1.174l7.15 7.225.1.087c.348.26.84.23 1.154-.09a.909.909 0 0 0-.003-1.272L6.281 13.9h15.582l.12-.008Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default BackIcon;
