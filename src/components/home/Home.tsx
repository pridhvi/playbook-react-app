import React from 'react'

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  
  return (
    <div className="row container-fluid m-auto">
      <div className="col-12 col-md-10 container bg-black wb-rounded-border bg-opacity-75">
        Home
      </div>
    </div>
  );
}

export default Home;