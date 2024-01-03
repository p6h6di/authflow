import { Button } from "../ui/button";
import { Icons } from "@/assets/Icons";

const SocialAccounts = () => {
  return (
    <>
      <Button onClick={() => {}} variant="outline" className="w-full">
        <Icons.google className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Continue with Google</span>
      </Button>
      <Button onClick={() => {}} variant="outline" className="w-full">
        <Icons.github className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Continue with Github</span>
      </Button>
    </>
  );
};

export default SocialAccounts;
