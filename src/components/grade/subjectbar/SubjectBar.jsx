import React from 'react';
import "./subjectBar.css"
import Math from '../../../img/Math.svg'
import English from '../../../img/English.svg'
function SubjectBar({ subject }) {
    const obh = {
        Math: Math, 
        English : English
    }
    return (
        <div className='subjectBar'>
            <h2 className="gradeInfoTitle">
                    Subjects
                </h2>
            <ul className='subjectList'>
            {subject && subject.map((sub , index) => {
                return (
                    <li className="subject" key={index}>
                        <img src={require(`../../../img/${sub.name}.svg`) }className="subjectImage" alt="4" />
                        {/* <div style={{backgroundImage : `url("../../../img/English.svg")`}} className="subjectImage"></div> */}
                        <span className="subTitle">{sub.name }</span>
                    </li>
                )
            })}
            </ul>
        </div>
    );
}

export default SubjectBar;
