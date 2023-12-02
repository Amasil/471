import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data));
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
