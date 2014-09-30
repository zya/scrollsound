// modified loop - from WAAX by Hongchan Choi -https://github.com/hoch/waax

function Loop(callback, repetition, interval, context) {
    this.context = context;

    Object.defineProperties(this, {
        // index for iteration
        _index: {
            writable: true,
            value: 0
        },
        // number of iteration
        _repetition: {
            value: (repetition || 0)
        },
        // interval between iteration in seconds
        _interval: {
            writable: true,
            value: (interval || 1.0)
        },
        // start time of next iteration
        _next: {
            writable: true,
            value: 0
        },
        // schedule check up interval in milliseconds (setTimeout)
        _checkup: {
            value: 1000 / 30
        },
        // look-ahead window in seconds for each checkup
        _ahead: {
            value: 1.0
        },
        // looping mode: finite or infinite
        _infinite: {
            writable: true,
            value: false
        },
        // flag for looping
        _continue: {
            writable: true,
            value: true
        },
        _timerId: {
            writable: true,
            value: null
        },
        // callback function reference
        _callback: {
            writable: true,
            value: (callback || function () {})
        }
    });

    this._infinite = (this._repetition === 0) ? true : false;
}

Loop.prototype = Object.create(null, {

    _loop: {
        value: function () {
            
            var n = this.context.currentTime;
            // if next trial is in range of now - ahead
            if (this._next < n + this._ahead) {
                // call content generator: with start time and loop index
                this._callback.call(this, this._next, this._index);
                // set next event
                this._next += this._interval;
                // wrapping up: index check, infinite mode check
                if (!this._infinite) {
                    this._continue = (++this._index >= this._repetition) ? false : true;
                }
            }
            // do the next checkup
            if (this._continue) {
                var me = this;
                this._timerId = setTimeout(function () {
                    me._loop();
                }, this._checkup);
            }
        }
    },

    /**
     * Start looping.
     */
    start: {
        value: function () {
            this._continue = true;
            clearTimeout(this._timerId);
            this._loop();
        }
    },

    /**
     * Stop looping.
     */
    stop: {
        value: function () {
            clearTimeout(this._timerId);
            this._continue = false;
        }
    },

});