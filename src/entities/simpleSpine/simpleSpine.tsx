import { ExtendedSpine } from '@entities/common/extendedSpine';
import { PixiComponent } from '@pixi/react';
import { useComposedRefs } from '@lib/customHooks/useComposedRefs';
import {
  Event as SpineEvent,
  SkeletonData,
  Spine,
  SpineDebugRenderer,
  TrackEntry,
} from '@pixi-spine/all-4.1';
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

// const SimpleSpine = React.forwardRef<Spine, SpineProps>(function SimpleSpine(
//   props,
//   ref: React.ForwardedRef<Spine>,
// ) {
//   const {
//     spineData,
//     timeScale = 1,
//     animationProps,
//     skinName,
//     onEvent,
//     onStart,
//     onEnd,
//     onComplete,
//     scale,
//   } = props;
//   const animRef = React.useRef<Spine>(null);
//   const animCombinedRef = useComposedRefs<Spine>(ref, animRef);

//   // Настроить time scale

//   // Настроить skin

//   // анимации

//   useEffect(() => {
//     if (!animRef.current) return;
//   }, [animRef]);

//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //@ts-ignore
//   return <SimplerSpine ref={animCombinedRef} spineData={spineData} scale={scale ?? 1} />;
// });

const debugRenderer = new SpineDebugRenderer();

export default PixiComponent('SimpleSpine', {
  create: (props: SpineProps): Spine => new ExtendedSpine(props.spineData),
  didMount: (instance, parent) => {
    instance.debug = debugRenderer;
    if (instance.state.hasAnimation('rotation_right')) {
      // run forever, little boy!
      instance.state.setAnimation(0, 'rotation_right', true);
      // dont run too fast
      instance.state.timeScale = 0.1;
      // update yourself
      instance.autoUpdate = true;
    }
  },
  applyProps: (instance: Spine, oldProps, newProps) => {},
  config: {
    // destroy instance on unmount?
    // default true
    destroy: false,

    /// destroy its children on unmount?
    // default true
    destroyChildren: false,
  },
});
