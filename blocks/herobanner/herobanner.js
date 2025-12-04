
export default function decorate(block) {
  const backgroundEl = block.querySelector('[data-aue-prop="backgroundImage"]');
  const titleEl = block.querySelector('[data-aue-prop="title"]');
  const descEl = block.querySelector('[data-aue-prop="description"]');
  const ctaEl = block.querySelector('[data-aue-prop="textContent_cta"]');
  const ctaTextEl = block.querySelector('[data-aue-prop="textContent_ctaText"]');
  const background = backgroundEl?.src || backgroundEl?.getAttribute('data-src') || '';
  const title = titleEl?.innerHTML || '';
  const description = descEl?.innerHTML || '';
  const ctaLink = ctaEl?.getAttribute('href') || '';
  const ctaLabel = ctaTextEl?.innerText?.trim() || '';
  const html = `
<div class="container responsivegrid hero-banner container--default-width hero-banner--large-height hero-banner--content-left aem-GridColumn aem-GridColumn--default--12">
  <div class="hero-banner__main">
    <div class="hero-banner__img-container">
      <div class="image aem-GridColumn aemGridColumn--default-12">
        <div class="cmp-image" data-aue-prop="backgroundImage" data-aue-type="aem-content">
          <picture>
            <source media="(min-width: 1440px)" srcset="${background}" height="418">
            <source media="(min-width: 1200px)" srcset="${background}" height="400">
            <source media="(min-width: 992px)" srcset="${background}" height="320">
            <source media="(min-width: 768px)" srcset="${background}" height="316">
            <source media="(min-width: 0px)" srcset="${background}" height="240">
            <img src="${background}" decoding="async" fetchpriority="high" loading="eager" alt="">
          </picture>
        </div>
      </div>
    </div>
    <div class="container-fluid wrapper hero-banner__content-container">
      <div class="wrapper__inner">
        <div class="hero-banner__content" id="herobanner-796b3dfa4b">
          <div class="banner-content banner-content--no-img">
            <div class="banner-content__main">
              <div class="brand-heading" data-aue-prop="title" data-aue-type="richtext">
                ${title}
              </div>
              <div class="banner-content__desc" data-aue-prop="description" data-aue-type="richtext">
                ${description}
              </div>
              <div class="banner-content__cta">
                <div class="cta button a-button a-button--primary a-button--md a-link a-link--icon a-button--icon-left">
                  <!-- CTA Template kept intact for CSS -->
                  <a data-aue-prop="textContent_cta" data-aue-type="aem-content" href="${ctaLink}">
                    <div>
                      <button tabindex="0" class="btn schedule-engine-integration-cta" aria-label="${ctaLabel || 'CTA'}" id="button-bea9cd5877">
                        <em class="wg-icon wg-icon-calendar"></em>
                        <span data-aue-prop="textContent_ctaText" data-aue-type="text">${ctaLabel}</span>
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  block.innerHTML = html;
}
