import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadSans} from '@remotion/google-fonts/IBMPlexSans';
import {DARK, INK_ON_DARK, ROUTE} from './theme';

const {fontFamily: serif} = loadSerif('normal', {weights: ['400'], subsets: ['latin']});
const {fontFamily: sans} = loadSans('normal', {weights: ['400', '600'], subsets: ['latin']});

export const Fonts = {serif, sans};

export const Star: React.FC<{size: number}> = ({size}) => (
  <div
    style={{
      width: size,
      height: size,
      background: ROUTE,
      clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
    }}
  />
);

export const useEntrance = (delay = 0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(p, [0, 1], [0, 1], {extrapolateRight: 'clamp'});
  const y = interpolate(p, [0, 1], [24, 0], {extrapolateRight: 'clamp'});
  return {opacity, y};
};

export const Typewriter: React.FC<{text: string; startAt?: number; charsPerSec?: number}> = ({
  text,
  startAt = 0,
  charsPerSec = 40,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const elapsed = Math.max(0, frame - startAt) / fps;
  const n = Math.min(text.length, Math.floor(elapsed * charsPerSec));
  return <span>{text.slice(0, n)}</span>;
};

export const DarkFill: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: DARK, color: INK_ON_DARK, fontFamily: sans}}>{children}</AbsoluteFill>
);
