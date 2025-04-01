//your code here
 const imageUrls = [
            'https://picsum.photos/id/237/200/300',
            'https://picsum.photos/seed/picsum/200/300',
            'https://picsum.photos/200/300.jpg',
            'https://picsum.photos/200/300/',
            'https://picsum.photos/id/237/200/300'
        ];
        
        // DOM elements
        const imageContainer = document.getElementById('imageContainer');
        const verifyButton = document.getElementById('verify');
        const resetButton = document.getElementById('reset');
        const messageDiv = document.getElementById('message');
        
        // State variables
        let selectedImages = [];
        let duplicateImageUrl = '';
        
        // Initialize the game
        function initGame() {
            // Clear previous state
            imageContainer.innerHTML = '';
            selectedImages = [];
            messageDiv.textContent = '';
            verifyButton.style.display = 'none';
            resetButton.style.display = 'none';
            
            // Choose a random image to duplicate
            const randomIndex = Math.floor(Math.random() * imageUrls.length);
            duplicateImageUrl = imageUrls[randomIndex];
            
            // Create array with 5 unique images + 1 duplicate
            const displayImages = [...imageUrls, duplicateImageUrl];
            
            // Shuffle the array
            const shuffledImages = displayImages.sort(() => Math.random() - 0.5);
            
            // Create image elements
            shuffledImages.forEach((url, index) => {
                const imgBox = document.createElement('div');
                imgBox.className = 'image-box';
                imgBox.dataset.index = index;
                imgBox.dataset.url = url;
                
                const img = document.createElement('img');
                img.src = url;
                img.width = 50;
                img.height = 50;
                
                imgBox.appendChild(img);
                imageContainer.appendChild(imgBox);
                
                imgBox.addEventListener('click', handleImageClick);
            });
        }
        
        // Handle image click
        function handleImageClick(event) {
            const clickedBox = event.currentTarget;
            const imageUrl = clickedBox.dataset.url;
			
            // const index = clickedBox.dataset.index;
            
            // If already selected, deselect it
            if (selectedImages.includes(imageUrl)) {
                clickedBox.classList.remove('selected');
                selectedImages = selectedImages.filter(url => url !== imageUrl);
            } 
            // If less than 2 selected, select it
            else if (selectedImages.length < 2) {
                clickedBox.classList.add('selected');
                selectedImages.push(imageUrl);
            }
            
            // Show reset button if at least one image is selected
            resetButton.style.display = selectedImages.length > 0 ? 'inline-block' : 'none';
            
            // Show verify button if exactly two images are selected
            verifyButton.style.display = selectedImages.length === 2 ? 'inline-block' : 'none';
        }
        
        // Verify the selected images
        function verifySelection() {
            if (selectedImages.length !== 2) return;
            
           const boxes = document.querySelectorAll('.image-box');
           const firstUrl = boxes[selectedImages[0]].dataset.url;
            const secondUrl = boxes[selectedImages[1]].dataset.url;
            
            if (firstUrl === secondUrl) {
                messageDiv.textContent = "You are a human, Congratulations!";
                messageDiv.style.color = "green";
            } else {
                messageDiv.textContent = "We can't verify you as a human. You selected the non-identical files.";
                messageDiv.style.color = "red";
            }
            
            verifyButton.style.display = 'none';
        }
        
        // Reset the selection
        function resetSelection() {
            selectedImages.forEach(index => {
                const box = document.querySelector(`.image-box[data-index="${index}"]`);
                if (box) box.classList.remove('selected');
            });
            selectedImages = [];
            verifyButton.style.display = 'none';
            resetButton.style.display = 'none';
            messageDiv.textContent = '';
        }
        
        // Event listeners
        verifyButton.addEventListener('click', verifySelection);
        resetButton.addEventListener('click', resetSelection);
        
        // Initialize the game on page load
        window.addEventListener('load', initGame);