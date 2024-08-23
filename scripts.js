// Fetch the links from the links.m3u file and create cards
fetch('links.m3u')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
        const linkContainer = document.getElementById('link-cards');
        let cards = [];

        for (let i = 0; i < lines.length; i += 4) {
            if (i + 3 < lines.length) {
                const imgSrc = lines[i];           // Image link
                const imgName = lines[i + 1];      // Image name
                const url = lines[i + 2];          // Destination link
                const status = lines[i + 3];       // Status flag

                if (status.toLowerCase() === 'y') {
                    const card = document.createElement('div');
                    card.classList.add('col-md-3', 'col-sm-6', 'product-card');

                    card.innerHTML = `
                        <div class="card">
                            <a href="${url}" target="_blank">
                                <img src="${imgSrc}" class="card-img-top" alt="${imgName}">
                            </a>
                            <div class="card-body">
                                ${imgName}
                            </div>
                        </div>
                    `;

                    linkContainer.appendChild(card);
                    cards.push(card);
                }
            }
        }

        // Live Search Functionality
        document.getElementById('search-bar').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            cards.forEach(card => {
                const productName = card.querySelector('.card-body').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    })
    .catch(error => console.error('Error loading or parsing links.m3u:', error));
