import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

import {Container} from './styles';

export default function Repository(props) {
  const {navigation} = props;
  const repository = navigation.getParam('repository');

  console.tron.log('repository', props);

  return (
    <Container>
      <WebView source={{uri: repository.html_url}} style={{flex: 1}} />
    </Container>
  );
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
