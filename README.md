# simple-web-tester
This application works as a simple "tester" application in which all students can register themselves and solve a "quiz" related to the "Calculus II" course.

## Conceptual Model
### Service flow
1. An user which can be either a teacher or a student can register himself into the application.

2. A student user can resolve the Calculus II test. This user has to have a valid studentCode and a valid umg email to be able to register to the page.

3. A teacher user can register into the page and view the "Calculus II" test and every student answer and their respectives scores.

4. A student can resolve a "only" intent on every given question by the test, and retries are not allowed. Once the test start, you can resume it. It will finish and compute your result based on your solved questions.

5. Every question has multiple answer, from which only one is a valid one. Every question has a given score from the whole test score. Only a correct answer give you the intended score.

6. Every question has a feedback section in which you can provide some "tips" or "remember" things that makes easier to the student understand the correct answer.

7. Once a student finish the "Calculus II" test, the student only will be able to visit all other pages. But a test retry is not allowed.

**NOTES**
 - Other sections are described in the "requirements" document given by the "Calculus II" teacher.

### Application Concepts
 - User
  * userId
  * roleId
  * creationDate
  * lastLoginDate
  * email
  * firstName
  * lastName
  * code

 - Role
  * roleId
  * description

 - Test
  * testId
  * testName
  * intentsByStudent
  * canRetry
  * isTimeLimited
  * timeLimit

 - Question
  * questionId
  * testId
  * description
  * points

 - Answer
  * answerId
  * questionId
  * description
  * isCorrect
  * feedback

 - TestIntent
  * testIntentId
  * studentId
  * testId
  * startedDate
  * endedDate
  * timeElapsed
  * score

 - AnswerIntent
  * answerIntentId
  * testIntentId
  * answerId
  * isCorrect
  * date
