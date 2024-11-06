import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BoxIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#007DDC"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    />
    <Path
      stroke="#007DDC"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"
    />
  </Svg>
);
export default BoxIcon;
