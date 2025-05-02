import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { UploadCloudIcon } from "lucide-react";
import { uploadImage } from "../../redux/GigSlice/gigSlice";
import toast from "react-hot-toast";

const FileUpload = ({
  onUpload,
  accept = "image/*",
  previewType = "image",
}) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (
        (previewType === "image" && !isImage) ||
        (previewType === "video" && !isVideo)
      ) {
        toast.error(`Please upload a valid ${previewType} file.`);
        return;
      }

      setPreview(URL.createObjectURL(file));

      dispatch(uploadImage(file)).then((res) => {
        if (res.payload) {
          onUpload(res.payload);
        }
      });
    },
    [dispatch, onUpload, previewType]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #adadad",
          minHeight: "150px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          previewType === "image" ? (
            <img
              src={preview}
              alt="preview"
              width={150}
              className="flex items-center justify-center"
            />
          ) : (
            <video
              src={preview}
              controls
              muted
              className=" h-full w-full object-cover"
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <UploadCloudIcon size={50} className="text-center " />
            <p>upload file or drag and drop !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
