import React from "react";
import "./App.css";

import { Form, Input, Select, Button, Card, DatePicker } from "antd";

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

class App extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      os: value.os || "所有",
      app: value.app || "所有"
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleAppChange = app => {
    if (!("value" in this.props)) {
      this.setState({ app });
    }
    this.triggerChange({ app });
  };

  handleOsChange = os => {
    if (!("value" in this.props)) {
      this.setState({ os });
    }
    this.triggerChange({ os });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const state = this.state;

    return (
      <Card style={{ width: "80%" }} id="box">
        <span>
          <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{ width: "10%", marginRight: "3%" }}
          />

          <span>产品名称: </span>
          <Select
            value={state.app}
            size={size}
            style={{ width: "100px" }}
            onChange={this.handleAppChange}
          >
            <Option value="slight">slight</Option>
            <Option value="coolcar">coolcar</Option>
            <Option value="public">公版</Option>
            <Option value="all">所有</Option>
          </Select>

          <span> 平台类型: </span>
          <Select
            value={state.os}
            size={size}
            style={{ width: "100px" }}
            onChange={this.handleOsChange}
          >
            <Option value="ios">iOS</Option>
            <Option value="android">Android</Option>
            <Option value="all">所有</Option>
          </Select>
          <span> </span>
          <Button>搜索</Button>
        </span>
      </Card>
    );
  }
}

export default App;
