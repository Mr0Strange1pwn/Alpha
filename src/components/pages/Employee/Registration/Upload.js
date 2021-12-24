import React, { useEffect, useState } from "react";
import "./upload.css";

function Upload({ setIMG, IMG }) {
  const [profileImg, setprofileImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  useEffect(() => {
    if (IMG !== undefined) {
      if (typeof IMG === "string") {
        setprofileImg(IMG);
      }
    }
  }, [IMG]);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setprofileImg(reader.result);
        setIMG(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="imagepage">
      <div className="imagecontainer">
        <div className="img-holder">
          <img src={profileImg} alt="" id="img" className="img" />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="imageinput"
          onChange={imageHandler}
        />
        <div className="imagelabel">
          <label className="image-upload" htmlFor="imageinput">
            Upload Image
          </label>
        </div>
      </div>
    </div>
  );
}

// render() {
//   const { profileImg} = this.state
//   return (
//     <div className="imagepage">
//       <div className="imagecontainer">
//         <div className="img-holder">
//           <img src={profileImg} alt="" id="img" className="img" />
//         </div>
//         <input type="file" accept="image/*" name="image-upload" id="imageinput" onChange={this.imageHandler} />
//         <div className="label">
//         <label className="image-upload" htmlFor="imageinput">
//         Upload Image
//         </label>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Upload;
