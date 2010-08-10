TestCase("IOTest", sinon.testCase({
    "test XMLHttpRequest object": function () {
        var xhr = tacet.io.XMLHttpRequest();
        assert("open" in xhr);
        assertEquals(0, xhr.readyState);
    },

    "test get from server performs request and calls onSuccess": function () {
        this.server.respondWith("GET", "/", [200, {}, ""]);

        var onSuccess = sinon.spy();
        tacet.io.get("/", onSuccess);
        this.server.respond();
        assert(onSuccess.calledOnce);
    },

    "test get from server does not call onSuccess on errors": function () {
        this.server.respondWith("GET", "/", [500, {}, ""]);

        var onSuccess = sinon.spy();
        tacet.io.get("/", onSuccess);
        this.server.respond();
        assert(!onSuccess.called);
    }
}));