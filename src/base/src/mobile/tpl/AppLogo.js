/* @flow */

import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { image, metric } from 'AppTheme';

class AppLogo extends PureComponent {
  render() {
    let { style, size, styleContainer } = this.props;
    if (size) {
      style = {
        ...style,
        height: size,
        width: size,
      };
    }
    return (
      <View style={[styleContainer]}>
        <Image
          source={image.textLogo}
          style={style}
        />
      </View>
    );
  }
}

AppLogo.propTypes = {
  style: PropTypes.any,
  size: PropTypes.any,
  styleContainer: PropTypes.any,
};

AppLogo.defaultProps = {
  // size: ThemeSpacing.LOGO_HEIGHT,
  style: {
    height: metric.LOGO_HEIGHT,
    width: metric.LOGO_WIDTH,
  },
};
export default AppLogo;