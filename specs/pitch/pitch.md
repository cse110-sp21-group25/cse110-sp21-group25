# <center>Team 25</center>

### <center>Marinated Cuyitos</center>
##### <center>Professor: Thomas A. Powell</center>
##### <center>Team Mentor: Deepak Karki</center>

##### Team Members:
- Brian Wong
- Jesse Wolf
- Angel Hernandez-Llamas
- Grady Gabriel
- Issac Garcia
- Kevin Wong
- Simon Liu
- Steven Nguyen

---
### <center> Statement of Purpose: </center>
We want to provide a tool that allows users to organize their lives by focusing on daily activities while providing tracking of monthly and yearly goals as well.  Along with that, we strive to create a functional tool that enables users to easily track their tasks. Furthermore, we aim to keep the overhead for learning how to use our app low as possible. By striving to create a bullet journal app that does not feature too much overhead, we are adhering to how the original creator of the bullet journal, Ryder Carroll, envisioned the bullet journal to function.


### <center> User Personas: </center> 
Our target users are practical people who prefer a functional/practical approach over a creative approach and enjoy using a simple digital platform to keep track of tasks and goals. Our web app aims to attract users that wish to become more organized. Therefore, we designed our web app in such a way that it does not take too much time to use throughout the day. This was achieved by focusing our web app on being very functional rather than customizable. It is important to limit the amount of time the user spends with the app during the day because one problem with staying organized is the maintenance. If our app was high maintenance, for instance, requiring the user to log in multiple times a day for 10 minutes or more, the user may grow to resent our app. This resentment can lead to them no longer using our web app. 


### <center> Appetite: </center>
Given that we only have 5 more weeks to develop this app and our sprint schedule is yet to be determined, we understand that there are certain things that can’t be included such as: 

Given that we only have 5 weeks to develop this app and our lack of expertise in HTML, CSS, and JS, it is difficult to provide an accurate sprint schedule for our goals. At best, we can give over estimates and try our best to meet those estimates. Before giving our tentative sprint schedule, we want to address one of our decisions due to the time constraint. Specifically, we want to highlight why we are not focusing on customization. The reason for that is given a 5 week time frame, there may not be enough time to create a functional minimum viable product and provide extensive customization. Even if one was able to implement both of those reasonably well, the lack of functional features may impair one’s usage of the bullet journal. With that in mind, here is our tentative sprint schedule:

#### Week 6-7 (Construct the Minimum Viable Product)
- Elements of MVP
- Certain elements of the Daily page
- Title
- Adding bullets
- Symbols menu
- Adding/Editing weekly/monthly goals
- BuJo tutorial page
- Implement main components of navbar
- Daily
- Goals
- Help button
- Storage
#### Week 8-9 (Add Extra Features)
- Search bar
- Notifications
- Calendar
- Settings
- Mood Indicator
- Daily Quotes
- Forward and Back Arrows
- Add the rest of the navbar elements
#### Week 10 (Polish)
- We should not be adding any more features at this point.
- This week is primarily for polishing.
- We expect many of the features from weeks 8-9 will still require additional work.

---
### <center> Rabbit Holes: </center> 
#### Monthly and Yearly Calendar 
- There are many ways that we could approach a calendar and so we discussed that our calendar will be very simplified since all it really should have within it are brief tasks/notes/events with the majority of the writing being done within the daily portion.
- Our calendar has a box for each day within the month and will show only a preview not all of the points. 
- No dragging and dropping days around.

#### Search Bar Functionality
- We are limiting the search to be only by tags and not just any word put in by the user. Ex: The ability to search for notes with the tags such as “Books”, “Recipes”, etc. This will allow us to narrow the difficulty of labeling things internally as well as keep the search feature simplified for the user.

#### Storage
- There are many different ways for us to store the user’s data, but each one has its own pros and cons. 
- From the brief research that we’ve done, we could use a fully fledged database, but that has issues regarding privacy concerns and being a little bit overkill for our needs. Another issue with this approach would be sourcing this database. If possible we would prefer to avoid paying a subscription, but free databases do not appear to have much storage capacity.
- Another possibility would be to store user data in a json file locally. A few issues with this is:
    - Lack or portability
    - Possibility for desync
    - Relies heavily on the user to work probably
    - Goes against our purpose and the users we are trying to attract.

