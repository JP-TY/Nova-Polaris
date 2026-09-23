import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts, useEntrance} from './shared';
import {INK, INK_SOFT, LINE, PANEL, PAPER, SUCCESS} from './theme';
import {SCORES} from './theme';

export const ScoresScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);
  const total = interpolate(frame, [0.4 * fps, 1.6 * fps], [0, 120], {
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{background: PAPER, color: INK, fontFamily: Fonts.sans, padding: 56}}>
      <div style={{display: 'flex', gap: 48, alignItems: 'center', height: '100%'}}>
        <div style={{opacity: head.opacity}}>
          <div style={{fontFamily: Fonts.serif, fontSize: 120, lineHeight: 1}}>
            {Math.round(total)}
            <span style={{fontSize: 48, color: INK_SOFT}}>/120</span>
          </div>
          <div style={{fontSize: 24, color: INK_SOFT, marginTop: 8}}>automated suite, all green</div>
          <div style={{fontSize: 20, marginTop: 18}}>
            Guardrailed · memorized · traced to X-Ray
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14}}>
          {SCORES.map((s, i) => {
            const w = interpolate(frame, [(0.7 + i * 0.25) * fps, (1.5 + i * 0.25) * fps], [0, 100], {
              extrapolateRight: 'clamp',
            });
            return (
              <div key={s.task}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 20}}>
                  <span>{s.task}</span>
                  <span style={{fontWeight: 600}}>{s.pts}</span>
                </div>
                <div style={{height: 12, borderRadius: 6, background: LINE, marginTop: 6}}>
                  <div style={{width: `${w}%`, height: '100%', borderRadius: 6, background: SUCCESS}} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
