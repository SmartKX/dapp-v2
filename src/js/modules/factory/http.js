app.module('factory/Http', function() {

	var { axios } = window

    class Http {

        static _error({ response }) {
            var { status: code, statusText: text, data } = response
            var status = { code, text }
            return { status, data }
        }

        static async get({ url, options }) {
            try {
                var { data } = await axios.get(url, options)
                return data
            } catch(err) {
                throw Http._error(err)
            }
        }

        static async post({ url, data, options }) {
            try {
                var { data } =  await axios.post(url, data, options)
                return data
            } catch(err) {
                throw Http._error(err)
            }
        }

		static async put({ url, data, options }) {
            try {
                var { data } =  await axios.put(url, data, options)
                return data
            } catch(err) {
                throw Http._error(err)
            }
		}
		
		static async delete({ url, options }) {
            try {
                var { data } =  await axios.delete(url, options)
                return data
            } catch(err) {
                throw Http._error(err)
            }
        }

    }

    return Http

})