## ESLint Setup

1. First go to Extensions within VSCode and install ESLint by Dirk Baeumer.
   a) You will then get a "Failed to load the ESLint library" error. That is totally fine we will fix that later. Don't worry about it yet.
2. Within your VSCode open up a new Terminal. Run the below commands:
   a) `npm --prefix './project/' ci`
   This will install a node_modules folder in the origin of your project folder.
3. Find the ESLint icon in the bottom right corner of your screen. Click on that and select "allow globally".

## Further Automated Setup

- For extra fancy automated running of npm ci and other future tests do the following.
  - Hit `ctrl-p` or `cmd-p` then type:
  - `>Tasks: Manage Automatic Tasks in Folder` and choose the Accept option.
  - Now a script will run everytime you open this folder or VSCode in general and you won't have to worry about running `npm ci` ever again.
