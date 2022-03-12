class EventHub {
  private cache: { [key: string]: Array<(data?: any) => void> } = {};
  private safeCache(eventName: string) {
    return this.cache[eventName] || [];
  }

  on(eventName: string, fn: (data?: any) => void) {
    this.safeCache(eventName).push(fn);
  }

  emit(eventName: string, data?: any) {
    this.safeCache(eventName).forEach((fn) => fn(data));
  }

  off(eventName: string, fn: (data?: any) => void) {
    const index = indexOf(this.safeCache(eventName), fn);
    if (index === -1) return;
    this.safeCache(eventName).splice(index, 1);
  }
}

function indexOf(array: any[], item: any) {
  if (array === undefined) return -1;

  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }

  return index;
}

export default EventHub;
