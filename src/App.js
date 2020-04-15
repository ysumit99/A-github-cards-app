import React from 'react';
import axios from 'axios';
import './App.css';

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}  />)}
  </div>
);
class Card extends React.Component {
  render() {
    
    const profile = this.props;
    return (
      <div className="github-profile" style={{ margin: '2rem' }}>
        <img src={profile.avatar_url} alt=""/>
        <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
          <div className="name" style={{fontSize: '125%'}}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
        type="text" 
        value={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})}
        placeholder="Github Username"
        required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {

  constructor(props){ 
      super(props);
      this.state = {
        profiles: []
      };
  }
  
  addNewProfile = (profileData) => {
   this.setState(prevState => ({
     profiles: [...prevState.profiles, profileData]
   }))
  };

  render() {
  return (
    <div>
      <div className="header">{this.props.title}</div>
      <Form  onSubmit={this.addNewProfile} />
      <CardList  profiles = {this.state.profiles}/>
    </div>
  );
  }
}
export default App;
