import "./OutlineBox.scss";

import classNames from "classnames";

function OutlineBox({ children, fullWidth, flexDirection, ...rest }: any) {
  return (
    <span
      className={classNames("OutlineBox", flexDirection, { fullWidth })}
      {...rest}
    >
      {children}
    </span>
  );
}

OutlineBox.defaultProps = {
  flexDirection: "row",
};

export default OutlineBox;
