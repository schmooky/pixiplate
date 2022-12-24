import { useResize } from '@lib/customHooks/useResize';
import { isShallowEqual } from '@lib/utils';
import PIXI from 'pixi.js';
import React, { LegacyRef, useLayoutEffect } from 'react';
import { Container, _ReactPixi, } from '@pixi/react-pixi';
import { SmartContainerProps, LayoutData, DEFAULT, LayoutDataRequired } from './smartContainer.types';



export const SmartContainer:  React.FC<SmartContainerProps> = (props: SmartContainerProps) => {
  const { visible = true, portraitData, landscapeData } = props;
  const containerRef = React.useRef<PIXI.Container>(null);
  const { width: w, height: h } = useResize();

  const portraitDataRequiredRef = React.useRef(portraitData || ({} as LayoutData));

  const portraitDataRequired = React.useMemo(() => {
    const portraitDataRequired = {
      ...DEFAULT,
      ...portraitData,
    } as LayoutDataRequired;
    if (!isShallowEqual(portraitDataRequiredRef.current, portraitDataRequired))
      portraitDataRequiredRef.current = portraitDataRequired;

    return portraitDataRequiredRef.current as LayoutDataRequired;
  }, [portraitData]);

  const landscapeDataRequiredRef = React.useRef(landscapeData || ({} as LayoutData));

  const landscapeDataRequired = React.useMemo(() => {
    const landscapeDataRequired = {
      ...DEFAULT,
      ...landscapeData,
    } as LayoutDataRequired;
    if (!isShallowEqual(landscapeDataRequiredRef.current, landscapeDataRequired))
      landscapeDataRequiredRef.current = landscapeDataRequired;

    return landscapeDataRequiredRef.current as LayoutDataRequired;
  }, [landscapeData]);

  useLayoutEffect(() => {
    const container = containerRef.current as PIXI.Container;

    const {
      align,
      valign,
      viewportHeight,
      viewportWidth,
      stretchWidth,
      stretchHeight,
      correctionScaleX,
      correctionScaleY,
      correctionOffsetX,
      correctionOffsetY,
      fitCover,
    } = h > w ? portraitDataRequired : landscapeDataRequired;

    const m = fitCover ? Math.max : Math.min;

    const scale = m(w / 1920, h / 1080);
    let { width, height } = h > w ? portraitDataRequired : landscapeDataRequired;

    let scaleX = scale;
    let scaleY = scale;

    if (viewportWidth || viewportWidth) {
      scaleX = scaleY = m(w / (viewportWidth || 1920), h / (viewportHeight || 1080));
    }

    if (stretchWidth) {
      scaleX = w / width;
      width = w / scaleX;
    }

    if (stretchHeight) {
      scaleY = h / height;
      height = h / scaleY;
    }

    scaleX *= correctionScaleX;
    scaleY *= correctionScaleY;

    container.scale.set(scaleX, scaleY);

    container.x =
      (align === 'right' ? w - width * scaleX : align === 'center' ? (w - width * scaleX) / 2 : 0) +
      correctionOffsetX * scaleX;
    container.y =
      (valign === 'bottom'
        ? h - height * scaleY
        : valign === 'center'
        ? (h - height * scaleY) / 2
        : 0) +
      correctionOffsetY * scaleY;
  }, [w, h, portraitDataRequired, landscapeDataRequired]);

  return (
    // @ts-ignore
    <Container ref={containerRef} visible={visible}>{props.children}</Container>
  );
};
