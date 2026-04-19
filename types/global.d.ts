export {};

declare global {
  interface Window {
    __runPagination?: (doc: Document | null | undefined, selector?: string) => void;
  }
}
