sarge(window).event("load", function () {
    tacet.create(tacet.rangeSelection).initialize(document.getElementById("from_date"), null,
                                                  document.getElementById("to_date"), null);
});