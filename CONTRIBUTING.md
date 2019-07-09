# Contributing

(Warning: this is still a work in progress!)

 - [Workflow](#workflow)
 - [Coding Rules](#rules)
 - [Branching](#branching) 
 - [Commit Guidelines](#commit)

## <a name="workflow"></a> Workflow

This is a basic workflow and a quick reference for contributing code. 

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests or e2e-tests).
* All public API methods **must be documented**.
* We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html), but wrap all code at
  **100 characters**.

## <a name="branching"></a> Branching

### Quick reference

<table>
  <thead>
    <tr>
      <th>Branch</th>
      <th>Type</th>
      <th>State</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>origin/master</td>
      <td>master branch</td>
      <td>production-ready</td>
      <td>The main branch. Accepts merges from develop, release, and hotfix.</td>
    </tr>
    <tr>
      <td>origin/develop</td>
      <td>integration branch</td>
      <td>ready for the "next release"</td>
      <td>The latest delivered development changes for the next release. Accepts merges from master, topic, and hotfix.</td>
    </tr>
    <tr>
      <td>release-*</td>
      <td>release branches</td>
      <td>production</td>
      <td>New production release. May branch off from: develop. Must merge back into: develop and master, and then tagged with a release number.</td>
    </tr>
    <tr>
      <td>topic-*</td>
      <td>feature branches</td>
      <td>local development</td>
      <td>May branch off from: develop. Must merge back into: develop.</td>
    </tr>
    <tr>
      <td>hotfix-*</td>
      <td>hotfix branches</td>
      <td>current release</td>
      <td>Severe bugs. May branch off from: master. Must merge back into: develop and master.</td>
    </tr>
  </tbody>
</table>

### The main branches

The central repository holds two main branches with an infinite lifetime:

* `master`
* `develop`

We consider `origin/master` to be the main branch where the source code of HEAD always reflects a _production-ready_ state.

We consider `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the "integration branch". This is where any automatic nightly builds are built from.

When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should be merged back into `master` somehow and then tagged with a release number.

Therefore, each time when changes are merged back into `master`, this is a new production release by definition.

#### Switched to a new branch 'develop' 

```bash
git checkout -b develop master
git push origin develop
```

### Feature branches

Feature branches (or sometimes called topic branches) are used to develop new features for the upcoming or a distant future release. 

The different types of branches we may use are:

* `feature`
* `issue`
* `bug`
* `experiment`
* `docs`

#### Working with a feature branch
If the branch does not exist yet (check with the Lead), create the branch locally and then push to GitHub. A feature branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

- **Switched to a new branch 'docs-issue22'**
  ```bash
  git checkout -b docs-issue22 develop
  ```
- **Makes the new feature remotely available**
  ```bash
  git push origin docs-issue22
  ```
- **Periodically, changes made to 'develop' (if any) should be merged back into your feature branch.**
  ```bash
  git merge develop
  # or rebase
  git checkout my-feature
  git rebase develop
  ```
- **Incorporating a finished feature on develop**

  Finished features may be merged into the `develop` branch to definitely add them to the upcoming release:
  ```bash
  git checkout develop
  git rebase myfeature
  # git merge --no-ff myfeature
  git push origin develop
  git branch --delete myfeature
  git push origin --delete myfeature
  ```

### Release branches

Release branches support preparation of a new production release. 

Release branches are created from the `develop` branch. The state of `develop` is ready for the "next release". We branch off and give the release branch a name reflecting the new version number:

The key moment to branch off a new release branch from `develop` is when `develop` (almost) reflects the desired state of the new release. At least all features that are targeted for the release-to-be-built must be merged in to `develop` at this point in time. All features targeted at future releases may not—they must wait until after the release branch is branched off.

When the state of the release branch is ready to become a real release, some actions need to be carried out. First, the release branch is merged into master (since every commit on master is a new release by definition). Next, that commit on master must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into develop, so that future releases also contain these bug fixes.

#### Creating a release branch 

Release branches are created from the develop branch. For example, say version 1.1.5 is the current production release and we have a big release coming up. The state of develop is ready for the “next release” and we have decided that this will become version 1.2 (rather than 1.1.6 or 2.0). So we branch off and give the release branch a name reflecting the new version number:

```bash
git checkout -b release-1.2 develop
git commit -a
```

After creating a new branch and switching to it, we bump the version number.

#### Finishing a release branch
When the state of the release branch is ready to become a real release, some actions need to be carried out. First, the release branch is merged into master (since every commit on master is a new release by definition, remember). Next, that commit on master must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into develop, so that future releases also contain these bug fixes.

The first steps [*]:

```bash
git checkout master
git merge --no-ff release-1.2
git tag -a 1.2
```
<sup>[*] Before merging with `--no-ff`, get new changes from remote `origin/master` and test branch.
<br/>
Note: You might as well want to use the `-s` or `-u <key>` flags to sign your tag cryptographically.</sup>

The release is now done, and tagged for future reference.

<sup>**Extra**: generalmente, es una buena idea limpiar el código (local) con una reorganización interactiva antes de enviar la pull request (public).</sup>
```bash
# on the feature/bug/hotfix branch
git fetch origin/master  #update the master
git checkout myfeature
# clean up the history
git rebase -i origin/master #rebase on top of the master to incorporate the last changes

# run tests before merging!

git checkout master                              
git merge --no-ff (feature/bug/hotfix branch)    
``` 

<sup>Siempre puedes realizar la reorganización en una rama temporal. De este modo, si accidentalmente echas por tierra el historial de tu rama de funcionalidades, puedes extraer la rama original y volver a intentarlo. Por ejemplo:</sup>

```bash
git checkout myfeature
git checkout -b temporary-branch
# clean up the history
git rebase -i master
# run tests before merging!
git checkout master
git merge --no-ff temporary-branch
```

To keep the changes made in the `release` branch, we need to merge those back into `develop`, though

```bash
git checkout develop
git merge --no-ff release-1.2
git branch --delete release-1.2
```

### Hotfix branches

Hotfix branches are very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

The essence is that work of team members (on the develop branch) can continue, while another person is preparing a quick production fix.

#### Creating the hotfix branch

Hotfix branches are created from the master branch. For example, say version 1.2 is the current production release running live and causing troubles due to a severe bug. But changes on develop are yet unstable. We may then branch off a hotfix branch and start fixing the problem:

```bash
git checkout -b hotfix-1.2.1 master
$ ./bump-version.sh 1.2.1
git commit -a -m "Bumped version number to 1.2.1"
```

Don’t forget to bump the version number after branching off!

Then, fix the bug and commit the fix in one or more separate commits.

```bash
git commit -m "Fixed severe production problem"
```
#### Finishing a hotfix branch

When finished, the bugfix needs to be merged back into master, but also needs to be merged back into develop, in order to safeguard that the bugfix is included in the next release as well. This is completely similar to how release branches are finished.

First, update `master` and tag the release [*].

```bash
git checkout master
git merge --no-ff hotfix-1.2.1
git tag -a 1.2.1
```
<sup>[*] Before merging with `--no-ff`, get new changes from remote `origin/master` and test branch.
<br/>
Note: You might as well want to use the `-s` or `-u <key>` flags to sign your tag cryptographically.
</sup>
```bash
# on the hotfix branch
git fetch origin/master  #update the master
git checkout hotfix-1.2.1
git rebase -i origin/master #rebase on top of the master to incorporate the last changes
# run tests before merging!
git checkout master                              
git merge --no-ff hotfix-1.2.1  
``` 

Next, include the hotfix in `develop`, too:

```bash
git checkout develop
git merge --no-ff hotfix-1.2.1
```
Finally, remove the temporary branch:

```bash
git branch -d hotfix-1.2.1
```

## <a name="commit"></a> Commit Guidelines

### Commits

- Each commit should be a single **_logical change_**. Don't make several **_logical change_** in one commit. For example, if a patch fixes a bug and optimizes the performance of a feature, split it into two separate commits. 

  _Tip: Use `git add -p` to interactively stage specific portions of the modified files_.

- Don't split a single **_logical change_** into several commits. For example, the implementation of a feature and the corresponding tests should be in the same commit.

- Commit **_early_** and **_often_**. Small, self-contained commits are easier to understand and revert when something goes wrong.

- Commits should be ordered logically. For example, if **_commit B_** depends on changes done in **_commit A_**, then **_commit A_** should come before **_commit B_**.

Note: While working alone on a local branch that has not yet been pushed, it's fine to use commits as temporary snapshots of your work. However, it still holds true that you should apply all of the above before pushing it.

### Commit Message Format

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. 

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/en/articles/closing-issues-using-keywords) if any.

**_Note_**:
- If a **_commit B_** depends on **_commit A_**, the dependency should be stated in the message of **_commit B_**. Use the SHA1 when referring to commits.

- Similarly, if **_commit B_** solves a bug introduced by **_commit A_**, it should also be stated in the message of **_commit B_**.

#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm). [2]
- **ci**: Changes to our CI configuration files and - scripts (example scopes: Circle, BrowserStack, SauceLabs). [2]
- **docs**: Documentation only changes.
- **feat**: A new feature. [1]
- **fix**: A bug fix. [1]
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **release**: A release commit. Must only include version changes. [2]
- **revert**: A git commit revert. The description must include the original commit message. [2]
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **test**: Adding missing tests or correcting existing tests.

<sup>[1] This type MUST have a scope. See the next section for more information.</sup><br/>
<sup>[2] This type MUST NOT have a scope. It only applies to general scripts and tooling.</sup>

#### Scope

The following is the list of supported scopes:

- **core**: Used for core application.
- **testing**: Used for testing configurations.
- **packaging**: Used for packaging.
- **changelog**: Used for updating the release notes in CHANGELOG.md
- **contributing**: Used for updating the guidelines in CONTRIBUTING.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a specific package (e.g. `docs: fix typo in tutorial`).

#### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

#### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Advanced Tips

### Git Log
```
git log
```
#### Decorating
Many times it’s useful to know which branch or tag each commit is associated with. The `--decorate` flag makes `git log` display all of the references (e.g., branches, tags, etc) that point to each commit.
```
git log --oneline --decorate
```

#### Graphs
The `--graph` option draws an ASCII graph representing the branch structure of the commit history. This is commonly used in conjunction with the `--oneline` and `--decorate` commands to make it easier to see which commit belongs to which branch:
```
git log --graph --oneline --decorate
```
For a simple repository with just 2 branches, this will produce the following:

```
* 0e25143 (HEAD, master) Merge branch 'feature'
|\
| * 16b36c6 Fix a bug in the new feature
| * 23ad9ad Start a new feature
* | ad8621a Fix a critical security issue
|/
* 400e4b7 Fix typos in the documentation
* 160e224 Add the initial code base
```

The asterisk shows which branch the commit was on, so the above graph tells us that the `23ad9ad` and `16b36c6` commits are on a topic branch and the rest are on the master branch.

While this is a nice option for simple repositories, you’re probably better off with a more full-featured visualization tool like `gitk`.

#### The Shortlog
The `git shortlog` command is a special version of `git log` intended for creating release announcements. It groups each commit by author and displays the first line of each commit message. This is an easy way to see who’s been working on what.

## References

- [1] [branching strategy](https://nvie.com/posts/a-successful-git-branching-model/)
- [2] https://github.com/agis/git-style-guide
- [3] https://es.atlassian.com/git/tutorials/merging-vs-rebasing
