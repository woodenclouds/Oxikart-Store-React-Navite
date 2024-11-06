import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={20}
    fill="none"
    {...props}>
    <Path
      fill="#474747"
      fillRule="evenodd"
      d="M8.004.833c-2.69 0-4.87 2.19-4.87 4.891 0 2.7 2.18 4.89 4.87 4.89s4.87-2.19 4.87-4.89c0-2.701-2.18-4.89-4.87-4.89Zm0 1.327a3.556 3.556 0 0 1 3.548 3.564 3.556 3.556 0 0 1-3.548 3.563 3.556 3.556 0 0 1-3.549-3.563A3.556 3.556 0 0 1 8.004 2.16ZM6.01 12.586a15.32 15.32 0 0 0-2.145.303c-1.372.283-2.469.848-2.936 1.786a2.686 2.686 0 0 0-.006 2.306c.448.927 1.418 1.452 2.727 1.743l.235.049a14.1 14.1 0 0 0 2.138.31c.062.019.209.035.37.044l.132.005.26.001c1.043.058 2.124.041 3.2-.05a14.37 14.37 0 0 0 1.724-.225l.429-.089c1.414-.278 2.472-.809 2.936-1.787a2.682 2.682 0 0 0 0-2.295c-.462-.976-1.508-1.502-2.947-1.799-.565-.12-1.139-.21-1.717-.266l-.422-.036a22.625 22.625 0 0 0-3.978 0Zm3.862 1.322h.012c.663.047 1.322.14 1.973.28 1.07.22 1.795.585 2.024 1.069.173.365.173.79 0 1.155-.214.452-.866.801-1.808 1.015l-.206.044c-.663.148-1.32.243-1.982.288a22.035 22.035 0 0 1-3.064.048l-.36-.006a1.77 1.77 0 0 1-.264-.03c-.62-.047-1.177-.121-1.718-.228l-.323-.069c-1.072-.21-1.804-.577-2.042-1.067a1.351 1.351 0 0 1 .001-1.147c.23-.464 1.007-.863 2.021-1.072.655-.14 1.314-.233 1.977-.28 1.26-.11 2.513-.11 3.76 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
