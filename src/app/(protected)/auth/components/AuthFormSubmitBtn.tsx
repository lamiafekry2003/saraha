// components
import Spinner from "@/components/shared/Spinner";
// shadcn
import { Button } from "@/components/ui/button";

type Props = {
  isPending: boolean;
  normalText: string;
  loadingText: string;
};

const AuthFormSubmitBtn = ({ isPending, normalText, loadingText }: Props) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="w-full p-3"
      style={{ height: "unset" }}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Spinner />
          {loadingText}
        </div>
      ) : (
        normalText
      )}
    </Button>
  );
};
export default AuthFormSubmitBtn;
