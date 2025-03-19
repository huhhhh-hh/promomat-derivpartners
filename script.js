// Sample promotional materials data
const promotionalMaterials = [
    {
        id: 1,
        title: "Company Logo Primary",
        description: "Official company logo in primary colors for general use.",
        category: "logos",
        formats: [
            { type: "svg", url: "assets/logos/company-logo-primary.svg", size: "24 KB" },
            { type: "png", url: "assets/logos/company-logo-primary.png", size: "156 KB" },
        ],
        thumbnail: "assets/logos/company-logo-primary.svg",
        dateAdded: "2023-05-15"
    },
    {
        id: 2,
        title: "Company Logo White",
        description: "White version of company logo for dark backgrounds.",
        category: "logos",
        formats: [
            { type: "svg", url: "assets/logos/company-logo-white.svg", size: "22 KB" },
            { type: "png", url: "assets/logos/company-logo-white.png", size: "142 KB" },
        ],
        thumbnail: "assets/logos/company-logo-white.svg",
        dateAdded: "2023-05-15"
    },
    {
        id: 3,
        title: "Summer Sale Banner",
        description: "Banner for summer sale promotion campaign.",
        category: "banners",
        formats: [
            { type: "png", url: "assets/banners/summer-sale.png", size: "320 KB" },
            { type: "jpeg", url: "assets/banners/summer-sale.jpg", size: "245 KB" },
        ],
        thumbnail: "assets/banners/summer-sale.jpg",
        dateAdded: "2023-06-01"
    },
    {
        id: 4,
        title: "Product Launch Banner",
        description: "Banner for new product launch announcements.",
        category: "banners",
        formats: [
            { type: "png", url: "assets/banners/product-launch.png", size: "380 KB" },
            { type: "jpeg", url: "assets/banners/product-launch.jpg", size: "290 KB" },
        ],
        thumbnail: "assets/banners/product-launch.jpg",
        dateAdded: "2023-06-10"
    },
    {
        id: 5,
        title: "Instagram Post Template",
        description: "Template for creating consistent Instagram posts.",
        category: "social",
        formats: [
            { type: "png", url: "assets/social/instagram-template.png", size: "210 KB" },
            { type: "jpeg", url: "assets/social/instagram-template.jpg", size: "185 KB" },
        ],
        thumbnail: "assets/social/instagram-template.jpg",
        dateAdded: "2023-05-20"
    },
    {
        id: 6,
        title: "Facebook Cover",
        description: "Official Facebook cover image with proper dimensions.",
        category: "social",
        formats: [
            { type: "png", url: "assets/social/facebook-cover.png", size: "240 KB" },
            { type: "jpeg", url: "assets/social/facebook-cover.jpg", size: "205 KB" },
        ],
        thumbnail: "assets/social/facebook-cover.jpg",
        dateAdded: "2023-05-22"
    },
    {
        id: 7,
        title: "Document Icon",
        description: "Icon for representing documents in applications.",
        category: "icons",
        formats: [
            { type: "svg", url: "assets/icons/document-icon.svg", size: "12 KB" },
            { type: "png", url: "assets/icons/document-icon.png", size: "28 KB" },
        ],
        thumbnail: "assets/icons/document-icon.svg",
        dateAdded: "2023-04-18"
    },
    {
        id: 8,
        title: "Settings Icon",
        description: "Icon for settings or configuration options.",
        category: "icons",
        formats: [
            { type: "svg", url: "assets/icons/settings-icon.svg", size: "10 KB" },
            { type: "png", url: "assets/icons/settings-icon.png", size: "24 KB" },
        ],
        thumbnail: "assets/icons/settings-icon.svg",
        dateAdded: "2023-04-18"
    },
];

