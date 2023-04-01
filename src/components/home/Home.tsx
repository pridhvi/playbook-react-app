import React from 'react'
import { useGetAllBooksQuery } from '../../services/iceandfire';
import { Book } from '../../types';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { data =[], isLoading } = useGetAllBooksQuery("")
  return (
    <div className="row container m-auto">
      <div className="col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border bg-opacity-75">
        {data.map((book: Book) => <p>{book.name}</p>)}
      </div>
    </div>
  );
}

export default Home;