import React from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="body1">User not found</Typography>;
  }

  return (
    <div className="user-detail">
      <Typography variant="h4" className="user-detail-name">{`${user.first_name} ${user.last_name}`}</Typography>
      <Typography variant="body1" className="user-detail-info">
        <span className="user-detail-label">Location:</span> {user.location}
      </Typography>
      <Typography variant="body1" className="user-detail-info">
        <span className="user-detail-label">Description:</span> {user.description}
      </Typography>
      <Typography variant="body1" className="user-detail-info">
        <span className="user-detail-label">Occupation:</span> {user.occupation}
      </Typography>
      <br />
      <Button variant="contained" component={Link} to={`/photos/${userId}`} className="user-detail-button">
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
