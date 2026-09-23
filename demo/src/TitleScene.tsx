import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {DarkFill, Fonts, Star, Typewriter, useEntrance} from './shared';
import {INK_ON_DARK, ROUTE} from './theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {opacity, y} = useEntrance(0);
  const tagOpacity = interpolate(frame, [1.6 * fps, 2.4 * fps], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <DarkFill>
      <AbsoluteFill style={{opacity, transform: `translateY(${y}px)`, alignItems: 'center', justifyContent: 'center'}}>
        <Star size={92} />
        <div style={{height: 28}} />
        <div style={{fontFamily: Fonts.serif, fontSize: 110, fontWeight: 400, letterSpacing: 2}}>
          Nova-Polaris
        </div>
        <div style={{height: 14}} />
        <div style={{fontSize: 34, color: ROUTE, fontWeight: 600, opacity: tagOpacity, height: 48}}>
          <Typewriter text="Route. Ground. Resolve." startAt={1.4 * fps} charsPerSec={22} />
        </div>
        <div style={{height: 18}} />
        <div style={{fontSize: 22, color: INK_ON_DARK, opacity: 0.72}}>
          Multi-agent customer support on Bedrock AgentCore
        </div>
      </AbsoluteFill>
    </DarkFill>
  );
};
