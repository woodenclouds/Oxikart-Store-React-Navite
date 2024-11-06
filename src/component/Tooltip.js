import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Tooltip = ({children, content, buttonProps = [], visible, onOpen}) => {
  const [isOpen, setIsOpen] = useState(visible); // Initial state based on visible prop
  const tooltipRef = useRef(null);

  const handlePressOutside = event => {
    const {locationX, locationY} = event.nativeEvent;
    const tooltipFrame = tooltipRef.current.getElementLayout();

    if (tooltipFrame && !tooltipFrame.includes(locationX, locationY)) {
      setIsOpen(false);
    }
  };

  const openTooltip = () => {
    setIsOpen(true);
  };

  return (
    <View ref={tooltipRef} onPress={onOpen}>
      {children}
      {isOpen && (
        <TouchableOpacity activeOpacity={1} onPress={handlePressOutside}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipContent}>{content}</Text>
            <View style={styles.buttons}>
              {buttonProps.map((buttonProp, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={buttonProp.onPress}>
                  <Text style={styles.buttonText}>{buttonProp.children}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  tooltipContent: {
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 5,
  },
  buttonText: {
    color: '#333',
  },
});

export default Tooltip;
