/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { toastFail } from "../../../../helper/Notification/utils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditQuestion(props) {
  const {
    showEditQues,
    toggleEditQues,
    question,
    categories,
    quesTypes,
    putUpdateQuestion,
  } = props;
  const [questionSubmit, setQuestionSubmit] = useState({
    category: {
      id: "",
    },
    content: "",
    questionTime: "",
    questionType: {
      id: "",
    },
    questionChoice: [
      {
        name: "",
        isTrue: false,
      },
      {
        name: "",
        isTrue: false,
      },
      {
        name: "",
        isTrue: false,
      },
      {
        name: "",
        isTrue: false,
      },
    ],
  });
  const [cateId, setCateId] = useState("");
  const [questionTypeId, setQuestionTypeId] = useState("");
  const [quesTime, setQuesTime] = useState("");
  const [contentQues, setContentQues] = useState("");
  const [choiceA, setChoiceA] = useState({
    name: "",
    isTrue: false,
  });
  const [choiceB, setChoiceB] = useState({
    name: "",
    isTrue: false,
  });
  const [choiceC, setChoiceC] = useState({
    name: "",
    isTrue: false,
  });
  const [choiceD, setChoiceD] = useState({
    name: "",
    isTrue: false,
  });
  const [errContent, setErrContent] = useState(false);

  const handleChangeCate = (e) => {
    setCateId(e.target.value);
  };
  const handleChangeQuesType = (e) => {
    setQuestionTypeId(e.target.value);
  };
  const handleChangeTime = (e) => {
    setQuesTime(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContentQues(e.target.value);
  };
  const handleChangeAnswerA = (e) => {
    setChoiceA({ ...choiceA, name: e.target.value });
  };
  const handleChangeAnswerB = (e) => {
    setChoiceB({ ...choiceB, name: e.target.value });
  };
  const handleChangeAnswerC = (e) => {
    setChoiceC({ ...choiceC, name: e.target.value });
  };
  const handleChangeAnswerD = (e) => {
    setChoiceD({ ...choiceD, name: e.target.value });
  };

  useEffect(() => {
    if (choiceA.isTrue === true) {
      setChoiceB({ ...choiceB, isTrue: false });
      setChoiceC({ ...choiceC, isTrue: false });
      setChoiceD({ ...choiceD, isTrue: false });
    } else return;
  }, [choiceA]);
  useEffect(() => {
    if (choiceB.isTrue === true) {
      setChoiceA({ ...choiceA, isTrue: false });
      setChoiceC({ ...choiceC, isTrue: false });
      setChoiceD({ ...choiceD, isTrue: false });
    } else return;
  }, [choiceB]);
  useEffect(() => {
    if (choiceC.isTrue === true) {
      setChoiceA({ ...choiceA, isTrue: false });
      setChoiceB({ ...choiceB, isTrue: false });
      setChoiceD({ ...choiceD, isTrue: false });
    } else return;
  }, [choiceC]);
  useEffect(() => {
    if (choiceD.isTrue === true) {
      setChoiceB({ ...choiceB, isTrue: false });
      setChoiceC({ ...choiceC, isTrue: false });
      setChoiceA({ ...choiceA, isTrue: false });
    } else return;
  }, [choiceD]);
  useEffect(() => {
    setQuestionSubmit({
      category: {
        id: cateId,
      },
      content: contentQues,
      questionTime: quesTime,
      questionType: {
        id: questionTypeId,
      },
      questionChoice: [choiceA, choiceB, choiceC, choiceD],
    });
  }, [
    cateId,
    questionTypeId,
    quesTime,
    contentQues,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
  ]);

  const saveQuestion = () => {
    const checkChoice = questionSubmit.questionChoice.filter(
      (ch) => ch.isTrue === true
    );
    const contentChoice = questionSubmit.questionChoice.filter(
      (ch) => ch.name === ""
    );
    if (questionSubmit.category.id === "") {
      toastFail("Chọn 1 category");
    } else if (questionSubmit.questionType.id === "") {
      toastFail("Chọn kiểu câu hỏi");
    } else if (questionSubmit.content === "") {
      setErrContent(true);
      toastFail("Nội dung không được trống");
    } else if (checkChoice.length < 1) {
      toastFail("Phải có ít nhất một đáp án đúng");
    } else if (contentChoice.length > 0) {
      toastFail("Nội dung đáp án bị trống");
    } else {
      putUpdateQuestion(questionSubmit);
    }
  };
  return (
    <BootstrapDialog
      onClose={toggleEditQues}
      aria-labelledby="customized-dialog-title"
      open={showEditQues}
      maxWidth="lg"
      fullWidth={true}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        sx={{ fontFamily: "Quicksand" }}
        onClose={toggleEditQues}
      >
        Sửa Question
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div className="row">
          <div className="col-4">
            <Typography mb={2}>Chọn Thể loại</Typography>
            <FormControl fullWidth>
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                labelId="select-label"
                value={cateId}
                label="Category"
                onChange={handleChangeCate}
              >
                {categories?.map((cate) => (
                  <MenuItem key={cate.id} value={cate.id}>
                    {cate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-4">
            <Typography mb={2}>Kiểu câu hỏi</Typography>
            <FormControl fullWidth>
              <InputLabel id="select-label-2">Question Type</InputLabel>
              <Select
                labelId="select-label-2"
                value={questionTypeId}
                label="Question Type"
                onChange={handleChangeQuesType}
              >
                {quesTypes?.map((qtype) => (
                  <MenuItem key={qtype.id} value={qtype.id}>
                    {qtype.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-4">
            <Typography mb={2}>Thời gian</Typography>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Thời gian"
                variant="outlined"
                value={quesTime}
                onChange={handleChangeTime}
                required
              />
            </FormControl>
          </div>
          <div className="col-12">
            <Typography my={2}>Thời gian</Typography>
            <FormControl fullWidth>
              <TextField
                error={errContent}
                label="Nội dung"
                variant="outlined"
                value={contentQues}
                onChange={handleChangeContent}
                required
              />
            </FormControl>
          </div>
          <div className="col-12 my-2">
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Đáp án</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="female"
                name="radio-buttons-group"
                row
              >
                <div className="col-6 my-1">
                  <FormControlLabel
                    label="A"
                    control={
                      <Radio
                        checked={choiceA.isTrue === true}
                        onChange={() => {
                          setChoiceA({ ...choiceA, isTrue: !choiceA.isTrue });
                        }}
                      />
                    }
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Câu trả lời"
                    variant="outlined"
                    value={choiceA.name}
                    onChange={handleChangeAnswerA}
                  />
                </div>
                <div className="col-6 my-1">
                  <FormControlLabel
                    label="B"
                    control={
                      <Radio
                        checked={choiceB.isTrue === true}
                        onChange={() => {
                          setChoiceB({ ...choiceB, isTrue: !choiceB.isTrue });
                        }}
                      />
                    }
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Câu trả lời"
                    variant="outlined"
                    value={choiceB.name}
                    onChange={handleChangeAnswerB}
                  />
                </div>
                <div className="col-6 my-1">
                  <FormControlLabel
                    label="C"
                    control={
                      <Radio
                        checked={choiceC.isTrue === true}
                        onChange={() => {
                          setChoiceC({ ...choiceC, isTrue: !choiceC.isTrue });
                        }}
                      />
                    }
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Câu trả lời"
                    variant="outlined"
                    value={choiceC.name}
                    onChange={handleChangeAnswerC}
                  />
                </div>
                <div className="col-6 my-1">
                  <FormControlLabel
                    label="D"
                    control={
                      <Radio
                        checked={choiceD.isTrue === true}
                        onChange={() => {
                          setChoiceD({ ...choiceD, isTrue: !choiceD.isTrue });
                        }}
                      />
                    }
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Câu trả lời"
                    variant="outlined"
                    value={choiceD.name}
                    onChange={handleChangeAnswerD}
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="button-user" onClick={saveQuestion}>
          Lưu
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
