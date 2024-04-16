import React from "react";
import { Row, Col, Switch, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./schemaJson.css";

const NullableRow = (props) => {
  const { value, onChange } = props;
  return (
    <Row className="other-row" type="flex" align="middle">
      <Col span={4} className="other-label">
        <span>
          nullable &nbsp;
          <Tooltip title="该字段是否允许设置为null">
            <QuestionCircleOutlined
              type="question-circle-o"
              style={{ width: "10px" }}
            />
          </Tooltip>
          &nbsp; :
        </span>
      </Col>
      <Col span={20}>
        <Switch checked={value} onChange={(e) => onChange(e)} />
      </Col>
    </Row>
  );
};

export default NullableRow;
