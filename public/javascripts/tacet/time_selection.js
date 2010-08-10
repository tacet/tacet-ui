tacet.timeSelection = {
    initialize: function (inputElement, time) {
        this.time = time.clone().beginningOfDay();
        this.options = [];

        // Doing our best to be daylight saving safe..
        var year = time.year();
        var month = time.month();
        var day = time.day();
        var hour = 0;
        var minute = 0;

        for (var i = 0, il = 48; i < il; i++) {
            this.options.push({time: new Time(year, month, day, hour, minute)});

            if (minute == 30) {
                hour += 1;
                minute = 0;
            } else {
                minute = 30;
            }
        }
    }
};