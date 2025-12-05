export default function decorate(block) {

  // Collect UE-bound editable elements
  const bgEl = block.querySelector('[data-aue-prop="backgroundImage"]');
  const eyebrowEl = block.querySelector('[data-aue-prop="eyebrow"]');
  const titleEl = block.querySelector('[data-aue-prop="title"]');
  const descEl = block.querySelector('[data-aue-prop="description"]');
  const ctaEl = block.querySelector('[data-aue-prop="cta"]');

  // Extract the actual values
  const bg = bgEl?.src || bgEl?.getAttribute('data-src') || '';
  const eyebrow = eyebrowEl?.innerHTML || '';
  const title = titleEl?.innerHTML || '';
  const description = descEl?.innerHTML || '';
  const ctaHtml = ctaEl?.innerHTML || '';

  // Build final AEM-like HTML output
  block.innerHTML = `
    <div class="herobanner herobanner-v3 aem-GridColumn aem-GridColumn--default--12">

      <div class="cmp-hero-banner-v3 hero-marquee__main">

        <div class="hero-marquee__img-container">
          <div class="image">
            <div class="cmp-image" data-aue-prop="backgroundImage" data-aue-type="aem-content">
              <picture>
                <img class="hero-marquee__image-element" src="${bg}" alt="">
              </picture>
            </div>
          </div>
        </div>

        <div class="hero-marquee__content-container container-fluid wrapper">
          <div class="wrapper__inner">
            <div class="hero-marquee__content">

              <div class="marquee-content">
                <div class="marquee-content__main">

                  <div class="marquee-content__superhead" 
                       data-aue-prop="eyebrow"
                       data-aue-type="richtext">
                    ${eyebrow}
                  </div>

                  <div class="marquee-content__heading"
                       data-aue-prop="title"
                       data-aue-type="richtext">
                    ${title}
                  </div>

                  <div class="marquee-content__desc"
                       data-aue-prop="description"
                       data-aue-type="richtext">
                    ${description}
                  </div>

                  <div class="marquee-content__cta cta button a-button a-button--md a-button--primary"
                       data-aue-prop="cta"
                       data-aue-type="aem-content">
                       ${ctaHtml}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
