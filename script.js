// Portfolio Website JavaScript Functionality
// Handles mobile navigation and form interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

/**
 * Initialize contact form functionality
 * Handles form validation and submission feedback
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        // Override the existing submitted() function if it exists
        window.submitted = function() {
            if (validateForm()) {
                showSuccessMessage();
            }
        };
        
        // Add form validation on submit
        const submitButton = contactForm.querySelector('button[onclick="submitted()"]');
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (validateForm()) {
                    showSuccessMessage();
                }
            });
        }
    }
}

/**
 * Validate contact form fields
 * @returns {boolean} True if form is valid
 */
function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return false;
    
    const firstName = form.querySelector('#fname');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const phone = form.querySelector('#phone');
    
    let isValid = true;
    
    // Clear previous error states
    clearFormErrors();
    
    // Validate required fields
    if (!firstName || !firstName.value.trim()) {
        showFieldError(firstName, 'First name is required');
        isValid = false;
    }
    
    if (!email || !email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message || !message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    }
    
    // Validate phone if provided
    if (phone && phone.value.trim() && !isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number (+92xxxxxxxxxx)');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Display success message after form submission
 */
function showSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Show error message for a specific field
 * @param {HTMLElement} field - The form field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear all form error states
 */
function clearFormErrors() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const invalidFields = form.querySelectorAll('.is-invalid');
    const errorMessages = form.querySelectorAll('.invalid-feedback');
    
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
    errorMessages.forEach(error => error.remove());
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format (Pakistani format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone is valid
 */
function isValidPhone(phone) {
    return /^\+92\d{10}$/.test(phone);
}
