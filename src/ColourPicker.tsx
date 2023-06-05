import { ColorInput as MantineColorInput } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import {
  parse_rgba_array_to_string,
  parse_rgba_string_to_array,
} from "./utils";

interface ColourPickerProps {
  value: Array<number>;
  onChange: (colour: Array<number>) => void;
  label: String;
}

export default function ColourPicker({
  value,
  onChange,
  label,
}: ColourPickerProps) {
  const [tempValue, setTempValue] = useState("rgba(0, 0, 0, 0)");

  const permValue = useMemo(() => parse_rgba_array_to_string(value), [value]);

  useEffect(() => {
    setTempValue(permValue);
  }, [permValue]);

  return (
    <MantineColorInput
      label={label}
      format="rgba"
      value={tempValue}
      onChange={setTempValue}
      onChangeEnd={(value) => {
        setTempValue(value);
        onChange(parse_rgba_string_to_array(value));
      }}
    />
  );
}
