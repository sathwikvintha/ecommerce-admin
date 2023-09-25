import { Loader2 } from "lucide-react";
import { FC } from "react";

interface AddingPageLoadingProps {}

const AddingPageLoading: FC<AddingPageLoadingProps> = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default AddingPageLoading;
