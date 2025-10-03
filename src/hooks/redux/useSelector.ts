import { type RootState } from "@/store/store";
import {
  useSelector as ReduxUseSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const useSelector: TypedUseSelectorHook<RootState> = ReduxUseSelector;
export default useSelector;
