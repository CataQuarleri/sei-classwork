//https://perscholas.instructure.com/courses/1966/assignments/367037
//https://www.canva.com/design/DAFxJzEGlWs/view

// The provided course information.
const CourseInfo = {
	id: 451,
	name: 'Introduction to JavaScript',
};

// The provided assignment group.
const AssignmentGroup = {
	id: 12345,
	name: 'Fundamentals of JavaScript',
	course_id: 451,
	group_weight: 25,
	assignments: [
		{
			id: 1,
			name: 'Declare a Variable',
			due_at: '2023-01-25',
			points_possible: 50,
		},
		{
			id: 2,
			name: 'Write a Function',
			due_at: '2023-02-27',
			points_possible: 150,
		},
		{
			id: 3,
			name: 'Code the World',
			due_at: '2024-11-15',
			points_possible: 500,
		},
	],
};

// The provided learner submission data.
const LearnerSubmissions = [
	{
		learner_id: 125,
		assignment_id: 1,
		submission: {
			submitted_at: '2023-01-25',
			score: 47,
		},
	},
	{
		learner_id: 125,
		assignment_id: 2,
		submission: {
			submitted_at: '2023-02-12',
			score: 150,
		},
	},
	{
		learner_id: 125,
		assignment_id: 3,
		submission: {
			submitted_at: '2023-01-25',
			score: 400,
		},
	},
	{
		learner_id: 132,
		assignment_id: 1,
		submission: {
			submitted_at: '2023-01-24',
			score: 39,
		},
	},
	{
		learner_id: 132,
		assignment_id: 2,
		submission: {
			submitted_at: '2023-03-07',
			score: 140,
		},
	},
];
//AUXILIAR FUNCTIONS
function checkCourseID(course, ag) {
	if (course.id == ag.course_id) {
		return true;
	} else {
		return false;
	}
}

function notYetDue(date) {
	let currentDate = new Date();
	let assignmentDate = new Date(date);
	if (assignmentDate > currentDate) {
		return false;
	} else {
		return true;
	}
}

function lateSubmission(dateSubmitted, assignmentDate) {
	let submissionDate = new Date(dateSubmitted);
	let dueDate = new Date(assignmentDate);
	if (submissionDate > dueDate) {
		return true;
	} else {
		return false;
	}
}
//MAIN FUNCTION
function getLearnerData(course, ag, submissions) {
	try { //handles possible errors
		let courseValid = checkCourseID(course, ag);
		if (!courseValid) {
			throw new Error('The Assignment group does not belong to the current course');
		}

		let eachLearner = []; //initializes array to deliver as result

		submissions.forEach((oneSubmission) => {
			const existingLearner = eachLearner.find((learner) => learner.id === oneSubmission.learner_id); //check if learner is already in array
			const getAssignment = ag.assignments.filter((assignment) =>assignment.id ===oneSubmission.assignment_id); //filter the current assignment for the learner submission in this iteration
			if (getAssignment.length <= 0) {	//Finishes this iteration if the students assignment is not listed in the assignment group
				return;
			}
			const assignmentDate = getAssignment[0].due_at; //saves the date for use in auxiliar functions
			let possiblePoints =Number(getAssignment[0].points_possible) == 0? 1: Number(getAssignment[0].points_possible); //saves points for average and sets points to 1 in case is 0
			if (!notYetDue(assignmentDate)) { //skips iteration of submission if the assignment is not yet due using auxiliar function
				console.log(`Assignment ${getAssignment[0].id} not yet due`);
			} else {
				let assignmentIsLate = lateSubmission(oneSubmission.submission.submitted_at,assignmentDate);
				if (assignmentIsLate) { //using boolean on previous line  discounts 10 to score if the submission was late
					console.log(`Learner ${oneSubmission.learner_id} submitted assignment ${oneSubmission.assignment_id} on a later date`);
					oneSubmission.submission.score -= 10;
				}

				if (!existingLearner) {//boolean variable initialized at the beggining used to avoid repeating learner id in the array
					let score = Number(oneSubmission.submission.score); //initializes div with the number of the first assignment submitted
					let learnerObject = {//initializes object with the content required
						id: oneSubmission.learner_id,
						avg: [score, possiblePoints], //first index is the sum of the averages and second index is sum of possible points for future average
						[oneSubmission.assignment_id]: Number((oneSubmission.submission.score /possiblePoints).toFixed(2)), //names key as assignment id and value to average. The "toFixed" states the amount of decimals in the float
					};
					eachLearner.push(learnerObject); //pushes this learner into array outside of the loop
				} else {
					//if the learner already exists on the array
					let score =existingLearner.avg[0] +Number(oneSubmission.submission.score); //sums to the scores from previous assignments and current in iteration
					pointsPerAssignment = existingLearner.avg[1] + Number(possiblePoints); //sums the points possible of previous assignments and current iteration
					existingLearner[oneSubmission.assignment_id] = Number((oneSubmission.submission.score /possiblePoints).toFixed(2));
					existingLearner.avg[0] = score; //assigned to first index in avg for future calculation
					existingLearner.avg[1] = pointsPerAssignment; //assigned to second index in avg for future calculation
				}
			}
		}); //end of loop
    for (let i = 0; i < eachLearner.length; i++) { //calculates weighted average of score modifying each object in the array to divide the total score by the possible points sum. Controls flow in case of no learners or avg 0 for one learner
      if (eachLearner.length <= 0){
        break; // finishes the loop
      } else if (eachLearner[i].avg[0] === 0){

       continue; //continues to next iteration
      }else {
        eachLearner[i].avg = eachLearner[i].avg[0] / eachLearner[i].avg[1]
      }
    }

		return eachLearner; // return of the main function
	} catch (e) {
		//catches error
		console.log(e);
	}
}

const result = getLearnerData(
	CourseInfo,
	AssignmentGroup,
	LearnerSubmissions
); //calls function

console.log('result', result);

let table = document.querySelector(".table")
table.append(JSON.stringify(result))