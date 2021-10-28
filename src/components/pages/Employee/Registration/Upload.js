import React, { Component } from 'react';
import './upload.css';
 class Upload extends Component {
  state={
    profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
	render() {
    const { profileImg} = this.state
		return (
			<div className="imagepage">
				<div className="imagecontainer">
					{/* <h1 className="imageheading">Add your Image</h1> */}
					<div className="img-holder">
						<img src={profileImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="imageinput" onChange={this.imageHandler} />
					<div className="imagelabel">
          {/* <label className="image-upload" htmlFor="imageinput"> */}
		  <label className="image-upload" >
                        Upload Image
					</label>
          </div>
				</div>
			</div>
		);
	}
}

export default Upload;