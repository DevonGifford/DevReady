import React, { ChangeEvent, useRef } from "react";

interface FileInputAreaProps {
  fileRef: React.RefObject<HTMLInputElement>;
  isUploading: boolean;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInputArea: React.FC<FileInputAreaProps> = ({
  fileRef,
  isUploading,
  handleFileUpload,
}) => (
  <div className="flex items-center justify-center w-full h-full">
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center aspect-square justify-center h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-1 pb-6">
        <svg
          className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF
        </p>
      </div>
      <input
        data-testid="file-input"
        id="dropzone-file"
        ref={fileRef}
        type="file"
        className="hidden"
        disabled={isUploading}
        onChange={handleFileUpload}
      />
    </label>
  </div>
);

export default FileInputArea;
