# Git commit messages convention:

- The Git commit messages must be very descriptive of the action done by the developer.
- The commit message should be as follow:
    - [action] : the commit message must start with a verb describing the action done inside the square brackets [ ] and the verbs can be:
        - add: to describe adding a new file, a new function, a markdown file etc…
        - remove/delete: to describe removing something.
        - update: to describe updating something already exists.
        - refactor: to describe refactoring code i.e restructure a bunch of code into different files, reorganizing the code files/folders.
        - fix: must be used to describe fixing an code error and it must be followed by a well written description explaining the solution in an easy way.
- Examples of Git commit messages:
    - [add] [Readme.md](http://Readme.md) file.
    - [update] the UserModel by adding the missing properties from the DB architecture.
    - [fix] the docker-compose up command issue by changing its version to the most recent one in the package.json file.
    - …