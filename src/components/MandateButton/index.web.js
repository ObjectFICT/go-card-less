import React from "react";

export default function MandateButton(props) {
  const { _height } = props;
  const {
    buttonText,
    buttonColor,
    buttonShadow,
    buttonRadius,
    borderWidth,
    borderColor,
    styles
  } = props.buttonStyle;

  const style = {
    width: "100%",
    height: _height,
    backgroundColor: buttonColor,
    color: styles.buttonText.color,
    fontWeight: styles.buttonText.fontWeight,
    fontFamily: styles.buttonText.fontFamily,
    fontSize: styles.buttonText.fontSize,
    borderRadius: buttonRadius,
    borderStyle: 'solid',
    borderWidth: borderWidth,
    borderColor: borderColor,
    textAlign: 'center',
  };

  if (buttonShadow) {
    style.boxShadow = "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px";
  }

  return (
    <div>
      <button style={style}>{buttonText}</button>
    </div>
  );
}
