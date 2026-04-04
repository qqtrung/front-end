import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel('/user/list').then(data => {
      if (data) {
        setUsers(data);
      }
    });
  }, []);

  return (
    <div className="user-list">
      <Typography variant="body1" className="user-list-title">
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <ListItem key={item._id} button component={Link} to={`/users/${item._id}`} className="user-list-item">
            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
