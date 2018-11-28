import React from "react";

const List = (props) => {
  return (
    <div className="list">
      <P>      
        ID: {props.EmpID} | Name: {props.Name} | Position: {props.EmpCode} |
        Salary: {props.Salary}
      </P>
    </div>
  );
};

export default List;
