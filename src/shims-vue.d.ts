/* eslint-disable */

interface ImportMetaEnv {
  VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.js' {
  const content: any;
  export default content;
}

declare module '*.json'{
  const content: any;
  export default content;
}

declare module "slidePage" {
  const content: any;
  export default content;
}

declare module "masonry-layout" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.gif" {
  const value: any;
  export default value;
}


