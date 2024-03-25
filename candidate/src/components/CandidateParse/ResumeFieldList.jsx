import React from 'react'
import { RxCross2 } from "react-icons/rx";

const ResumeFieldList = ({data, deleteData}) => {
  return (
    <div class="skill-list d-flex gap-3 flex-wrap">
    {data.length === 0 && !data.isEditing && (
      <div>No skills added</div>
    )}
    {data.map((skill, index) => {
      return (
        <div class="skill-item d-flex gap-1 align-items-center" style={{border:"1px solid black", borderRadius:"100vh", paddingInline:"10px"}}>
          <span>{skill}</span>
        </div>
      );
    })}
  </div>
  )
}

export default ResumeFieldList
