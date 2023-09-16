interface IView<T extends Record<string, unknown>> {
  render(parameters: T): string;
}

export { type IView };
