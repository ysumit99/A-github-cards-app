import React from 'react';
import './App.css';

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile} />)}
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
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      this.userNameInput.current.value
    )
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
        profiles: testData 
      };
  }
  
  render() {
  return (
    <div>
      <div className="header">{this.props.title}</div>
      <Form />
      <CardList  profiles = {this.state.profiles}/>
    </div>
  );
  }
}
export default App;
