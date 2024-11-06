import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const AddProfile = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M15.417 16.25h-3.333M13.75 17.917v-3.334"
    />
    <Path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.134 9.058a1.516 1.516 0 0 0-.275 0A3.683 3.683 0 0 1 6.3 5.367a3.69 3.69 0 0 1 3.692-3.7c2.042 0 3.7 1.658 3.7 3.7 0 2-1.583 3.625-3.558 3.691ZM9.99 18.175c-1.516 0-3.024-.384-4.174-1.15-2.017-1.35-2.017-3.55 0-4.892 2.291-1.533 6.05-1.533 8.341 0"
    />
  </Svg>
);
export default AddProfile;
