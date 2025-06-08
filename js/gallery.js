document.addEventListener("DOMContentLoaded", () => {
    const jsonUrl = "photos/photos.json";
    const gallery = document.getElementById("fancybox-gallery");
    const searchInput = document.querySelector('input[type="search"]');

    let photos = [];

    function updateGallery(filter = "") {
        gallery.innerHTML = "";
        const filteredPhotos = photos.filter(photo =>
            photo.title.toLowerCase().includes(filter.toLowerCase()) ||
            photo.description.toLowerCase().includes(filter.toLowerCase())
        );

        filteredPhotos.forEach(photo => {
            const anchor = document.createElement("a");
            anchor.href = photo.filepath;
            anchor.setAttribute("data-fancybox", "gallery");
            anchor.setAttribute("data-caption", `<strong>${photo.title}</strong><br>${photo.description}<br>${photo.dateTimeTaken}`);
            anchor.classList.add("gallery-item");

            const img = document.createElement("img");
            img.src = photo.filepath;
            img.alt = photo.title;
            img.classList.add("img-thumbnail");

            anchor.appendChild(img);
            gallery.appendChild(anchor);
        });

        Fancybox.bind("[data-fancybox=gallery]", {
            loop: true,
            animationEffect: "fade",
            buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
            slideShow: {
                autoStart: true,
                speed: 2000
            },
            Thumbs: {
                autoStart: true
            }
        });
    }

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) throw new Error("Chyba ");
            return response.json();
        })
        .then(data => {
            photos = data.photos;
            updateGallery();
        })
        .catch(error => console.error("Hiba:", error));

    searchInput.addEventListener("input", event => {
        const filter = event.target.value;
        updateGallery(filter);
    });
});
