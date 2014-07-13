var form = $('#search-form');
var btn = $('#search-request');
btn.click(function () {
    window.location = window.location + "/search?name=" + (form.val() || "LeeSinSux");
});