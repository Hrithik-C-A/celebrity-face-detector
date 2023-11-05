import React, { Component } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Navbar } from './components/navbar/Navbar'
import { FaceRecognition } from './components/faceRecognition/FaceRecognition';
import {Rank} from './components/rank/Rank'
import { ImageLinkForm } from './components/imageForm/ImageLinkForm'
import './App.css'
import { SignIn } from './components/signin/SignIn';
import { Register } from './components/register/Register';

const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particlesOptions = {
              fullScreen: {
                  enable: true,
                  zIndex: -1
              },
              background: {
                  color: {
                      value: "",
                  },
              },
              fpsLimit: 120,
              interactivity: {
                  events: {
                      onClick: {
                          enable: false,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "repulse",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 1,
                      },
                      repulse: {
                          distance: 200,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: "#000000",
                  },
                  links: {
                      color: "#808080",
                      distance: 150,
                      enable: true,
                      opacity: 0.2,
                      width: 1,
                  },
                  collisions: {
                      enable: true,
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "bounce",
                      },
                      random: false,
                      speed: 2,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800,
                      },
                      value: 80,
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 1, max: 5 },
                  },
              },
              detectRetina: true,
          };
   
const initialState =   {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}    

export default class App extends Component {
    constructor(){
        super()
        this.state = initialState;
    }

    loadUser = (data)=>{
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceBox = (data)=>{
        const clarifaiFace = data.response.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const height = Number(image.height);
        const width = Number(image.width);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow : clarifaiFace.top_row * height,
            rightCol: width -(clarifaiFace.right_col* width),
            bottomRow: height -(clarifaiFace.bottom_row* height)
        }
    }
    displayFaceBox = (box)=>{
        this.setState({box: box});
    }
    onInputChange = (event)=>{
        this.setState({input : event.target.value,})
    }
    onPictureSubmit = async ()=>{
        this.setState({imageUrl: this.state.input});

        const fetchUrl = (url) => fetch(url, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              imageUrl: this.state.input
            })
        })

        const url1 = 'http://localhost:5000/imageurl';
        const url2 = 'http://localhost:5000/imageurl/celebrity';

        const responses = await Promise.all([fetchUrl(url1), fetchUrl(url2)]);

        const data1 = responses[0].json();
        const data2 = responses[1].json();

        data1.then(result => {
            if(result){
                fetch('http://localhost:5000/image',{
                    method: 'put',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                      id: this.state.user.id
                    })
                  })
                  .then(response => response.json())
                  .then(res => {
                    this.setState(Object.assign(this.state.user,{
                        entries: res.user
                    }))
                  })
                  .catch(console.log)
                }

                this.displayFaceBox(this.calculateFaceBox(result));
        }).catch(console.log);

    }
    onRouteChange = (route)=>{
        if(route === 'signout'){
            this.setState(initialState);
        }
        else if(route === 'home'){
            this.setState({isSignedIn: true})
        }
            this.setState({route: route})
    }
  render() {
    const {isSignedIn,box,imageUrl,route} = this.state;
    return (
      <div>
        <Particles
        className='particles'
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
    <Navbar isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
    <>  
        <Rank username={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm description={'This App detect faces. Give it a try.'} onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl}/>
    </>
        :
        (
            this.state.route === 'signin' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
        )
        }
      </div>
    )
  }
}

