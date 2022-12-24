import { ExtendedSpine } from '@entities/common/extendedSpine';
import { PixiComponent } from '@pixi/react-pixi';
import { useComposedRefs } from '@lib/customHooks/useComposedRefs';
import type { Event as SpineEvent, SkeletonData, Spine, TrackEntry } from '@pixi-spine/all-4.1';
import React, { useEffect } from 'react';

interface SpineProps {
  spineData: SkeletonData;
  timeScale?: number;
  animationProps?: unknown;
  skinName?: string;
  onEvent?: (entry: TrackEntry, event: SpineEvent) => void;
  onStart?: (entry: TrackEntry) => void;
  onEnd?: (entry: TrackEntry) => void;
  onComplete?: (entry: TrackEntry) => void;
  scale?: number;
}

const SimpleSpine = React.forwardRef<Spine, SpineProps>(function SimpleSpine(
  props,
  ref: React.ForwardedRef<Spine>,
) {
  const {
    spineData,
    timeScale = 1,
    animationProps,
    skinName,
    onEvent,
    onStart,
    onEnd,
    onComplete,
    scale,
  } = props;
  const animRef = React.useRef<Spine>(null);
  const animCombinedRef = useComposedRefs<Spine>(ref, animRef);

  // Настроить time scale

  // Настроить skin

  // анимации

  useEffect(() => {
    if (!animRef.current) return;
  }, [animRef]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <SimplerSpine ref={animCombinedRef} spineData={spineData} scale={scale ?? 1} />;
});

export default PixiComponent('SimpleSpine', {
  create: (props: SpineProps): ExtendedSpine => new ExtendedSpine(props.spineData),
  applyProps: (instance, oldProps, newProps) => {
    instance.scale.set(newProps.scale ?? 1);
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});
