app.module('service/events', function() {

    var watchers = []

	class Events {

		static $emit(event, data) {
            watchers
                .forEach((w) => {
				    if (w.event == event)
					    w.callback(data)
			    })
		}

		static $off(event, id) {
            var index = watchers
                .find(w => w.event == event && w.id == id)
            if (index < 0)
                throw new Error(`Sorry, no watcher found for event: ${event}, id: ${id}!`)
			watchers.splice(index, 1)
		}

		static $on(event, id, callback) {
            var index = watchers
                .find(w => w.event == event && w.id == id)
            if (index > -1)
                throw new Error(`Sorry, duplicate watcher for event: ${event}, id: ${id}!`)
			watchers.push({ event, id, callback })
		}

		static unwatch(events, id) {
			for (var event in events) {
				Events.$off(event, id)
			}
		}

		static watch(events, id) {
			for (var event in events) {
				Events.$on(event, id, events[event])
			}
		}

	}

	return Events

})