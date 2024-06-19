import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { DatePicker, Input, Tooltip } from "antd";
import { ChangeEvent, ChangeEventHandler } from "react";

interface IInputDatePicker {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: any;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  tooltip?: string;
  defaultValue?: any;
  disabled?: boolean;
}

export const InputDatePicker = ({
  label,
  placeholder,
  error,
  required,
  onChange,
  value,
  tooltip,
  defaultValue,
  disabled,
}: IInputDatePicker) => {
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
      <DatePicker
        id={label}
        status={error && "error"}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        format="DD/MM/YYYY"
        disabled={disabled}
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
