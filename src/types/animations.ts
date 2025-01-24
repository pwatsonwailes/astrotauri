export interface MoteConfig {
  type: 'mote';
  baseHue: number;
  baseSaturation: number;
  baseLightness: number;
  spawnRate: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ForegroundImage {
  src: string;
  duration?: number;
  initialScale?: number;
  targetScale?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  initialRotation?: number;
  targetRotation?: number;
  infiniteRotation?: {
    speed: number;
    clockwise?: boolean;
  };
  position?: Position;
  targetPosition?: Position;
  zIndex?: number;
}

export interface StackedImageConfig {
  background: string;
  foregrounds: ForegroundImage[];
  motes?: MoteConfig;
}

export interface ImageAnimation {
  type: 'mote' | 'stack';
  config: MoteConfig | StackedImageConfig;
}