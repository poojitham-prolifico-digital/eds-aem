// blocks/herobanner/block.js
// Simple DOM decorator for EDS/Universal Editor flattened output.
// Run after DOMContentLoaded to add expected classes so CSS (BEM) matches.
(function () {
  function decorateHeroBlock(root) {
    if (!root) return;
    // idempotent: don't re-add if already present
    if (!root.classList.contains('hero-banner')) {
      root.classList.add('hero-banner');
    }

    // Often Franklin outputs: <div class="herobanner block"> <div> (picture) </div> <div> (title) </div> ...
    // Map children -> desired BEM structure
    const children = Array.from(root.children);
    if (children.length >= 1) {
      const imgWrapper = children[0];
      imgWrapper.classList.add('hero-banner__img-container');
      // ensure inner picture/img keep existing markup
      // add a marker class to image so CSS can target it
      const img = imgWrapper.querySelector('img, picture');
      if (img && !img.classList.contains('hero-banner__img')) img.classList.add('hero-banner__img');
    }
    if (children.length >= 2) {
      const titleWrap = children[1];
      titleWrap.classList.add('hero-banner__content-container');
      const inner = titleWrap.querySelector('div') || titleWrap;
      if (inner && !inner.classList.contains('hero-banner__content')) inner.classList.add('hero-banner__content');
    }
    // If description and CTA are additional siblings, map them to banner-content children
    // Create a wrapper .banner-content__main if not present
    let content = root.querySelector('.hero-banner__content');
    if (content) {
      // find title, description, cta within the following siblings and append them into content if needed
      const rest = Array.from(root.children).slice(1);
      // If the content already exists (from your block.html), skip moving nodes.
      // This is conservative: only add classes to existing nested nodes.
      rest.forEach((sibling) => {
        // add roles/classes based on simple heuristics
        if (sibling.textContent && sibling.textContent.trim().length > 0) {
          // if it contains a button or link -> treat as CTA
          if (sibling.querySelector('a, button')) {
            sibling.classList.add('banner-content__cta');
          } else {
            // heuristically treat as description/title wrapper
            sibling.classList.add('banner-content__desc');
          }
        }
      });
    }
  }

  function run() {
    // handle existing nodes
    const nodes = document.querySelectorAll('.herobanner.block, [data-block-name="herobanner"]');
    nodes.forEach(decorateHeroBlock);

    // observe for late loaded blocks (if Franklin injects blocks after load)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes && m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches && (n.matches('.herobanner.block') || n.matches('[data-block-name="herobanner"]'))) {
            decorateHeroBlock(n);
          } else {
            // if a wrapper was added containing our block:
            const found = n.querySelector && n.querySelector('.herobanner.block, [data-block-name="herobanner"]');
            if (found) decorateHeroBlock(found);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
