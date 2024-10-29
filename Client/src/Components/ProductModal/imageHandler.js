// imageHandler.js

export const handleRemoveImage = (index, setImages) => {
    const newImages = [...setImages];
    newImages[index] = null;
    setImages(newImages);
  };
  
  export const handleImageUpload = (event, setImages) => {
    const file = event.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");
  
      fetch('https://api.cloudinary.com/v1_1/your_account/image/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        const newImages = [...setImages];
        const newImageUrl = data.secure_url;
  
        const firstEmptyIndex = newImages.findIndex(img => img == null || img === undefined);
  
        if (firstEmptyIndex !== -1) {
          newImages[firstEmptyIndex] = newImageUrl;
        } else {
          newImages.push(newImageUrl);
        }
  
        setImages(newImages);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };