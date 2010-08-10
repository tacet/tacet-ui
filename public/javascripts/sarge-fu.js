sarge.api.getParent = function (element) {
    // IE has a parentNode of nodeType 11 instead of 0 for root nodes.
    return element.parentNode && (element.parentNode.nodeType == 11 ? null : element.parentNode);
};

sarge.api.insertBefore = function (element, otherElement) {
    var parent = sarge.prototype.callApiFunction("getParent", otherElement);
    parent.insertBefore(element, otherElement);
};

sarge.api.insertAfter = function (element, otherElement) {
    if (otherElement.nextSibling) {
        sarge.prototype.callApiFunction("insertBefore", element, otherElement.nextSibling);
    } else {
        var parent = sarge.prototype.callApiFunction("getParent", otherElement);
        sarge.prototype.callApiFunction("append", parent, element);
    }
};

sarge.api.append = function (element, otherElement) {
    element.appendChild(otherElement);
};

sarge.api.getAttribute = function (element, attribute) {
    return element.getAttribute(attribute);
};

sarge.api.setAttribute = function (element, attribute, value) {
    element.setAttribute(attribute, value);
};

(function () {
    var regexpSpecials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
    var regexpEscape = function (string) {
        return string.replace(regexpSpecials, "\\$&");
    };
    var classRegexp = function (cssClass) {
        return new RegExp("\\s?\\b" + regexpEscape(cssClass) + "\\b\\s?");
    };

    sarge.api.addClass = function (element, cssClass) {
        if (!sarge.prototype.callApiFunction("hasClass", element, cssClass)) {
            var current = sarge.prototype.callApiFunction("getAttribute", element, "class");
            var newClass = current ? (current  + " " + cssClass) : cssClass;
            sarge.prototype.callApiFunction("setAttribute", element, "class", newClass);
        }
    };

    sarge.api.removeClass = function (element, cssClass) {
        var r = classRegexp(cssClass);
        if (sarge.prototype.callApiFunction("hasClass", element, cssClass)) {
            var current = sarge.prototype.callApiFunction("getAttribute", element, "class");
            var newClass = current.replace(r, "");
            sarge.prototype.callApiFunction("setAttribute", element, "class", newClass);
        }
    };

    sarge.api.hasClass = function (element, cssClass) {
        var r = classRegexp(cssClass);
        return r.test(sarge.prototype.callApiFunction("getAttribute", element, "class"));
    };

    sarge.api.toggleClass = function (element, cssClass, customState) {
        var state;
        if (customState == undefined) {
            state = sarge.prototype.callApiFunction("hasClass", element, cssClass);
        } else {
            state = !customState;
        }

        if (state) {
            sarge.prototype.callApiFunction("removeClass", element, cssClass);
        } else {
            sarge.prototype.callApiFunction("addClass", element, cssClass);
        }
    };
}());