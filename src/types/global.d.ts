// src/types/global.d.ts
declare module '*.js' {
    const content: any; // This will allow any JavaScript module
    export default content;
}