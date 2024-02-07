import React, { Component } from 'react';
import { Linking, Text } from 'react-native';

export default class BillingFinalizer extends Component {

  constructor(props) {
    super(props);
    const { uriSchema, urlHostname } = props;

    this.state = {
      currentUrl: null,
      redirectUrl: `${uriSchema}://${urlHostname}/gocardless/billing`
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleUrlChange);
    Linking.getInitialURL().then((url) => this.setState({ currentUrl: url }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props;
    const isValid = this.validParams(this.state.currentUrl, this.state.redirectUrl);

    if (isValid && this.isInclude(this.state.currentUrl, this.state.redirectUrl && status === "pending")) {
      const { onReady } = this.props;
      if (onReady) {
        const splitUrl = this.state.currentUrl.split("/");
        onReady(this.state.currentUrl, splitUrl[splitUrl.length - 2]);
      }
    }
  }

  handleUrlChange({ url }) {
    const { status } = this.props;
    this.setState({ currentUrl: url });

    if (this.validParams(this.state.redirectUrl, url) && this.isInclude(url, this.state.redirectUrl) && status === "pending") {
      const { onReady } = this.props;
      if (onReady) {
        const splitUrl = url.split("/");
        onReady(url.toString(), splitUrl[splitUrl.length - 2]);
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
