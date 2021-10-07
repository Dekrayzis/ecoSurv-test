import React from "react";

export const DropDown = ({
  blankFirstOption,
  options = [],
  label,
  name,
  selected,
  onChange,
  error,
}) => {
  const render_OptionsList = () =>
  options.map((value, idx) => (
      <Option key={value + idx} value={value} selected={selected} />
    ));

  return (
    <div className="form-select">
      <label className="dropdown__label" htmlFor={name}>
        {label}
      </label>
      <select
        data-testid="dropdown"
        className={`dropdown ${error ? "errored" : ""}`}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      >
        {blankFirstOption && (
          <option className="dropdown__option" value="" selected={selected}>
            Select
          </option>
        )}
        {render_OptionsList()}
      </select>
    </div>
  );
};

export const Option = ({ selected, value }) => {
  return (
    <option className="dropdown__option" value={value} selected={selected}>
      {value}
    </option>
  );
};
