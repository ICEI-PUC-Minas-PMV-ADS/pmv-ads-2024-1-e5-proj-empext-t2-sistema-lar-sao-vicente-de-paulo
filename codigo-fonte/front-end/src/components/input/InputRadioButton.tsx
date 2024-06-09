import { QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Radio, Tooltip } from "antd";

interface IInputRadioButton {
  label?: string;
  error?: string;
  value?: any;
  required?: boolean;
  tooltip?: string;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
}

export const InputRadioButton = ({
  label,
  error,
  required,
  value,
  tooltip,
  options,
  onChange,
}: IInputRadioButton) => {
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
      <Radio.Group
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="large"
      >
        {options.map((option) => (
          <Radio.Button key={option.value} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      {error && (
        <div className="flex gap-2 items-center text-red-600 text-xs">
          <WarningOutlined />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
