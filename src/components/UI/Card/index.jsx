import React from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import PropTypes from "prop-types";
import { Card } from "antd";

const { Meta } = Card;

CardRES.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  loading: PropTypes.bool,
  cover: PropTypes.node,
  bordered: PropTypes.bool,
  description: PropTypes.node,
};

CardRES.defaultProps = {
  title: "",
  actions: [],
  loading: false,
  cover: null,
  bordered: false,
  description: null,
};

function CardRES(props) {
  const { title, actions, loading, cover, bordered, description, price, unit } = props;
  
  return (
    <div className={styles.cardWrap}>
      <Card
        actions={actions}
        loading={loading}
        cover={cover && <img alt="example" src={cover} />}
        bordered={bordered}
      >
        <Meta title={<div className={styles.antCardTitle}>{title}</div>} description={description} />
        <div style={{
          padding: "8px 0",
        }}>Kích cỡ: {unit}</div>
        <div style={{
              color: "#d70018",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1,
        }}>{price.toLocaleString('vi-VN')} đ</div>
      </Card>
    </div>
  );
}

export default CardRES;
