import "./InputBox.scss";

import classNames from "classnames";

function InputBox({
  at,
  title,
  input,
  fullWidth,
  type,
  placeholder,
  children,
}: // ...rest
any) {
  const hasTitle = () => {
    return title ? "title" : false;
  };
  const hasAt = () => {
    return at ? "at" : false;
  };
  return (
    <span className={classNames("InputBox", { fullWidth })}>
      {hasTitle() && (
        <span className={classNames("InputBox", hasTitle())}>{title}</span>
      )}
      {hasAt() && <span className={classNames("InputBox", hasAt())}>@</span>}
      {input ? (
        <input
          className={classNames("InputBox")}
          type={type}
          placeholder={placeholder}
          style={{ background: "#ffffff" }}
        />
      ) : (
        children
      )}
    </span>
  );
}

InputBox.defaultProps = {
  input: true,
  title: undefined,
  type: "text",
  placeholder: "",
  at: false,
};

export default InputBox;
