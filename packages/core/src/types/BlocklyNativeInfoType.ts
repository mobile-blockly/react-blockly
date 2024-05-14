import type { WebViewMessageEvent } from 'react-native-webview';

import type { BlocklyInfoType } from './BlocklyInfoType';
import type { HtmlRenderType } from './HtmlRenderType';

export interface BlocklyNativeInfoType extends BlocklyInfoType {
  onMessage: (e: WebViewMessageEvent) => void;
  htmlRender: (params?: HtmlRenderType) => string;
  postData: (event: string, data?: any) => void;
  runJS: (code: string) => void;
}
