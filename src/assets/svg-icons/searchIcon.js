import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({props, width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}>
    <Path
      stroke="#212121"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12.365 21.62a9.5 9.5 0 0 0 9.5-9.5 9.5 9.5 0 1 0-9.5 9.5ZM22.865 22.62l-2-2"
    />
  </Svg>
);
export default SvgComponent;
