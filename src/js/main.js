'use strict'
function init() {
    !function () {
        "use strict";
        const e = document.getElementsByClassName("tm");
        function t(e, t) {
            e.classList.add("ty"),
                t.style.maxHeight = t.scrollHeight + "px"
        }
        function n(e, t) {
            e.classList.remove("ty"),
                t.style.maxHeight = null
        }
        if (e.length > 0)
            for (let i = 0; i < e.length; i++) {
                const s = e[i]
                    , a = s.parentNode
                    , l = s.nextElementSibling;
                a.classList.contains("ty") && t(a, l),
                    s.addEventListener("click", function () {
                        a.classList.contains("ty") ? n(a, l) : t(a, l)
                    })
            }
    }(),
        function () {
            "use strict";
            let e = {
                touchStartX: 0,
                touchEndX: 0,
                minSwipePixels: 30,
                detectionZone: void 0,
                swipeCallback: function () { },
                init: function (t, n) {
                    e.swipeCallback = n,
                        t.addEventListener("touchstart", function (t) {
                            e.touchStartX = t.changedTouches[0].screenX
                        }, !1),
                        t.addEventListener("touchend", function (t) {
                            e.touchEndX = t.changedTouches[0].screenX,
                                e.handleSwipeGesture()
                        }, !1)
                },
                handleSwipeGesture: function () {
                    let t, n;
                    e.touchEndX <= e.touchStartX && (n = e.touchStartX - e.touchEndX,
                        t = "left"),
                        e.touchEndX >= e.touchStartX && (n = e.touchEndX - e.touchStartX,
                            t = "right"),
                        n > e.minSwipePixels && "undefined" !== t && e.swipe(t, n)
                },
                swipe: function (t, n) {
                    let i = {};
                    i.direction = t,
                        i.movedPixels = n,
                        e.swipeCallback(i)
                }
            };
            const t = document.getElementsByClassName("carousel-items");
            function n(e, t) {
                void 0 === t && (t = "next");
                let n = e.getElementsByClassName("tq ty")[0]
                    , i = "next" === t ? n.nextElementSibling : n.previousElementSibling
                    , s = n.getAttribute("data-carousel")
                    , a = e.parentNode.getElementsByClassName("ne")[s]
                    , l = "next" === t ? a.nextElementSibling : a.previousElementSibling;
                n.classList.remove("ty"),
                    a.classList.remove("ty"),
                    i ? (i.classList.add("ty"),
                        l.classList.add("ty")) : "next" === t ? (e.firstElementChild.classList.add("ty"),
                            e.parentNode.getElementsByClassName("tz")[0].firstElementChild.classList.add("ty")) : (e.lastElementChild.classList.add("ty"),
                                e.parentNode.getElementsByClassName("tz")[0].lastElementChild.classList.add("ty"))
            }
            function i(e, t) {
                let n, i = 0;
                for (let e = 0; e < t.length; e++)
                    t[0].parentNode.style.minHeight = i + "px",
                        t[e].classList.add("b"),
                        n = t[e].offsetHeight,
                        t[e].classList.remove("b"),
                        n > i && (i = n);
                t[0].parentNode.style.minHeight = i + "px"
            }
            function s(e) {
                e && clearInterval(e)
            }
            if (t.length > 0)
                for (let a = 0; a < t.length; a++) {
                    let l = t[a]
                        , c = l.getElementsByClassName("tq")
                        , r = 0
                        , o = l.getAttribute("data-autorotate");
                    const d = document.createElement("div");
                    d.className = "tz",
                        l.parentNode.insertBefore(d, l.nextSibling);
                    for (let e = 0; e < c.length; e++) {
                        c[e].setAttribute("data-carousel", e),
                            c[e].classList.contains("ty") && (r = e);
                        let t = document.createElement("tbuttonn");
                        t.className = "ne",
                            t.setAttribute("data-bullet", e),
                            l.parentNode.getElementsByClassName("tz")[0].appendChild(t)
                    }
                    c[r].classList.add("ty");
                    let u = l.parentNode.getElementsByClassName("ne");
                    u[r].classList.add("ty"),
                        i(0, c),
                        window.addEventListener("resize", function () {
                            i(0, c)
                        });
                    let m = !1;
                    o && (m = setInterval(function () {
                        n(l, "next")
                    }, o));
                    for (let e = 0; e < u.length; e++) {
                        let t = u[e];
                        t.addEventListener("click", function (e) {
                            if (e.preventDefault(),
                                t.classList.contains("ty"))
                                return;
                            for (let e = 0; e < u.length; e++)
                                u[e].classList.remove("ty");
                            for (let e = 0; e < c.length; e++)
                                c[e].classList.remove("ty");
                            let n = this.getAttribute("data-bullet");
                            c[n].classList.add("ty"),
                                this.classList.add("ty"),
                                s(m)
                        })
                    }
                    e.init(l, function (e) {
                        "left" === e.direction ? n(l, "next") : "right" === e.direction && n(l, "prev"),
                            s(m)
                    })
                }
        }(),

        function () {
            "use strict";
            document.documentElement.classList.remove("no-js"),
                document.documentElement.classList.add("js"),
                document.body.classList.add("n")
        }(),

        function () {
            "use strict";
            const e = document.getElementById("tc")
                , t = document.getElementById("nj");
            e && (e.addEventListener("click", function () {
                document.body.classList.toggle("td"),
                    t.classList.toggle("ty"),
                    t.style.maxHeight ? t.style.maxHeight = null : t.style.maxHeight = t.scrollHeight + "px",
                    "true" === this.getAttribute("aria-expanded") ? this.setAttribute("aria-expanded", "false") : this.setAttribute("aria-expanded", "true")
            }),
                document.addEventListener("click", function (n) {
                    n.target === t || n.target === e || t.contains(n.target) || (document.body.classList.remove("td"),
                        t.classList.remove("ty"),
                        t.style.maxHeight = null,
                        e.setAttribute("aria-expanded", "false"))
                }))
        }(),

        function () {
            "use strict";
            const e = document.getElementsByClassName("tw")
                , t = document.getElementsByClassName("modal-trigger");
            function n() {
                document.body.classList.remove("modal-is-active");
                for (let t = 0; t < e.length; t++)
                    e[t].classList.remove("ty")
            }
            if (e.length > 0 && t.length > 0)
                for (let e = 0; e < t.length; e++) {
                    let n = t[e]
                        , i = document.getElementById(n.getAttribute("aria-controls"));
                    i && (n.hasAttribute("data-video") && (null !== i.querySelector("iframe") ? i.querySelector("iframe").setAttribute("src", n.getAttribute("data-video")) : null !== i.querySelector("video") && i.querySelector("video").setAttribute("src", n.getAttribute("data-video"))),
                        n.addEventListener("click", function (e) {
                            var t;
                            e.preventDefault(),
                                n.hasAttribute("aria-controls") && (t = i) && (document.body.classList.add("modal-is-active"),
                                    t.classList.add("ty"))
                        }))
                }
            document.addEventListener("click", function (e) {
                (e.target.classList.contains("tw") || e.target.classList.contains("modal-close-trigger")) && (e.preventDefault(),
                    n())
            }),
                document.addEventListener("keydown", function (e) {
                    27 === (e || window.event).keyCode && n()
                })
        }(),

        function () {
            "use strict";
            const e = document.querySelectorAll(".rz");
            if (e.length > 0)
                for (let n = 0; n < e.length; n++) {
                    const i = e[n]
                        , s = {
                            el: i.querySelector("input")
                        };
                    s.data = JSON.parse(s.el.getAttribute("data-price-input")),
                        s.currentValEl = i.querySelector(".ie"),
                        s.thumbSize = parseInt(window.getComputedStyle(s.currentValEl).getPropertyValue("--thumb-size"), 10);
                    const a = i.parentNode.querySelectorAll(".pricing-item-price")
                        , l = [];
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e]
                            , n = {};
                        n.currency = t.parentNode.querySelector(".pricing-item-price-currency"),
                            n.amount = t.parentNode.querySelector(".pricing-item-price-amount"),
                            n.after = t.parentNode.querySelector(".pricing-item-price-after"),
                            n.data = JSON.parse(t.getAttribute("data-price-output")),
                            l.push(n)
                    }
                    s.el.setAttribute("min", 0),
                        s.el.setAttribute("max", Object.keys(s.data).length - 1),
                        !s.el.getAttribute("value") && s.el.setAttribute("value", 0),
                        t(s, l),
                        window.addEventListener("input", function () {
                            t(s, l)
                        })
                }
            function t(e, t) {
                e.currentValEl && (e.currentValEl.innerHTML = e.data[e.el.value]);
                for (let n = 0; n < t.length; n++) {
                    const i = t[n];
                    i.currency && (i.currency.innerHTML = i.data[e.el.value][0]),
                        i.amount && (i.amount.innerHTML = i.data[e.el.value][1]),
                        i.after && (i.after.innerHTML = i.data[e.el.value][2])
                }
                !function (e) {
                    const t = e.el.value / e.el.max
                        , n = e.thumbSize * t
                        , i = (e.thumbSize - e.currentValEl.clientWidth) / 2;
                    e.currentValEl.style.left = e.el.clientWidth * t - n + i + "px"
                }(e)
            }
        }(),

        function () {
            "use strict";
            const e = document.querySelectorAll(".rq");
            if (e.length > 0)
                for (let n = 0; n < e.length; n++) {
                    const i = e[n]
                        , s = i.querySelector("input")
                        , a = i.parentNode.querySelectorAll(".pricing-item-price")
                        , l = [];
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e]
                            , n = {};
                        n.currency = t.parentNode.querySelector(".pricing-item-price-currency"),
                            n.amount = t.parentNode.querySelector(".pricing-item-price-amount"),
                            n.after = t.parentNode.querySelector(".pricing-item-price-after"),
                            n.data = JSON.parse(t.getAttribute("data-price-output")),
                            l.push(n)
                    }
                    t(s, l),
                        window.addEventListener("change", function () {
                            t(s, l)
                        })
                }
            function t(e, t) {
                for (let n = 0; n < t.length; n++) {
                    const i = t[n]
                        , s = e.checked ? 1 : 0;
                    i.currency && (i.currency.innerHTML = i.data[s][0]),
                        i.amount && (i.amount.innerHTML = i.data[s][1]),
                        i.after && (i.after.innerHTML = i.data[s][2])
                }
            }
        }(),

        function () {
            "use strict";
            const e = document.querySelectorAll("[class*=reveal-]");
            let t = window.innerHeight;
            function n(e, t) {
                var n = 0;
                return function () {
                    var i = (new Date).getTime();
                    if (!(i - n < e))
                        return n = i,
                            t.apply(void 0, arguments)
                }
            }
            function i() {
                for (let i = 0; i < e.length; i++) {
                    let s = e[i]
                        , a = s.getAttribute("data-reveal-delay")
                        , l = s.getAttribute("data-reveal-offset") ? s.getAttribute("data-reveal-offset") : "200"
                        , c = s.getAttribute("data-reveal-container") ? s.closest(s.getAttribute("data-reveal-container")) : s;
                    n = l,
                        c.getBoundingClientRect().top <= t - n && !s.classList.contains("is-revealed") && (a && 0 !== a ? setTimeout(function () {
                            s.classList.add("is-revealed")
                        }, a) : s.classList.add("is-revealed"))
                }
                var n;
                !function () {
                    if (e.length > document.querySelectorAll("[class*=reveal-].is-revealed").length)
                        return;
                    window.removeEventListener("load", i),
                        window.removeEventListener("scroll", s),
                        window.removeEventListener("resize", a)
                }()
            }
            function s() {
                n(30, i())
            }
            function a() {
                t = window.innerHeight,
                    n(30, i())
            }
            e.length > 0 && document.body.classList.contains("t") && (i(),
                window.addEventListener("scroll", s),
                window.addEventListener("resize", a))
        }(),

        function () {
            "use strict";
            const e = document.getElementsByClassName("smooth-scroll")
                , t = (e, n, i, s, a) => {
                    const l = n - e;
                    let c = l / i;
                    const r = function (e) {
                        return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
                    }(c = Math.min(c, 1));
                    window.scroll(0, a + s * r),
                        l < i && window.requestAnimationFrame(n => {
                            const l = n || (new Date).getTime();
                            t(e, l, i, s, a)
                        }
                        )
                }
                ;
            if (e.length > 0)
                for (let n = 0; n < e.length; n++) {
                    e[n].addEventListener("click", function (e) {
                        e.preventDefault();
                        const n = e.target.closest(".smooth-scroll")
                            , i = n.href.split("#")[1]
                            , s = document.getElementById(i)
                            , a = n.getAttribute("data-duration") || 1e3;
                        s && window.requestAnimationFrame(e => {
                            const n = e || (new Date).getTime()
                                , i = n
                                , l = window.pageYOffset
                                , c = s.getBoundingClientRect().top;
                            t(i, n, a, c, l)
                        }
                        )
                    })
                }
        }(),

        function () {
            "use strict";
            const e = document.getElementsByClassName("nn");
            function t(e) {
                let t = e.getAttribute("aria-controls");
                document.getElementById(t).classList.add("ty"),
                    e.classList.add("ty")
            }
            if (e.length > 0)
                for (let n = 0; n < e.length; n++) {
                    let i = e[n];
                    i.addEventListener("click", function (n) {
                        n.preventDefault();
                        const i = this.closest(".tabs").getElementsByClassName("nr");
                        if (!this.classList.contains("ty")) {
                            for (let t = 0; t < e.length; t++)
                                e[t].classList.remove("ty");
                            for (let e = 0; e < i.length; e++)
                                i[e].classList.remove("ty");
                            t(this)
                        }
                    }),
                        i.classList.contains("ty") && t(i)
                }
        }();
}
export default init;