import React, { Component } from 'react';
import './App.css';


const API_KEY = '8K43T8LNtSz5xtNVpR73qg9YnKESx1UH';


function Grid(props)
{
  const c = props.images.map((item, index) =>
    <img id={index} onClick={props.imageClick} key={index} src={item} />);
  return (
    <div>

    <h1> Gifs...</h1>

      {c}
  </div>
  );
}
function  Search(props)
{
    return (
      <form onSubmit={props.handleFormSubmit}>
        <input type="text" onChange={props.handleSearchInput} value={props.searchInput} className="Search-field" placeholder="Search term & hit enter!"></input>
        </form>
    );

}

function Modal(props)
{
  return (
    <div className="Modal">
  <img src={props.url}/>
  <hr />
  <a href={props.giphyURl}><button><i className="fa fa-eye"></i> View on Giphy</button></a>
  <button onClick={props.handleClose}><i className="fa fa-window-close"></i> Close</button>
    </div>

  );
}

class App extends Component {


  constructor(props)
  {
    super(props);
    this.state = {
      isImagesLoaded: false,
      images: [],
      error: null,
      isModalShown: false,
      modalURL: '',
      searchInput: '',
      modalGiphyURL: ''
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  callApi(API)
  {

    fetch(API)
    .then(res => res.json())
    .then((result) => {

      this.setState({
        isLoaded: true,
        images: result.data
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
    )
  }
  componentDidMount()
  {
    const API = "http://api.giphy.com/v1/gifs/trending?api_key="+API_KEY;

    this.callApi(API);
  }

  handleModalClose()
  {
    this.setState({
      isModalShown: false
    })
  }

  handleImageClick(e)
  {
    this.setState({
      isModalShown: true
    });

    this.setState({
      modalURL: this.state.images[e.target.id].images.original.url,
      modalGiphyURL: this.state.images[e.target.id].url
    });
  }

  handleSearchInput(e)
  {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleFormSubmit(e)
  {
    e.preventDefault();
    const searchAPI = 'http://api.giphy.com/v1/gifs/search?api_key='+API_KEY+'&q='+this.state.searchInput;
    this.callApi(searchAPI);
    console.log('clicked');
  }
  handleBodyClick()
  {
    if (this.state.isModalShown)
    this.setState({
      isModalShown: false
    })
  }

  render() {
    const urls = this.state.images.map((item) => {
         return item.images.fixed_width.url;
   });
    return (
       <div className="App">
        <div className="App-header">
        <div onClick={this.handleBodyClick} className={this.state.isModalShown ? "Content":''}>
        <h1>GiphyApp</h1>
        <Search searchInput={this.state.searchInput} handleSearchInput={this.handleSearchInput} handleFormSubmit={this.handleFormSubmit}/>
        <Grid images={urls} imageClick={this.handleImageClick}/>
        </div>
        {this.state.isModalShown && <Modal url={this.state.modalURL} handleClose={this.handleModalClose} giphyURl={this.state.modalGiphyURL}/>}
        <div className={this.state.isModalShown ? "Content":''}>
        <p class="footer">Made by Masroor Aijaz for learning ReactJS!</p>
        <p class="small">Uses <a href="https://developers.giphy.com/">GiphyAPI</a></p>

        </div>
        </div>
      </div>
    );
  }
}

export default App;
