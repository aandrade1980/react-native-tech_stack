import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {connect} from 'react-redux';

import * as actions from '../actions';

import {CardSection} from './common';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class ListItem extends Component {
  renderDescription() {
    const {
      expanded,
      library: {
        item: {description},
      },
    } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.descriptionStyle}>{description}</Text>
        </CardSection>
      );
    }
  }

  handlePress(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.props.selectLibrary(id);
  }

  render() {
    const {
      library: {
        item: {id, title},
      },
    } = this.props;
    const {titleStyle} = styles;
    return (
      <TouchableWithoutFeedback onPress={() => this.handlePress(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  descriptionStyle: {
    flex: 1,
  },
});

const mapStateToProps = ({selectedLibraryId}, ownProps) => ({
  expanded: selectedLibraryId === ownProps.library.item.id,
});

export default connect(mapStateToProps, actions)(ListItem);
