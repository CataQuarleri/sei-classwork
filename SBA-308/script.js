//https://perscholas.instructure.com/courses/1966/assignments/367037 
//https://www.canva.com/design/DAFxJzEGlWs/view

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function checkCourseID (){

  }

  function getLearnerData(course, ag, submissions) {
    try {
let eachLearner = []
submissions.map((oneSubmission)=>{
    let avg = 0 
    let learnerObject = {}
    let existingLearner = eachLearner.find(learner => learner.id === oneSubmission.learner_id);
    let getAssignment = ag.assignments.filter(assignment => assignment.id === oneSubmission.assignment_id)
    let possiblePoints = getAssignment[0].points_possible;

    if (existingLearner){
        avg = existingLearner.avg + oneSubmission.submission.score
        existingLearner.avg = avg;
        existingLearner[oneSubmission.assignment_id] = Number((oneSubmission.submission.score / possiblePoints).toFixed(2))
    }else {
        avg = oneSubmission.submission.score
        learnerObject = {
            id: oneSubmission.learner_id,
            avg: avg,
            [oneSubmission.assignment_id]: Number((oneSubmission.submission.score / possiblePoints).toFixed(2))
        } 
        eachLearner.push(learnerObject)
    }
})  
console.log("output", eachLearner)
    }catch(e){
       console.log(e)
    }
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  
  //the output of your program is an array of objects as follows {learnerid: 3, avg: 0.98, 1: 0.84, 2: 0.90}
  //First I need to [id: LearnerSubmissions.id, avg: allLea ]
//check courseInfo.id == AssignmentGroup.course_id
//