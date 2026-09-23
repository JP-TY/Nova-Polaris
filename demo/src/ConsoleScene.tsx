import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Fonts, Typewriter, useEntrance} from './shared';
import {
  ACCENT_DARK_TEXT,
  CITE_BG,
  CITATIONS,
  DARK,
  DARK_MSG,
  GROUND,
  INK,
  INK_ON_DARK,
  INK_SOFT,
  INK_SOFT_DARK,
  INPUT_BG,
  LINE,
  LINE_DARK,
  NAV_ACTIVE,
  PAPER,
  PANEL,
  QUERY,
  REFUND,
  REPLY,
  ROUTE,
  SESSION_ID,
  TRACE_ID,
  VERSIONS,
} from './theme';

const T = {
  send: 2.15,
  versions: [2.55, 2.95, 3.35, 3.75],
  cites: [4.15, 4.55],
  refund: 4.95,
  trace: 5.35,
  reply: 5.55,
} as const;

const useAt = (sec: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return interpolate(frame, [sec * fps, (sec + 0.35) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const Dot: React.FC<{color: string; size?: number}> = ({color, size = 9}) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: color,
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

const Rise: React.FC<{show: boolean; children: React.ReactNode}> = ({show, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: show ? frame : -1000, fps, config: {damping: 200}});
  if (!show) return null;
  return (
    <div style={{opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 8}px)`}}>
      {children}
    </div>
  );
};

const Panel: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
  <div
    style={{
      border: `1px solid ${LINE}`,
      borderRadius: 10,
      background: PAPER,
      padding: '10px 12px',
    }}
  >
    <div style={{fontSize: 13, fontWeight: 650, marginBottom: 8}}>{title}</div>
    {children}
  </div>
);

const Empty: React.FC<{text: string}> = ({text}) => (
  <p style={{margin: 0, fontSize: 12, lineHeight: 1.4, color: INK_SOFT}}>{text}</p>
);

export const ConsoleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = useEntrance(0);

  const typedEnd = 1.95;
  const queryChars = Math.min(
    QUERY.length,
    Math.floor(
      interpolate(frame, [0.45 * fps, typedEnd * fps], [0, QUERY.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    ),
  );
  const sending = frame >= T.send * fps;
  const loading = frame >= T.send * fps && frame < T.reply * fps;
  const done = frame >= T.reply * fps;
  const clickP = spring({
    frame: frame - T.send * fps,
    fps,
    config: {damping: 14, mass: 0.4},
  });
  const btnScale = sending ? 1 - 0.08 * Math.sin(Math.min(clickP, 1) * Math.PI) : 1;
  const shimmer = interpolate(frame % (1.2 * fps), [0, 1.2 * fps], [0.55, 1]);

  const vCount = T.versions.filter((t) => frame >= t * fps).length;
  const cCount = T.cites.filter((t) => frame >= t * fps).length;
  const showRefund = frame >= T.refund * fps;
  const showTrace = frame >= T.trace * fps;

  const railW = 176;
  const inspW = 300;

  return (
    <AbsoluteFill style={{background: PAPER, color: INK, fontFamily: Fonts.sans}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `${railW}px minmax(0,1fr) ${inspW}px`,
          gridTemplateRows: '1fr auto',
          height: '100%',
          opacity: head.opacity,
          transform: `translateY(${head.y * 0.4}px)`,
        }}
      >
        {/* Rail */}
        <aside
          style={{
            gridRow: 1,
            background: PANEL,
            borderRight: `1px solid ${LINE}`,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            overflow: 'hidden',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <svg viewBox="0 0 64 64" width={26} height={26}>
              <circle cx="32" cy="32" r="26" fill="none" stroke={ROUTE} strokeWidth="2.5" />
              <path
                d="M32 6 L35 29 L58 32 L35 35 L32 58 L29 35 L6 32 L29 29 Z"
                fill={ROUTE}
              />
              <circle cx="32" cy="32" r="3.5" />
            </svg>
            <div>
              <div style={{fontWeight: 650, fontSize: 14, lineHeight: 1.1}}>Nova-Polaris</div>
              <div style={{fontSize: 11, color: INK_SOFT}}>Route. Ground. Resolve.</div>
            </div>
          </div>
          <nav style={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {[
              {label: 'Sessions', active: true},
              {label: 'Evals', active: false},
              {label: 'Traces', active: false},
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '7px 9px',
                  borderRadius: 8,
                  fontSize: 13,
                  minHeight: 32,
                  display: 'flex',
                  alignItems: 'center',
                  background: item.active ? NAV_ACTIVE : 'transparent',
                  border: `1px solid ${item.active ? LINE : 'transparent'}`,
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
          <div>
            <div style={{fontSize: 11, color: INK_SOFT}}>Customer</div>
            <div
              className="mono"
              style={{
                marginTop: 4,
                minHeight: 36,
                width: '100%',
                border: `1px solid ${LINE}`,
                borderRadius: 8,
                background: PAPER,
                padding: '0 8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              CUST-001 · Premium
            </div>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 11,
                color: INK_SOFT,
                fontFamily: 'monospace',
              }}
            >
              Session: {SESSION_ID}
            </p>
          </div>
        </aside>

        {/* Stream / chat */}
        <main style={{gridRow: 1, padding: '22px 28px', overflow: 'hidden'}}>
          <h1
            style={{
              fontFamily: Fonts.serif,
              fontWeight: 500,
              fontSize: 42,
              margin: '0 0 4px',
              lineHeight: 1.1,
            }}
          >
            Support Ops Center
          </h1>
          <p style={{color: INK_SOFT, margin: '0 0 16px', fontSize: 14}}>
            Route to the right specialist, ground every claim in policy, resolve with a cited
            reply.
          </p>

          <section
            style={{
              background: DARK,
              color: INK_ON_DARK,
              borderRadius: 14,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {!sending && (
              <div
                style={{
                  border: `1px solid ${LINE_DARK}`,
                  background: DARK_MSG,
                  borderRadius: 10,
                  padding: '10px 12px',
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    color: INK_SOFT_DARK,
                    marginBottom: 3,
                    display: 'flex',
                    gap: 7,
                    alignItems: 'center',
                  }}
                >
                  <Dot color={INK_SOFT_DARK} />
                  CommunicationAgent · ready
                </div>
                <p style={{margin: 0, fontSize: 13.5, lineHeight: 1.45}}>
                  Ask about a return, a policy, or an order. The route and evidence appear on
                  the right.
                </p>
              </div>
            )}

            <Rise show={sending}>
              <div
                style={{
                  border: '1px solid oklch(45% 0.05 220)',
                  background: DARK_MSG,
                  borderRadius: 10,
                  padding: '10px 12px',
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    color: INK_SOFT_DARK,
                    marginBottom: 3,
                    display: 'flex',
                    gap: 7,
                    alignItems: 'center',
                  }}
                >
                  <Dot color={ROUTE} />
                  CUST-001 · you
                </div>
                <p style={{margin: 0, fontSize: 13.5, lineHeight: 1.45}}>{QUERY}</p>
              </div>
            </Rise>

            {loading && (
              <div
                style={{
                  borderRadius: 8,
                  background: `linear-gradient(90deg, oklch(90% 0.01 250), oklch(94% 0.01 250))`,
                  minHeight: 36,
                  opacity: shimmer,
                }}
                role="status"
              />
            )}

            <Rise show={done}>
              <div
                style={{
                  border: '1px solid oklch(45% 0.05 160)',
                  background: DARK_MSG,
                  borderRadius: 10,
                  padding: '10px 12px',
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    color: INK_SOFT_DARK,
                    marginBottom: 3,
                    display: 'flex',
                    gap: 7,
                    alignItems: 'center',
                  }}
                >
                  <Dot color={GROUND} />
                  CommunicationAgent · cited reply
                </div>
                <p style={{margin: 0, fontSize: 13.5, lineHeight: 1.45, minHeight: 40}}>
                  {done ? (
                    <Typewriter text={REPLY} startAt={T.reply * fps} charsPerSec={72} />
                  ) : null}
                </p>
              </div>
            </Rise>

            <div style={{display: 'flex', gap: 10, marginTop: 2}}>
              <div
                style={{
                  flex: 1,
                  minHeight: 36,
                  borderRadius: 8,
                  border: `1px solid ${LINE_DARK}`,
                  background: INPUT_BG,
                  color: INK_ON_DARK,
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 13.5,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{QUERY.slice(0, queryChars)}</span>
                {frame < T.send * fps && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 1.5,
                      height: 16,
                      marginLeft: 1,
                      background: ROUTE,
                      opacity: Math.sin(frame / 4) > 0 ? 1 : 0.15,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  minHeight: 36,
                  padding: '0 16px',
                  borderRadius: 8,
                  border: `1px solid ${ROUTE}`,
                  background: ROUTE,
                  color: ACCENT_DARK_TEXT,
                  fontWeight: 650,
                  fontSize: 13.5,
                  display: 'flex',
                  alignItems: 'center',
                  transform: `scale(${btnScale})`,
                  opacity: sending && queryChars < QUERY.length ? 0.45 : 1,
                }}
              >
                {loading ? 'Routing…' : 'Send'}
              </div>
            </div>
          </section>
        </main>

        {/* Inspector */}
        <aside
          style={{
            gridRow: 1,
            background: PANEL,
            borderLeft: `1px solid ${LINE}`,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            overflow: 'hidden',
          }}
        >
          <Panel title="Route · WorkflowState">
            {vCount === 0 ? (
              <Empty text="Send a request to open a session. Versions v0 to vN appear here with optimistic locking." />
            ) : (
              <ol style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6}}>
                {VERSIONS.slice(0, vCount).map((v) => (
                  <li
                    key={v.version}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                      fontSize: 11.5,
                      lineHeight: 1.35,
                    }}
                  >
                    <span style={{marginTop: 4}}>
                      <Dot
                        color={
                          v.dot === 'route'
                            ? ROUTE
                            : v.dot === 'resolve'
                              ? 'oklch(68% 0.12 85)'
                              : INK_SOFT_DARK
                        }
                        size={8}
                      />
                    </span>
                    <span>
                      <strong style={{fontFamily: 'monospace'}}>v{v.version}</strong> {v.agent}:{' '}
                      {v.summary}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Panel>

          <Panel title="Ground · Citations">
            {cCount === 0 ? (
              <Empty text="No grounded passages yet. The PolicyAgent cites source file plus score, or states the answer is not in policy." />
            ) : (
              CITATIONS.slice(0, cCount).map((c) => (
                <div
                  key={c.source}
                  style={{
                    border: `1px solid ${LINE}`,
                    borderRadius: 8,
                    padding: '8px 10px',
                    marginBottom: 6,
                    background: CITE_BG,
                  }}
                >
                  <p style={{margin: '0 0 4px', fontSize: 11.5, lineHeight: 1.4}}>{c.text}</p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 10.5,
                      color: INK_SOFT,
                      fontFamily: 'monospace',
                    }}
                  >
                    Source: {c.source} · Score: {c.score}
                  </p>
                </div>
              ))
            )}
          </Panel>

          <Panel title="Resolve · Decision">
            {!showRefund ? (
              <Empty text="No refund evaluated in this turn." />
            ) : (
              <div style={{fontSize: 11.5, lineHeight: 1.4}}>
                <p style={{margin: '0 0 4px'}}>
                  <strong>Decision:</strong> {REFUND.decision} ·{' '}
                  <strong style={{fontFamily: 'monospace'}}>confidence {REFUND.confidence}</strong>{' '}
                  · <strong style={{fontFamily: 'monospace'}}>risk {REFUND.risk}</strong>
                </p>
                <p style={{margin: '0 0 4px', color: INK_SOFT}}>{REFUND.reason}</p>
                <p style={{margin: 0, fontFamily: 'monospace'}}>Reference: {REFUND.reference}</p>
              </div>
            )}
          </Panel>

          <Panel title="Trace receipt">
            {!showTrace ? (
              <Empty text="No trace yet. Each live request publishes one X-Ray trace for the Service Map screenshot." />
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.45,
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                }}
              >
                X-Ray: {TRACE_ID}
                <br />
                Session: {SESSION_ID}
              </p>
            )}
          </Panel>
        </aside>

        {/* Status bar */}
        <footer
          style={{
            gridColumn: '1 / -1',
            gridRow: 2,
            borderTop: `1px solid ${LINE}`,
            padding: '8px 16px',
            fontSize: 12,
            color: INK_SOFT,
            display: 'flex',
            gap: 18,
            background: PANEL,
          }}
        >
          <span>Nova-Polaris console · Next.js</span>
          <span style={{fontFamily: 'monospace'}}>Haiku routing · Sonnet workers</span>
          <span style={{fontFamily: 'monospace'}}>3 KBs · Guardrailed · Traced</span>
        </footer>
      </div>
    </AbsoluteFill>
  );
};
