TestCase("RangeSelectionTest", {
    setUp: function () {
        this.sdi = document.createElement("input");
        this.sti = document.createElement("input");
        this.edi = document.createElement("input");
        this.eti = document.createElement("input");

        this.r = tacet.create(tacet.rangeSelection);
        this.r.initialize(this.sdi, this.sti, this.edi, this.eti);
    },

    "test selecting startDate if endDate has not been explicitly set": function () {
        var t = new Time(2008, 5, 17);
        this.r.startDateCal.didClickDay(t);
        assert(t == this.r.endDateCal.selectedTime);
    },

    "test selecting startDate if endDate has been explicitly set": function () {
        this.r.endDateCal.didClickDay(new Time());

        var t = new Time(2008, 5, 17);
        this.r.startDateCal.didClickDay(t);
        assert(t != this.r.endDateCal.selectedTime);
    }
});