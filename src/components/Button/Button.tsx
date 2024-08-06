import "./Button.scss";

import classNames from "classnames";

function Button({ children, color, outline, fullWidth, type, ...rest }: any) {
  return (
    <button
      className={classNames("Button", color, type, { outline, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: "blue",
  type: "a",
};

export default Button;
