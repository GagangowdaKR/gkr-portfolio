import React, { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Platform, ViewStyle } from 'react-native';

interface HoverableProps extends Omit<TouchableOpacityProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  hoverStyle?: ViewStyle;
}

export default function Hoverable({ children, style, hoverStyle, ...props }: HoverableProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Build styles array - simple approach without flattening
  const styles: (ViewStyle | undefined)[] = [];
  
  // Add base style
  if (style) {
    styles.push(style);
  }
  
  // Add hover style if hovered
  if (isHovered && hoverStyle) {
    styles.push(hoverStyle);
  }

  // Add web-specific hover effects
  if (Platform.OS === 'web') {
    if (isHovered) {
      styles.push({
        marginTop: -2,
        marginBottom: 2,
        elevation: 6,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      });
    }
  }

  const webProps = Platform.OS === 'web' 
    ? {
        // @ts-ignore - web-only props
        onMouseEnter: () => setIsHovered(true),
        // @ts-ignore - web-only props
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  return (
    <TouchableOpacity
      {...props}
      {...webProps}
      style={styles.length > 0 ? styles : undefined}
    >
      {children}
    </TouchableOpacity>
  );
}
