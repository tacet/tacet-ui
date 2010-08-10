tacet.io = {
    XMLHttpRequest: (function () {
        var options = [
            function () { return new ActiveXObject("Microsoft.XMLHTTP") },
            function () { return new XMLHttpRequest() }
        ];

        while (options.length > 0) {
            var x = options.shift();
            try { return x() && x; } catch(e) {}
        }
    }()),

    get: function (url, onSuccess) {
        var xhr = this.XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json, */*");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    onSuccess(xhr);
                }
            }
        };
        xhr.send();
    }
};