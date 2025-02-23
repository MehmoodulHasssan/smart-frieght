import { useTheme } from '@/context/theme-context';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

interface ProfileImageProps {
  initialImage: string;
  onImageChange: (image: File) => void;
  editIcon: string;
}

const ProfileImage = ({
  initialImage,
  onImageChange,
  editIcon,
}: ProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(initialImage);
  const { theme } = useTheme();

  useEffect(() => {
    setProfileImage(initialImage);
  }, [initialImage]);

  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl);
      setProfileImage(imageUrl);
      if (onImageChange) {
        onImageChange(file); // Notify parent component of image change
      }
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <span className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
        />
        <button
          onClick={handleImageUpload}
          className={`absolute bottom-0 right-0 ${
            theme == 'dark' ? 'bg-gray-800' : 'bg-slate-200'
          } p-2 rounded-full border-2  border-white`}
          aria-label="Edit Profile Image"
        >
          <img src={editIcon} alt="Edit" className={`w-5 h-5`} />
        </button>
      </span>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
