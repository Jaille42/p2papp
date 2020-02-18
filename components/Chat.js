import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';

import Fire from '../Fire';

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });
  
  componentDidMount() {
      Fire.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }
}

export default Chat;
