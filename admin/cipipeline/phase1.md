## Checkpoint 1 Pipeline Status:
---
### Linting
- We decided to use standard-js as our style guide. We wanted to make sure that semicolons were checked and so our ESLint is using semistandard which is all of standard-js with the one altered rule of requiring semicolons.
- Built in locally to VSCode.
  - Using ESLint Extension to provide real time error checks and provide each developer with notice of any pieces of code that do not abide with our linting rules.
  - Set up the lint fix to run anytime the developer saves a .js file. Makes it super convenient to fix errors with a quick ctrl-s/cmd-s. 
    - This also has the side benefit of avoiding all auto-fixable errors in the pipeline since you must save your file before committing it and therefore fixing all auto-fixable errors automatically.
- Created a pre-commit hook that runs the lint check before allowing a commit to be completed. This will catch those non auto-fixable errors such as undefined variables. The developer will have to manually go in and fix these. 
  - Currently working on a fix for disseminating this to everyone since the default `.git` folder where hooks exist is not tracked via version control. Added a `.githooks` folder that will be tracked. Created a script to run within our `package.json` that will update the `git config core.hooksPath .githooks` which updates the location git looks for hooks. 
- GitHub Workflow that runs everytime a push action is done. Currently only runs a final lint check and will not allow for merging of code into another branch if that test fails. 

**Issues**
- Ran into a lot of issues getting the linting working for absolutely everyone. Ended up including the package.json and package-lock.json files within the repo so that a quick `npm ci` command ran by everyone will set up their local environments completely. 
- Started working on a autorun task from within VSCode to do the setup however ran into some problems getting it to work on OSX. This little feature is currently benched until the others can be fully implemented. 
- Getting the pre-commit hook working has been way more complicated then anticipated. Tried for a long time getting the original pre-commit hook from within the .git/hooks folder working but switched to using husky to run the hook. This ended up adding even more unneeded complexity to the process even though it did work. Revised the pre-commit situation by getting the original .git/hooks/pre-commit working. Then due to the fact that the .git folder is not tracked dissemenating the hook was difficult. Developed a fix that is yet to be tested by the team but should solve this issue. 

---

### Code Quality
- Currently waiting for email back from Code Climate for student account. Didn't want to start the free trial too early without that due to not having access after 14 days. Planning on getting this added into the pipeline in sprint 2. 

---
### Unit Tests
- Did research on getting this built into the pipeline however getting the linting fully setup was a lot more complicated then intended. Planning to get Unit Testing built into the pipeline in Sprint 2.

---
### Documentation Generation
- Discussed the notion of adding JSDocs throughout code with the programmers on the team so they would start adding JSDocs to their code as they worked on it.
- Plan on adding some sort of check to make sure their exists some JSDocs comments for each function. 
- Need to decide fully on where to generate this documentation. Planning on discussing this within our next meeting.
