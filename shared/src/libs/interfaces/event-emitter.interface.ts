interface IEventEmitter<
  HandlerMap extends Record<
    HandlerMapKey,
    ((payload: HandlerPayload) => unknown)[]
  >,
  HandlerMapKey extends keyof HandlerMap = keyof HandlerMap,
  HandlerPayload = HandlerMap[HandlerMapKey][0] extends (
    payload: infer Payload,
  ) => unknown
    ? Payload
    : never,
> {
  addListener(
    eventName: HandlerMapKey,
    callback: (payload: HandlerPayload) => void,
  ): void;

  removeListener(
    eventName: HandlerMapKey,
    callback: (payload: HandlerPayload) => void,
  ): void;

  removeAllListeners(eventName?: HandlerMapKey): void;

  emit(eventName: HandlerMapKey, payload: HandlerPayload): void;
}

export { type IEventEmitter };
