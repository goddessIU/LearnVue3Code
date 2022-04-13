function h(tag, props, children) {
    return {
        tag,
        props,
        children
    }
}

function mount(vdom, container) {
    const ele = document.createElement(vdom.tag)
    if (vdom.props) {
        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                ele.setAttribute(key, props[key])
            } 
        }
    }
    if (vdom.children) {
        let children = vdom.children
        if (typeof children === 'string') {
            ele.textContent = children
        } else {
            children.forEach(child => {
                mount(h(child), ele)
            })
        }
    }
    container.append(ele)
}

function patch() {

}

const vdom = h('div', { class: 'red' }, [
    h('span', null, 'hello')
])

mount(vdom, document.getElementById('app'))