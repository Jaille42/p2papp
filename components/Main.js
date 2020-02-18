import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
    borderColor: '#111111',
    height: offset * 2,
    margin: offset,
    borderWidth: 1,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
});

class Main extends React.Component {
  state = { name: '' }
  onChangeText = name => this.setState({ name });
  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Votre nom:</Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeHolder="Votre nom Ici"
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Messagerie</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Main;
