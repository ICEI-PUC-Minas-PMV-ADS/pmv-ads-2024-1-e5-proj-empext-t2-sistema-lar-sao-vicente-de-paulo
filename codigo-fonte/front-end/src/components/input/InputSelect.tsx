import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import { ChangeEvent, ChangeEventHandler, ReactNode } from "react";

interface IInputSelect {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: any;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required: boolean;
  children: ReactNode;
  tooltip?: string;
  defaultValue?: any;
}

export const InputSelect = ({
  label,
  placeholder,
  error,
  required,
  onChange,
  value,
  children,
  tooltip,
  defaultValue,
}: IInputSelect) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={label}>
          {label}
          {tooltip && (
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined
                style={{
                  fontSize: "13px",
                  paddingLeft: "5px",
                  color: "gray",
                }}
              />
            </Tooltip>
          )}
          {required && <span className="text-red-600 pl-1">*</span>}
        </label>
      )}
      <Select
        id={label}
        onChange={onChange}
        value={value}
        status={error && "error"}
        size="large"
        aria-required
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
      {error && (
        <div className="flex gap-2 items-center text-red-600 text-xs">
          <WarningOutlined />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
