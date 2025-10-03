import { ComponentProps } from "react";

const Spinner = (attr: ComponentProps<"div">) => {
  return (
    <div
      {...attr}
      className={`size-4 border-white border-2 border-b-transparent rounded-full animate-spin ${
        attr.className || ""
      }`.trim()}
    />
  );
};
export default Spinner;
