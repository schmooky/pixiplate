import { PixiComponent } from '@pixi/react';
import { ExamplePIXI } from './example.pixi';

export default PixiComponent('Example', {
  //@ts-ignore
  create: (props) => {
    // instantiate something and return it.
    // for instance:
    return new ExamplePIXI();
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance: ExamplePIXI, oldProps, newProps) => {
    // props changed
    // apply logic to the instance

    if (newProps.x !== undefined && newProps.y !== undefined) instance.moveTo(newProps.x,newProps.y);
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
