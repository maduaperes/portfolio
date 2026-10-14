/* ================================================================
   INTERATIVIDADE DINÂMICA
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  hamburger?.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;

  function updateThemeIcon(isLight) {
    if (isLight) {
      themeIcon.innerHTML = `
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      `;
    } else {
      themeIcon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      `;
    }
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    htmlElement.setAttribute("data-theme", "light");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  themeToggle?.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "light") {
      htmlElement.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "dark");
      updateThemeIcon(false);
    } else {
      htmlElement.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
      updateThemeIcon(true);
    }
  });

  const langToggle = document.getElementById("langToggle");
  let isEnglish = false;

  langToggle?.addEventListener("click", () => {
    isEnglish = !isEnglish;

    if (isEnglish) {
      document.querySelector(".hero-main-title").innerHTML =
        `Software<br /><span>Developer</span>`;
      document.querySelector(".hero-bio").innerText =
        "Computer Science student with practical foundations in Python, FastAPI, and relational databases. Building clean systems and looking for my first professional opportunity.";
      document.querySelector("#sobre .section-title").innerText =
        "Technical Profile";
      document.querySelector("#trajetoria .section-title").innerText =
        "Professional Path";
      document.querySelector("#projetos .section-title").innerText =
        "Featured Projects";
      document.querySelector("#contato .section-title").innerText =
        "Let's Talk?";
      langToggle.querySelector(".btn-label").innerText = "PT";
    } else {
      document.querySelector(".hero-main-title").innerHTML =
        `Desenvolvedora<br /><span>de Software</span>`;
      document.querySelector(".hero-bio").innerText =
        "Estudante de Ciência da Computação com base sólida em Python, FastAPI e modelagem de dados. Focada em criar soluções eficientes, estruturadas e com alta usabilidade.";
      document.querySelector("#sobre .section-title").innerText =
        "Perfil Técnico";
      document.querySelector("#trajetoria .section-title").innerText =
        "Trajetória Profissional";
      document.querySelector("#projetos .section-title").innerText =
        "Projetos em Destaque";
      document.querySelector("#contato .section-title").innerText =
        "Vamos Conversar?";
      langToggle.querySelector(".btn-label").innerText = "EN";
    }
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("section > *").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "reveal" : "reveal-left");
    observer.observe(el);
  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Agrupado num único requestAnimationFrame por evento de scroll: sem
  // isso, o navegador roda esse cálculo (com leitura de offsetTop, que
  // força layout) uma vez por evento de scroll, que pode disparar dezenas
  // de vezes por segundo e travar a rolagem.
  let navUpdateQueued = false;
  const updateActiveNav = () => {
    navUpdateQueued = false;
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (navUpdateQueued) return;
      navUpdateQueued = true;
      requestAnimationFrame(updateActiveNav);
    },
    { passive: true },
  );

  /* ================================================================
     GRID MAGNÉTICO NO HERO
     Recria o grid de fundo num <canvas> só na seção inicial. Cada linha é
     uma sequência de pontos; os pontos perto do cursor são empurrados pra
     longe dele, curvando a linha, e voltam suavemente à posição reta
     quando o cursor se afasta ou sai do hero. Inspirado em
     https://www.originkit.dev/components/line-ripple-background (aqui
     simplificado: sem ruído/animação própria, só reage ao cursor).
     Desativado em telas sem mouse (touch) e com prefers-reduced-motion —
     nesses casos o hero fica só com o grid pontilhado normal (CSS global).

     Usa <canvas> em vez de SVG de propósito: a primeira versão manipulava
     um <polyline> por linha do grid via setAttribute a cada frame, e cada
     escrita de atributo forçava o navegador a reprocessar a geometria
     daquele elemento — com até 35 elementos sendo reescritos 60x/segundo,
     isso pesava sensivelmente em hardware mais modesto. Canvas desenha
     tudo (todas as linhas) numa única chamada de stroke() por frame, sem
     nenhum elemento de DOM sendo criado/alterado depois da primeira vez —
     bem mais barato pra esse tipo de efeito com muitos traços mudando
     de forma continuamente.
     ================================================================ */
  try {
    const hero = document.querySelector(".hero");
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (hero && supportsHover && !prefersReducedMotion) {
      const TILE = 64; // mesmo tamanho de malha do grid global (body::before)
      const SEGMENT = 48; // distância entre pontos ao longo de cada linha
      const RADIUS = 200; // raio de influência do cursor, em px
      const MAX_PUSH = 46; // deslocamento máximo bem no centro do raio, em px
      const EASE = 0.18; // velocidade da suavização (menor = mais lento/suave)
      const REST_OPACITY = 0.15; // opacidade em repouso (igual ao grid global)
      const ACTIVE_OPACITY = 0.55; // opacidade quando o cursor está atuando
      const MAX_DPR = 2; // limite de nitidez em telas retina, sem exagerar o custo

      const canvas = document.createElement("canvas");
      canvas.className = "hero-grid";
      hero.insertBefore(canvas, hero.firstChild);
      const ctx = canvas.getContext("2d");

      let lines = [];
      let cursorX = null;
      let cursorY = null;
      let intensity = 0;
      let targetIntensity = 0;
      let rafId = null;
      let heroRect = null;
      let heroRectDirty = true;
      let gridWidth = 0;
      let gridHeight = 0;
      let lineColor = "#888888";

      // --line é uma variável CSS que muda com o tema (claro/escuro) — lida
      // uma vez a cada início de interação (não a cada frame, pra não pagar
      // o custo de getComputedStyle 60x/segundo) via ensureLoop().
      const refreshColor = () => {
        lineColor =
          getComputedStyle(hero).getPropertyValue("--line").trim() || lineColor;
      };

      const buildGrid = () => {
        heroRect = hero.getBoundingClientRect();
        heroRectDirty = false;
        gridWidth = Math.max(1, Math.round(heroRect.width));
        gridHeight = Math.max(1, Math.round(heroRect.height));

        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.width = gridWidth * dpr;
        canvas.height = gridHeight * dpr;
        canvas.style.width = `${gridWidth}px`;
        canvas.style.height = `${gridHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        lines = [];
        const addLine = (basePoints) => {
          const xs = basePoints.map((p) => p[0]);
          const ys = basePoints.map((p) => p[1]);
          lines.push({
            basePoints,
            // Caixa delimitadora da linha, usada em render() pra pular todo
            // o cálculo ponto a ponto de linhas que o cursor nem chega
            // perto de afetar — nesses casos ela é desenhada como um único
            // segmento reto (do primeiro ao último ponto), não precisa
            // passar pelos pontos intermediários.
            minX: Math.min(...xs),
            maxX: Math.max(...xs),
            minY: Math.min(...ys),
            maxY: Math.max(...ys),
          });
        };

        // Linhas verticais, cada uma subdividida a cada SEGMENT px
        for (let x = 0; x <= gridWidth; x += TILE) {
          const pts = [];
          for (let y = 0; y <= gridHeight; y += SEGMENT) pts.push([x, y]);
          if (pts[pts.length - 1][1] !== gridHeight) pts.push([x, gridHeight]);
          addLine(pts);
        }

        // Linhas horizontais, mesma lógica
        for (let y = 0; y <= gridHeight; y += TILE) {
          const pts = [];
          for (let x = 0; x <= gridWidth; x += SEGMENT) pts.push([x, y]);
          if (pts[pts.length - 1][0] !== gridWidth) pts.push([gridWidth, y]);
          addLine(pts);
        }

        render();
      };

      // Distância do ponto mais próximo da caixa delimitadora de uma linha
      // até o cursor. Se isso já for >= RADIUS, nenhum ponto real da linha
      // pode estar dentro do raio de influência — a linha inteira pode ser
      // desenhada reta, sem percorrer os pontos intermediários.
      const distToBox = (line, x, y) => {
        const cx = Math.max(line.minX, Math.min(x, line.maxX));
        const cy = Math.max(line.minY, Math.min(y, line.maxY));
        const dx = x - cx;
        const dy = y - cy;
        return Math.sqrt(dx * dx + dy * dy);
      };

      const render = () => {
        const flat = intensity < 0.001 || cursorX === null;

        ctx.clearRect(0, 0, gridWidth, gridHeight);

        // Além de curvar as linhas, a malha inteira fica mais visível
        // enquanto o cursor está atuando (e volta a ficar discreta, igual
        // ao grid normal, assim que ele se afasta) — sem isso, em fundos
        // claros a curvatura sozinha pode passar despercebida.
        ctx.globalAlpha =
          REST_OPACITY + (ACTIVE_OPACITY - REST_OPACITY) * intensity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;

        // Uma única chamada de stroke() no fim desenha todas as linhas de
        // uma vez — bem mais barato do que um draw call por linha.
        ctx.beginPath();
        lines.forEach((line) => {
          const pts = line.basePoints;

          if (flat || distToBox(line, cursorX, cursorY) >= RADIUS) {
            const first = pts[0];
            const last = pts[pts.length - 1];
            ctx.moveTo(first[0], first[1]);
            ctx.lineTo(last[0], last[1]);
            return;
          }

          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) {
            const x = pts[i][0];
            const y = pts[i][1];
            const dx = x - cursorX;
            const dy = y - cursorY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist >= RADIUS || dist < 0.01) {
              ctx.lineTo(x, y);
              continue;
            }
            // Quanto mais perto do cursor, mais forte o empurrão
            // (decaimento quadrático até a borda do raio).
            const falloff = Math.pow(1 - dist / RADIUS, 2);
            const push = falloff * MAX_PUSH * intensity;
            ctx.lineTo(x + (dx / dist) * push, y + (dy / dist) * push);
          }
        });
        ctx.stroke();
      };

      const tick = () => {
        intensity += (targetIntensity - intensity) * EASE;
        const settled = targetIntensity === 0 && Math.abs(intensity) < 0.001;
        if (settled) intensity = 0;
        render();
        rafId = settled ? null : requestAnimationFrame(tick);
      };

      const ensureLoop = () => {
        if (rafId === null) {
          refreshColor();
          rafId = requestAnimationFrame(tick);
        }
      };

      hero.addEventListener("mousemove", (e) => {
        // Só recalcula a posição do hero quando ela pode ter mudado
        // (depois de rolar ou redimensionar) — getBoundingClientRect força
        // um layout síncrono, e chamá-lo em todo mousemove (que pode
        // disparar centenas de vezes por segundo) era um dos motivos do
        // efeito travar a página inteira.
        if (heroRectDirty) {
          heroRect = hero.getBoundingClientRect();
          heroRectDirty = false;
        }
        cursorX = e.clientX - heroRect.left;
        cursorY = e.clientY - heroRect.top;
        targetIntensity = 1;
        ensureLoop();
      });

      hero.addEventListener("mouseleave", () => {
        targetIntensity = 0;
        ensureLoop();
      });

      buildGrid();

      let resizeTimer = null;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildGrid, 200);
      });

      // Rolar a página move o hero em relação à viewport, então a posição
      // guardada em heroRect fica desatualizada — sem isso, o efeito
      // ficaria "desalinhado" do cursor depois de rolar e voltar ao hero.
      window.addEventListener(
        "scroll",
        () => {
          heroRectDirty = true;
        },
        { passive: true },
      );
    }
  } catch (err) {
    // Falha silenciosa: o hero continua funcionando normalmente sem o efeito.
  }
});
