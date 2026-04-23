import './scss/style.scss';

const body = document.body;
const noTransitionDurationElements = body.querySelectorAll('.no-transition-duration');

const initObserver = () => {
  const animClassNames = ['anim-text', 'anim-icon', 'anim-image'];
  const elements = body.querySelectorAll(
    animClassNames.map(animClassName => `.${animClassName}`).join(',')
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const animClass = animClassNames.find(animClassName => element.classList.contains(animClassName));

      if (!animClass) {
        return;
      }

      element.classList.add(`${animClass}--active`);
      obs.unobserve(element);
    });
  }, {
    scrollMargin: '-100px',
  });

  elements.forEach(element => observer.observe(element));
};

initObserver();

window.addEventListener('load', () => {
  noTransitionDurationElements.forEach(element => element.classList.remove('no-transition-duration'));
});
