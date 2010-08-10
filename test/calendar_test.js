TestCase("CalendarTest", {
    setUp: function () {
        this.c = tacet.create(tacet.calendar);
        this.c.onClickDay = function () {};

        this.i = document.createElement("input");
        document.getElementsByTagName("body")[0].appendChild(this.i);
        this.c.initialize(this.i, new Time());
    },

    "test generating HTML": function () {
        assertEquals(this.c.container.getElementsByTagName("table").length, 1);

        var tds = this.c.container.getElementsByTagName("table")[0]
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr")[0]
            .getElementsByTagName("td");

        assertEquals(tds.length, 8); // One for week number, one for each day
        assertEquals(tds[0].getAttribute("class"), "week_number");
        assert(/day/.test(tds[1].getAttribute("class")));
    },

    "test clicking days": function () {
        this.c.didClickDay = sinon.spy();

        var tds = this.c.container
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr")[0]
            .getElementsByTagName("td");

        sarge(tds[0]).event("click"); // The week number
        sarge(tds[1]).event("click"); // The first actual date cell

        assert(this.c.didClickDay.calledOnce); // The week number does not have a click event.
    },

    "test input element stuffs": function () {
        assert(sarge(this.c.container).parent() == null);
        sarge(this.i).event("focus");
        assert(sarge(this.c.container).parent() == sarge(this.i).parent());

        sarge(this.i).event("blur");
        assert(sarge(this.c.container).parent() == null);
    }
});