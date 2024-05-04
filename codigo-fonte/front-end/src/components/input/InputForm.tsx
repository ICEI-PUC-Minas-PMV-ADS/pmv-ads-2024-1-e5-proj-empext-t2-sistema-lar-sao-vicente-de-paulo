import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { valueType } from "antd/es/statistic/utils";
import {
  ChangeEventHandler,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from "react";

interface IInputForm {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: any;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  tooltip?: string;
  defaultValue?: any;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  maxLength?: number;
}

export const InputForm = ({
  label,
  placeholder,
  error,
  required,
  onChange,
  value,
  tooltip,
  defaultValue,
  type,
  autoComplete,
  maxLength,
}: IInputForm) => {
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
      <Input
        id={label}
        status={error && "error"}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength || 100}
        pattern={"^[a-zA-Z0-9]+$"}
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
