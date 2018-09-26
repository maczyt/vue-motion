TweenLite.to = function (target, duration, vars) {
  return new TweenLite(target, duration, vars);
};

TweenLite.from = function (target, duration, vars) {
  vars.runBackwards = true;
  vars.immediateRender = (vars.immediateRender != false);
  return new TweenLite(target, duration, vars);
};

function autoCss(vars, target) {
  let css = {},
    p;
  for (p in vars) {
    // if ()
  }
}

class Animation {
  constructor(duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = (vars.immediateRender === true);
    this.data = vars.data;
    this._reversed = (vars.reversed === true);

    if (!_rootTimeline) {
      return;
    }

    _ticker.wake();

    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);

    if (this.vars.paused) {
      this.paused(true);
    }
  }
}

_rootTimeline = Animation._rootTimeline = new SimpleTimeline();

class SimpleTimeline extends Animation {
  constructor(vars) {
    super(0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
    this._first = this._last = this._recent = null;
    this._sortChildren = false;
  }
  // 链表存储timeLine
  // child表示当前节点
  add(child, position, align, stagger) {
    // 前一个节点和开始时间
    let prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    // 两个变量 why?
    child.timeline = child._timeline = this;
    // 作用不清楚?
    if (child._gc) {
      child._enabled(true, true);
    }
    // 默认当前链表最后一个，表示插入链表末尾
    prevTween = this._last;
    // 排序?
    /*
    if (this._sortChildren) {
      st = child._startTime;
      while (prevTween && prevTween._startTime > st);
      prevTween = prevTween._prev;
    }
    */
    // 非空链表
    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }
    // 非空链表
    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }
    // 前节点
    child._prev = prevTween;
    // 链表当前节点
    this._recent = child;
    // 不缓存？
    // if (this._timeline) {
    //   this._uncache(true);
    // }
    return this;
  }

  insert(child, position, align, stagger) {
    return this.add(child, position, align, stagger);
  }

  // 暂时不重要，看起来，😄
  remove(tween, skipDisable) {

  }

  render(time, suppressEvents, force) {
    // 首节点
    let tween = this._first,
      next;
    // 啥意思？
    this._totalTime = this._time = this._rawPrevTime = time;
    // 节点遍历吧？
    while (tween) {
      next = tween._next;
      if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
        // yoyo?
        if (!tween._reversed) {
          tween.render(
            // 时间开始倍数
            (time - tween._startTime) * tween._timeScale,
            suppressEvents,
            force
          )
        } else {
          tween.render(
            ((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale),
            suppressEvents,
            force
          )
        }
      }
      tween = next;
    }
  }

  rawTime() {
    if (!_tickerActive) {
      _ticker.wake();
    }
    return this._totalTime;
  }
}

class Ticker = 

class TweenLite extends Animation {
  constructor(target, duration, vars) {
    if (target == null) {
      throw "Cannot tween a null target";
    }
    spuer(duration, vars);
    this.target = target;
    var
      i, targ, targets;
    this._propLookup = {};
    this._siblings = _register(target, this, false);

    if (vars.immediateRender || (duration === 0 && this._delay === 0 && vars.immediateRender !== false)) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
      this.render(Math.min(0, -this._delay)); //in case delay is negative
    }
  }
  render() {

  }
}

TweenLite.version = '2.0.2';
TweenLite.ticker = {};
