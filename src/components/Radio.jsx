import { useId } from 'react';

export const Radio = ({ label, name, value, checked }) => {
  const id = useId();

  return (
    <label
      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
      htmlFor={id}
    >
      <input name={name} value={value} type="radio" id={id} checked={checked} />
      <span>{label}</span>
    </label>
  );
};
