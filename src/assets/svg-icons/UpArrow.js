import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const UpArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#007DDC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.833 13 10 7.167 4.167 13"
    />
  </Svg>
);
export default UpArrow;
