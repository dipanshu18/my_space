import { UploadVideoForm } from "@/components/upload-form";

export default function UploadVideo() {
  return (
    <div className="p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold">Upload video</h1>

      <div className="my-5 max-w-xl mx-auto">
        <UploadVideoForm type="upload" />
      </div>
    </div>
  );
}
