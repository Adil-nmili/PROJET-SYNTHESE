import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const TeamForm = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your team bio here...</p>",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    images.forEach((img) => formData.append("images", img));
    formData.append("bio", editor?.getHTML());

    // Handle formData submission here (e.g., call API)
    console.log("Form submitted with data:", {
      title,
      bio: editor?.getHTML(),
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Images (multiple)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {imagePreviews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover border rounded"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Team Bio</label>
        <div className="border rounded p-2">
          <EditorContent editor={editor} />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default TeamForm;
