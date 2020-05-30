class EffectWithType {
  static get TAKE_EVERY() {
    return {
      type: 'takeEvery',
    };
  }

  static get TAKE_LATEST() {
    return {
      type: 'takeLatest',
    };
  }

  static get WATCHER() {
    return {
      type: 'watcher',
    };
  }

  static get THROTTLE() {
    return {
      type: 'throttle',
    };
  }
}

export default EffectWithType;
