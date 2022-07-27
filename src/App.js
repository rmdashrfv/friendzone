import './App.css';
import {useState, useEffect} from 'react'
/*
 * Use Array.filter to filter the friends by their name when a user types in the input
 * When the input is blank, it should render all of the friends.
 * Feel free to add more friend objects to your server file.
 */
function App() {
  const [friends, setFriends] = useState([])
  const [allFriends, setAllFriends] = useState([])

  const handleChange = (e) => {
    if (e.target.value === '') return setFriends(allFriends)
    const filteredFriends = friends.filter((f) => f.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFriends(filteredFriends)
  }

  useEffect(() => {
    const getFriends = async () => {
      let req = await fetch('http://10.129.2.235:3001/friends')
      let res = await req.json()
      setFriends(res)
      setAllFriends(res)
    }
    getFriends()
  }, [])

  return(
    <div className="App">
      <h2>Friends</h2> 
      <input type="text" placeholder="Enter a friend name" onChange={handleChange} />
      {
	friends.map((friend) => {
	  return(
	    <div key={friend.id}>
	      {friend.name} {friend.email} 
	    </div>
  	  )
	})
      }
    </div>
  );
}

export default App;
