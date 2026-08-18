"use client";

import React from "react";

interface VSCodeEditorProps {
  code: string;
  onChange?: (val: string) => void;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export default function VSCodeEditor({
  code,
  onChange,
  language = "python",
  readOnly = false,
  minHeight = "240px",
}: VSCodeEditorProps) {

  // Simple token regex highlighting for Python, JS, C++ (VS Code Dark+ Palette)
  const highlightCode = (rawCode: string) => {
    if (!rawCode) return "";

    // Escape HTML special characters
    const escaped = rawCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return escaped
      // Comments (# ..., // ..., /* ... */)
      .replace(/((?:#|\/\/).*?$|\/\*[\s\S]*?\*\/)/gm, '<span style="color: #6a9955; font-style: italic;">$1</span>')
      // Strings ("...", '...', `...`)
      .replace(/(["'`])(.*?)\1/g, '<span style="color: #ce9178;">$1$2$1</span>')
      // Keywords
      .replace(/\b(def|function|return|if|else|elif|while|for|in|class|import|from|const|let|var|int|uintptr_t|void|double|float|bool|struct|public|private|namespace|template|typename|auto|sizeof|reinterpret_cast)\b/g, '<span style="color: #569cd6; font-weight: 600;">$1</span>')
      // Control flow keywords
      .replace(/\b(break|continue|pass|try|except|finally|raise|throw|switch|case|default)\b/g, '<span style="color: #c586c0; font-weight: 600;">$1</span>')
      // Constants & Booleans
      .replace(/\b(True|False|true|false|None|null|nullptr|0x[0-9a-fA-F]+|\d+)\b/g, '<span style="color: #b5cea8;">$1</span>')
      // Function invocations
      .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>')
      // Built-in types
      .replace(/\b(list|dict|set|tuple|str|pair|vector|std|std::string)\b/g, '<span style="color: #4ec9b0;">$1</span>');
  };

  return (
    <div style={{
      position: "relative",
      background: "#1e1e1e",
      borderRadius: "12px",
      border: "1px solid #333333",
      fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
      fontSize: "13px",
      lineHeight: "1.6",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
    }}>
      {/* VS Code Window Header Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 14px",
        background: "#252526",
        borderBottom: "1px solid #2d2d2d",
        userSelect: "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontSize: "11px", color: "#858585", marginLeft: "8px", fontWeight: "500" }}>
            solution.{language === "python" ? "py" : language === "javascript" ? "js" : "cpp"} — VS Code Dark+
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "#858585" }}>
          UTF-8 · {language.toUpperCase()}
        </div>
      </div>

      {/* Code Container */}
      <div style={{ position: "relative", minHeight, padding: "16px" }}>
        {!readOnly && onChange ? (
          <>
            <textarea
              value={code}
              onChange={(e) => onChange(e.target.value)}
              spellCheck={false}
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                width: "calc(100% - 32px)",
                height: "calc(100% - 32px)",
                background: "transparent",
                color: "transparent",
                caretColor: "#aeafad",
                border: "none",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                whiteSpace: "pre",
                zIndex: 2,
                overflow: "auto"
              }}
            />
            <pre
              aria-hidden="true"
              style={{
                margin: 0,
                color: "#9cdcfe",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                pointerEvents: "none",
                zIndex: 1
              }}
              dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
            />
          </>
        ) : (
          <pre
            style={{
              margin: 0,
              color: "#9cdcfe",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit"
            }}
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        )}
      </div>
    </div>
  );
}
