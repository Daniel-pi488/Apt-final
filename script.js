document.addEventListener('DOMContentLoaded', function () {
  // === Dark Mode Toggle ===
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      darkModeToggle.setAttribute('aria-pressed', isDark);
    });
  }

  // === Back to Top Button ===
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Load Testimonials from Embedded XML ===
  const testimonialContainer = document.querySelector('.testimonial-container');
  const testimonialXMLScript = document.getElementById('testimonialXML');

  if (testimonialContainer && testimonialXMLScript) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(testimonialXMLScript.textContent, "application/xml");
      const testimonials = xmlDoc.getElementsByTagName('testimonial');

      for (let i = 0; i < testimonials.length; i++) {
        const testimonial = testimonials[i];
        const message = testimonial.getElementsByTagName('message')[0]?.textContent || '';
        const author = testimonial.getElementsByTagName('author')[0]?.textContent || 'Anonymous';

        const blockquote = document.createElement('blockquote');
        const p = document.createElement('p');
        p.textContent = message;

        const cite = document.createElement('cite');
        cite.textContent = `- ${author}`;

        blockquote.appendChild(p);
        blockquote.appendChild(cite);
        testimonialContainer.appendChild(blockquote);
      }
    } catch (err) {
      console.error('Error parsing testimonials XML:', err);
    }
  }
});
