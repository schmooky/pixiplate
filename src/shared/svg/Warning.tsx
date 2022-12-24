import * as React from "react";

function Warning(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={48} height={48} fill="none" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={48}
        height={48}
      >
        <path fill="#D9D9D9" d="M0 0h48v48H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M6.85 41c-.7 0-1.217-.3-1.55-.9-.334-.6-.334-1.2 0-1.8L22.4 8.7c.367-.6.9-.9 1.6-.9.7 0 1.233.3 1.6.9l17.1 29.6c.333.6.333 1.2 0 1.8-.334.6-.85.9-1.55.9H6.85zM24 20.4c-.433 0-.791.141-1.074.424-.284.284-.426.643-.426 1.076v7c0 .4.142.75.426 1.05.283.3.64.45 1.074.45.433 0 .792-.15 1.076-.45.282-.3.424-.65.424-1.05v-7c0-.433-.142-.792-.424-1.076-.284-.283-.643-.424-1.076-.424zm0 15.2c.466 0 .85-.15 1.15-.45.3-.3.45-.683.45-1.15 0-.467-.15-.85-.45-1.15-.3-.3-.683-.45-1.15-.45-.467 0-.85.15-1.15.45-.3.3-.45.683-.45 1.15 0 .467.15.85.45 1.15.3.3.683.45 1.15.45zM8.9 38h30.2L24 12 8.9 38z"
          fill="#FF2D1A"
        />
      </g>
    </svg>
  );
}

const MemoWarning = React.memo(Warning);
export default MemoWarning;
