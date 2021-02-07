// @ts-nocheck
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export function basicMock<T>(...args: string[]) {
  const result = ({} as unknown) as T;

  args.forEach((arg) => {
    result[arg] = () => {
      throw Error('basicMock');
    };
  });

  return result;
}
