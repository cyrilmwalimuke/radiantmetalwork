"use client"
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Header from '../(components)/Header';



export default function AddProduct() {
//   const { currentUser } = useSelector((state) => state.user);
  const router = useRouter()
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    price:null,
    category: '',

    
  
  });


  console.log(formData)



  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setImages(files); // Store the selected files in state
  };



  const handleImageUpload = async () => {
   if(images.length > 0 && images.length + formData.imageUrls.length < 7){
    try {
      // Prepare to upload each image and store their URLs
      const uploadPromises = images.map(async (image) => {
        const formDataa = new FormData();
        formDataa.append("file", image);
        formDataa.append("upload_preset", "cloudinary_2");
        
 

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dh7gvpuz3/image/upload", // Replace with your Cloudinary API URL
          formDataa
        );

        return response.data.secure_url; // Return the URL for each image
      });

      const urls = await Promise.all(uploadPromises); // Wait for all uploads to finish
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.concat(urls),
      }); // Save the uploaded URLs
    } catch (error) {
      console.error("Image upload failed:", error);
    }

   }

   else{
    setImageUploadError('You can only upload 6 images per listing');
    setUploading(false);
   }

   
  };
  
  

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
 
 
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1){
        setError('You must upload at least one image');
        alert(error)
        return

      }
      
   ;
      setLoading(true);
      setError(false);
      const res = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
    <Header/>
    <main className='p-20 max-w-4xl mx-auto text-xs'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Add A Product
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />

          <input
           type="number"
           placeholder='price'
           className='p-3 border rounded-lg'
           onChange={handleChange}
           id='price'
           />

           <input
            type="text" 
            placeholder='category'
            className='p-3 border rounded-lg'
            id='category'
            onChange={handleChange}
            />
         
            
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={handleImageChange}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageUpload}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          {/* {error && <p className='text-red-700 text-sm'>{error}</p>} */}
        </div>
      </form>
    </main>
    </>
    
  );
}