import { UserImageNameCard } from "@/components/user-image-name-card";

export default function Notifications() {
  return (
    <div className="p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold">Notifications</h1>

      <div className="my-5 grid grid-cols-1 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              className="shadow rounded-md p-5 flex flex-wrap gap-2 items-center"
            >
              <UserImageNameCard />
              <p>
                Some notification message: Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Assumenda, hic?
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
