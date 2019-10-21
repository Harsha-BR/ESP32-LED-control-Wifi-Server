import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = (props) => (`
  width: 35px;
  height: 35px;
  border-radius : 25px;
  cursor: pointer;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); 
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  width : 100%
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.50);
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      background : ${props => props.color};
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }

  }
`;

export default class SliderBar extends React.Component {
  state = {
    value: this.props.default
    
  }

  handleOnChange = (e) => {
      this.setState({
          value: e.target.value
      }, () => {
          this.props.passColor( this.state.value )
      })
  }

  render() {
    return (
      <Styles color={this.props.color}>
        <input type="range" min={this.props.min} max={this.props.max} value={this.state.value} className="slider" onChange={this.handleOnChange} />
        
      </Styles>
    )
  }
}
