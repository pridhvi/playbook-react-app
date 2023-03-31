import React from 'react'
import { useGetCategoriesQuery } from '../../services/iceandfire';

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = ({}) => {
  const { data, isLoading } = useGetCategoriesQuery("")
  return (
    <div className='container'>
      {JSON.stringify(data)}
    </div>
  );
}

export default Home;