import '@testing-library/jest-dom/vitest';

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null; readonly rootMargin = ''; readonly scrollMargin = ''; readonly thresholds = [0];
  constructor(private callback: IntersectionObserverCallback) { this.callback([], this); }
  disconnect() {} observe() {} takeRecords() { return []; } unobserve() {}
}
Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: IntersectionObserverStub });
Object.defineProperty(window, 'matchMedia', { writable: true, value: (query: string) => ({ matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false }) });
Object.defineProperty(window, 'scrollTo', { writable: true, value: () => undefined });
