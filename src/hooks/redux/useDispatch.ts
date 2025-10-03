import { useDispatch as ReduxUseDespatch } from "react-redux";
import { type AppDispatch } from "../../store/store";

const useDispatch = () => ReduxUseDespatch<AppDispatch>();

export default useDispatch;
