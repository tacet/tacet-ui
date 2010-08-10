tacet.calendar = {
    initialize: function (inputElement, time) {
        this.calendarLogic = new CalendarLogic.MonthCalendar({
            delegate: this,
            firstDayOfWeek: 1,
            dayNames: ["S", "M", "T", "W", "T", "F", "S"]
        });
        this.container = document.createElement("div");
        this.container.setAttribute("class", "calendar");
        this.calendarLogic.start();
        this.visible = false;

        var self = this;

        this.inputElement = inputElement;
        sarge(this.inputElement)
            .event("focus", function () {
                self.showCalendar();
            })
            .event("blur", function () {
                self.hideCalendar();
            })
            .event("click", function () {
                self.showCalendar();
            });

        this.container.style.left = this.inputElement.offsetLeft + "px";

        this.writeTime(time);
    },

    didClickDay: function (time) {
        this.writeTime(time);
        this.onClickDay(time);
        this.hideCalendar();
    },

    writeTime: function (time) {
        this.selectedTime = time;
        this.inputElement.value = [time.year(), time.month(), time.day()].join("/");
    },

    showCalendar: function () {
        if (this.visible) { return; }
        this.visible = true;
        sarge(this.container).insertAfter(this.inputElement);
    },

    hideCalendar: function () {
        if (!this.visible) { return; }
        this.visible = false;
        sarge(this.container).parent().removeChild(this.container)
    },

    /* Delegate functions */

    createMonth: function (time) {
        var html = ['<table cellspacing="0" cellpadding="0"><thead><tr>'];

        // For the week number column
        html.push('<th class="week_number"></th>');

        for (var i = 0, il = this.calendarLogic.dayNames.length; i < il; i++) {
            html.push('<th>');
            html.push(this.calendarLogic.dayNames[i]);
            html.push('</th>');
        }
        html.push('</tr></thead><tbody></tbody></table>');
        return html.join("");
    },

    renderMonth: function (month, time) {
        this.container.innerHTML = month;
    },

    createWeek: function (month, time) {
        var target = this.container.getElementsByTagName("tbody")[0];

        var weekCell = document.createElement("td");
        weekCell.setAttribute("class", "week_number");
        weekCell.innerHTML = time.week();

        var week = document.createElement("tr");
        week.appendChild(weekCell);
        target.appendChild(week);
        return week;
    },

    createCell: function (week, time) {
        var self = this;
        var cell = document.createElement("td");
        var scell = sarge(cell);
        cell.innerHTML = time.day();
        cell.setAttribute("class", "day");
        scell.event("click", function () {
            self.didClickDay(time);
            return false;
        });
        // So that clicking the calendar doesn't trigger "blur" of the
        // input field.
        scell.event("mousedown", function () { return false; });

        week.appendChild(cell);

        return sarge(scell);
    },

    renderCell: function (cell, isOffday, isToday, time) {
        cell.toggleClass("offday", isOffday);
        cell.toggleClass("today", isToday);
    }
};