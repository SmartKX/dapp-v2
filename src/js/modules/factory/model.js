app.module('factory/Model', function() {

    var reserved = ['_data']

    class Model {

        constructor({ data = {}, ignore = [], required = [], defaults = {} }) {
            this._init(data, ignore, required, defaults)
        }

        _init(data, ignore, required, defaults) {
            required
                .forEach((key) => {
                    if (!data.hasOwnProperty(key))
                        throw new Error(`Sorry, model ${key} is required!`)
                })
            Object.keys(defaults)
                .forEach((key) => {
                    if (!data.hasOwnProperty(key))
                        data[key] = defaults[key]
                })
            this._data = data
            var configurable = true
            Object.keys(data)
                .forEach((key) => {
                    if (reserved.indexOf(key) > -1)
                        throw new Error(`Sorry, model ${key} is reserved!`)
                    if (ignore.indexOf(key) > -1)
                        return
                    Object.defineProperty(this, key, {
                        get() {
                            return this._data[key]
                        },
                        set(v) {
                            this._data[key] = v
                        },
                        configurable
                    })
                })
        }

    }

    return Model

})