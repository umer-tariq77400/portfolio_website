// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action || window.location.pathname, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    successMessage.innerHTML = `
                        <div class="alert alert-success">
                            <h4>${data.title}</h4>
                            <p>${data.body}</p>
                        </div>
                    `;
                    successMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    successMessage.innerHTML = `
                        <div class="alert alert-danger">
                            <h4>${data.title}</h4>
                            <p>${data.body}</p>
                        </div>
                    `;
                    successMessage.style.display = 'block';
                }
            } catch (error) {
                successMessage.innerHTML = `
                    <div class="alert alert-danger">
                        <h4>Error</h4>
                        <p>An error occurred. Please try again.</p>
                    </div>
                `;
                successMessage.style.display = 'block';
            }
        });
    }
});
