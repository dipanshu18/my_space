import { UploadVideoForm } from "@/components/upload-form";

export default function EditVideo() {
  return (
    <div className="mt-16 lg:mt-0 p-5">
      <h1 className="text-xl font-bold mb-5">Edit video details</h1>

      <UploadVideoForm type="edit" />
    </div>
  );
}
