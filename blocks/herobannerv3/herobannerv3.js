export default function decorate(block) {

  /* -------------------- EXISTING CODE (UNCHANGED) -------------------- */
  const bgEl = block.querySelector('[data-aue-prop="backgroundImage"]');
  const eyebrowEl = block.querySelector('[data-aue-prop="eyebrow"]');
  const titleEl = block.querySelector('[data-aue-prop="title"]');
  const descEl = block.querySelector('[data-aue-prop="description"]');
  const ctaEl = block.querySelector('[data-aue-prop="cta"]');

  const bg = bgEl?.src || bgEl?.getAttribute('data-src') || '';
  const eyebrow = eyebrowEl?.innerHTML || '';
  const title = titleEl?.innerHTML || '';
  const description = descEl?.innerHTML || '';
  const ctaHtml = ctaEl?.innerHTML || '';

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

  /* -------------------- STYLE LOGIC (NEW) -------------------- */

  // Find new root after rewriting HTML
  const root = block.querySelector('.herobanner-v3');
  if (!root) return;

  // Read values from UE metadata (these live in <block data-aue-model fields)
  const getValue = (name) => {
    const el = block.querySelector(`[data-aue-prop="${name}"]`);
    return el?.innerText?.trim() || '';
  };

  // Read multiselect: hideTextOptions
  const hideTextRaw = getValue('hideTextOptions');
  const hideTextOptions = hideTextRaw ? hideTextRaw.split(',').map(v => v.trim()) : [];

  hideTextOptions.forEach(cls => {
    if (cls) root.classList.add(cls);
  });

  // Single-value selects
  const textBlockLocation = getValue('textBlockLocation');
  const heroBannerHeight = getValue('heroBannerHeight');
  const cta1Color = getValue('cta1Color');
  const cta2Color = getValue('cta2Color');
  const textColor = getValue('textColor');

  [
    textBlockLocation,
    heroBannerHeight,
    cta1Color,
    cta2Color,
    textColor
  ].forEach(cls => {
    if (cls) root.classList.add(cls);
  });

}
