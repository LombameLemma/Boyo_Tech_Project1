// 1. Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// 2. Sticky Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#020c1b';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// 3. Mobile Menu Logic
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Toggle menu when clicking the button
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- PLACE IT HERE ---
// Close mobile menu automatically when any link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 4. Professional Contact Form Logic
const contactForm = document.querySelector('.contact-form');

// Create a status message element dynamically
const statusMessage = document.createElement('div');
statusMessage.style.marginTop = "20px";
statusMessage.style.fontWeight = "600";
statusMessage.style.borderRadius = "5px";
statusMessage.style.padding = "10px";
statusMessage.style.display = "none";
statusMessage.style.textAlign = "center";
contactForm.appendChild(statusMessage);

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.textContent = "✓ " + result.message;
            statusMessage.style.color = "#2ecc71"; 
            statusMessage.style.backgroundColor = "rgba(46, 204, 113, 0.1)";
            statusMessage.style.display = "block";
            contactForm.reset();
        } else {
            throw new Error(result.message);
        }

        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

    } catch (error) {
        statusMessage.textContent = "✕ Error: Could not send message.";
        statusMessage.style.color = "#e74c3c"; 
        statusMessage.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
        statusMessage.style.display = "block";
    }

    setTimeout(() => {
        statusMessage.style.display = "none";
    }, 6000);
});