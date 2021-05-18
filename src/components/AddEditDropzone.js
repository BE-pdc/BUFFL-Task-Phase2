import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AddEditDropZoneCSS from './../styles/addEditDropzone.module.css';

const AddEditDropzone = ({ setImage }) => {
  const [files, setFiles] = useState([]);

  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/pdcbeinternship/image/upload';
  const CLOUDINARY_PRESET = 'ml_default';

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESET);

        const response = await fetch(CLOUDINARY_URL, {
          method: 'post',
          body: formData,
        });

        const data = await response.json();

        setImage(data.secure_url);
      });

      rejectedFiles.map(
        () =>
          (document.getElementById('dropzone').style.border = '2px dashed red')
      );
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setImage]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png',
    multiple: false,
  });

  const removeImage = () => {
    setImage('');
    setFiles([]);
  };

  const uploadPreview = files.map((file) => (
    <div key={file.name} className={AddEditDropZoneCSS.container}>
      <div className={AddEditDropZoneCSS.upload_preview}>
        <img width="250" src={file.preview} alt="upload preview" />
        <button onClick={() => removeImage()}>X</button>
      </div>
    </div>
  ));

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {files.length === 0 && (
          <div id="dropzone" className={AddEditDropZoneCSS.dropzone}>
            <button type="button" onClick={open}>
              Select a file
            </button>
            <p>or drag and drop a file here</p>
          </div>
        )}
      </div>
      <aside>{uploadPreview}</aside>
    </div>
  );
};

export default AddEditDropzone;
