// ========================================
// Nyael — Basic Page Script
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // 현재 페이지의 네비게이션 표시
    const currentPage =
      location.pathname
        .split("/")
        .pop();

    document
      .querySelectorAll(
        ".site-header nav a"
      )
      .forEach((link) => {

        const href =
          link
            .getAttribute("href")
            ?.split("/")
            .pop();

        if (
          href === currentPage
        ) {
          link.style.color =
            "#eb00bd";
        }

      });

  }
);
