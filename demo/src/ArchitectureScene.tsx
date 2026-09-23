import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts, useEntrance} from './shared';
import {AGENTS, INK, INK_SOFT, LINE, PANEL, PAPER, ROUTE} from './theme';

const KBS = ['returns', 'shipping', 'warranty'];

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);
  return (
    <AbsoluteFill style={{background: PAPER, color: INK, fontFamily: Fonts.sans, padding: 56}}>
      <div style={{...head, opacity: head.opacity, transform: `translateY(${head.y}px)`}}>
        <div style={{fontFamily: Fonts.serif, fontSize: 52}}>Orchestrator to workers</div>
        <div style={{fontSize: 22, color: INK_SOFT}}>Haiku routes. Sonnet reasons. State is shared.</div>
      </div>
      <div
        style={{
          marginTop: 30,
          border: `2px solid ${INK}`,
          borderRadius: 14,
          padding: '14px 22px',
          fontSize: 26,
          fontWeight: 600,
          width: 460,
          opacity: head.opacity,
        }}
      >
        OrchestratorAgent
        <span style={{fontWeight: 400, fontSize: 19, color: INK_SOFT}}> · WorkflowState v0 to vN</span>
      </div>
      <div style={{display: 'flex', gap: 20, marginTop: 26}}>
        {AGENTS.map((a, i) => {
          const p = spring({frame: frame - (0.5 + i * 0.35) * fps, fps, config: {damping: 200}});
          const op = Math.max(0, Math.min(1, p));
          return (
            <div
              key={a.name}
              style={{
                opacity: op,
                transform: `translateY(${(1 - p) * 26}px)`,
                flex: 1,
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                padding: '18px 20px',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 14, height: 14, borderRadius: 7, background: a.color}} />
                <div style={{fontSize: 24, fontWeight: 600}}>{a.name}</div>
              </div>
              <div style={{fontSize: 18, color: INK_SOFT, marginTop: 6}}>{a.desc}</div>
              {a.name === 'PolicyAgent' && (
                <div style={{display: 'flex', gap: 8, marginTop: 12}}>
                  {KBS.map((k) => (
                    <div
                      key={k}
                      style={{
                        fontSize: 15,
                        border: `1px dashed ${ROUTE}`,
                        borderRadius: 8,
                        padding: '3px 10px',
                        color: INK,
                      }}
                    >
                      KB:{k}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
