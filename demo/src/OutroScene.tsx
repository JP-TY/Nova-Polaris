import React from 'react';
import {AbsoluteFill} from 'remotion';
import {DarkFill, Fonts, Star, useEntrance} from './shared';
import {INK_ON_DARK} from './theme';

export const OutroScene: React.FC = () => {
  const {opacity, y} = useEntrance(0);
  return (
    <DarkFill>
      <AbsoluteFill style={{opacity, transform: `translateY(${y}px)`, alignItems: 'center', justifyContent: 'center'}}>
        <Star size={64} />
        <div style={{height: 22}} />
        <div style={{fontFamily: Fonts.serif, fontSize: 72}}>Route. Ground. Resolve.</div>
        <div style={{height: 12}} />
        <div style={{fontSize: 24, color: INK_ON_DARK, opacity: 0.75}}>
          Nova-Polaris · Strands Agents + Bedrock AgentCore
        </div>
      </AbsoluteFill>
    </DarkFill>
  );
};
