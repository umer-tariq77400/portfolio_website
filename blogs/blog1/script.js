document.addEventListener('DOMContentLoaded', () => {
  const article = document.querySelector('#post');
  const tocList = document.querySelector('#tocList');
  if (!article || !tocList) return;

  // Collect headings (h2/h3)
  const headings = [...article.querySelectorAll('h2, h3')];

  // Ensure ids on headings
  headings.forEach((h, idx) => {
    if (!h.id) {
      const slug = h.textContent.trim().toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      h.id = slug || `section-${idx + 1}`;
    }
  });

  // Build TOC list
  headings.forEach(h => {
    const li = document.createElement('li');
    li.style.marginLeft = h.tagName === 'H3' ? '1rem' : '0';

    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.setAttribute('role', 'link');

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Highlight active section with IntersectionObserver
  const links = [...tocList.querySelectorAll('a')];
  const map = new Map(headings.map(h => [h.id, links.find(a => a.getAttribute('href') === `#${h.id}`)]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });

  headings.forEach(h => io.observe(h));
});
