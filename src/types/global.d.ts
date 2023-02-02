export {};

declare global {
  interface Window {
    dataLayer: (Date | string)[][];
  }
}
