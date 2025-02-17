import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const DeliveryBoyBlue = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <G fill="#007DDC" clipPath="url(#b)">
        <Path d="M16.008 12.719h-.781v-1.05a4.1 4.1 0 0 0 1.757-3.364V6.469h2.93a.586.586 0 0 0 0-1.172H17.37A4.498 4.498 0 0 0 12.883 1 4.497 4.497 0 0 0 8.39 5.492v.39c0 .256.163.472.39.553v1.87a4.1 4.1 0 0 0 1.758 3.364v1.05h-.781c-.948 0-1.878.304-2.642.86H2.258a.586.586 0 0 0-.524.323L.562 16.246a.583.583 0 0 0-.062.262v3.906c0 .324.262.586.586.586h18.828a.586.586 0 0 0 .586-.586v-3.203a4.497 4.497 0 0 0-4.492-4.492ZM12.883 2.172a3.325 3.325 0 0 1 3.314 3.125H9.568a3.325 3.325 0 0 1 3.315-3.125Zm-2.93 6.133V6.469h5.86v1.836a2.933 2.933 0 0 1-2.93 2.93 2.933 2.933 0 0 1-2.93-2.93Zm2.93 4.101c.407 0 .8-.06 1.172-.17V13.5c0 .646-.526 1.172-1.172 1.172A1.173 1.173 0 0 1 11.71 13.5v-1.265c.371.111.765.171 1.172.171ZM2.62 14.75h4.823l.586 1.172H2.034l.586-1.172Zm-.948 2.344H8.39v2.734H1.67v-2.734Zm17.656 2.734H9.563v-3.32a.583.583 0 0 0-.063-.262l-1.045-2.09a3.297 3.297 0 0 1 1.303-.265h.814a2.347 2.347 0 0 0 2.31 1.953c1.16 0 2.125-.846 2.311-1.953h.815c1.83 0 3.32 1.49 3.32 3.32v2.617Z" />
        <Path d="M17.297 16.82h-1.563a.586.586 0 0 0 0 1.172h1.563a.586.586 0 0 0 0-1.172Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v22H.5z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M.5 1h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DeliveryBoyBlue;
