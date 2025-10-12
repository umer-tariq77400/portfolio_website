// Blog page script
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-icon-btn');
    const blogCards = document.querySelectorAll('.blog_card');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            blogCards.forEach(card => {
                const categories = card.dataset.categories?.toLowerCase() || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    });
});
