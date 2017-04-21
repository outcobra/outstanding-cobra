# Outstanding Contributing Guidelines

## Angular 2
### Style Guide

We develop with the official Angular 2 Style Guidelines in mind. We care about Clean Code.
You can find the Style Guidelines under [this](https://angular.io/docs/ts/latest/guide/style-guide.html) link.


## Commit Messages

Please be nice to your colleagues and write a short explanation what exactly changed in this commit.
Some examples of invalid commit messages are:

Fixed something|bug, added feature, asdfghjklö, qwertz, random shit, minor changes, offensive messages or correcting typo.

Valid messages could look like this:

* Updated UserRepository to use generics
* Fixed alignment of delete button on the user edit modal. Fixes #1343

Also, please use multiple `-m`s for `git commit` to create multiple lines. If you are using a GUI to create your commits, you should be able to just write stuff on multiple lines. A good thing to put on a second line would be a more detailed description of the changes or a Github reference like `Fixes #1343`.

Full example: `git commit -a -m "Use multiple instances to linked Institution to Class" -m "Querydsl is acting weird (only returning the first result) if two Institutions are linked by the same instance of InstitutionClass" -m "Fixes #1343" `

## Branch naming

We want to have some branch categories and those categories have their own prefix.

| Branch Prefix | Description                              |
| ------------- | ---------------------------------------- |
| **feature**   | Anything related to a user story. May only implement a part of the user story. |
| **bugfix**    | Fixing a bug, reference the issue if there is one. Reference it like this: `bugfix/<issueid>-some-branch-name` where `<issueid>` quite obviously represents the id of the issue. |
| **doc**       | Changing documentation files like this one. You could also use this if you are going on a mission to Javadoc every method that exists (for example). |
| **upgrade**   | 3rd party library updates like Angular or angular-cli. |
| **config**    | Configuration changes, e.g. adding a dependency in a Gradle file |
| **amend**     | Any code changes that don't fit into the other categories. |

All of them follow the same syntax: chose one of the prefixes and append the issue id plus a short, lower- and [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) identifier, separated by a slash.

Example:
`feature/#123-calculate-mark-report`

## Pushing and Pull requests

Minor changes can be pushed to the `develop` branch directly. Minor changes must fulfill the following criteria:

* Changes to one file
* Less than 5 [LLOC](https://en.wikipedia.org/wiki/Source_lines_of_code#Measurement_methods)
* No wider influence

For all other changes, please create a branch and pull request.

### Branches 
Our branch names are inspired by [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/#getting_started).

* `master`: Used for releases only, must be stable and tested
* `develop`: Should only contain finished and reasonably stable features; this branch is auto-deployed on every push
* `feature/my-awesome-feature`: Every feature gets a branch and it can be unstable or even unbuildable

## Labels

Our labels have a well-defined structure, here is an explanation of the various prefixes:

* T: Type
* S: Status
  * S-I: Applicable to issues
  * S-P: Applicable to pull-requests
  * S-A: Applicable to anything
* P: Priority
* M: Metadata
  * M-C: Component
  * M-B: Bug
* Z-D: Deprecated labels, don't use them

All issues must have at least a `T` label and should be updated with the according `S` labels to allow for an easy overview.

## Issues
We use Github issues to track bugs and tasks. Additionally, we use ZenHub for Scrum-related stuff.

### Bugs
If you find a bug please take the time to report it.
Your first step should be to check if there is an existing issue that matches the bug you encountered. If you find an existing issue, you might be able to add some detail but please don't open another issue.


To make the process of reproducing and fixing a bug quicker, we would like to ask you to include the following fields in your bug report:

1. Browser and version
2. Steps to reproduce the bug
3. Short comment

