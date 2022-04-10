let activeEffect
class Dep {
    subscribers = new Set()
    depend() {
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }
    notify() {
        this.subscribers.forEach(effect => {
            effect()
        })
    }
}

function watchEffect(effect) {
    activeEffect = effect
    activeEffect()
    activeEffect = null
}

const targetMap = new WeakMap()
function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}
const reactiveHandlers = {
    get(target, key, receiver) {
        const dep = getDep(target, key)
        dep.depend()
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        const dep = getDep(target, key)
        let res = Reflect.set(target, key, value, receiver)
        dep.notify()
        return res
    }
}

function reactive(raw) {
    return new Proxy(raw, reactiveHandlers)
}


const state = reactive({
    count: 0
})
watchEffect(() => {
    console.log(state.count)
})
state.count++
watchEffect(() => {
    console.log(state.msg)
})
state.msg = 'hi'
