import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts, useEntrance} from './shared';
import {
  DARK,
  DARK_MSG,
  GROUND,
  INK_ON_DARK,
  INK_SOFT_DARK,
  LINE_DARK,
  RESOLVE,
  ROUTE,
  SUCCESS,
} from './theme';

type NodeDef = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color: string;
  badge?: string;
  group: 'orch' | 'worker' | 'policy' | 'kb';
};

const N: NodeDef[] = [
  {
    id: 'orch',
    x: 560,
    y: 96,
    w: 250,
    h: 58,
    label: 'NovaMart-Orchestrator',
    sub: 'Haiku 4.5 · X-Ray root',
    color: ROUTE,
    badge: 'v0',
    group: 'orch',
  },
  {
    id: 'inv',
    x: 170,
    y: 228,
    w: 168,
    h: 54,
    label: 'InventoryAgent',
    sub: 'DynamoDB lookups',
    color: ROUTE,
    badge: 'v1',
    group: 'worker',
  },
  {
    id: 'pol',
    x: 400,
    y: 228,
    w: 168,
    h: 54,
    label: 'PolicyAgent',
    sub: 'multi-agent RAG',
    color: GROUND,
    group: 'worker',
  },
  {
    id: 'ref',
    x: 630,
    y: 228,
    w: 168,
    h: 54,
    label: 'RefundAgent',
    sub: 'eligibility · RET-…',
    color: RESOLVE,
    badge: 'v2',
    group: 'worker',
  },
  {
    id: 'com',
    x: 860,
    y: 228,
    w: 178,
    h: 54,
    label: 'CommunicationAgent',
    sub: 'final cited reply',
    color: SUCCESS,
    badge: 'v3',
    group: 'worker',
  },
  {
    id: 'search',
    x: 400,
    y: 340,
    w: 178,
    h: 44,
    label: 'search_all_policies',
    color: GROUND,
    group: 'policy',
  },
  {
    id: 'retR',
    x: 250,
    y: 430,
    w: 130,
    h: 40,
    label: 'ReturnsRetr.',
    color: GROUND,
    group: 'policy',
  },
  {
    id: 'retS',
    x: 400,
    y: 430,
    w: 130,
    h: 40,
    label: 'ShippingRetr.',
    color: GROUND,
    group: 'policy',
  },
  {
    id: 'retW',
    x: 550,
    y: 430,
    w: 130,
    h: 40,
    label: 'WarrantyRetr.',
    color: GROUND,
    group: 'policy',
  },
  {
    id: 'kbR',
    x: 250,
    y: 518,
    w: 130,
    h: 40,
    label: 'KB:returns',
    sub: 'S3 Vectors',
    color: ROUTE,
    group: 'kb',
  },
  {
    id: 'kbS',
    x: 400,
    y: 518,
    w: 130,
    h: 40,
    label: 'KB:shipping',
    sub: 'S3 Vectors',
    color: ROUTE,
    group: 'kb',
  },
  {
    id: 'kbW',
    x: 550,
    y: 518,
    w: 130,
    h: 40,
    label: 'KB:warranty',
    sub: 'S3 Vectors',
    color: ROUTE,
    group: 'kb',
  },
];

const EDGES: {from: string; to: string; path: 'active' | 'policy' | 'plain'}[] = [
  {from: 'orch', to: 'inv', path: 'active'},
  {from: 'orch', to: 'pol', path: 'plain'},
  {from: 'orch', to: 'ref', path: 'active'},
  {from: 'orch', to: 'com', path: 'active'},
  {from: 'pol', to: 'search', path: 'policy'},
  {from: 'search', to: 'retR', path: 'policy'},
  {from: 'search', to: 'retS', path: 'policy'},
  {from: 'search', to: 'retW', path: 'policy'},
  {from: 'retR', to: 'kbR', path: 'policy'},
  {from: 'retS', to: 'kbS', path: 'policy'},
  {from: 'retW', to: 'kbW', path: 'policy'},
];

const byId = Object.fromEntries(N.map((n) => [n.id, n]));

const edgeGeom = (a: NodeDef, b: NodeDef) => {
  const x1 = a.x;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y - b.h / 2;
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
};