// DOM elements
const materialsGrid = document.getElementById('materials-grid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const formatCheckboxes = document.querySelectorAll('.file-format-filters input');
const modal = document.getElementById('preview-modal');
const closeBtn = document.querySelector('.close-btn');
const noResults = document.getElementById('no-results');

// Current filters state
let currentCategory = 'all';
let currentFormats = ['svg', 'png', 'jpeg'];
let searchQuery = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMaterials();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        renderMaterials();
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchQuery = searchInput.value.trim().toLowerCase();
            renderMaterials();
        }
    });

    // Category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.filter;
            renderMaterials();
        });
    });

    // Format filters
    formatCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentFormats = Array.from(formatCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            renderMaterials();
        });
    });

    // Modal functionality
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Render materials based on current filters
function renderMaterials() {
    // Clear the grid
    materialsGrid.innerHTML = '';
    
    // Filter the materials
    const filteredMaterials = promotionalMaterials.filter(material => {
        // Filter by category
        const categoryMatch = currentCategory === 'all' || material.category === currentCategory;
        
        // Filter by format
        const formatMatch = material.formats.some(format => currentFormats.includes(format.type));
        
        // Filter by search query
        const searchMatch = searchQuery === '' || 
            material.title.toLowerCase().includes(searchQuery) || 
            material.description.toLowerCase().includes(searchQuery);
        
        return categoryMatch && formatMatch && searchMatch;
    });
    
    // Show or hide "no results" message
    if (filteredMaterials.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
    
    // Create material cards
    filteredMaterials.forEach(material => {
        const card = createMaterialCard(material);
        materialsGrid.appendChild(card);
    });
}

// Create a material card element
function createMaterialCard(material) {
    const card = document.createElement('div');
    card.className = 'material-card';
    
    // Format badges
    const formatBadges = material.formats
        .map(format => `<span class="file-type ${format.type}">${format.type.toUpperCase()}</span>`)
        .join('');
    
    // Card HTML
    card.innerHTML = `
        <div class="card-image">
            <img src="${material.thumbnail}" alt="${material.title}">
        </div>
        <div class="card-content">
            <h3>${material.title}</h3>
            <div>${formatBadges}</div>
            <div class="card-actions">
                <button class="preview-btn">Preview</button>
                <button class="download-btn">Download</button>
            </div>
        </div>
    `;
    
    // Add event listeners for preview and download
    const previewBtn = card.querySelector('.preview-btn');
    const downloadBtn = card.querySelector('.download-btn');
    
    previewBtn.addEventListener('click', () => {
        openPreviewModal(material);
    });
    
    downloadBtn.addEventListener('click', () => {
        // Open modal with focus on download section
        openPreviewModal(material, true);
    });
    
    return card;
}

// Open the preview modal for a material
function openPreviewModal(material, focusDownload = false) {
    // Set modal content
    document.getElementById('modal-title').textContent = material.title;
    document.getElementById('modal-image').src = material.thumbnail;
    document.getElementById('modal-description').textContent = material.description;
    document.getElementById('modal-category').textContent = 
        material.category.charAt(0).toUpperCase() + material.category.slice(1);
    document.getElementById('modal-filetype').textContent = 
        material.formats.map(f => f.type.toUpperCase()).join(', ');
    document.getElementById('modal-size').textContent = 
        material.formats.map(f => f.size).join(', ');
    document.getElementById('modal-date').textContent = formatDate(material.dateAdded);
    
    // Create download buttons
    const downloadButtonsContainer = document.getElementById('download-buttons');
    downloadButtonsContainer.innerHTML = '';
    
    material.formats.forEach(format => {
        const button = document.createElement('button');
        button.className = 'download-option-btn';
        button.textContent = `Download ${format.type.toUpperCase()}`;
        button.addEventListener('click', () => {
            downloadFile(format.url, `${material.title}.${format.type}`);
        });
        downloadButtonsContainer.appendChild(button);
    });
    
    // Display modal
    modal.style.display = 'block';
    
    // Scroll to download section if needed
    if (focusDownload) {
        setTimeout(() => {
            document.querySelector('.download-options').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Download file
function downloadFile(url, filename) {
    // In a real application, this would be a link to an actual file
    console.log(`Downloading ${filename} from ${url}`);
    
    // Create a simulated download
    alert(`Download started: ${filename}`);
    
    // In a real application, you would use something like:
    /*
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
}
