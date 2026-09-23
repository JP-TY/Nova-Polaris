import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts, Typewriter, useEntrance} from './shared';
import {DARK, DARK_PANEL, GROUND, INK_ON_DARK, LINE, RESOLVE, ROUTE, SUCCESS} from './theme';
import {TRACE_STEPS} from './theme';

const DOTS = [ROUTE, GROUND, RESOLVE, SUCCESS];

export const TraceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);
  return (
    <AbsoluteFill style={{background: DARK, color: INK_ON_DARK, fontFamily: Fonts.sans, padding: 56}}>
      <div style={{opacity: head.opacity, transform: `translateY(${head.y}px)`}}>
        <div style={{fontFamily: Fonts.serif, fontSize: 52}}>One request, traced</div>
        <div style={{fontSize: 22, opacity: 0.72, height: 34, marginTop: 8}}>
          <Typewriter text="CUST-001: I want to return my headphones from ORD-27176" startAt={0.4 * fps} />
        </div>
      </div>
      <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14}}>
        {TRACE_STEPS.map((s, i) => {
          const start = (1.6 + i * 1.2) * fps;
          const op = interpolate(frame, [start, start + 0.4 * fps], [0, 1], {extrapolateRight: 'clamp'});
          const x = interpolate(frame, [start, start + 0.4 * fps], [-18, 0], {extrapolateRight: 'clamp'});
          return (
            <div
              key={s.label}
              style={{
                opacity: op,
                transform: `translateX(${x}px)`,
                background: DARK_PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 12,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{width: 12, height: 12, borderRadius: 6, background: DOTS[i % DOTS.length]}} />
              <div className="mono" style={{fontFamily: 'monospace', fontSize: 21, fontWeight: 600}}>
                v{i}
              </div>
              <div style={{fontSize: 21}}>{s.label}</div>
              <div style={{fontSize: 18, opacity: 0.65}}>{s.detail}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
