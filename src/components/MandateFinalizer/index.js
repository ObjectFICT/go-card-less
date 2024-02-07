import React, { Component } from 'react';
import { Linking, Text } from 'react-native';

export default class MandateFinalizer extends Component {

  constructor(props) {
    super(props);
    const { uriSchema, urlHostname } = props;

    this.state = {
      currentUrl: null,
      redirectUrl: `${uriSchema}://${urlHostname}/gocardless`
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleUrlChange);
    Linking.getInitialURL().then((url) => this.setState({ currentUrl: url }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { sessionToken, redirectFlowId, status } = this.props;

    const isValid = this.validParams(this.state.currentUrl, this.state.redirectUrl, this.state.currentUrl, sessionToken, redirectFlowId);

    if (status === "pending"
      && isValid
      && prevProps.sessionToken !== sessionToken
      && prevProps.redirectFlowId !== redirectFlowId
      && this.isInclude(this.state.currentUrl, this.state.redirectUrl, sessionToken)) {
      const { onReady } = this.props;
      if (onReady) {
        onReady(this.state.currentUrl);
      }
    }
  }

  handleUrlChange({ url }) {
    this.setState({ currentUrl: url });

    const { sessionToken, redirectFlowId, status } = this.props;

    const isValid = this.validParams(sessionToken, redirectFlowId, this.state.redirectUrl, url);
    if (status === "pending" && isValid && this.isInclude(url, this.state.redirectUrl, sessionToken)) {
      const { onReady } = this.props;
      if (onReady) {
        onReady(url.toString());
      }
    }
  }

  validParams(...params) {
    for (let param of params) {
      if (param === null || (typeof param === "string" && param.length === 0)) {
        return false;
      }
    }

    return true;
  }

  isInclude(string, ...searchStrings) {
    for (let searchString of searchStrings) {
      if (!string.toLowerCase().includes(searchString)) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (<Text style={{ color: 'transparent' }}>{this.state.currentUrl}</Text>);
  }
}
