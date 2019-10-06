import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeBlueArea, BlueNavigationStyle, BlueListItem, BlueText, BlueCard, BlueSpacing20 } from '../../BlueComponents';
import PropTypes from 'prop-types';
import BlueNotifications from '../../class/BlueNotifications';

export default class SettingsNotifications extends Component {
  static navigationOptions = () => ({
    ...BlueNavigationStyle(),
    title: 'Notifications',
  });

  constructor(props) {
    super(props);
    this.state = { notificationsEnabled: false };
  }

  notificationSwitchValueChanged = async value => {
    await BlueNotifications.setEnabled(value);
    this.setState({ notificationsEnabled: value });
  };

  async componentDidMount() {
    const notificationsEnabled = await BlueNotifications.isEnabled();
    this.setState({ notificationsEnabled });
  }

  render() {
    return (
      <SafeBlueArea forceInset={{ horizontal: 'always' }} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <BlueListItem
            hideChevron
            switchButton
            switched={this.state.notificationsEnabled}
            onSwitch={this.notificationSwitchValueChanged}
            title="Notifications"
          />
          <BlueCard>
            <BlueText>By enabling, you authorize us to send you notifications of:</BlueText>
            <BlueSpacing20 />
            <BlueText> - Bitcoin price fluctuation</BlueText>
          </BlueCard>
        </View>
      </SafeBlueArea>
    );
  }
}

SettingsNotifications.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
};
