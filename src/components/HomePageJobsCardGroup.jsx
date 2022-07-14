import React from 'react'

const HomePageJobsCardGroup = () => {
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <HomeJobCard title={"Plumber"} src={"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"}/>

  
    </div>
  );
}

const HomeJobCard = (props) => {
    return(
    <div class="col">
        <div class="card">
        <img src={props.src} class="card-img-top" alt={"job_"+props.title}/>
        <div class="card-body">
            <h5 class="card-title">{props.title}</h5>
        </div>
        </div>
  </div>
  );
}


export default HomePageJobsCardGroup