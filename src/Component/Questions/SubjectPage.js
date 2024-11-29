import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentData, SubjectData } from "../../Context/Action/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, fetchTotalCount } from "../../Hooks/getSubjectApi";
import Loading from "../Loader/Loading";

function SubjectPage() {
  const { token, _id } = useSelector((state) => state.userConfig.classesData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [error, setError] = useState(null);

  async function handleSubject(value) {
    dispatch(CurrentData(value));
    navigate("/subjectDetails");
  }

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const { totalQuestions, subjects } = await fetchSubjects(token, _id);
        setData(subjects);
        setTotalQuestion(totalQuestions);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjectsData();
  }, [_id, token]);
  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
          {data.map((value, index) => {
            const matchingQuestion = totalQuestion.filter(
              (q) => q.subjectName === value.name
            );

            return (
              <div
                className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
                onClick={() => handleSubject(value)}
                key={index}
              >
                <div className="flex flex-row items-center justify-between">
                  <p className="font-semibold text-left text-xl uppercase text-orange-500">
                    {value.name}
                  </p>
                  <div className="pr-4">
                    <img
                      src={value.image}
                      className=" block w-24 h-20 px-5 py-2 shadow-sm rounded-md"
                      alt={value.name}
                    />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-600 text-xl capitalize">
                    total questions{" "}
                  </p>
                  <p className="text-2xl text-gray-800 font-medium ">
                    {matchingQuestion[0]?.count || 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default SubjectPage;
