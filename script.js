document.addEventListener('mousemove', parallax);

function parallax(e) {
    document.querySelectorAll('.parallax img').forEach(layer => {
        const speed = layer.getAttribute('data-speed');

        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

function searchPosts() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        if (title.includes(input)) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        if (category === 'All' || post.getAttribute('data-category') === category) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}
