export default function decorate(block) {
  const backgroundEl = block.querySelector('[data-aue-prop="backgroundImage"]');
  const titleEl = block.querySelector('[data-aue-prop="title"]');
  const descEl = block.querySelector('[data-aue-prop="description"]');
  const ctaEl = block.querySelector('[data-aue-prop="textContent_cta"]');
  const ctaTextEl = block.querySelector('[data-aue-prop="textContent_ctaText"]');

  const background = backgroundEl?.src || '';
  const title = titleEl?.innerHTML || '';
  const description = descEl?.innerHTML || '';
  const ctaLink = ctaEl?.getAttribute('href') || '';
  const ctaLabel = ctaTextEl?.innerText?.trim() || '';

  // IMPORTANT → KEEP AUE ATTRIBUTES in final HTML!
  const html = `
<div class="container responsivegrid hero-banner container--default-width hero-banner--large-height hero-banner--content-left">
  <div class="hero-banner__main">

    <div class="hero-banner__img-container">
      <div class="image">
        <div class="cmp-image">
          <picture>
            <img data-aue-prop="backgroundImage" data-aue-type="aem-content" src="${background}" alt="">
          </picture>
        </div>
      </div>
    </div>

    <div class="container-fluid wrapper hero-banner__content-container">
      <div class="wrapper__inner">
        <div class="hero-banner__content">
          <div class="banner-content banner-content--no-img">
            <div class="banner-content__main">

              <div class="brand-heading" data-aue-prop="title" data-aue-type="richtext">
                ${title}
              </div>

              <div class="banner-content__desc" data-aue-prop="description" data-aue-type="richtext">
                ${description}
              </div>

              <div class="banner-content__cta">
                <a data-aue-prop="textContent_cta" data-aue-type="aem-content" href="${ctaLink}">
                  <span data-aue-prop="textContent_ctaText" data-aue-type="text">
                    ${ctaLabel}
                  </span>
                </a>
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
