/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CreateQuiz from "../../views/Modal/QuizModal/CreateQuiz";
import { apiAcc } from "../../../api/apiConnect";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Puff } from "react-loader-spinner";

export default function QuizManageView(props) {
  const token = sessionStorage.getItem("token");
  const [candidates, setCandidates] = React.useState([]);
  //GET User - Candidate
  const getCandidates = () => {
    apiAcc
      .get("/accounts/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getCandidates();
  }, []);
  const [loader, setLoader] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      searchStaff(search);
      setLoader(false);
    }, 1000);
  };

  const [staffResult, setStaffResult] = React.useState(candidates); // GET candidates
  const searchStaff = (values) => {
    const sName = values;
    if (sName !== "") {
      const result = candidates.filter((s) =>
        s.fullName.toLowerCase().match(sName.toLowerCase())
      );
      if (result.length > 0) {
        setStaffResult(result);
      } else {
        alert("No result!");
      }
    } else {
      setStaffResult([...candidates]);
    }
  };
  const searchResultRender = () => {
    if (staffResult.length > 0) {
      return staffResult;
    } else {
      return candidates;
    }
  };

  return (
    <div>
      <div>
        <div className="card__list-test">
          <div className="card__header">
            <h3 className="">Quiz Management</h3>
          </div>
          <div className="row">
            <div className="mt-3 text-left col-5">
              <div className="col-4 text-left add-staff-button">
                Tạo bài Test mới
                <IconButton
                  onClick={props.toggleModalCreate}
                  sx={{ color: "rgba(255, 193, 69, 1)" }}
                >
                  <AddCircleIcon />
                </IconButton>
              </div>
            </div>
            <div className="form__search-candidate col-6 mt-3">
              <form onSubmit={submitSearch}>
                {loader === true ? (
                  <div className="loader_icon">
                    <Puff type="Puff" color="#00BFFF" height={35} width={35} />
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          {props.showCreateQuiz === true ? (
            <CreateQuiz
              showCreateQuiz={props.showCreateQuiz}
              toggleModalCreate={props.toggleModalCreate}
              categories={props.categories}
              postCreateQuiz={props.postCreateQuiz}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="my-4">
          <ListCandidateQuiz candidates={searchResultRender()} />
        </div>
      </div>
    </div>
  );
}
const ListCandidateQuiz = (props) => {
  const { candidates } = props;
  const RenderCandidate = () => {
    if (candidates.length > 0) {
      return candidates
        .filter((candidate) => candidate.userType === "Cand")
        .map((can, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{can.fullName}</td>
            <td>{can.id}</td>
            <td>{can.company.shortCutName}</td>
            <td>{can.userType === "Cand" ? "Ứng viên" : null}</td>
            <td className="text-center">
              <Link to={`/quiz/quiz-user/${can.id}`}>
                <button className="btn btn-outline-primary">Xem bài Test</button>
              </Link>
            </td>
          </tr>
        ));
    } else return null;
  };
  return (
    <table className="table card__table m-auto" style={{ width: "95%" }}>
      <thead className="">
        <tr>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>ID</th>
          <th>Công ty</th>
          <th>Vị trí</th>
          <th className="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <RenderCandidate />
      </tbody>
    </table>
  );
};
