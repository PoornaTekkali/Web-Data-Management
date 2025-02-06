import React, { useState, useEffect, useDeferredValue} from 'react';
import axios from 'axios';
import './HealthForum.css'; // Import your CSS file for HealthForums styling
import Navbar from '../navbar/Navbar';
import { useHistory, useNavigate } from 'react-router-dom';
import CreateForum from './CreateForum';



const HealthForum = ({settings}) => {
  const [Forums, setForums] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages , setTotalPages ] = useState(1);
  const token = localStorage.getItem('token');



    const fetchDataFromApi = async (page) => {
      const response = await axios.get(`/api/get/forums?page=${page}`, {
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      return response.data;
  };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFromApi(currentPage);
            console.log(data.forumPosts.data)
            setForums(data.forumPosts.data);
            setTotalPages(data.forumPosts.last_page);
        };
        fetchData();
    }, [currentPage]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage < totalPages) {
        return prevPage + 1;
      } else {
        return 1; // Go back to the first page if currently on the last page
      }
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      } else {
        return totalPages; // Go to the last page if currently on the first page
      }
    });
  };



const handleSearch = async () => {
      const response = await axios.get(`/api/search/forums?title=${titleFilter}&category=${categoryFilter}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      setForums(response.data);
};



  
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/CreateForum');
  };
  
  const handleForumClick = (forumId) => {
  // Navigate to the specified URL when the card is clicked
  navigate(`/forum/${forumId}`);
};

  return (
    <div className="healthforum-container">
    <Navbar settings={settings}/>
      <h1 className="healthforum-heading">Health Forums </h1>
      <div className="healthforum-filter-container">

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Diet">Diet</option>
          <option value="Exercise">Exercise</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Sleep">Sleep</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Women's Health">Women's Health</option>
          <option value="Men's Health">Men's Health</option>
          <option value="Heart Health">Heart Health</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Fitness">Fitness</option>
          <option value="Stress Management">Stress Management</option>
          <option value="Allergies">Allergies</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="Respiratory Health">Respiratory Health</option>

        </select>


        <input
          type="text"
          placeholder="Search"
          value={titleFilter}
          onChange={e => setTitleFilter(e.target.value)}
        />
        <button onClick={handleSearch}> Search  </button>
        <button onClick={handleCreateClick}> Create  </button>
        
      </div>
      <div className="healthforum-list">

        {Forums.map(forum => (
          <div href='' key={forum.id} className="healthforum-card" onClick={() => handleForumClick(forum.id)}>
            <div className="left-section">
              <div style={{ paddingLeft: '20px' }}>
                <h2>{forum.title} </h2>
                <p>Category : {forum.category} </p>
                <p className="healthforum-description">{forum.description}</p>
                <p>{forum.created_at ? new Date(forum.created_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit' }) : "Invalid Date"}</p>

              </div>
            </div>
          </div>
        
        ))}

      </div>

    </div>
  );
};

export default HealthForum;