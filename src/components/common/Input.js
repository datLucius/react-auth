import React from 'react';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle, labelStyle } = styles;
  return (
    <div style={containerStyle}>
      <input
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChange={onChangeText}
      />
    </div>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: '5px',
    paddingLeft: '5px',
    fontSize: '18',
    lineHeight: '23px',
    flex: 2
  },
  labelStyle: {
    fontSize: '18',
    paddingLeft: '20px',
    flex: 1
  },
  containerStyle: {
    flex: 1,
    height: '40px',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export { Input };
