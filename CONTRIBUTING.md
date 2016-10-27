#Outstanding Contributing Guidelines

##Angular 2
###Style Guide

We develop with the official Angular 2 Style Guidelines in mind. We care about Clean Code.
You can find the Style Guidelines under [this](https://angular.io/docs/ts/latest/guide/style-guide.html) link.


##Commit Messages

Please be nice to your colleagues and write a short explanation what exactly changed in this commit.
Samples for invalid commit messages are:
- Fixed something|bug
- added feature
- asdfghjklö
- qwertz
- random shit
- minor changes
- offensive messages
- correcting typo

##Branch naming

We want to have some branch categories and those categories have their own prefix.

- **feature**
   adding a new feature e.g. a user story
- **bugfix**
   fixing a bug, reference issue if it exists
- **doc**
   changing documentation files, mostly *.md files
- **upgrade**
   3rd party library update like Angular or angular-cli
- **config**
   configuration changes e.g. gradle etc.
- **amend**
   changing non-feature related things in code (e.g. frontend changing scaffolding)

Those are the most common branch types.
All of them follow the same syntax in naming. 
Use the name from above as a prefix, then a slash (/) and after that a short identifier.

Example:
`feature/calculate-mark-report`

##Pushing and Pull requests

Minor changes (change on one file, less than 5 lines and without bigger influence) can be pushed to the master branch directly.
For every other change please create a pull request.

###Branches 
According to [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/) we want to have an organized branching.

* Master: Used for releases only
* Development: Use this to add all your fancy stable features to our system
* feature/YourFeature: Please use your own branch to develop your stuff.

##Issues
To track our bugs and tasks we use the GitHub issue feature.
Every issue must be labeled. (e.g.: question, bug)

### Bugs
If you find a bug please take the time to report it.
Your first step should be to check the existing issues for information about your problem.
To make sure we can fix the bug as soon as possible we would like to add some rules.
 
The issue must contain the following data:
1. Browser and version
2. Step by step description (about how we can reproduce the bug)
3. Short comment

Please **label your issue as bug** and we will take a look at it as soon as possible.
