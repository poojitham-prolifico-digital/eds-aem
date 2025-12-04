export default async function decorate(block) {

  // 1. Get model from Universal Editor
  const model = await window.authoring?.getModel(block);

  // 2. Read fields from the model instead of DOM
  const background = model?.backgroundImage || '';
  const title = model?.title || '';
  const description = model?.description || '';
  const ctaLink = model?.textContent_cta || '';
  const ctaLabel = model?.textContent_ctaText || '';

  // 3. Build HTML
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

      <div class="container-fluid wrapper hero-banner__content-container">
        <div class="wrapper__inner">
          <div class="hero-banner__content">
            <div class="banner-content banner-content--no-img">
              <div class="banner-content__main">

                <div class="brand-heading">${title}</div>
                <div class="banner-content__desc">${description}</div>

                <div class="banner-content__cta">
                  ${ctaLabel && ctaLink ? `
                    <a class="cta button a-button--primary" href="${ctaLink}">
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
</div>
`;

  block.innerHTML = html;
}
