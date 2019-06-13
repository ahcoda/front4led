import React from "react";
import "./App.css";
import axios from "axios";

import { Select, Button, Card, DatePicker, Table } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

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
      range: [],
      os: value.os || "all",
      app: value.app || "all",
      dataSource: []
    };
  }

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
    this.setState({
      range: dateString
    });
  };

  onOk = value => {
    console.log("onOk: ", value);
  };

  onClickSearchButton = () => {
    var my = this;
    var baseUrl =
      "http://www.yiqibangbang.com:8080/led/list?index=0&size=10240";
    // "http://localhost:8080/led/list?index=0&size=10240";

    var os = this.state.os;
    var from = this.state.range[0];
    var to = this.state.range[1];
    var app = this.state.app;

    if (os !== "all") {
      baseUrl = baseUrl + "&os=" + os;
    }

    if (app !== "all") {
      baseUrl = baseUrl + "&app=" + app;
    }

    if (from !== undefined && to !== undefined) {
      baseUrl = baseUrl + "&from=" + from + "&to=" + to;
    }
    console.log("url", baseUrl);
    console.log("os", os);
    console.log("app", app);
    console.log("from", from);
    console.log("to", to);

    axios
      .get(baseUrl)
      .then(function(response) {
        // console.log(response.data);
        // console.log(response.data.data.items);
        // console.log(my);
        var _data = [];

        response.data.data.items.map((v, i) => {
          _data.push({
            key: i + 1,
            mac: v.mac,
            os: v.os,
            app: v.app,
            udid: v.udid,
            use: v.use,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt
          });
          return true;
        });
        my.setState({
          dataSource: _data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { size } = this.props;
    const state = this.state;

    const columns = [
      {
        title: "记录序号",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "手机标识",
        dataIndex: "udid",
        key: "udid"
      },
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
        title: "上线次数",
        dataIndex: "use",
        key: "use"
      },
      {
        title: "注册时间",
        dataIndex: "createdAt",
        key: "createdAt"
      },
      {
        title: "最近上线",
        dataIndex: "updatedAt",
        key: "updatedAt"
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

            <Button type="primary" id="btn1" onClick={this.onClickSearchButton}>
              搜索
            </Button>
          </span>
        </Card>
        <Table
          id="table"
          dataSource={this.state.dataSource}
          columns={columns}
          size="small"
        />
      </div>
    );
  }
}

export default App;
