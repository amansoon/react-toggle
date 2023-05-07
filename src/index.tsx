import React, { Component, createRef, useState } from "react";

type Props = {
  checked: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type State = {
  disabled: boolean;
  checked: boolean;
  defaultChecked: boolean;
  hasFocus: boolean;
};

class ReactToggle extends Component<Props, State> {
  checkbox: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.state = {
      disabled: true,
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
      defaultChecked: false,
    };
  }

  componentDidMount(): void {
    const defaultChecked = this.props.defaultChecked || false;
    const checked = this.props.checked || false;
    this.setState({ checked, defaultChecked });
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: !!this.props.checked });
    }
  }

  handleClick(event: React.MouseEvent) {
    if (this.state.disabled || this.checkbox === null) {
      return;
    }
    const checkbox = this.checkbox;
    if (event.target !== checkbox) {
      checkbox.focus();
      checkbox.click();
      return;
    }
    const checked = this.props.hasOwnProperty("checked") ? this.props.checked : checkbox.checked;
    this.setState({ checked });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onChange) {
      this.props.onChange(event);
      return;
    }
    // this.setState({ checked: event.target.checked });
  }

  handleMousedown(event: React.MouseEvent) {}

  handleMouseUp(event: React.MouseEvent) {}

  handleTouchStart(event: React.TouchEvent) {}

  handleTouchMove(event: React.TouchEvent) {}

  handleTouchEnd(event: React.TouchEvent) {}

  handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ hasFocus: true });
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ hasFocus: false });
  }

  render() {
    const checked = this.state.checked;
    const disabled = this.state.disabled;
    const hasFocus = this.state.hasFocus;

    return (
      <>
        <div
          className={`toggle 
            ${checked ? "toggle--checked" : "toggle--unchecked"} 
            ${disabled ? "toggle--disabled" : ""}  
            ${hasFocus ? "toggle--has-focus" : ""}`}
          onClick={this.handleClick}
          onMouseDown={this.handleMousedown}
          onMouseUp={this.handleMouseUp}
        >
          <div className="toggle-track"></div>
          <div className={`toggle-thumb ${checked ? "toggle-thumb--checked" : "toggle-thumb--unchecked"}`}> </div>
          <input
            ref={(ref) => {
              this.checkbox = ref;
            }}
            type="checkbox"
            className="toggle-checkbox"
            checked={checked}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onMouseDown={this.handleMousedown}
            onMouseUp={this.handleMouseUp}
            onChange={this.handleChange}
          />
        </div>

        <button style={{ margin: "50px" }} onClick={() => this.setState({ disabled: !disabled })}>
          toggle disable
        </button>
      </>
    );
  }
}

export function App() {
  const [checked, setChecked] = useState(false);

  const handleChecked = (event) => {
    console.log("event = ", event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <div>
      <ReactToggle checked={checked} onChange={handleChecked} defaultChecked={false} />
    </div>
  );
}

export default ReactToggle;
