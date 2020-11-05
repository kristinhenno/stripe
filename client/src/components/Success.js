import React from "react";
import styled from "styled-components";

class Success extends React.Component {

  componentDidMount() {
    localStorage.clear();
  }

  render() {

    return (
      <Style>
        <h3 style={{ margin: "5%", textAlign: "center" }}>Thank you!</h3>
      </Style>
    );
  }
}

const Style = styled.section`

`;

export default Success;
