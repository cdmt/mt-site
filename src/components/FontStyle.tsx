"use client";

import React from "react";
import useFontStyle from "fontdue-js/useFontStyle";

interface FontStyle_props {
  familyName: string | null | undefined;
  styleName: string | null | undefined;
  fontWeight?: string | number | null;
  fontStyle?: React.CSSProperties["fontStyle"] | null;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function FontStyle({
  familyName,
  styleName,
  fontWeight,
  fontStyle,
  style: styleProp,
  children,
  ...rest
}: FontStyle_props & React.HTMLAttributes<HTMLSpanElement>) {
  const resolvedFontWeight =
    typeof fontWeight === "number" ? String(fontWeight) : fontWeight ?? "400";

  const { style } = useFontStyle({
    fontFamily: `${familyName} ${styleName}`,
    fontWeight: resolvedFontWeight,
    fontStyle: fontStyle ?? "normal",
  });

  return (
    <span
      style={{
        ...style,
        fontWeight: fontWeight ?? style.fontWeight,
        fontStyle: fontStyle ?? style.fontStyle,
        ...styleProp,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
