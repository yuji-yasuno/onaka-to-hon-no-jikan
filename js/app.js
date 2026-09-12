/* おなかと本の時間 — affiliate tag + UI */
(function () {
  var TAG = window.ASSOCIATE_TAG || "YOUR-ASSOCIATE-ID-22";

  function withTag(url) {
    try {
      var u = new URL(url, window.location.origin);
      if (u.hostname.indexOf("amazon.co.jp") === -1) return url;
      u.searchParams.set("tag", TAG);
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  document.querySelectorAll("[data-amazon]").forEach(function (el) {
    var href = el.getAttribute("data-amazon") || el.getAttribute("href");
    if (!href) return;
    var tagged = withTag(href);
    el.setAttribute("href", tagged);
    el.setAttribute("rel", "nofollow sponsored noopener");
    el.setAttribute("target", "_blank");
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
