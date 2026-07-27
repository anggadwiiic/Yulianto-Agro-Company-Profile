import "./style.css";

window.addEventListener("load", () => {
  document.body.classList.remove("stop-transitions");
});

document.addEventListener("DOMContentLoaded", () => {
  // NAVBAR
  const navbar = document.getElementById("navbar");
  const sentinel = document.getElementById("top-sentinel");
  const brandLogo = document.getElementById("brand-logo");

  if (navbar && sentinel && brandLogo) {
    if (window.scrollY > 10) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-primary", "shadow-sm");
      brandLogo.src = "./assets/logo-yulianto-agro-putih.webp";
    }

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-primary", "shadow-sm");
            brandLogo.src = "./assets/logo-yulianto-agro-putih.webp";
          } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-primary", "shadow-sm");
            brandLogo.src = "./assets/logo-yulianto-agro-teks.webp";
          }
        });
      },
      { rootMargin: "0px 0px 0px 0px" },
    );
    navObserver.observe(sentinel);
  }

  // SCROLL
  const animatedElements = document.querySelectorAll(".animate-scroll");
  if (animatedElements.length > 0) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      const scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-active");
              scrollObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          el.classList.add("reveal-active");
        } else {
          scrollObserver.observe(el);
        }
      });
    } else {
      animatedElements.forEach((el) => el.classList.add("reveal-active"));
    }
  }

  // PAGINATION
  const articleContainer = document.getElementById("article-container");
  const paginationContainer = document.getElementById("pagination-container");
  const headerArtikel = document.getElementById("artikel-header");

  if (articleContainer && paginationContainer) {
    const articles = Array.from(articleContainer.children);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    let currentPage = 1;

    if (totalPages <= 1) {
      paginationContainer.classList.add("hidden");
      paginationContainer.classList.remove("flex");
    } else {
      const renderArticles = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        articles.forEach((article, index) => {
          if (index >= start && index < end) {
            article.classList.remove("hidden");
            setTimeout(() => {
              article.classList.remove("opacity-0", "scale-95");
              article.classList.add(
                "opacity-100",
                "scale-100",
                "transition-all",
                "duration-500",
              );
            }, 50);
          } else {
            article.classList.add("hidden", "opacity-0", "scale-95");
            article.classList.remove("opacity-100", "scale-100");
          }
        });
      };

      const renderPagination = (page) => {
        paginationContainer.innerHTML = "";

        // PREV
        if (page > 1) {
          const prevBtn = document.createElement("button");
          prevBtn.innerHTML =
            '<i class="fa-solid fa-chevron-left mr-2"></i> Sebelumnya';
          prevBtn.className =
            "flex items-center justify-center px-5 min-h-[44px] rounded-[30px] bg-white text-dark font-medium text-[16px] border border-gray-200 hover:bg-primary hover:text-white shadow-sm transition-colors cursor-pointer";
          prevBtn.addEventListener("click", () => goToPage(page - 1));
          paginationContainer.appendChild(prevBtn);
        }

        // INFO
        const infoText = document.createElement("span");
        infoText.textContent = `${page}  dari  ${totalPages}`;
        infoText.className =
          "flex items-center justify-center px-4 min-h-[44px] text-dark font-medium text-[16px] select-none";
        paginationContainer.appendChild(infoText);

        // NEXT
        if (page < totalPages) {
          const nextBtn = document.createElement("button");
          nextBtn.innerHTML =
            'Next <i class="fa-solid fa-chevron-right ml-2"></i>';
          nextBtn.className =
            "flex items-center justify-center px-5 min-h-[44px] rounded-[30px] bg-white text-dark font-medium text-[16px] border border-gray-200 hover:bg-primary hover:text-white shadow-sm transition-colors cursor-pointer";
          nextBtn.addEventListener("click", () => goToPage(page + 1));
          paginationContainer.appendChild(nextBtn);
        }
      };

      const goToPage = (page) => {
        currentPage = page;
        renderArticles(page);
        renderPagination(page);

        if (headerArtikel) {
          const yOffset = -100;
          const y =
            headerArtikel.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };

      goToPage(1);
    }
  }

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const zoomInBtn = document.getElementById("lightbox-zoom-in");
  const zoomOutBtn = document.getElementById("lightbox-zoom-out");
  const fullscreenBtn = document.getElementById("lightbox-fullscreen");
  const lightboxWrapper = document.getElementById("lightbox-wrapper");

  if (lightbox && lightboxImg && lightboxCaption) {
    let currentScale = 1;

    const openLightbox = (imgSrc, captionText) => {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = captionText;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");

      currentScale = 1;
      lightboxImg.style.transform = `scale(${currentScale})`;

      setTimeout(() => {
        lightbox.classList.remove("opacity-0");
        lightbox.classList.add("opacity-100");
      }, 10);
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("opacity-100");
      lightbox.classList.add("opacity-0");
      setTimeout(() => {
        lightbox.classList.remove("flex");
        lightbox.classList.add("hidden");
        lightboxImg.src = "";

        if (document.fullscreenElement || document.webkitFullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        }
      }, 300);
      document.body.style.overflow = "";
    };

    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src;
        const caption = item.querySelector("h3").textContent;
        openLightbox(imgSrc, caption);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentScale += 0.5;
        lightboxImg.style.transform = `scale(${currentScale})`;
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentScale > 1) {
          currentScale -= 0.5;
          lightboxImg.style.transform = `scale(${currentScale})`;
        }
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (lightbox.requestFullscreen) {
            lightbox.requestFullscreen().catch((err) => console.error(err));
          } else if (lightbox.webkitRequestFullscreen) {
            lightbox.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });
    }

    if (lightboxWrapper) {
      lightboxWrapper.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
          closeLightbox();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  // SIDEBAR
  const sidebar = document.getElementById("contact-sidebar");
  const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");
  const mainContent = document.getElementById("main-content");
  const footer = document.querySelector("footer");

  if (sidebar && sidebarToggleBtn && closeSidebarBtn) {
    const pushElements = [mainContent, navbar, footer].filter(Boolean);

    pushElements.forEach((el) => {
      el.classList.add(
        "transition-transform",
        "duration-[350ms]",
        "ease-in-out",
      );
    });

    const openSidebar = () => {
      document.body.classList.add("sidebar-open");
      sidebar.classList.remove("translate-x-full");
      sidebar.classList.add("translate-x-0");

      const sidebarWidth = sidebar.getBoundingClientRect().width;
      pushElements.forEach((el) => {
        el.style.transform = `translateX(-${sidebarWidth}px)`;
      });
    };

    const closeSidebar = () => {
      document.body.classList.remove("sidebar-open");
      sidebar.classList.add("translate-x-full");
      sidebar.classList.remove("translate-x-0");

      pushElements.forEach((el) => {
        el.style.transform = "";
      });
    };

    sidebarToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.body.classList.contains("sidebar-open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    closeSidebarBtn.addEventListener("click", closeSidebar);

    document.addEventListener("click", (e) => {
      if (
        document.body.classList.contains("sidebar-open") &&
        !sidebar.contains(e.target) &&
        !sidebarToggleBtn.contains(e.target)
      ) {
        closeSidebar();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        document.body.classList.contains("sidebar-open")
      ) {
        closeSidebar();
      }
    });

    window.addEventListener("resize", () => {
      if (document.body.classList.contains("sidebar-open")) {
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        pushElements.forEach((el) => {
          el.style.transform = `translateX(-${sidebarWidth}px)`;
        });
      }
    });
  }
});
