export default function decorate(block) {

  const background = block.querySelector('[data-aue-prop="backgroundImage"] ')?.src;
  const title = block.querySelector('[data-aue-prop="title"]')?.innerHTML || '';
  const description = block.querySelector('[data-aue-prop="description"]')?.innerHTML || '';

  // CTA buttons array (each div is one item)
  const buttons = [...block.querySelectorAll('[data-aue-item]')].map(item => {
    const label = item.querySelector('[data-aue-prop="label"]')?.innerText || '';
    const link = item.querySelector('[data-aue-prop="link"]')?.value || '';
    return { label, link };
  });

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
                ${buttons.map(b => `
                  <a class="cta button a-button a-button--primary a-button--md" href="${b.link}">
                    ${b.label}
                  </a>
                `).join('')}
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
