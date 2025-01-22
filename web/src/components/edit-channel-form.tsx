import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function EditChannelForm() {
  return (
    <form className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 gap-3">
        <Label>Channel pic</Label>
        <Input type="file" accept="image/jpeg" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Label>Channel name</Label>
        <Input type="text" placeholder="enter a name for channel" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Label>Channel Description</Label>
        <Textarea rows={15} placeholder="enter description" />
      </div>

      <div className="grid grid-cols-1 gap-3 mt-3">
        <Button>Save changes</Button>
      </div>
    </form>
  );
}
