import React from 'react'

const HomePageJobsCardGroup = (props) => {
  return (
      <div className='container'>
          <div class="row row-cols-1 row-cols-md-3 g-4">
        
        <HomeJobCard callback={props.callback} title={"Builder"} src={"https://www.myjobquote.co.uk/assets/img/builders-1.jpg"}/>
        <HomeJobCard callback={props.callback} title={"Carpenter"} src={"https://bbmlive.com/wp-content/uploads/2016/05/carpenter.jpg"}/>
        <HomeJobCard callback={props.callback} title={"Computer Technician"} src={"https://bleuwire.com/wp-content/uploads/2019/03/computer-repair-technicians.jpg"}/>
        <HomeJobCard callback={props.callback} title={"Electrician"} src={"http://www.checkatrade.com/blog/wp-content/uploads/2020/08/electrician-hourly-rates.jpeg"}/>
        <HomeJobCard callback={props.callback} title={"Gardener"} src={"https://www.checkatrade.com/blog/wp-content/uploads/2020/07/gardener-1.jpeg"}/>
        <HomeJobCard callback={props.callback} title={"Mechanic"} src={"https://miro.medium.com/max/1400/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg"}/>
        <HomeJobCard callback={props.callback} title={"Painter"} src={"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/A724RBEN2AI6PHCTNILJX2YJKM.jpg&w=1484"}/>
        <HomeJobCard callback={props.callback} title={"Plumber"} src={"https://comfortmovers.com.au/wp-content/uploads/2022/04/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg"}/>
        <HomeJobCard callback={props.callback} title={"Pool Cleaner"} src={"https://mydecorative.com/wp-content/uploads/2019/10/professional-pool-cleaner.jpg"}/>

  
    </div>
      </div>
    
  );
}


const HomeJobCard = (props) => {
    return(
    <div class="col" role={"button"} onClick={() => props.callback(true, props.title.toLowerCase().replaceAll(" ", "_"))}>
        <div class="card">
        <img src={props.src} class="card-img-top" alt={"job_"+props.title}/>
        <div class="card-body">
            <h5 class="card-title text-center">{props.title}</h5>
        </div>
        </div>
  </div>
  );
}


export default HomePageJobsCardGroup