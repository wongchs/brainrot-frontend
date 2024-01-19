const Notification = ({ notification, type }) => {
  const success = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (notification === null) {
    return null;
  }

  return <div style={type === "success" ? success : error}>{notification}</div>;
};

export default Notification;
