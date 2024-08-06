import "./Badge.scss";

import classNames from "classnames";

function Badge({ children, color, round, fullWidth, ...rest }: any) {
  return (
    <span
      className={classNames("Badge", color, { fullWidth, round })}
      {...rest}
    >
      {children}
    </span>
  );
}

Badge.defaultProps = {
  color: "all",
};

export default Badge;
