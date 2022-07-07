import {
  Position,
  ElementRect,
  Size,
} from '@draggable-resizable-rotate/graphics';
import DraggableProvider, { MouseEventPoint, Delta, HandleFunMap } from '@draggable-resizable-rotate/react-draggable-provider';
import React from 'react';
declare namespace Draggable {
  type DraggableDelta = Delta;
  interface DraggableMouseHandle {
    onMouseDown: (event: React.MouseEvent, delta: Delta, position: Position) => any;
    onMouseMove: (event: MouseEvent, delta: Delta, position: Position) => any;
    onMouseUp: (event: MouseEvent, delta: Delta, position: Position) => any;
  }
  type DraggableBounds = Omit<ElementRect, 'width' | 'height' | 'x' | 'y'>;

  type DraggableProps = Partial<DraggableMouseHandle> & {
    position?: Position;
    // 默认的 position，一次性效果
    defaultPosition?: Position;
    axis?: 'both' | 'x' | 'y' | 'none';
    handle?: string;
    grid?: [number, number];
    // 'window' | 'parent' | elementSelector | DraggableBounds
    bounds?: string | DraggableBounds;
    nodeRef?: React.RefObject<HTMLElement>;
    enableUserSelectHack?: boolean;
    scale?: number;
    canMoveable?: boolean;
    rotate?: number;
    moveRatio?: number;
    children?: React.ReactNode;
  };

  type ClientPoint = MouseEventPoint;

  interface DraggableState {
    position?: Position;
    rotate?: number;
    scale?: number;
    dragging: boolean;
  }

  interface MouseDownCache {
    clientPoint: ClientPoint;
    position: Position;
    bounds: DraggableBounds | null;
    size: Size;
  }


  export default class Draggable extends React.PureComponent<
    DraggableProps,
    DraggableState
  > {
    draggableProvider: React.RefObject<DraggableProvider>;
    mouseDownCache: Partial<MouseDownCache>;
    onMouseDown: HandleFunMap['onMouseDown'];
    onMouseMove: HandleFunMap['onMouseMove'];
    onMouseUp: HandleFunMap['onMouseUp'];
    getTransformStyle: React.CSSProperties;
    updatePosition: (position: Position) => void;
    movePosition: (position: Position) => void;
  }
}

export = Draggable
export as namespace Draggable
export default Draggable;
