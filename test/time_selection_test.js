TestCase("TimeSelection", {
    setUp: function () {
        this.i = document.createElement("input");
        this.t = tacet.create(tacet.timeSelection);
        this.t.initialize(this.i, new Time(2001, 10, 28));
    },

    "test options are every 30 minutes": function () {
        assert(this.t.options[0].time.epoch() == new Time(2001, 10, 28, 0, 0).epoch());
        assert(this.t.options[1].time.epoch() == new Time(2001, 10, 28, 0, 30).epoch());
        assert(this.t.options[2].time.epoch() == new Time(2001, 10, 28, 1, 0).epoch());
        assert(this.t.options[47].time.epoch() == new Time(2001, 10, 28, 23, 30).epoch());
    },

    "test parsing custom entry": function () {
    }
});