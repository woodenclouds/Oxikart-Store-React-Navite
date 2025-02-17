import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props, width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#007DDC"
      fillRule="evenodd"
      d="m2.878 3.495-.102-.011a.75.75 0 0 0-.765.622L2 4.207a.75.75 0 0 0 .622.766l1.509.26.914 10.896.02.164A2.552 2.552 0 0 0 7.59 18.47h10.912l.164-.006a2.554 2.554 0 0 0 2.363-2.183l.949-6.558.016-.15a2.09 2.09 0 0 0-2.085-2.24H5.812L5.577 4.53l-.018-.111a.75.75 0 0 0-.601-.565l-2.08-.36Zm4.596 13.468a1.052 1.052 0 0 1-.934-.959l-.602-7.172h13.97l.089.007a.59.59 0 0 1 .496.669l-.949 6.558-.023.117c-.12.459-.536.786-1.02.786H7.59l-.116-.006Zm-1.566 4.606a1.515 1.515 0 1 1 3.03 0 1.515 1.515 0 0 1-3.03 0Zm11.251 0a1.516 1.516 0 1 1 3.032.001 1.516 1.516 0 0 1-3.032-.001Zm.49-9.79a.75.75 0 0 0-.75-.75h-2.774l-.101.007a.75.75 0 0 0 .101 1.493h2.773l.102-.007a.75.75 0 0 0 .648-.743Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
