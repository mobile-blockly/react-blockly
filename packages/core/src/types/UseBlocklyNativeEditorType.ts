import type { BlocklyStateType } from './BlocklyStateType';
import type { UseBlocklyEditorType } from './UseBlocklyEditorType';

export interface UseBlocklyNativeEditorType extends UseBlocklyEditorType {
  onInject?: (state: BlocklyStateType) => void;
  onDispose?: (state: BlocklyStateType) => void;
}
