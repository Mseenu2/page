import ReactPaginate from 'react-paginate';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const[items, setItems] = useState([]);

  useEffect (() =>{
    const getComments = async () => {
      const res =await fetch(
        `http://localhost:3004/comments?_page=1&_limit=12`
      );
      const data =await res.json();
      setItems(data)
    };
    getComments();
  },[]);
   console.log(items);

  const fetchComments = async (currentPage) => {
    const res =await fetch(
      `http://localhost:3004/comments?_page=${currentPage}&_limit=12`
    );
    const data =await res.json();
    return data;
  };

  const handlePageClick = async(data) =>{
    // console.log(data.selected);
    let currentPage = data.selected + 1
    const commentsFromServer =await fetchComments(currentPage); 
    setItems(commentsFromServer);
  };
  return (
    <div className="App">
      {items.map((item) => {
        return <div>
          <h5>Id:{item.id}</h5>
          <h6>{item.email}</h6>
          <p>{item.body}</p>


        </div>;
      })}
      <ReactPaginate className='num'
      previousLabel ={'<<'} 
      nextLabel ={'>>'} 
      breakLabel ={'...'} 
      pageCount ={9}
      marginPagesDisplayed={2}
      pageRangeDisplayed ={2}
      onPageChange={handlePageClick}
      />
    </div>
  );
}

export default App;
