import * as React from 'react';

import { PositionProperty, FlexDirectionProperty } from 'csstype';

// @todo: bizarre
const absolute: PositionProperty = 'absolute';
const column: FlexDirectionProperty = 'column';

const layoutStyle = {
  position: absolute,
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: column,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%',
  padding: '8rem',
  fontFamily: 'var(--root-type-families-alt)',
  fontStyle: 'italic',
  fontSize: '2rem',
  opacity: 0,
  transition: 'opacity 2s ease'
};

const labelStyle = {
  padding: '4rem',
  color: 'hsl(1, 71%, 36%)',
  opacity: 0,
  transition: 'opacity 0.5s ease'
};

interface Props {
  show?: boolean;
  slow?: boolean;
}

export const SiteLoading: React.StatelessComponent<Props> = props => {
  const { show, slow } = props;
  const labelOpacity = slow ? 1 : 0;
  return (
    <div style={{ ...layoutStyle, opacity: show ? 1 : 0 }}>
      <svg focusable="false" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="9.34496" fill="#a2211f">
          <animate
            attributeName="r"
            values="10;25;5;10"
            keyTimes="0;0.25;0.5;1"
            dur="1s"
            repeatCount="indefinite"
          ></animate>
        </circle>

        <circle cx="25" cy="25" r="7.1078" fill="#2b363d">
          <animate
            attributeName="r"
            values="5;12;7;18;5"
            keyTimes="0;0.25;0.45;0.55;1"
            dur="1s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
      <label style={{ ...labelStyle, opacity: labelOpacity }}>... still loading ...</label>
    </div>
  );
};
