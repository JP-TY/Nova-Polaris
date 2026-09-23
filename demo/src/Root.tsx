import React from 'react';
import {Composition} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {TitleScene} from './TitleScene';
import {ArchitectureScene} from './ArchitectureScene';
import {TraceScene} from './TraceScene';
import {ScoresScene} from './ScoresScene';
import {OutroScene} from './OutroScene';

const FPS = 30;
const SCENES = [120, 180, 210, 150, 90];
const TRANSITION = 12;
const TOTAL = SCENES.reduce((a, b) => a + b, 0) - TRANSITION * (SCENES.length - 1);

export const NovaPolarisDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENES[0]}>
        <TitleScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence durationInFrames={SCENES[1]}>
        <ArchitectureScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({direction: 'from-right'})}
        timing={linearTiming({durationInFrames: TRANSITION})}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES[2]}>
        <TraceScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence durationInFrames={SCENES[3]}>
        <ScoresScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({direction: 'from-right'})}
        timing={linearTiming({durationInFrames: TRANSITION})}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES[4]}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NovaPolarisDemo"
      component={NovaPolarisDemo}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1280}
      height={720}
    />
  );
};
