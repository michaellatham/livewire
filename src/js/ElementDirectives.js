const prefix = require('./Prefix.js')()

export default class {
    constructor(el) {
        this.el = el
        this.directives = this.extractTypeModifiersAndValue(el)
    }

    all() {
        return Object.values(this.directives)
    }

    has(type) {
        return Object.keys(this.directives).includes(type)
    }

    get(type) {
        return this.directives[type]
    }

    extractTypeModifiersAndValue(el) {
        let directives = {}

        el.getAttributeNames()
            // Filter only the livewire directives.
            .filter(name => name.match(new RegExp(prefix + ':')))
            // Parse out the type, modifiers, and value from it.
            .forEach(name => {
                const [type, ...modifiers] = name.replace(new RegExp(prefix + ':'), '').split('.')

                directives[type] = { type, modifiers, value: el.getAttribute(name) }
            })

        return directives
    }
}
