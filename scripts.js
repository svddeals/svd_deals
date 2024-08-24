// Fetch the links from the links.m3u file and create cards
fetch('links.m3u')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
        const linkContainer = document.getElementById('link-cards');
        let cards = [];

        // Collect all product information
        for (let i = 0; i < lines.length; i += 4) {
            if (i + 3 < lines.length) {
                const imgSrc = lines[i];           // Image link
                const imgName = lines[i + 1];      // Image name
                const url = lines[i + 2];          // Destination link
                const status = lines[i + 3];       // Status flag

                if (status.toLowerCase() === 'y') {
                    cards.push({ imgSrc, imgName, url });
                }
            }
        }

        // Reverse the order of the cards to display them in descending order
        cards.reverse();

        // Append the cards to the container with numbering
        cards.forEach(({ imgSrc, imgName, url }, index) => {
            const cardNumber = cards.length - index; // Highest number first
            const card = document.createElement('div');
            card.classList.add('col-6', 'col-sm-6', 'col-md-6', 'col-lg-3', 'product-card');

            card.innerHTML = `
                <div class="card">
                    <a href="${url}" target="_blank">
                        <div class="image-container">
                            <img src="${imgSrc}" class="card-img-top" alt="${imgName}">
                            <div class="card-body">${imgName}</div>
                            <div class="card-number">#${cardNumber}</div>
                        </div>
                    </a>
                </div>
            `;

            linkContainer.appendChild(card);
        });

        // Live Search Functionality
        document.getElementById('search-bar').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const productName = card.querySelector('.card-body').textContent.toLowerCase();
                card.style.display = productName.includes(searchTerm) ? '' : 'none';
            });
        });
    })
    .catch(error => console.error('Error loading or parsing links.m3u:', error));
