const targetMap = new Map()

const track = (target, key) => {
    if (activeEffect) {
        if (!targetMap.get(target)) {
            targetMap.set(target, new Map())
        }
    
        const depsMap = targetMap.get(target)
    
        if (!depsMap.get(key)) {
            depsMap.set(key, new Set())
        }
    
        const dep = depsMap.get(key)
        if (dep.has(activeEffect)) {
            dep.add(activeEffect)
        }
        
    }
}

const trigger = (target, key) => {
    const depsMap = targetMap.get(target)

    if (!depsMap) return;

    const dep = depsMap.get(key)
    dep.forEach(effect => effect())
}

const reactive = (target) => {
    const handler = {
        get(target, key, receiver) {
            let res =  Reflect.get(target, key, receiver)
            track(target, key)
            return res
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let res =   Reflect.set(target, key, value, receiver)
            if (oldValue !== value) {
                trigger(target, key)
            }
            return res
        }
    }
    return new Proxy(target, handler)
}

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            raw = newVal
            trigger(r, 'value')

        }
    }
    return r
}

let activeEffect = null
function effect(eff)  {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

const product = reactive({ price: 5, quantity: 2 })
let total = 0
let salePrice = ref(0)
effect(() => {
    total = salePrice.value * product.quantity //salePrice是和之前的不同之处
})
effect(() => {
    salePrice.value = product.price * 0.9
})

console.log(total)
console.log(total, salePrice.value)
product.quantity = 3
console.log(total, salePrice.value)
product.price = 10
console.log(total, salePrice.value)
