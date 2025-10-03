// nextjs
import { useRouter } from "next/navigation";

// redux
import useDispatch from "@/hooks/redux/useDispatch";
// actions
import { logout } from "@/store/slices/authSlice";

// components
// shadcn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// icons
import { LogOut } from "lucide-react";

const LogoutBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger>
          <LogOut />
          Logout
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logout from your account, You can sign in again later at
            any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleLogout}>
            <LogOut />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LogoutBtn;
