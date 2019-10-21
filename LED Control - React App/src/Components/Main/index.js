import React, {Component} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import SliderBar from "../Slider";
import { withSnackbar } from 'notistack';

const HeaderContainer = styled.div`
  width : 100%;
  height: 200px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = styled.div`
  width: 370px;
  height: 80px;
  border: none
  border-radius: 15px;
  background-color: #417471;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-family: Rajdhani;
  color: #FFC700;
  font-weight: 600;
`;
const BodyContainer = styled.div`
  width : 100%;
  height: 600px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: columns;
`;
const BodyItem = styled.div`
  background-color: rgba(238,248,248,0.33);
  border-radius: 25px;
  border: none;
  height: 70%;
  width: 50%;
  display:block;
  justify-content:center;
  align-items:center;

`;
const SliderContainer = styled.div`
  height: 70%;
  width: 100%;
  border: none;
  display: flex;
  border-radius: 25px 25px 0px 0px;
  justify-content: center;
  align-items:center;
  flex-direction:row;

`;
const LabelContainer = styled.div`
  height: 70%;
  width: 30%;
  boder: none;
  display: flex;
  border-radius: 25px 25px 0px 0px;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  background-color: flex;
`;
const Label =styled.div`
  display : flex;
  font-size: 36px;
  font-family: Rajdhani;
  color: rgba(54,0,0,0.74);
  font-weight: 600;
  height: 80px;
  justify-content: end;
  align-items: end;
  padding:15px;
`;
const ControlsContainer = styled.div`
  height: 30%;
  width: 100%;
  border: none;
  display:flex;
  flex-direction: rows;
  border-radius: 0px 0px 25px 25px;
  justify-content:center;
  align-items:center;
`;


const ChangeButton = styled(motion.div)`
  width: 45%;
  height: 50px;
  border: none
  border-radius: 30px;
  background-color: #486E7B;
  margin-right: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: Rajdhani;
  color: #C7C7C7;
  font-weight: 600;
`;

const ColorBox = styled.div`
  display :flex;
  width: 122px;
  height: 94px;
  left: 289px;
  top: 506px;
  justify-content: start;
  align-items: center;
  background-color: ${props => props.color} 
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-right: auto;
  margin-left: 20px;
`;

 


class Main extends Component {

    constructor() {
        super();
        this.state = {
          red : 0,
          green :0,
          blue: 0
        }
    }

    componentDidMount() {
      this.props.enqueueSnackbar("Welcome!", {
        anchorOrigin: {
          'horizontal' : 'left',
          'vertical' : 'top'
        },
        variant : 'success'
      });
    }
    returnHex = (r, g, b) => {   
      var rgbToHex = function (rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };

      var red = rgbToHex(r);
      var green = rgbToHex(g);
      var blue = rgbToHex(b);
      return red+green+blue;
    }

    handleClick = () => {
      let this_ = this;
      fetch('http://192.168.0.248:80/rgb_values', {
        method: 'post',
        mode : "no-cors",
        body: JSON.stringify({rgb:this.state})
      })
        .then(function(response){
          if(!response){
            throw Error(response.statusText);
          }
          return response;
        }).then (function(response){
            this_.props.enqueueSnackbar("Success!", {
            anchorOrigin: {
              'horizontal' : 'left',
              'vertical' : 'top'
            },
            variant : 'success'
          });
        }) .catch(function(response){
            this_.props.enqueueSnackbar("Error!", {
            anchorOrigin: {
              'horizontal' : 'left',
              'vertical' : 'top'
            },
            variant : 'error'
          });
        }); 
    }

    setRed = (e) => {
      
      this.setState({
        red: e
      });
    };

    setGreen = (e) => {
      
      this.setState({
        green : e
      });
    };

    setBlue = (e) => {
      this.setState({
        blue : e
      });
    };


    render() {
      
      document.body.style.backgroundColor = "#285A6A";
       return (
        <div>

            <HeaderContainer>
             <Header>
               LED Control
             </Header>
            </HeaderContainer>
            
            <BodyContainer>
              <BodyItem>

                <SliderContainer>

                  <LabelContainer>
                    <Label>
                      RED
                    </Label>
                    <Label>
                      GREEN
                    </Label>
                    <Label>
                      BLUE
                    </Label>
                  </LabelContainer>
                  <div style={{display:"flex", width:"60%", flexDirection:"column", justifyContent:"start", alignItems:"center" }}>
                    <SliderBar color="#CE7373"  default ={0} min={0} max={255} passColor={this.setRed}/>
                    <SliderBar color= "#48BD70" default ={0} min={0} max={255} passColor={this.setGreen}/>
                    <SliderBar color ="#66A4EC" default ={0} min={0} max={255} passColor={this.setBlue}/>
                  </div>
                  
                </SliderContainer>
                <ControlsContainer>
                  <ColorBox color={"#" + this.returnHex(this.state.red, this.state.green, this.state.blue)}>
                  </ColorBox>
                  <ChangeButton onClick= {this.handleClick} whileTap={{scale:0.9}} transition={{duration: 0.1}}> 
                    <span> Change </span>
                  </ChangeButton>
 
                </ControlsContainer>
              </BodyItem>
            </BodyContainer>
        </div>
       )
    }
}
export default withSnackbar(Main);