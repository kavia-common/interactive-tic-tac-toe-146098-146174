import React, { useMemo, useState } from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { Board, gameStatus, initialBoard, makeMove, nextPlayer } from "./utils/game";
import { fonts, gradientBg, theme } from "./theme";

// PUBLIC_INTERFACE
export const ticTacToeSchema = z.object({
  backgroundColor: zColor().default(theme.background),
  surfaceColor: zColor().default(theme.surface),
  primary: zColor().default(theme.primary),
  secondary: zColor().default(theme.secondary),
  text: zColor().default(theme.text),
});

const containerStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  fontFamily: fonts.family,
  color: theme.text,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const cardStyle = (surface: string, primary: string): React.CSSProperties => ({
  width: 900,
  maxWidth: "92vw",
  background: surface,
  boxShadow: theme.shadow,
  borderRadius: theme.radius,
  padding: 28,
  position: "relative",
  overflow: "hidden",
  border: `1px solid ${primary}14`,
});

const headerStyle = (text: string): React.CSSProperties => ({
  color: text,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

const titleStyle = (_primary: string): React.CSSProperties => ({
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: 0.3,
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: theme.text,
});

const statusPill = (color: string): React.CSSProperties => ({
  fontSize: 14,
  padding: "8px 14px",
  borderRadius: 999,
  background: `${color}12`,
  color: color,
  border: `1px solid ${color}33`,
  fontWeight: 600,
});

const boardWrapper: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1 / 1",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: 12,
};

const cellBase = (primary: string): React.CSSProperties => ({
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "inset 0 2px 0 rgba(17,24,39,0.04), 0 10px 20px rgba(17,24,39,0.05)",
  border: `1px solid ${primary}22`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
});

const cellHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: "inset 0 2px 0 rgba(17,24,39,0.04), 0 14px 32px rgba(17,24,39,0.08)",
};

const markStyle = (color: string): React.CSSProperties => ({
  fontSize: 68,
  fontWeight: 800,
  color,
  textShadow: "0 1px 0 rgba(17,24,39,0.04)",
});

const footerStyle: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const resetButton = (primary: string, _text: string): React.CSSProperties => ({
  padding: "10px 16px",
  borderRadius: 12,
  border: "none",
  color: "#ffffff",
  fontWeight: 700,
  background: primary,
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(37, 99, 235, 0.28)",
  transition: "transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease",
});

const subtleButton = (secondary: string): React.CSSProperties => ({
  padding: "10px 16px",
  borderRadius: 12,
  border: `1px solid ${secondary}55`,
  background: `${secondary}10`,
  color: secondary,
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 180ms ease, opacity 180ms ease",
});

const ribbon = (secondary: string): React.CSSProperties => ({
  position: "absolute",
  top: -50,
  right: -100,
  width: 320,
  height: 160,
  borderRadius: 999,
  background: `${secondary}18`,
  filter: "blur(20px)",
  transform: "rotate(-12deg)",
  border: `1px solid ${secondary}33`,
});

// PUBLIC_INTERFACE
export const TicTacToe: React.FC<z.infer<typeof ticTacToeSchema>> = (props) => {
  const cfg = useVideoConfig();
  const frame = useCurrentFrame();
  const appear = spring({
    fps: cfg.fps,
    frame,
    config: { damping: 200, stiffness: 120 },
  });

  const bgOpacity = interpolate(appear, [0, 1], [0, 1]);
  const cardY = interpolate(appear, [0, 1], [24, 0]);
  const cardOpacity = interpolate(appear, [0, 1], [0, 1]);

  const [board, setBoard] = useState<Board>(() => initialBoard());
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const status = useMemo(() => gameStatus(board), [board]);
  const currentTurn = useMemo(() => nextPlayer(board), [board]);

  const onCellClick = (index: number) => {
    if (status.done) return;
    if (board[index] !== null) return;
    const updated = makeMove(board, index, currentTurn);
    setBoard(updated);
  };

  const onReset = () => {
    setBoard(initialBoard());
  };

  const showLine = status.line ?? null;

  return (
    <AbsoluteFill
      style={{
        ...containerStyle(props.backgroundColor ?? theme.background),
        backgroundImage: gradientBg(props.primary ?? theme.primary),
        opacity: bgOpacity,
      }}
    >
      <div style={{ ...cardStyle(props.surfaceColor ?? theme.surface, props.primary ?? theme.primary), transform: `translateY(${cardY}px)`, opacity: cardOpacity }}>
        <div style={ribbon(props.secondary ?? theme.secondary)} />
        <div style={headerStyle(props.text ?? theme.text)}>
          <div style={titleStyle(props.primary ?? theme.primary)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto" }}>
              <path d="M5 5L19 19M5 19L19 5" stroke={props.primary ?? theme.primary} strokeWidth="2" strokeLinecap="round" />
            </svg>
            Tic Tac Toe
          </div>
          <div style={statusPill(status.done ? (status.winner ? (props.secondary ?? theme.secondary) : "#6B7280") : (props.primary ?? theme.primary))}>
            {status.label}
          </div>
        </div>

        <div style={boardWrapper}>
          {Array.from({ length: 9 }).map((_, i) => {
            const isActive = hoverIndex === i;
            const isWinning = showLine ? showLine.includes(i) : false;
            const borderColor = isWinning ? (props.secondary ?? theme.secondary) : (props.primary ?? theme.primary);
            const mark = board[i];

            return (
              <div
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => onCellClick(i)}
                style={{
                  ...cellBase(props.primary ?? theme.primary),
                  borderColor: `${borderColor}${isWinning ? "66" : "22"}`,
                  ...(isActive && !mark && !status.done ? cellHoverStyle : null),
                  position: "relative",
                }}
              >
                {mark ? (
                  <span style={markStyle(mark === "X" ? (props.primary ?? theme.primary) : (props.secondary ?? theme.secondary))}>
                    {mark}
                  </span>
                ) : (
                  !status.done &&
                  isActive && (
                    <span style={{ ...markStyle("#9CA3AF"), fontWeight: 700, fontSize: 40, opacity: 0.5 }}>
                      {currentTurn}
                    </span>
                  )
                )}
                {isWinning && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 16,
                      boxShadow: `inset 0 0 0 3px ${(props.secondary ?? theme.secondary)}55`,
                      transition: "box-shadow 200ms ease",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div style={footerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 14,
                color: (props.text ?? theme.text),
                opacity: 0.8,
              }}
            >
              Ocean Professional
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: props.primary ?? theme.primary,
                boxShadow: `0 0 0 3px ${(props.primary ?? theme.primary)}22`,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: props.secondary ?? theme.secondary,
                boxShadow: `0 0 0 3px ${(props.secondary ?? theme.secondary)}22`,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              aria-label="Hint"
              style={subtleButton(props.secondary ?? theme.secondary)}
              onClick={() => {
                // Optional: Could implement hint in future iterations
              }}
            >
              Hint
            </button>
            <button
              aria-label="Reset game"
              style={resetButton(props.primary ?? theme.primary, props.text ?? theme.text)}
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