---
### <center> No-Gos: </center> 
- **Customization**
    - Not many options for customization, we decided to keep it simple and allow users to choose between a few different color schemes and fonts but that is it. This will allow us to focus on the core functionality rather than adding a lot of customization. By limiting the amount of customization options we want to also nudge our users to not think about the customization and rather focus more on their journal itself.
- **Video and Audio Recordings**
    - Videos/Recordings, we decided that we would want everything to be visible from the one page, If we were to add videos and recordings, the user would have to parse through the recordings. By limiting everything to text, and images, anyone who views the bullet journal would be able to immediately see everything.

--- 
### Potential Technical Problems and Some Solutions.
- **Search bar**
    - Depending on the implementation of storage and amount of content, we might have issues grabbing the correct search results in a timely manner.
    - We need the boundaries of the search bar. For instance, should the search bar include elements from journals from months ago?
    - To simplify the search process, we could store the elements in the tags in whatever storage method we end up using. So instead of searching through all the days, we could have a dedicated portion of the file for each tag. These sections will contain all the elements that feature that particular tag. This could speed up the process of searching for elements with the correct tag. One downside with this solution would be that it requires storing more information.
- **Quote generator** (probably an api)
    - Generating our own list of quotes is not practical. As such, we are likely to look for an api or some database that contains a list of suitable quotes. However, another issue that could arise is that the quotes may be too large and may not fit the designated area. Not only this, it may distract the user too much from the main content of our app.
    - We could scale the quote depending on its length to make it fit within the designated area, but that too may get complicated. The complication would come from ensuring that no part of the quote is cut off while maintaining the readability.
- **Storage** (Saving/Loading)
    - If we go with a json file, the file structure might become a little complex. Another issue with this approach is that it requires the user to not misplace this file. Once again, we do not want the user to lose all their data so easily. There arises another concern regarding the frequency of saving the file automatically, or whether it is going to be automatic.
    - The other avenue we could take to solve our storage problem is utilizing a database. However, issues regarding setup and learning how to manage a database is concerning considering our tight time constraints.

---

### <center> Solution: </center>

<!-- INSERT DAILY AND NOTIFICATION IMAGE HERE -->
![Daily Page](/specs/interface/wireframes/Daily-and-Notification-Bar.JPG)

The first image shows us the main (daily page). This will be what is shown when the user opens up the webpage each day. The main focus of this page is to serve as the hub for the rest of the web app. This is done by allowing easy navigation to other portions of the journal. The daily page is made up of the following:
- The navigation bar found on the left of the screen is described further below. This will be present on all screens to allow for the user to become familiar with only one major set of settings and other navigation items that will persist across our entire website.
- Settings will link to the settings tab with appropriate options being offered there. Also described further within a larger view further along our document.
- The help button is a form of a tutorial if the user needs it and will be further described later in this document. 
- The quote found within the bottom right corner will change daily. 
- The mood indicator will be a way for the user to track their mood for the current day, if they so choose. 
- Goals section will be a visual reminder of the users current monthly and weekly goals so that they will always be at the forefront of their mind while filling out the rest of their journal. 
- The Arrows located at the top of the screen will allow the user to move between the current day and the previous/next day in their journal. 
- Notifications will be shown as a small number of current notifications and if clicked will pop out covering the goals section as shown in the second screen above. This will be a place the user can see the notifications they deem as more urgent.

<!-- INSERT IMAGE TWO HERE, INDEX -->
![Index Page](/specs/interface/wireframes/Index.JPG)

The two images seen above represent the index section of our webpage. The index will be available at all pages of our website. Whenever the user accesses the web page, they can directly access the date they wish to see information about. It will contain access to most current months and and days, with the addition of being able to select the year. The user will be able to see the tags that each day has assigned to them. The index options, yearly, monthly, and daily will not be expanded from the start, and will only have their expanded form whenever the user wants to select a given, month day or year, in order to preserve space in the left navigation bar.
  
<!-- INSERT NEXT AND PREVIOUS PAGE HERE -->
![Next and Previous Pages](/specs/interface/wireframes/Next-and-Previous.JPG)

