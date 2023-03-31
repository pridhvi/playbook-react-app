import React from 'react'
import { useGetCategoriesQuery } from '../../services/iceandfire';

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = ({}) => {
  const { data, isLoading } = useGetCategoriesQuery("")
  return (
    <div className="row container m-auto">
      <div className="col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border bg-opacity-75">
        {/* {JSON.stringify(data)} */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptate nobis molestias qui exercitationem temporibus, corporis asperiores odio nostrum. Mollitia, facilis doloremque sunt odit numquam voluptas hic recusandae voluptatem eius!
      </div>
    </div>
  );
}

export default Home;