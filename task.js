// let activeEffect = null
// class Dep {
//     constructor(value) {
//         this._value = value
//         this.subscribers = new Set()
//     }
//     get value() {
//         this.depend()
//         return this._value
//     }
//     set value(newVal) {
//         this._value = newVal
//         this.notify()
//     }
//     depend() {
//         if (activeEffect) {
//             this.subscribers.add(activeEffect)
//         }
//     }
//     notify() {
//         this.subscribers.forEach(effect => effect())
//     }
// }

// function watchEffect(effect) {
//     activeEffect = effect
//     activeEffect()
//     activeEffect = null
// }

// const msg = new Dep('hello')
// const ok = new Dep(true)
// watchEffect(() => {
//     if (ok.value) {
//         console.log(msg.value)
//     } else {
//         console.log('error')
//     }
// })
// ok.value = false