The feature displayed in these two images demonstrate the ease of navigation offered to the user by adding a forwards and backwards arrow to emulate as if flipping through an actual journal. When the user loads their journal, they are automatically taken to the present day. Thus, if they wish to check or correct something from the day before, they can easily utilize the backwards arrow on the top right corner to navigate to the previous day. Likewise, if the user wishes to skip ahead into future journal entries and maybe add a note, this can be done by utilizing the forward arrow also on the top right corner of the screen. The intent of this feature is to enable the user to easily navigate to previous or future journals without the need to go into the calendar and look for the next day. 

<!-- INSERT HELP AND SETTINGS HERE -->
![Help and Settings Page](/specs/interface/wireframes/Help-and-Settings.JPG)

There are two images here being shown. The top left image specifies our help feature. The help feature’s main purpose is to aid those who are confused about certain other features that are displayed on the interface. After clicking on the Question Mark at the bottom left of the screen, a screen will pop up displaying the name of various features and will provide a description of it. They will be able to scroll through to find the feature of their choice.

The top right image here shows a settings menu. The setting’s page is activated once you click on the gear at the bottom left of the interface. After clicking on the gear, a page will appear displaying the various different settings we will have available. They will be able to change the font of the text, the colors of the background, control notification time, and various other settings that will help the user.

<!-- INSERT SYMBOLS PAGES HERE -->
![Symbols](/specs/interface/wireframes/Symbols.JPG)

The first frame shows that there is a visible exclamation mark button at the left corner that is clickable by the users and triggers the menu options on the right (Bullets, Tasks, Events, etc) to show up horizontally. Then, if it gets clicked again, it will pop off the menu options. 

After the exclamation button is being clicked for the first time, the second frame shows there is a button called "Bullets" that preview various bullet points depending on their purposes and later will be chosen by users to add them in their bullet journal. Different kinds of bullet points can make a big difference on how users remember things in their mind.

<!-- INSERT MONTHLY IMAGE HERE -->
![Task Menu and Monthly Page](/specs/interface/wireframes/Task-menu-and-Monthly.JPG)

In the two images presented, the top left one is showing another one of the symbol menus found on the bottom of the daily page. Specifically, it is showing the tasks menu. What is being displayed is the symbols related to tasks that one may use in their bullet journal.

As for the bottom right image, we have the monthly log. It contains an overview of the entire month. We want to stress that this is not a calendar which has many more features such as being able to drag events around. We do not want the user to be making changes to their daily journals from this screen. Instead, this screen is supposed to be like a dashboard that allows the user to see a brief overview of the various notes that they listed throughout the month and the migrations that they made.

<!-- INSERT SEARCH IMAGE HERE -->
![Searching Utility](/specs/interface/wireframes/Searching.JPG)

In this part of the design you can see the searching utility. When the magnifying glass is clicked the search bar will appear with the Recents, Tags, and Reminders headers visible. Once the user types something in, the tags corresponding to the text passed in will be displayed as shown in the image on the right. The user will then be able to click on any of the tags that appeared and that will take them to the corresponding note/index. 


<!-- INSERT GOALS PAGE HERE -->
![Goals Page](/specs/interface/wireframes/Goals.jpg)

In this part of the design our goal was to portray the use of the Goals tab located towards the left of the screen under the Index. The intent of such a tab is to allow the user to create and modify their weekly and their monthly goals. Clicking on the Goals tab on the left will bring the user to a new screen titled Goals and will offer the options to toggle between weekly and monthly goals. Thus, for the weekly goals, the week that the user is presently on will be displayed ranging from the start of the week (Sunday) to the end of the week (Saturday). In addition the user can generate their weekly goals in such screen and these will be made available throughout the program under the Goals preview side-bar on the right of the screen (Demonstrated in previous slides). The monthly goals are very similar to the weekly, however, to access and edit these, the user has to toggle the monthly button and they will be directed to the corresponding screen. There, they can list their goals for the month and will also be available through the Goals preview side-bar. As the weeks and months pass by, these will be saved as subfolders to the Goals tab under the Index navigation bar at the left. 