# TA Large Meeting In Meeting Minutes
## Meeting Information
**Meeting Date/Time:** 7 May 2021, 5:00pm  
**Meeting Purpose:** Checkin with all of Deepak's Groups  
**Meeting Location:** https://ucsd.zoom.us/j/97232602305?pwd=QnMzUVF5VDdubkxEdWM2NExvcXdCZz09  
**Note Taker:** Jesse Wolf  

## Attendees from Our Group
People who attended:
- Jesse Wolf
- Brian Wong
- Kevin Wong

---

(Shortened Deepak to D for ease of rewriting it multiple times. Whenever you see `D:` below it is preceding something that Deepak said.)

Overall Plan:
- Kind of like open discussion and each team comes along and shows off their work for other teams. Share feedback and ideas.
- Have each team come up 1 by 1 and share their work and their artifacts that they have right now. Other teams will be asked to give some feedback and suggestions. Also useful to see other's ideas.


**Team 27**
- Hamburger menu that keeps the whitespace open. 
- Generic background color palletes.
- Light and Dark mode (moon icon) 
- Signifiers button that will essentially do what our keys do.
- (Most of the feedback provided was super generalized so added that to the bottom of page with other general notes.)

**Team 21**
- Toggle for the side bar menu at the top left corner of the menu. 
- Settings with preset color schemes. Custom names for bullet points. 
- Have the calendar working with the ability to add events via a popup date selector and then it would add into the calendar itself. (Using fullcalendar JS library right now).
- D: Prefer that you have some sort of high fi design before implementing the actual design. It helps to make it easier since you will know what you are implementing before actual implementation really ramps up. This group specifically should work on some more high fi before moving further. 

**Team 22**
- Mental Health Focused for Students
- Only 4 pages, 
  - Home Page that focuses on the daily log. (Notebook paper look likes nice.) Chalkboard for upcoming tasks/events.
    - Mood between 5 different along with colors associated respectively. 
    - Legend in the top right next to the settings button as well.
    - Roses and Thorn tab that asks for the best part of your day and worst part of your day. 
    - They have quotes too. 
  - Mood tracker page that represents your mood in each day of the month. Shows each month as a row with each day as a column.
  - Calendar 
    - Helps let you know where you are in the quarter.
    - Has monthly summary on the left and breakdown in the right and center area.
  - Settings
    - Turn off a lot of the features such as daily quot, background colors, theme, and roses and thrones.
- D: Look for distinct components online and understand the code before you use it but you are allowed to use outside code. Check out Codepen and other component sites. Design can take some inspiration from Dribble, Pinterest, and even just Google.


**Team 23**  
- Main Page with the day tracker, pick what you are doing right at the top (task, note, etc.)
- Weekly View shows has a mood tracker. Potentially going to change that to be a user created habit tracker. (Check out different habit trackers since there are a lot of really crazy ones out there that are super customizable.)
- Yearly view that will show a large grid with the months
  - If you click on any of the months it will take you to that particular month's page that shows a grid of the days. 
- D: Get a bit more clear about your tracking. What are you trying to accomplish? Do you want it specifically to be more then a mood tracker? It seems like a highlatable feature. 
- D: Try to develop a high fidilety so that when you start coding it is easier to coordinate the overall look and feel instead of doing so after the fact.


**Team 24**
- Home Page, animated bullet journal to navigate to the index. Hamburger style side bar for navigation. 
- Index Page that allows the user to hyperlink to pages directly and has a legend of what each symbol means.
- Daily Logs that has hoverable options, allowing you to delete or check off each line when hovered over. 
- Monthly Logs are very similar to the Daily Logs.
- Custom List page that allows the user to add any list they want for example, grocery lists or workout. 
- Add personalized stickers to their page as well to add some more customization. Hoping to use a codepen they found for dragging and dropping an image onto the background that changes the colors and applies the image to the background.
- New design looks a lot more like a book. 
- D: How would the sticker size change if you resize the browser? This is the only real challenge you will run into after getting the stickers to be able to be placed on an overlay. Could also transition it into a full overlay that can be sketched on top of as well. 
- D: Really think about doubling down on the customization since it does sound like a solid feature that is the main character of your application.


**Team 25** 
- D: Usually you contextualize your data when searching. Starting with the most recent and then allow the user to scroll back in time further and further if we allow it. 
- D: Due to we are going for the productivity centric wise we my want to go all in for shortcuts. Ex. Shift Tab to switch between the symbols. Tab to jump to next line and such. Maybe even build in markdown to be used within the daily view. 
- D: Suggest to not have font customization since it doesn't really go with the rest of our approach. We are getting close to what the Superhuman app is doing (Check it out, their whole thing is UX and is only a front end to whatever other email client. Check out the guys process videos, he talks about how he designs things. He gamified the entire system. Has a lot of really good insights in software design.) 
- D: Focus on the shortcuts and maybe completely cut the customization options. Have a dark, light, dawn (kind of muted but not dark, usually a darkish blue) themes and call it a day. 
- D: We should double down on the productivity and of being a powerful editor with shortcuts and such.
- D: Well done and you have clearly thought what we want to do. 
- D: Check out focus mode for other apps and see how they have done it. See why they put it (collapsible menus and such) where they did and maybe use that within our design to elevate it even further. 

--- 

**Overall Feedback**
- User Personas
  - Find pain points for specific people and designate if that is a point that a lot of people have troubles with. 
  - How can we help solve this? 
  - Implement things that have a solid use case and how that feature will help the users overcome certain pain points. Don't just arbitrarily create features without a reason behind it.

- D: All of us need to take a crash course on typography. We are all a little loose with the fonts. Stick to 2 tops maybe 3 if you have a very good reason. 
- D: When you are developing, remember to not keep integration of components until the end. At least at the end of every week try to have an application that we could run without breaking. Begin testing early so that we can try to hit 90% testing and goal is to be 100% if possible.
- D: Remind me to share the grading rubric.