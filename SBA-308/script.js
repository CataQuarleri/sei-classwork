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
        due_at: "2024-11-15",
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

  function checkCourseID (course, ag){
    if (course.id == ag.course_id){
      return true
    } else {
      return false
    }
  }

  function notYetDue (date){
    let currentDate = new Date();
    let assignmentDate = new Date(date)
    if (assignmentDate > currentDate){
      return false;
    } else {
      return true;
    }
  }

  function lateSubmission(dateSubmitted, assignmentDate){
    let submissionDate = new Date(dateSubmitted);
    let dueDate = new Date(assignmentDate);
    if (submissionDate > dueDate){
      return true
    } else {
      return false
    }
  }

  function calculateAvg(avg, learnerObject){
    let assignments = Object.keys(learnerObject).length - 2;
    let totalAvg = avg/assignments;

    return totalAvg
  }
// console.log("CALCULATE AVG!", calculateAvg(250, ))
  function getLearnerData(course, ag, submissions) {
    let courseValid = checkCourseID(course, ag)
    if (!courseValid){
      throw new Error ("The Assignment group does not belong to the current course")
    }

    try {
let eachLearner = []
submissions.forEach((oneSubmission)=>{
    let avg = 0 
    let learnerObject = {}
    let existingLearner = eachLearner.find(learner => learner.id === oneSubmission.learner_id);
    let getAssignment = ag.assignments.filter(assignment => assignment.id === oneSubmission.assignment_id)
    let assignmentDate = getAssignment[0].due_at;
    let possiblePoints = Number(getAssignment[0].points_possible);

  if (!notYetDue(assignmentDate)){
    console.log(`Assignment ${getAssignment[0].id} not yet due`)
  }else {

    if(lateSubmission(oneSubmission.submission.submitted_at, assignmentDate)){
      console.log(`Learner ${oneSubmission.learner_id} submitted assignment ${oneSubmission.assignment_id} on a later date`)
    oneSubmission.submission.score -= 10
    }

    if (existingLearner){
        avg = existingLearner.avg[0] + Number(oneSubmission.submission.score)
        pointsPerAssignment = existingLearner.avg[1] + Number(possiblePoints)
        existingLearner[oneSubmission.assignment_id] = Number(((oneSubmission.submission.score) / possiblePoints).toFixed(2))
        existingLearner.avg[0] = avg;
        existingLearner.avg[1] = pointsPerAssignment
    }else {
        avg = Number(oneSubmission.submission.score)
        learnerObject = {
            id: oneSubmission.learner_id,
            avg:  [avg, possiblePoints],
            [oneSubmission.assignment_id]: Number((oneSubmission.submission.score / possiblePoints).toFixed(2))
        } 
       
        eachLearner.push(learnerObject)
    }
  }
})  
let average = eachLearner.forEach(learner => 
{  learner.avg = learner.avg[0] / learner.avg[1]
console.log("LEARNER AVG", learner.avg)}

  // learner.avg = Number(learner.avg[0] / learner.avg[1])
  )
console.log(average)
console.log("EACH LEARNER", eachLearner)
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