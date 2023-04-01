import React from 'react'
import { Book } from '../../types';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  
  return (
    <div className="row container m-auto">
      <div className="col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border bg-opacity-75">
        Home
      </div>
    </div>
  );
}

export default Home;