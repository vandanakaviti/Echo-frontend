import React from 'react';
import IdeaService from '../services/idea.service';
import "./add-idea.component.css"

export default class EditIdea extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      status: '',
      url: '',
      redirect: false
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveIdea = this.saveIdea.bind(this);  
  }
  
  componentDidMount(){
    var id = this.props.id
    IdeaService.getIdeaByIdeaId(id).then((res)=>{
      this.setState({
        title: res.data.ideaTitle,
        description: res.data.ideaDescription,
        status: res.data.ideaStatus
      });
    })
  }
  
  onChangeTitle(e){
    this.setState({
        title: e.target.value
    })
  }

  onChangeDescription(e){
    this.setState({   
      description: e.target.value
    })
  }

  saveIdea() {
   var id = this.props.id
    var idea = {
      id: id,
      ideaTitle: this.state.title,
      ideaDescription: this.state.description,
      ideaStatus: this.state.status
    };
    IdeaService.updateIdea(id, idea).then(()=>{ this.setState({submitted:true}) })
  }

  render() 
  {
      return (
        <div>
          <div>
            {this.state.submitted ? (
              <div style={{"textAlign":"center"}}>
                <h4>Fresh Idea Edited successfully!</h4>
                <a href = {this.state.url}><button className="btn btn-secondary" style={{"width":"20%"}}>Ok</button></a>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>

                <div className="form-group">
                  <label for="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    required
                    rows="7"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  >
                  </textarea>
                </div>

                <div style={{"textAlign":"center"}}>
                  <button onClick={this.saveIdea} style={{"marginTop":"20px"}} className="btn btn-secondary" disabled={this.state.title.length<2||this.state.description.length<1}>
                    Submit
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      );
    }
}