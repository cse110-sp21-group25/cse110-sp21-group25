# Group 25 - Marinated Cuyitos

- Team page can be found [here](admin/team.md)

## CuJo

- You can access our CuJo (BuJo app) [here](https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html)

- INSERT FINAL SCREENSHOT OF APP HERE

- JsDocs documentation can be found at the following: [JSDocs Site](https://cujodocs.github.io/CuJoDocumentation/)

- All of our team documentation including team rules, meeting notes, standup checkins, and any other documents we created during this quarter can be found within our wiki [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki) or within the admin directory of our repo [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/onboarding-guide/admin)

## Final Project Videos

- [final video public version](https://vimeo.com/561689531/e3f6dbed8a)
- [final video private version](https://drive.google.com/file/d/1nhBVjM6JZ1q3y0IlgX-Gn6JIth2JJExc/view?usp=drivesdk)

---

## Wiki

- We decided to write this readme as the first thing most people see when visiting the repo and as such it includes guidelines on how to access all of our important files. However, all of our important documents have also been organized nicely in the wiki found [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki) in case you would rather navigate through everything there.

---

## Onboarding

- Please visit the wiki for the full onboarding guide [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki/Onboarding)

---

## Overall GitHub Structure

![Our GitHub Structure](./admin/cipipeline/github-flow.png)

---

## How to Contribute

- Step 0) Make sure you have followed the onboarding guide [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki/Onboarding) to get your local machine setup properly.

- Step 1) Take a look at any issues that are open and if you are working on something that isn't there yet please add that as an issue then assign yourself before starting.

- Step 2) Do not ever work directly within the Staging, Pipeline-Testing, or Main branch since you will not be able to push directly to any of those branches. Please make a branch off of one of the prior listed before starting your work.

- Step 3) Write JSDoc comments in your code. [Handy Guide](https://devhints.io/jsdoc) See our JSDocs Site [here](https://cujodocs.github.io/CuJoDocumentation/) for example of what this will look like once it is generated as a webpage.

- Step 4) If you have worked on the project that day please update the respective issue with details of your progress. This will help not only you keep track of what you've worked on but also the team to be aware of anything that is currently in work and what progress has been made.

- Step 5) When creating a pull request please be careful that you are merging to the correct branch, consult above image if you are not completely sure. Also see the GitHub Guide for some helpful screenshots on how to initiate a pull request.

- Step 6) Once you have created the pull request please make sure that your issue has been updated and that it closes once the merge is completed.

**Example Workflow:** Let's say I wanted to add a feature to the Mood-Indicator component that animates the faces for added depth. I would create an issue with a brief description of the feature and assign it to myself. Then I would create a branch labeled `mood-indicator-animation` from Staging. At the end of the day I would update the issue with comments of how things are going. Once I was done implementing that new feature I would create a pull request to merge the changes into Staging and make sure to link the issue so that it will be closed once the pull request is merged.

---

## CI/CD Pipeline Information and Documentation:

- All of the CI/CD Pipeline checkpoints and other documentation can be found under `./admin/cipipeline`

- The JsDocs is generated and pushed to a seperate repo to host the page (all within a GitHub action). This page can be found [here](https://cujodocs.github.io/CuJoDocumentation/)

---

## Design

The full design documentation can be found under the `./specs` folder. The contents of our specs folder are as follows:

- All of our [ADRS](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/main/specs/adrs) within the `./specs/adrs`

- Our Pitch document [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/specs/pitch/pitch.md) within the `./specs/pitch`

- All of our brainstorming documentation [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/main/specs/brainstorm) within the `./specs/brainstorm`

- All of our interface documents including our lowfidelity ,highfidelity, and rough fat marker sketches are [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/main/specs/interface)

---

## Sprints

- Sprint 1:
  - [Review](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/admin/meetings/051621-sprint-1-review.md)
  - [Retrospective](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/admin/meetings/051621-sprint-1-retrospective.md)
- Sprint 2:
  - [Review](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/admin/meetings/053121-sprint-2-review.md)
  - [Retrospective](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/admin/meetings/053121-sprint-2-retrospective.md)

---

## Administrative Documents

- Our meeting notes are located nicely organized within our wiki [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki/Meeting-Notes)

- Our contract is found in the wiki as well [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki/Established-Rules) with the signed versions in our repo [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/main/admin/misc)

- Our Daily Standups are organized in the wiki [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/wiki/Daily-Standups)

- Any other admin type document can be found within the `admin` directory of our repo.

---

## Project Source

- All of the actual code and all project related files including configs can be found within the `project` directory of our repo.

- The project source code is found within `project/src` [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/tree/main/project/src) with each component having it's own folder containing it's respective css and js files.

- Most of the configuration files have been integrated into the `package.json` file found [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/project/package.json)

- Any files that could not be added into the `package.json` can be found within the `project/config` directory. This is also the location of our pre-commit hook that is found within `project/.githooks/` directory.

---

## Testing

- Due to our decision to use web components and ShadowRoot we were unable to really find an effective way to run unit tests in the time we had. Instead we opted to create exhaustive E2E tests in order to cover as much of our code as possible. These tests can be found within the `project/testing` directory.
- In order to properly account for coverage all tests were written in seperate files per component and were then integrated into our single `end-to-end.test.js` file found [here](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/main/project/testing/end-to-end.test.js). Integrated them all into the one file allowed us to test the coverage of our E2E tests.
- We used Puppeteer and Jest for our testing. The tool `nyc` was then used to generate the coverage reports via the npm script labeled `test` found within `package.json`
- The coverage can be seen via the GithHub action anytime a push action happens. In order to cut down on the number of files in our repo however, we opted to gitignore this folder since it is mostly situational and changes each time a new test is added. Our most current coverage report can be seen below: ![coverage-report](https://github.com/cse110-sp21-group25/cse110-sp21-group25/blob/staging/project/testing/coverage-report.png)
