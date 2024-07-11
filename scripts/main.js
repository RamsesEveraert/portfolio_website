document.addEventListener('DOMContentLoaded', function() 
{
    emailjs.init("g_iMnZ4PN4_GJjW2k");

    var myCarousel = document.getElementById('carouselExampleCaptions');
    if (myCarousel) {
        var indicators = myCarousel.querySelectorAll('.custom-indicator');
        
        myCarousel.addEventListener('slide.bs.carousel', function (event) 
            {
                indicators.forEach(function (indicator) 
                {
                    indicator.classList.remove('active');
                });
                indicators[event.to].classList.add('active');
            }
        );
    }

    document.getElementById('contact-form').addEventListener('submit', function(event) 
    {
        event.preventDefault();
        emailjs.sendForm('service_1schkg7', 'template_vinsit6', this)
            .then(function() 
            {
                alert('Your message has been sent successfully!');
            }, function(error) 
            {
                alert('Failed to send the message, please try again.');
            }
        );
    });
});

    // Project filter handling
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            filterItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
