
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images, Plus, Calendar } from "lucide-react";
import { toast } from "sonner";

const PhotoUpload = () => {
  const [photos, setPhotos] = useState<Array<{ id: string; date: string; url: string }>>([]);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Create URL for the image
      const imageUrl = URL.createObjectURL(file);
      const today = new Date().toISOString().split('T')[0];
      
      // Add to photos array
      setPhotos([
        ...photos,
        {
          id: `photo-${Date.now()}`,
          date: today,
          url: imageUrl
        }
      ]);
      
      toast.success('Progress photo uploaded!');
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Images className="w-5 h-5 mr-2" />
          Progress Photos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative rounded-lg overflow-hidden aspect-square">
              <img 
                src={photo.url} 
                alt={`Progress on ${photo.date}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                <div className="flex items-center justify-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {photo.date}
                </div>
              </div>
            </div>
          ))}
          
          <label className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center">
              <Plus className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500 mt-1">Add Photo</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload} 
              />
            </div>
          </label>
        </div>
        
        <p className="text-sm text-gray-500">
          Regularly upload photos to visually track your transformation. We recommend taking photos from the same angle and in similar lighting.
        </p>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
