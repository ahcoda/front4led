import React from "react";
import "./App.css";

import { Form, Input, Select, Button, Card, DatePicker, Table } from "antd";

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

  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  onOk = value => {
    console.log("onOk: ", value);
  };

  render() {
    const { size } = this.props;
    const state = this.state;

    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ];

    const columns = [
      {
        title: "设备标识",
        dataIndex: "mac",
        key: "mac"
      },
      {
        title: "产品名称",
        dataIndex: "app",
        key: "app"
      },
      {
        title: "平台类型",
        dataIndex: "os",
        key: "os"
      },

      {
        title: "上线时间",
        dataIndex: "createAt",
        key: "createAt"
      }
    ];

    return (
      <div id="box">
        <Card style={{ width: "100%" }}>
          <span>
            <span>产品名称:</span>
            <Select
              id="select_app"
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

            <span>平台类型:</span>
            <Select
              id="select_os"
              value={state.os}
              size={size}
              style={{ width: "100px" }}
              onChange={this.handleOsChange}
            >
              <Option value="ios">iOS</Option>
              <Option value="android">Android</Option>
              <Option value="all">所有</Option>
            </Select>

            <span>时间:</span>
            <RangePicker
              id="picker"
              format="YYYY-MM-DD"
              placeholder={["开始日期", "结束日期"]}
              onChange={this.onChange}
              onOk={this.onOk}
            />

            <Button type="primary" id="btn1">
              搜索
            </Button>
          </span>
        </Card>
        <Table
          id="table"
          dataSource={dataSource}
          columns={columns}
          size="small"
        />
      </div>
    );
  }
}

export default App;
