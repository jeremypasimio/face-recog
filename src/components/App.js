
import '../css/App.css';
import React from 'react';
import Navigation from './navigation/Navigation';
import Logo from './logo/Logo'
import ImageLinkForm from './imagelinkform/ImageLinkForm';
import Rank from './Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecog from './FaceRecog/FaceRecog';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';

const initialState = {

  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

//App React Class
class App extends React.Component {

  //Constructor: Sets initial state
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    }
    )
  }

  /**
   * 
   * @param {} data : The result of running the image through 
   * Calrifai's face-detection API
   * @returns Border information for the app to use to draw
   * a box around detected face.
   */
  calculateFaceLocation = (data) => {

    //image data
    const regions = data.outputs[0].data.regions;//[0].region_info.bounding_box;

    //Get the image size for bounding box calculation
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    let boxes = regions.map(r => {
      return {
        leftCol: r.region_info.bounding_box.left_col * width,
        topRow: r.region_info.bounding_box.top_row * height,
        rightCol: width - (r.region_info.bounding_box.right_col * width),
        bottomRow: height - (r.region_info.bounding_box.bottom_row * height)
      }
    });

    //return bounding box coordinates
    return boxes;

  }

  /**
   * 
   * @param {} box : Takes in bounding box coordinates and
   * sets the state to display the box.
   */
  displayBoundingBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  //track changes to the user input to get the image url
  onChange = (event) => {
    this.setState({ input: event.target.value });
  }

  /**
   * Gets image url and sends it to the Clarifai
   * face-detection API to process face location
   */
  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input });

    fetch("https://basic-face-recog.herokuapp.com/process-image", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageURL: this.state.input
      })
    })
      .then((response) => response.json())
      .then(result => this.displayBoundingBox(this.calculateFaceLocation(result))
      )
      .then(result => {
        fetch('https://basic-face-recog.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route });
  }

  //React render method
  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onChange}
                onClick={this.onButtonSubmit} />
              <FaceRecog boxes={boxes} imageUrl={imageUrl} />
            </div> :
            (
              this.state.route === 'signin' ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
