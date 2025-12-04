import React, { useRef } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface UploadViewProps {
  onImageSelect: (file: File) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto pop-in">
      <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-cartoon w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          拍下你的错题，我们来消灭它！ 📸
        </h2>
        
        <div 
          onClick={triggerSelect}
          className="cursor-pointer border-4 border-dashed border-cartoon-blue bg-blue-50 hover:bg-blue-100 transition-colors rounded-2xl p-12 flex flex-col items-center gap-4 group"
        >
          <div className="bg-white p-4 rounded-full border-4 border-cartoon-blue group-hover:scale-110 transition-transform duration-300">
            <Camera className="w-12 h-12 text-cartoon-blue" />
          </div>
          <p className="text-lg font-bold text-cartoon-blue">点击拍照或上传图片</p>
          <p className="text-sm text-gray-500">支持 JPG, PNG 格式</p>
        </div>

        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        <div className="mt-8 flex gap-4 justify-center text-sm text-gray-600 font-medium">
          <span className="flex items-center gap-1">
             <span className="bg-cartoon-green w-4 h-4 rounded-full border border-black"></span>
             超级快
          </span>
          <span className="flex items-center gap-1">
             <span className="bg-cartoon-yellow w-4 h-4 rounded-full border border-black"></span>
             超智能
          </span>
          <span className="flex items-center gap-1">
             <span className="bg-cartoon-red w-4 h-4 rounded-full border border-black"></span>
             超有趣
          </span>
        </div>
      </div>
    </div>
  );
};
