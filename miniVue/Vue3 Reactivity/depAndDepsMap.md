![图片1](./1.png)
图片很清楚了
```js
let product = {quantity: 2, price: 5}
let effect = () => {product.quantity * product.price}
let total = effect()

```
我们更新price或者quantity，total肯定不会变，但是Vue会自行修改total,所以我们可以将effect存储在一个名为dep的Set中(避免重复)，当发生改变时，我们去执行dep中的effect，就实现了响应式

左边是targetMap目标图，我们可能有多个响应式对象，对象每个属性需要响应式，targetMap存放响应式对象，本质上是Map。对象名字为key， 值为value，value即是depsMap,也是个Map，记录着对象的属性。每个value都是一个dep，用来存储effect

所以，写出如下函数
```js
const targetMap = new Map()

//存储effect到dep
const track = (target, key) => {
    if (!targetMap.get(target)) {
        targetMap.set(target, (new Map()))
    }

    const depsMap = targetMap.get(target)
    
    if (!depsMap.get(key)) {
        depsMap.set(key, new Set())
    }

    const dep = depsMap.get(key)
    dep.add(effect)
}

//执行，进行响应式
const trigger = (target, key) => {
    const depsMap = targetMap.get(target)
    
    if (!depsMap) return;

    const dep = depsMap.get(key)
    dep.forEach(effect => {
        effect()
    })
}


//测试
const product = {price: 5, quantity: 2}
let total = 0
const effect = () => {
    total = product.price * product.quantity
}

effect()
console.log(total)//10
track('product', 'price')
product.price = 6
console.log(total)//10
trigger('product', 'price')
console.log(total)//12
```
我们发现，只要trigger了之后，就可以响应式，第一节课完活