import React, {Component} from 'react';
import {ActivityIndicator, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

const initialState = {
  stars: [],
  loading: false,
  loadingMore: false,
  refreshing: false,
  page: 0,
};

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.setState({loading: true});
    await this.handleLoadMore();
    this.setState({loading: false});
  }

  handlePush = async () => {
    await this.setState({...initialState, refreshing: true});
    await this.handleLoadMore();
    this.setState({refreshing: false});
  };

  handleLoadMore = async () => {
    this.setState({loadingMore: true});
    const {navigation} = this.props;
    const user = navigation.getParam('user');
    const {stars} = this.state;
    let {page} = this.state;
    page += 1;

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: stars.concat(response.data),
      page,
      loadingMore: false,
    });
  };

  handleSelectItem = (repository) => {
    const {navigation} = this.props;

    navigation.navigate('Repository', {repository});
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading, loadingMore, refreshing} = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Stars
              onEndReachedThreshold={0.2}
              onEndReached={this.handleLoadMore}
              onRefresh={this.handlePush}
              refreshing={refreshing}
              data={stars}
              keyExtractor={(star) => String(star.id)}
              renderItem={({item}) => (
                <TouchableNativeFeedback
                  onPress={() => this.handleSelectItem(item)}>
                  <Starred>
                    <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                </TouchableNativeFeedback>
              )}
            />
            {loadingMore ? <ActivityIndicator /> : null}
          </>
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
