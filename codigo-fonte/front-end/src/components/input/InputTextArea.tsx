import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  ChangeEventHandler,
} from "react";

interface IInputTextArea {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: any;
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  required?: boolean;
  tooltip?: string;
  defaultValue?: any;
  maxLength?: number;
  rows: number
}

export const InputTextArea = ({
  label,
  placeholder,
  error,
  required,
  onChange,
  value,
  tooltip,
  defaultValue,
  maxLength,
  rows,
}: IInputTextArea) => {
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
      <TextArea
        id={label}
        status={error && "error"}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength || 100}
        rows={rows}
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
