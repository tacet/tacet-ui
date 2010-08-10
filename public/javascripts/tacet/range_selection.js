tacet.rangeSelection = {
    initialize: function (startDateInput, startTimeInput, endDateInput, endTimeInput) {
        var self = this;

        var startTime = new Time();
        startTime.beginningOfHour();

        var didSetEnd = false;

        this.startDateCal = tacet.create(tacet.calendar);
        this.startDateCal.initialize(startDateInput, startTime);
        this.startDateCal.onClickDay = function (time) {
            if (!didSetEnd) {
                self.endDateCal.writeTime(time);
            }
        };

        this.endDateCal = tacet.create(tacet.calendar);
        this.endDateCal.initialize(endDateInput, startTime);
        this.endDateCal.onClickDay = function (time) {
            didSetEnd = true;
        };
    },

    getStartTime: function () {
        var date = this.startDateCal.selectedTime;
        var time = this.startDateTime.selectedTime;
        return new Time(date.year(), date.month(), date.day(), time.hour(), time.minute());
    }
};