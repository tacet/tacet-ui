TestCase("SargeFuTest", {
    setUp: function () {
        this.e1 = document.createElement("div");
        this.e1.setAttribute("class", "e1");
        this.e2 = document.createElement("div");
        this.e2.setAttribute("class", "e2");
        this.b = document.getElementsByTagName("body")[0];
    },

    getDivNodes: function () {
        var divNodes= [];
        for (var i = 0, il = this.b.childNodes.length; i < il; i++) {
            if (this.b.childNodes[i].nodeName == "DIV") {
                divNodes.push(this.b.childNodes[i]);
            }
        }
        
        return divNodes;
    },

    "test parent": function () {
        assert(sarge(this.e1).parent() == null);

        this.e2.appendChild(this.e1);
        assert(sarge(this.e1).parent() == this.e2);

        this.b.appendChild(this.e1);
        assert(sarge(this.e1).parent() == this.b);
    },

    "test insertBefore": function () {
        this.b.appendChild(this.e2);
        sarge(this.e1).insertBefore(this.e2);

        var divNodes = this.getDivNodes();

        assertEquals(2, divNodes.length);
        assert(divNodes[0] == this.e1);
        assert(divNodes[1] == this.e2);
    },

    "test insertAfter with no nextSibling": function () {
        this.b.appendChild(this.e2);
        sarge(this.e1).insertAfter(this.e2);

        var divNodes = this.getDivNodes();
        assertEquals(2, divNodes.length);
        assert(divNodes[0] == this.e2);
        assert(divNodes[1] == this.e1);
    },

    "test insertAfter with nextSibling": function () {
        this.b.appendChild(this.e2);
        this.b.appendChild(document.createElement("p"));
        sarge(this.e1).insertAfter(this.e2);

        var divNodes = this.getDivNodes();

        assertEquals(2, divNodes.length);
        assert(divNodes[0] == this.e2);
        assert(divNodes[1] == this.e1);
    },

    "test addClass": function () {
        sarge(this.e1).addClass("foo");
        sarge(this.e1).addClass("bar");
        assertEquals("e1 foo bar", this.e1.getAttribute("class"));
    },

    "test removeClass": function () {
        sarge(this.e1).addClass("foo");
        sarge(this.e1).removeClass("e1");
        assertEquals("foo", this.e1.getAttribute("class"));

        sarge(this.e1).removeClass("foo");
        assertEquals("", this.e1.getAttribute("class"));
    },

    "test hasClass": function () {
        assert(sarge(this.e1).hasClass("e1"));
        sarge(this.e1).addClass("foo");
        assert(sarge(this.e1).hasClass("e1"));
    },

    "test toggleClass": function () {
        sarge(this.e1).toggleClass("foo");
        assertEquals("e1 foo", this.e1.getAttribute("class"));
        sarge(this.e1).toggleClass("foo");
        assertEquals("e1", this.e1.getAttribute("class"));
        sarge(this.e1).toggleClass("e1");
        assertEquals("", this.e1.getAttribute("class"));

        sarge(this.e1).toggleClass("e1", true);
        sarge(this.e1).toggleClass("e1", true);
        sarge(this.e1).toggleClass("e1", true);
        assertEquals("e1", this.e1.getAttribute("class"));

        sarge(this.e1).toggleClass("e1", false);
        assertEquals("", this.e1.getAttribute("class"));
        sarge(this.e1).toggleClass("e1", false);
        assertEquals("", this.e1.getAttribute("class"));
    },

    "test getAttribute": function () {
        assertEquals("e1", sarge(this.e1).attr("class"));
    },

    "test setAttribute": function () {
        sarge(this.e1).attr("class", "test")
        assertEquals("test", sarge(this.e1).attr("class"));
    }
});