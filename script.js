(function () {
  var root = document.documentElement;
  // tema: o site sempre abre no escuro; o botão alterna só durante a visita
  root.classList.remove("light");
  try {
    localStorage.removeItem("mep-theme"); // apaga a escolha salva por versões anteriores
  } catch (e) {}
  document.getElementById("theme").addEventListener("click", function () {
    root.classList.toggle("light");
  });
  // header
  var hdr = document.getElementById("hdr"),
    hero = document.getElementById("inicio");
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle("scrolled", y > 8);
    hdr.classList.toggle("hero-dark", y < hero.offsetHeight - 72);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // menu mobile
  var menu = document.getElementById("menu"),
    mnav = document.getElementById("mnav");
  menu.addEventListener("click", function () {
    var o = mnav.classList.toggle("open");
    menu.setAttribute("aria-expanded", o);
  });
  mnav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      mnav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }
  });
  // seção ativa: a última seção cujo topo já passou do meio da tela.
  // No fim da página, marca sempre a última (Contato), que é curta demais para chegar ao meio.
  var links = document.querySelectorAll("[data-s]"),
    secs = document.querySelectorAll("[data-sec]"),
    activeRaf = 0;
  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-s") === id);
    });
  }
  function updateActive() {
    activeRaf = 0;
    var mid = window.innerHeight * 0.5,
      id = secs[0].id,
      atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
    if (atBottom) {
      id = secs[secs.length - 1].id;
    } else {
      secs.forEach(function (s) {
        if (s.getBoundingClientRect().top <= mid) id = s.id;
      });
    }
    setActive(id);
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!activeRaf) activeRaf = requestAnimationFrame(updateActive);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateActive);
  updateActive();
  // revelar ao rolar (só abaixo da dobra; o que está visível já nasce pronto)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var vh = window.innerHeight,
      items = [];
    document.querySelectorAll("[data-rv]").forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.92) {
        el.classList.add("rv", "pre");
        items.push(el);
      }
    });
    var ro = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var el = e.target,
              sib = Array.prototype.indexOf.call(el.parentNode.children, el);
            el.style.transitionDelay = Math.min(sib, 3) * 90 + "ms";
            el.classList.remove("pre");
            ro.unobserve(el);
            setTimeout(function () {
              el.style.transitionDelay = "";
            }, 1400);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach(function (el) {
      ro.observe(el);
    });
    setTimeout(function () {
      items.forEach(function (el) {
        el.classList.remove("pre");
      });
    }, 6000);
  }
  // hero responde ao cursor
  if (
    !reduce &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    var raf = 0,
      tx = 0,
      ty = 0;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf)
        raf = requestAnimationFrame(function () {
          hero.style.setProperty("--mx", tx.toFixed(3));
          hero.style.setProperty("--my", ty.toFixed(3));
          raf = 0;
        });
    });
    hero.addEventListener("mouseleave", function () {
      hero.style.setProperty("--mx", 0);
      hero.style.setProperty("--my", 0);
    });
  }
  // toast
  var toast = document.getElementById("toast"),
    tt;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }
  document.getElementById("copy").addEventListener("click", function () {
    var t = document.getElementById("mail").textContent;
    function fallback() {
      var r = document.createRange();
      r.selectNodeContents(document.getElementById("mail"));
      var s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
      say("E-mail selecionado — use Ctrl+C");
    }
    try {
      navigator.clipboard.writeText(t).then(function () {
        say("E-mail copiado");
      }, fallback);
    } catch (e) {
      fallback();
    }
  });
  // enviar mensagem: no desktop abre a escolha do app de e-mail; no celular segue o mailto
  var send = document.getElementById("send"),
    mailMenu = document.getElementById("mail-menu"),
    desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
  function closeMail() {
    mailMenu.hidden = true;
    send.setAttribute("aria-expanded", "false");
  }
  send.addEventListener("click", function (e) {
    if (!desktop.matches) return;
    e.preventDefault();
    var open = mailMenu.hidden;
    mailMenu.hidden = !open;
    send.setAttribute("aria-expanded", String(open));
    if (open) mailMenu.querySelector("a").focus();
  });
  mailMenu.addEventListener("click", function (e) {
    if (e.target.closest("#mail-copy")) document.getElementById("copy").click();
    if (e.target.closest("a, button")) closeMail();
  });
  document.addEventListener("click", function (e) {
    if (!mailMenu.hidden && !e.target.closest(".mail-pick")) closeMail();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mailMenu.hidden) {
      closeMail();
      send.focus();
    }
  });
})();
