// Arreglo de imágenes (URLs)
const images = [
    'index/assets/wall-vinyl-empire-graphics.jfif',
    'index/assets/barricade-graphics-empire.jfif', 
    'index/assets/service-graphic-empire-1.jpeg',
    'index/assets/service-graphic-empire-2.jpeg',
    'index/assets/service-graphic-empire-3.jpeg',
    'index/assets/service-graphic-empire-4.jpeg',
    'index/assets/service-graphic-empire-5.jpeg'
];

// Arreglo de títulos correspondientes a las imágenes
// Wallpaper, frosted, film, wallvinyl, Barricade, light boxes, fabric
const titles = [
    'Wall Vinyl',
    'Barricade',
    'Wallpaper',
    'Frosted',
    'Fill',
    'Light boxes',
    'and more...',
];

const mainImage = document.getElementById('mainImage');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const galleryTitle = document.querySelector('.gallery-title');
let currentIndex = 0;


// Función para actualizar la imagen principal y los thumbnails
function updateGallery(index) {
    // Actualizar imagen principal
    mainImage.src = images[index];
    
    // Actualizar título
    galleryTitle.textContent = titles[index];
    
    // Remover clase activa de todos los thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });

    // Agregar clase activa al thumbnail seleccionado
    document.querySelector(`.thumbnail[data-index="${index}"]`).classList.add('active');
    
    // Actualizar el índice actual
    currentIndex = index;
}

// Establecer la primera imagen como activa inicialmente
updateGallery(0);

// Event listener para los thumbnails
thumbnailContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('thumbnail')) {
        const index = event.target.getAttribute('data-index');
        updateGallery(parseInt(index));
    }
});