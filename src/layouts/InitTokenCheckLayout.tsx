"use client";

// react
import { useEffect, type ReactNode } from "react";
// redux
import useDispatch from "@/hooks/redux/useDispatch";
// actions
import { initTokenCheck, setIsPinding } from "@/store/slices/authSlice";

type Props = { children: ReactNode };
const InitTokenCheckLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTokenCheck());
    dispatch(setIsPinding(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
export default InitTokenCheckLayout;
