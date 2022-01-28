import React from 'react';
import './gradeInfo.css'
function GradeInfo({gradeTitle , year , students , campus}) {
    return (
         <div className="gradeInfo">
                <h2 className="gradeInfoTitle">
                    Grade Info
                </h2>
                <div className="gradeInfoItem">
                    <p className="gradeInfoLable">
                        Grade
                    </p>
                    <p className="gradeInfoValue">
                        {gradeTitle}
                    </p>
                </div>
                <div className="gradeInfoItem">
                    <p className="gradeInfoLable">
                        Year
                    </p>
                    <p className="gradeInfoValue">
                        {year}
                    </p>
                </div>
                <div className="gradeInfoItem">
                    <p className="gradeInfoLable">
                        Enrolled Students
                    </p>
                    <p className="gradeInfoValue">
                        {students.length}
                    </p>
                </div>
                <div className="gradeInfoItem">
                    <p className="gradeInfoLable">
                        Campus
                    </p>
                    <p className="gradeInfoValue">
                        {campus}
                    </p>
                </div>
            </div>
    );
}

export default GradeInfo;
