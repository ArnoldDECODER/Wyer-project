import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  tenantId: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Fetch users failed', error);
        navigate('/login');
      }
    };
    fetchUsers();
  }, [navigate]);

  return (
    <div className="users-container">
      <h2 className="section-title">Users</h2>
      <div className="users-card">
        {users.length === 0 ? (
          <p className="no-users">No users found</p>
        ) : (
          <ul className="users-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <span className="user-email">{user.email}</span>
                <span className="user-tenant">Tenant ID: {user.tenantId}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Users;