function searchPosts() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        if (title.includes(input)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        if (category === 'All' || post.getAttribute('data-category') === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    function toggleNav() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    }

    burger.addEventListener('click', toggleNav);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
});


