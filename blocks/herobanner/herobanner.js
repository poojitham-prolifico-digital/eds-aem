
export default function decorate(block) {
  const background = block.querySelector('[data-aue-prop="backgroundImage"] ')?.src;
  const title = block.querySelector('[data-aue-prop="title"]')?.innerHTML || '';
  const description = block.querySelector('[data-aue-prop="description"]')?.innerHTML || '';

  const ctaLink = block.querySelector('[data-aue-prop="textContent_cta"]')?.href || '';
  const ctaLabel = block.querySelector('[data-aue-prop="textContent_ctaText"]')?.innerText || '';

  // build your original AEM-style hero banner HTML
  const html = `
<div class="container responsivegrid hero-banner container--default-width hero-banner--large-height hero-banner--content-left">
  <div class="hero-banner__main">
    <div class="hero-banner__img-container">
      <div class="image">
        <div class="cmp-image">
          <picture>
            <img src="${background}" alt="">
          </picture>
        </div>
      </div>
    </div>
    <div class="container-fluid wrapper hero-banner__content-container">
      <div class="wrapper__inner">
        <div class="hero-banner__content">
          <div class="banner-content banner-content--no-img">
            <div class="banner-content__main">
              <div class="brand-heading">${title}</div>
              <div class="banner-content__desc">${description}</div>
              <div class="banner-content__cta">
                ${ctaLabel && ctaLink ? `
                <a class="cta button a-button a-button--primary a-button--md" href="${ctaLink}">
                  ${ctaLabel}
                </a>
              ` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  // Replace the block content with your real markup
  block.innerHTML = html;
}
