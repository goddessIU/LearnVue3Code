const proxy = new Proxy({}, {
    get: function(target, property, receiver) {
        console.log(this)
        return receiver
    }
})
console.log(proxy.getReceiver)