const TIMING = {
  nodesOrch: 0.15,
  nodesWorker: 0.55,
  nodesPolicy: 1.15,
  edges: 1.7,
  pathSteps: [3.1, 3.9, 4.7, 5.5],
  policyGlow: 6.2,
} as const;

const STEPS = [
  {id: 'orch', text: 'v0 · initialize_session'},
  {id: 'inv', text: 'v1 · route_to_inventory_agent'},
  {id: 'ref', text: 'v2 · route_to_refund_agent'},
  {id: 'com', text: 'v3 · route_to_communication_agent'},
] as const;

export const GraphScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);

  const edgeT = interpolate(frame, [TIMING.edges * fps, (TIMING.edges + 1.1) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeLevel = TIMING.pathSteps.filter((t) => frame >= t * fps).length;
  const policyGlow = interpolate(
    frame,
    [TIMING.policyGlow * fps, (TIMING.policyGlow + 0.6) * fps],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const phase =
    frame < TIMING.policyGlow * fps
      ? 'Return scenario · WorkflowState v0 → v3'
      : 'Policy scenario · 3 KB retrievers in parallel';

  const nodeVisible = (n: NodeDef) => {
    if (n.group === 'orch') return TIMING.nodesOrch;
    if (n.group === 'worker') return TIMING.nodesWorker;
    if (n.group === 'policy' || n.group === 'kb') return TIMING.nodesPolicy;
    return 0;
  };

  const nodeActive = (n: NodeDef) => {
    if (n.id === 'orch') return activeLevel >= 1;
    if (n.id === 'inv') return activeLevel >= 2;
    if (n.id === 'ref') return activeLevel >= 3;
    if (n.id === 'com') return activeLevel >= 4;
    return false;
  };

  const stepRows = STEPS.map((s, i) => ({
    ...s,
    on: frame >= TIMING.pathSteps[i] * fps,
  }));

  return (
    <AbsoluteFill style={{background: DARK, color: INK_ON_DARK, fontFamily: Fonts.sans}}>
      <div style={{padding: '28px 36px 0', ...head, opacity: head.opacity, transform: `translateY(${head.y}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{fontFamily: Fonts.serif, fontSize: 44, lineHeight: 1.1}}>
            One request, one graph
          </div>
          <div style={{fontSize: 16, color: INK_SOFT_DARK, fontFamily: 'monospace'}}>
            X-Ray · BatchGetTraces verified
          </div>
        </div>
        <div style={{fontSize: 17, color: INK_SOFT_DARK, marginTop: 6, height: 24}}>{phase}</div>
      </div>

      <svg
        width={1280}
        height={540}
        viewBox="0 0 1280 540"
        style={{position: 'absolute', left: 0, top: 108}}
      >
        {EDGES.map((e) => {
          const a = byId[e.from];
          const b = byId[e.to];
          const d = edgeGeom(a, b);
          const isActivePath = e.path === 'active' && activeLevel >= 1;
          const lit =
            e.path === 'active'
              ? (e.to === 'inv' && activeLevel >= 2) ||
                (e.to === 'ref' && activeLevel >= 3) ||
                (e.to === 'com' && activeLevel >= 4) ||
                (e.to === 'pol' && false)
              : false;
          const polLit = e.path === 'policy' && policyGlow > 0;
          const stroke = polLit
            ? GROUND
            : lit || (e.from === 'inv' && e.to === 'orch' && activeLevel >= 2)
              ? ROUTE
              : isActivePath
                ? LINE_DARK
                : LINE_DARK;
          const width = polLit || lit ? 2.5 : 1.5;
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth={width}
              strokeDasharray={1000}
              strokeDashoffset={(1 - edgeT) * 1000}
              opacity={polLit ? policyGlow : 1}
            />
          );
        })}

        {/* sequential path edges Orch->Inv fully lit when step 2 */}
        {activeLevel >= 2 && (
          <path
            d={edgeGeom(byId.orch, byId.inv)}
            fill="none"
            stroke={ROUTE}
            strokeWidth={2.5}
            strokeDasharray={1000}
            strokeDashoffset={0}
          />
        )}
        {activeLevel >= 3 && (
          <path
            d={edgeGeom(byId.orch, byId.ref)}
            fill="none"
            stroke={ROUTE}
            strokeWidth={2.5}
            strokeDasharray={1000}
            strokeDashoffset={0}
          />
        )}
        {activeLevel >= 4 && (
          <path
            d={edgeGeom(byId.orch, byId.com)}
            fill="none"
            stroke={ROUTE}
            strokeWidth={2.5}
            strokeDasharray={1000}
            strokeDashoffset={0}
          />
        )}
        {policyGlow > 0 &&
          ['retR', 'retS', 'retW'].map((id) => (
            <path
              key={`glow-${id}`}
              d={edgeGeom(byId.search, byId[id])}
              fill="none"
              stroke={GROUND}
              strokeWidth={2.5}
              opacity={policyGlow}
            />
          ))}
        {policyGlow > 0 &&
          [
            ['retR', 'kbR'],
            ['retS', 'kbS'],
            ['retW', 'kbW'],
          ].map(([r, k]) => (
            <path
              key={`glow2-${r}`}
              d={edgeGeom(byId[r], byId[k])}
              fill="none"
              stroke={GROUND}
              strokeWidth={2.5}
              opacity={policyGlow}
            />
          ))}
      </svg>

      {N.map((n) => {
        const start = nodeVisible(n);
        const p = spring({
          frame: frame - start * fps,
          fps,
          config: {damping: 200},
        });
        if (p <= 0.01) return null;
        const act = nodeActive(n);
        const polAct = n.group === 'policy' || n.group === 'kb' ? policyGlow : 0;
        return (
          <div
            key={n.id}
            style={{
              position: 'absolute',
              left: n.x - n.w / 2,
              top: 108 + n.y - n.h / 2,
              width: n.w,
              minHeight: n.h,
              boxSizing: 'border-box',
              opacity: Math.min(1, p * 1.3),
              transform: `translateY(${(1 - p) * 16}px) scale(${0.96 + p * 0.04})`,
              background: DARK_MSG,
              border: `1.5px solid ${act || polAct ? n.color : LINE_DARK}`,
              boxShadow: act || polAct ? `0 0 0 3px ${n.color}33, 0 0 18px ${n.color}44` : 'none',
              borderRadius: 10,
              padding: '7px 10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 7}}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: n.color,
                  flexShrink: 0,
                }}
              />
              <span style={{fontSize: n.group === 'orch' ? 14.5 : 13, fontWeight: 600}}>
                {n.label}
              </span>
              {n.badge && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: act ? ROUTE : INK_SOFT_DARK,
                    border: `1px solid ${act ? ROUTE : LINE_DARK}`,
                    borderRadius: 5,
                    padding: '1px 5px',
                    opacity: act || n.id === 'orch' ? 1 : 0.45,
                  }}
                >
                  {n.badge}
                </span>
              )}
            </div>
            {n.sub && (
              <div style={{fontSize: 10.5, color: INK_SOFT_DARK, marginTop: 2, paddingLeft: 16}}>
                {n.sub}
              </div>
            )}
          </div>
        );
      })}

      {/* Step log */}
      <div
        style={{
          position: 'absolute',
          right: 36,
          top: 140,
          width: 270,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {stepRows.map((s, i) => {
          const op = interpolate(
            frame,
            [TIMING.pathSteps[i] * fps, (TIMING.pathSteps[i] + 0.3) * fps],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          );
          return (
            <div
              key={s.id}
              style={{
                opacity: 0.25 + op * 0.75,
                transform: `translateX(${(1 - op) * 12}px)`,
                background: DARK_MSG,
                border: `1px solid ${op > 0.5 ? ROUTE : LINE_DARK}`,
                borderRadius: 8,
                padding: '8px 12px',
                fontFamily: 'monospace',
                fontSize: 12.5,
              }}
            >
              {s.text}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 36,
          bottom: 14,
          right: 36,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: INK_SOFT_DARK,
          fontFamily: 'monospace',
        }}
      >
        <span>trace 1-6ab2be8d · origin AWS::AgentCore::Runtime</span>
        <span>optimistic lock · DynamoDB WorkflowStateTable · sampling 1.0</span>
      </div>
    </AbsoluteFill>
  );
};
