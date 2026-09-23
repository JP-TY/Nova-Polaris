import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts, useEntrance} from './shared';
import {
  DANGER,
  FEATURES,
  GROUND,
  INK,
  INK_SOFT,
  LINE,
  PANEL,
  PAPER,
  RESOLVE,
  ROUTE,
  SUCCESS,
} from './theme';

const ACCENT: Record<string, string> = {
  danger: DANGER,
  route: ROUTE,
  ground: GROUND,
  resolve: RESOLVE,
  success: SUCCESS,
};

const ICON: Record<string, React.ReactNode> = {
  Guardrails: (
    <path d="M12 2 L20 6 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6 Z" fill="currentColor" />
  ),
  'AgentCore Memory': (
    <>
      <rect x="4" y="5" width="16" height="5" rx="1.5" fill="currentColor" />
      <rect x="4" y="12" width="16" height="5" rx="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="7.5" cy="7.5" r="1" fill={PAPER} />
      <circle cx="7.5" cy="14.5" r="1" fill={PAPER} />
    </>
  ),
  'Knowledge Bases': (
    <>
      <path d="M4 8 L12 4 L20 8 L12 12 Z" fill="currentColor" />
      <path d="M4 12 L12 16 L20 12" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 16 L12 20 L20 16" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  WorkflowState: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
      <path d="M11 7 H17 V13" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  Observability: (
    <>
      <circle cx="5" cy="12" r="2.5" fill="currentColor" />
      <circle cx="19" cy="6" r="2.5" fill="currentColor" />
      <circle cx="19" cy="18" r="2.5" fill="currentColor" />
      <path d="M7.5 11 L16.5 7 M7.5 13 L16.5 17" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  Evals: (
    <path
      d="M4 12 L10 18 L20 6"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);

  return (
    <AbsoluteFill style={{background: PAPER, color: INK, fontFamily: Fonts.sans, padding: 44}}>
      <div style={{...head, opacity: head.opacity, transform: `translateY(${head.y}px)`}}>
        <div style={{fontFamily: Fonts.serif, fontSize: 48, lineHeight: 1.1}}>
          Everything under the hood
        </div>
        <div style={{fontSize: 20, color: INK_SOFT, marginTop: 6}}>
          Guardrails, memory, retrieval, state, tracing, and evals — live in us-east-1.
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 18,
          flex: 1,
          minHeight: 0,
        }}
      >
        {FEATURES.map((f, i) => {
          const p = spring({
            frame: frame - (0.35 + i * 0.22) * fps,
            fps,
            config: {damping: 200},
          });
          const color = ACCENT[f.accent] ?? ROUTE;
          return (
            <div
              key={f.title}
              style={{
                opacity: Math.min(1, p * 1.3),
                transform: `translateY(${(1 - p) * 22}px)`,
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: `${color}`,
                    color: PAPER,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" width={20} height={20}>
                    {ICON[f.title]}
                  </svg>
                </div>
                <div style={{fontSize: 22, fontWeight: 650}}>{f.title}</div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: color,
                  fontWeight: 600,
                }}
              >
                {f.detail}
              </div>
              <div style={{fontSize: 15.5, color: INK_SOFT, lineHeight: 1.45}}>{f.body}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 14,
          color: INK_SOFT,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'monospace',
        }}
      >
        <span>Strands agents · Bedrock AgentCore Runtime + Memory</span>
        <span>submission/xray_service_map.jpg · 17 nodes · 16 edges</span>
      </div>
    </AbsoluteFill>
  );
};
