const draggables = document.querySelectorAll('#draggable')
const containerboxes = document.querySelectorAll('.box')

let currentlyDragging = null; // Track the currently dragging element

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
        currentlyDragging = draggable; 
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        currentlyDragging = null; 
    });
});

containerboxes.forEach(containerbox => {
    containerbox.addEventListener('dragover', (event) => {
        event.preventDefault(); 

        if (currentlyDragging) {
            if (containerbox.querySelector('div') === null) {
                console.log('hi');
                containerbox.appendChild(currentlyDragging);
            }
        }
    });
});
