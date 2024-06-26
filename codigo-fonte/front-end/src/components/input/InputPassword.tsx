import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { ChangeEventHandler } from "react";

interface IInputPassword {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: valueType;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required: boolean;
  tooltip?: string;
}

export const InputPassword = ({
  label,
  placeholder,
  error,
  required,
  onChange,
  value,
  tooltip,
}: IInputPassword) => {
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
      <Input.Password
        id={label}
        status={error && "error"}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
        value={value}
        autoComplete={"current-password"}
      />
      {error && (
        <div className="flex gap-2 items-center text-red-600 text-xs">
          <WarningOutlined />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
