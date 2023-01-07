import * as React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    className?: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const CheckboxContainer = styled.label`
  display: inline;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  
  span:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  &:hover input ~ span {
    background-color: #ccc;
  }
  
  input:checked ~ span {
    background-color: rebeccapurple;
  }
  
  input:checked ~ span:after {
    display: block;
  }
  
  span:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({ className, checked, onChange, disabled = false }) => (
    <CheckboxContainer className={className}>
        <input type="checkbox" onChange={onChange} checked={checked} disabled={disabled} />
        <span className="checkmark"></span>
    </CheckboxContainer>
);

export default Checkbox;
