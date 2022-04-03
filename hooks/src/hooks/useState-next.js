// 挂载 or 更新
let isMount = true
// 当前处理的 hook，这个变量就是为了知道当前是哪个 hook
let workInProgressHook = null

const fiber = {
  // 保存组件本身
  stateNode: App,
  // 保存 hooks 的数据，链表保存
  memorizedState: null,
}

function useState(initialState) {
  // ------------------ 创建 hook 链表，存在 workInProgressHook，永远指向最后一个 hook Start -----------------
  let hook

  if (isMount) {
    // 首次渲染，创建一个新的 hook
    hook = {
      // hook 保存的状态
      memorizedHookState: initialState,
      // 指向下一个 hook
      next: null,
      // 储存当前 hook 需要进行的操作
      queue: { pending: null },
    }

    if (!fiber.memorizedState) {
      // fiber 上没有 hook
      // 指向新创建的 hook
      fiber.memorizedState = hook
      // workInProgressHook 指向当前处理的 hook
      workInProgressHook = hook
    } else {
      // 下一个需要处理的 hook 指向 workInProgressHook.next
      workInProgressHook.next = hook
    }
  } else {
    // 已经有 hook 了，hook 指向 workInProgressHook
    hook = workInProgressHook
    // workInProgressHook 指向下一个
    workInProgressHook = workInProgressHook.next
  }
  // ------------------ 创建 hook 链表，存在 workInProgressHook，永远指向最后一个 hook End -----------------

  // ------------------ 接下来计算新的状态，遍历环状链表 Start ---------------------------------------------
  let baseState = hook.memorizedHookState
  // 本次更新有新的 update 需要被执行
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next

    // 遍历环状链表
    do {
      const action = firstUpdate.action
      baseState = typeof action === 'function' ? action(baseState) : action
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)

    // 这个 hook 遍历完了要置为空
    hook.queue.pending = null
  }

  hook.memorizedHookState = baseState
  // ------------------ 接下来计算新的状态，遍历环状链表 End ---------------------------------------------

  return [baseState, dispatchAction.bind(null, hook.queue)]
}

// 用来更新 state
function dispatchAction(queue, action) {
  // 代表一次更新，是一个环状链表（双向链表）
  // 因为不仅要计算新的 state，而且每次更新是有优先级的，有些需要执行，有些不需要
  const update = {
    action,
    next: null,
  }

  // 当前 hook 是否有需要触发的更新
  if (queue.pending === null) {
    // 形成环状链表，u0 -> u0 -> u0
    update.next = update
  } else {
    // 这里 pending 不为 null 了，新的 update 需要插入环状链表中
    // u0 -> u0  变为  u1 -> u0 -> u1

    // u1 -> u0
    update.next = queue.pending
    // u0 -> u1
    queue.pending.next = update
  }

  // 每次 dispatch ，pending 指向最后一个 update
  queue.pending = update

  // 触发更新
  schedule()
}

// 每次更新触发，重渲染
function schedule() {
  // 指向当前第一个 hook
  workInProgressHook = fiber.memorizedState
  // 重渲染
  const app = fiber.stateNode()
  // 挂载后修改标记
  isMount = false
  // 方便调用
  return app
}

function App() {
  const [num, updateNum] = useState(0)

  console.log(`isMount: ${isMount}, num: ${num}`)

  return {
    onClick: () => {
      updateNum(num => num + 1)
    },
    onClear: () => {
      updateNum(0)
    },
  }
}

// app.onClick() 模拟点击
window.app = schedule()
