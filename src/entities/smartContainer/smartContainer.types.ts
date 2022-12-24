import { _ReactPixi } from '@inlet/react-pixi';

export const DEFAULT: LayoutDataRequired = {
  align: 'center',
  valign: 'center',
  height: 0,
  width: 0,
  viewportHeight: 1080,
  viewportWidth: 1920,
  stretchWidth: false,
  stretchHeight: false,
  correctionScaleX: 1,
  correctionScaleY: 1,
  correctionOffsetX: 0,
  correctionOffsetY: 0,
  fitCover: false,
};

export type LayoutData = {
  align?: 'left' | 'center' | 'right' | string;
  valign?: 'top' | 'center' | 'bottom' | string;
  width?: number;
  height?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  stretchWidth?: boolean;
  stretchHeight?: boolean;
  correctionScaleX?: number;
  correctionScaleY?: number;
  correctionOffsetX?: number;
  correctionOffsetY?: number;
  fitCover?: boolean;
};

export type LayoutDataRequired = Required<LayoutData>;

export type SmartContainerProps = {
  portraitData?: LayoutData;
  landscapeData?: LayoutData;
  visible?: boolean;
  children: React.ReactNode;
};
